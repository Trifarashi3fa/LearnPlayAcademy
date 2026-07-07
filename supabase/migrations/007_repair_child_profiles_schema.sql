-- LearnPlay Academy child profile schema repair
-- Safe to run after 005_create_child_profiles.sql. This repairs older projects
-- where child_profiles may have been created with user_id instead of parent_id.

do $$
begin
  if to_regclass('public.child_profiles') is null then
    create table public.child_profiles (
      id uuid primary key default gen_random_uuid(),
      parent_id uuid not null references public.profiles(id) on delete cascade,
      nickname text not null check (char_length(nickname) between 1 and 40),
      year_level integer not null default 1 check (year_level between 1 and 6),
      avatar text not null default 'learnbot' check (avatar in ('learnbot', 'explorer', 'star')),
      selected boolean not null default true,
      created_at timestamp with time zone not null default now(),
      updated_at timestamp with time zone not null default now()
    );
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'parent_id'
  ) then
    alter table public.child_profiles add column parent_id uuid;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'user_id'
  ) then
    execute 'update public.child_profiles set parent_id = user_id where parent_id is null';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'nickname'
  ) then
    alter table public.child_profiles add column nickname text;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'year_level'
  ) then
    alter table public.child_profiles add column year_level integer not null default 1;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'avatar'
  ) then
    alter table public.child_profiles add column avatar text not null default 'learnbot';
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'selected'
  ) then
    alter table public.child_profiles add column selected boolean not null default true;
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'created_at'
  ) then
    alter table public.child_profiles add column created_at timestamp with time zone not null default now();
  end if;

  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'child_profiles'
      and column_name = 'updated_at'
  ) then
    alter table public.child_profiles add column updated_at timestamp with time zone not null default now();
  end if;

  update public.child_profiles
  set nickname = coalesce(nullif(nickname, ''), 'Learner')
  where nickname is null or nickname = '';

  alter table public.child_profiles alter column nickname set not null;
  alter table public.child_profiles alter column parent_id set not null;

  if not exists (
    select 1 from pg_constraint
    where conname = 'child_profiles_parent_id_fkey'
      and conrelid = 'public.child_profiles'::regclass
  ) then
    alter table public.child_profiles
      add constraint child_profiles_parent_id_fkey
      foreign key (parent_id) references public.profiles(id) on delete cascade;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'child_profiles_nickname_length'
      and conrelid = 'public.child_profiles'::regclass
  ) then
    alter table public.child_profiles
      add constraint child_profiles_nickname_length
      check (char_length(nickname) between 1 and 40);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'child_profiles_year_level_check'
      and conrelid = 'public.child_profiles'::regclass
  ) then
    alter table public.child_profiles
      add constraint child_profiles_year_level_check
      check (year_level between 1 and 6);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'child_profiles_avatar_check'
      and conrelid = 'public.child_profiles'::regclass
  ) then
    alter table public.child_profiles
      add constraint child_profiles_avatar_check
      check (avatar in ('learnbot', 'explorer', 'star'));
  end if;
end $$;

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

create unique index if not exists child_profiles_one_mvp_child_per_parent_idx
  on public.child_profiles(parent_id);

create index if not exists child_profiles_parent_id_idx
  on public.child_profiles(parent_id);