-- =============================================================
-- Migration 0009 — schedule dispatch-reminders edge function
-- =============================================================
-- Schedules a pg_cron job that invokes the dispatch-reminders
-- edge function every 15 minutes via pg_net. Secrets (function
-- URL + service-role JWT) live in Supabase Vault under the names
-- 'dispatch_reminders_url' and 'dispatch_reminders_key' — set
-- them via vault.create_secret before this cron will start
-- delivering. Until then the tick logs a notice and returns.
-- =============================================================

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net  with schema extensions;

create or replace function dispatch_reminders_tick()
returns void
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  fn_url     text;
  bearer_key text;
begin
  select decrypted_secret into fn_url
    from vault.decrypted_secrets
    where name = 'dispatch_reminders_url';

  select decrypted_secret into bearer_key
    from vault.decrypted_secrets
    where name = 'dispatch_reminders_key';

  if fn_url is null or bearer_key is null then
    raise notice 'dispatch_reminders_tick: vault secrets dispatch_reminders_url / dispatch_reminders_key missing, skipping';
    return;
  end if;

  perform net.http_post(
    url := fn_url,
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || bearer_key,
      'Content-Type', 'application/json'
    ),
    body := '{}'::jsonb
  );
end;
$$;

revoke all on function dispatch_reminders_tick() from public;

-- Schedule every 15 minutes. cron.schedule is idempotent on name.
select cron.schedule(
  'dispatch-reminders-15m',
  '*/15 * * * *',
  $$select public.dispatch_reminders_tick();$$
);
