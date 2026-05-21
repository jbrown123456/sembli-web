// dispatch-reminders
// -------------------
// Polls maintenance_items that are due (or overdue) and have not yet
// been notified, then fans out a push notification to every device
// token belonging to a user with access to the home.
//
// Triggered by pg_cron via pg_net every 15 minutes.
// Idempotent: each (maintenance_item_id, user_id) is recorded in
// maintenance_notifications with a unique constraint, so re-runs
// skip already-notified rows.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

type MaintenanceItem = {
  id: string;
  home_id: string;
  title: string;
  due_date: string | null;
  status: string;
};

type RecipientRow = {
  user_id: string;
  push_token: string;
  platform: "ios" | "android";
};

type ExpoTicket =
  | { status: "ok"; id: string }
  | { status: "error"; message: string; details?: { error?: string } };

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";
const EXPO_BATCH_SIZE = 100;

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const expoAccessToken = Deno.env.get("EXPO_ACCESS_TOKEN") ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: "missing supabase env" }, 500);
  }

  const sb = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: dueItems, error: itemsErr } = await sb
    .from("maintenance_items")
    .select("id, home_id, title, due_date, status")
    .eq("status", "scheduled")
    .lte("due_date", new Date().toISOString().slice(0, 10))
    .limit(500);

  if (itemsErr) return json({ error: itemsErr.message }, 500);
  if (!dueItems || dueItems.length === 0) {
    return json({ ok: true, dueItems: 0, sent: 0 });
  }

  const messages: Array<{
    to: string;
    title: string;
    body: string;
    data: Record<string, unknown>;
    _itemId: string;
    _userId: string;
  }> = [];

  for (const item of dueItems as MaintenanceItem[]) {
    const { data: recipients } = await sb.rpc("recipients_for_home", {
      p_home_id: item.home_id,
    });

    const rows = (recipients ?? []) as RecipientRow[];
    if (rows.length === 0) continue;

    const { data: alreadyNotified } = await sb
      .from("maintenance_notifications")
      .select("user_id")
      .eq("maintenance_item_id", item.id);

    const skip = new Set((alreadyNotified ?? []).map((r) => r.user_id));

    for (const r of rows) {
      if (skip.has(r.user_id)) continue;
      messages.push({
        to: r.push_token,
        title: "Maintenance reminder",
        body: item.title,
        data: { maintenanceItemId: item.id, homeId: item.home_id },
        _itemId: item.id,
        _userId: r.user_id,
      });
    }
  }

  if (messages.length === 0) {
    return json({ ok: true, dueItems: dueItems.length, sent: 0 });
  }

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < messages.length; i += EXPO_BATCH_SIZE) {
    const chunk = messages.slice(i, i + EXPO_BATCH_SIZE);
    const payload = chunk.map(({ _itemId, _userId, ...m }) => m);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (expoAccessToken) {
      headers["Authorization"] = `Bearer ${expoAccessToken}`;
    }

    const res = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    let tickets: ExpoTicket[] = [];
    try {
      const j = await res.json();
      tickets = (j?.data ?? []) as ExpoTicket[];
    } catch (_e) {
      tickets = chunk.map(() => ({ status: "error", message: "expo_response_unreadable" }));
    }

    const rowsToInsert = chunk.map((m, idx) => {
      const t = tickets[idx];
      if (t && t.status === "ok") {
        sent += 1;
        return {
          maintenance_item_id: m._itemId,
          user_id: m._userId,
          push_token: m.to,
          expo_ticket_id: t.id,
          status: "sent" as const,
        };
      }
      failed += 1;
      return {
        maintenance_item_id: m._itemId,
        user_id: m._userId,
        push_token: m.to,
        status: "failed" as const,
        error: t?.status === "error" ? t.message : "unknown",
      };
    });

    if (rowsToInsert.length > 0) {
      await sb
        .from("maintenance_notifications")
        .upsert(rowsToInsert, { onConflict: "maintenance_item_id,user_id" });
    }
  }

  return json({ ok: true, dueItems: dueItems.length, sent, failed });
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
