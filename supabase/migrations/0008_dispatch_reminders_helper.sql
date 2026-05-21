-- =============================================================
-- Migration 0008 — dispatch-reminders RPC helper
-- =============================================================
-- recipients_for_home(p_home_id uuid)
--   Returns one row per (user, push_token) for everyone with
--   access to the home (owner + members) that has a registered
--   Expo push token. Used by the dispatch-reminders edge function
--   under service-role; security definer keeps the join cheap.
-- =============================================================

create or replace function recipients_for_home(p_home_id uuid)
returns table (
  user_id    uuid,
  push_token text,
  platform   text
)
language sql
security definer
stable
set search_path = public
as $$
  with home_users as (
    select owner_id as user_id from homes where id = p_home_id
    union
    select user_id from home_members where home_id = p_home_id
  )
  select t.user_id, t.push_token, t.platform
  from device_push_tokens t
  join home_users hu on hu.user_id = t.user_id;
$$;

revoke all on function recipients_for_home(uuid) from public;
grant execute on function recipients_for_home(uuid) to service_role;
