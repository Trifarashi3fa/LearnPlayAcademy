-- LearnPlay Academy child table permissions
-- Safe to run on existing databases. RLS policies remain the security gate.

grant usage on schema public to authenticated;

grant select, insert, update, delete
  on table public.child_profiles
  to authenticated;

grant select, insert, update, delete
  on table public.child_progress
  to authenticated;