-- LearnPlay Academy MVP child profiles
-- Parent accounts use public.profiles. This table stores the one selected MVP child profile.

create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  nickname text not null check (char_length(nickname) between 1 and 40),
  year_level integer not null default 1 check (year_level between 1 and 6),
  avatar text not null default 'learnbot' check (avatar in ('learnbot', 'explorer', 'star')),
  selected boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint child_profiles_one_mvp_child_per_parent unique (parent_id)
);

alter table public.child_profiles enable row level security;

drop policy if exists "Parents can read their own child profiles" on public.child_profiles;
create policy "Parents can read their own child profiles"
  on public.child_profiles
  for select
  using (auth.uid() = parent_id);

drop policy if exists "Parents can insert their own child profiles" on public.child_profiles;
create policy "Parents can insert their own child profiles"
  on public.child_profiles
  for insert
  with check (auth.uid() = parent_id);

drop policy if exists "Parents can update their own child profiles" on public.child_profiles;
create policy "Parents can update their own child profiles"
  on public.child_profiles
  for update
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

create index if not exists child_profiles_parent_id_idx
  on public.child_profiles(parent_id);
