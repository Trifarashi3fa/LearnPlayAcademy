-- LearnPlay Academy child profile deletion policy.
-- Allows a parent to delete only the child profile owned by that authenticated parent.
-- Existing SELECT, INSERT, and UPDATE policies remain unchanged.

drop policy if exists "Parents can delete their own child profiles" on public.child_profiles;
create policy "Parents can delete their own child profiles"
  on public.child_profiles
  for delete
  using (auth.uid() = parent_id);
