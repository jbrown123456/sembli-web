-- =============================================================
-- Migration 0007 — push notifications schema
-- =============================================================
-- Tables:
--   device_push_tokens       — one row per device per user
--   maintenance_notifications — fanout audit, dedupes per item/user
-- Used by the dispatch-reminders edge function (Expo Push API).
-- =============================================================


-- ─── device_push_tokens ───────────────────────────────────────
-- One row per (user_id, push_token). A user can have several
-- devices. Tokens come from Expo (`ExponentPushToken[...]`).

create table if not exists device_push_tokens (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  push_token   text not null,
  platform     text not null check (platform in ('ios', 'android')),
  device_name  text,
  last_seen_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  unique (user_id, push_token)
);

create index if not exists device_push_tokens_user_id_idx
  on device_push_tokens (user_id);

alter table device_push_tokens enable row level security;

create policy "device_push_tokens_select_own" on device_push_tokens
  for select using (user_id = auth.uid());

create policy "device_push_tokens_insert_own" on device_push_tokens
  for insert with check (user_id = auth.uid());

create policy "device_push_tokens_update_own" on device_push_tokens
  for update using (user_id = auth.uid());

create policy "device_push_tokens_delete_own" on device_push_tokens
  for delete using (user_id = auth.uid());


-- ─── maintenance_notifications ────────────────────────────────
-- Audit log + dedupe table. The dispatcher inserts one row per
-- (maintenance_item_id, user_id) the first time a reminder fires
-- so we never double-send.

create table if not exists maintenance_notifications (
  id                   uuid primary key default gen_random_uuid(),
  maintenance_item_id  uuid not null references maintenance_items(id) on delete cascade,
  user_id              uuid not null references auth.users(id) on delete cascade,
  push_token           text,
  expo_ticket_id       text,
  status               text not null check (status in ('sent', 'failed', 'skipped')),
  error                text,
  sent_at              timestamptz not null default now(),
  unique (maintenance_item_id, user_id)
);

create index if not exists maintenance_notifications_item_idx
  on maintenance_notifications (maintenance_item_id);

alter table maintenance_notifications enable row level security;

-- Users can read their own notification rows; writes happen via
-- service-role (edge function) so no insert/update policy.
create policy "maintenance_notifications_select_own" on maintenance_notifications
  for select using (user_id = auth.uid());
