-- LearnPlay Academy MVP child progress persistence.
-- One row is stored per child profile. Gameplay still updates local progress first,
-- then syncs level-completion checkpoints to Supabase.

create table if not exists public.child_progress (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.child_profiles(id) on delete cascade,
  parent_id uuid not null references public.profiles(id) on delete cascade,
  current_subject text not null default 'mathematics',
  current_world text not null default 'forest-world',
  current_level integer not null default 1 check (current_level between 1 and 10),
  completed_levels integer[] not null default '{}',
  level_stars jsonb not null default '{}'::jsonb,
  total_xp integer not null default 0 check (total_xp >= 0),
  total_stars integer not null default 0 check (total_stars >= 0),
  badges text[] not null default '{}',
  completed_worlds text[] not null default '{}',
  unlocked_worlds text[] not null default '{}',
  world_progress jsonb not null default '{}'::jsonb,
  progress_data jsonb not null default '{}'::jsonb,
  last_played_at timestamp with time zone not null default now(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint child_progress_one_row_per_child unique (child_id),
  constraint child_progress_parent_child_unique unique (parent_id, child_id)
);

alter table public.child_progress enable row level security;

drop policy if exists "Parents can read their own child progress" on public.child_progress;
create policy "Parents can read their own child progress"
  on public.child_progress
  for select
  using (auth.uid() = parent_id);

drop policy if exists "Parents can insert their own child progress" on public.child_progress;
create policy "Parents can insert their own child progress"
  on public.child_progress
  for insert
  with check (
    auth.uid() = parent_id
    and exists (
      select 1
      from public.child_profiles
      where child_profiles.id = child_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

drop policy if exists "Parents can update their own child progress" on public.child_progress;
create policy "Parents can update their own child progress"
  on public.child_progress
  for update
  using (auth.uid() = parent_id)
  with check (
    auth.uid() = parent_id
    and exists (
      select 1
      from public.child_profiles
      where child_profiles.id = child_progress.child_id
        and child_profiles.parent_id = auth.uid()
    )
  );

create index if not exists child_progress_parent_id_idx
  on public.child_progress(parent_id);

create index if not exists child_progress_child_id_idx
  on public.child_progress(child_id);

create index if not exists child_progress_last_played_at_idx
  on public.child_progress(last_played_at desc);