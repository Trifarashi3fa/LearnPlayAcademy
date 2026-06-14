-- LearnPlay Academy Phase 4 API permissions
-- Run this if the app shows "permission denied for table profiles".

grant usage on schema public to authenticated;

grant select, insert, update on table public.profiles to authenticated;
grant select, insert on table public.game_results to authenticated;
grant select, insert, update on table public.progress to authenticated;
