-- LearnPlay Academy Phase 4 progress tracking
-- Run this after 001_create_profiles.sql.

create table if not exists public.game_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  game_id text not null,
  game_title text not null,
  subject text not null,
  score integer not null default 0 check (score >= 0),
  total_questions integer not null default 0 check (total_questions >= 0),
  xp_earned integer not null default 0 check (xp_earned >= 0),
  level_after integer not null default 1 check (level_after >= 1),
  played_at timestamp with time zone not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  total_xp integer not null default 0 check (total_xp >= 0),
  current_level integer not null default 1 check (current_level >= 1),
  games_played integer not null default 0 check (games_played >= 0),
  best_score integer not null default 0 check (best_score >= 0),
  last_played_at timestamp with time zone,
  updated_at timestamp with time zone not null default now(),
  unique (user_id, subject)
);

alter table public.game_results enable row level security;
alter table public.progress enable row level security;

drop policy if exists "Users can read their own game results" on public.game_results;
drop policy if exists "Users can insert their own game results" on public.game_results;
drop policy if exists "Users can read their own progress" on public.progress;
drop policy if exists "Users can insert their own progress" on public.progress;
drop policy if exists "Users can update their own progress" on public.progress;

create policy "Users can read their own game results"
  on public.game_results
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own game results"
  on public.game_results
  for insert
  with check (auth.uid() = user_id);

create policy "Users can read their own progress"
  on public.progress
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists game_results_user_played_at_idx
  on public.game_results (user_id, played_at desc);

create index if not exists progress_user_subject_idx
  on public.progress (user_id, subject);
