-- LearnPlay Academy student profile basics
-- Run this in Supabase SQL Editor for existing projects.

alter table public.profiles
add column if not exists student_name text,
add column if not exists age integer,
add column if not exists grade_level text,
add column if not exists favorite_subject text;
