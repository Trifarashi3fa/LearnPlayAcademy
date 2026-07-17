import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const deletePolicyPath = path.resolve("supabase/migrations/009_allow_parent_child_profile_delete.sql");
assert(existsSync(deletePolicyPath), "Child profile delete RLS migration should exist.");

const deletePolicySql = readFileSync(deletePolicyPath, "utf8").toLowerCase();
assert(deletePolicySql.includes("on public.child_profiles"), "Delete policy should target public.child_profiles.");
assert(deletePolicySql.includes("for delete"), "Delete policy should be scoped to DELETE.");
assert(deletePolicySql.includes("using (auth.uid() = parent_id)"), "Delete policy should restrict deletion to the authenticated parent.");
assert(!deletePolicySql.includes("for all"), "Delete policy should not broaden access with FOR ALL.");

for (const legacyMigration of [
  "supabase/migrations/005_create_child_profiles.sql",
  "supabase/migrations/007_repair_child_profiles_schema.sql",
]) {
  const sql = readFileSync(path.resolve(legacyMigration), "utf8").toLowerCase();
  assert(sql.includes("alter table public.child_profiles enable row level security"), `${legacyMigration} should keep RLS enabled.`);
  assert(sql.includes("for select"), `${legacyMigration} should preserve SELECT policy evidence.`);
  assert(sql.includes("for insert"), `${legacyMigration} should preserve INSERT policy evidence.`);
  assert(sql.includes("for update"), `${legacyMigration} should preserve UPDATE policy evidence.`);
}

const accountActions = readFileSync(path.resolve("app/account/actions.ts"), "utf8");
assert(accountActions.includes('.from("child_profiles")'), "Delete flow should use the child_profiles table.");
assert(accountActions.includes(".delete()"), "Delete flow should call Supabase delete.");
assert(accountActions.includes('.eq("parent_id", user.id)'), "Delete flow should filter by authenticated parent_id.");
assert(!accountActions.toLowerCase().includes("service_role"), "Account delete flow must not use service-role access.");

const devRouteGuard = readFileSync(path.resolve("lib/dev-routes/access.ts"), "utf8");
assert(devRouteGuard.includes('env.NODE_ENV !== "production"'), "Shared dev route guard should block production.");

for (const routePath of [
  "app/dev/admin-analytics/page.tsx",
  "app/dev/curriculum-qa/page.tsx",
  "app/dev/question-engine-preview/page.tsx",
]) {
  const source = readFileSync(path.resolve(routePath), "utf8");
  assert(source.includes("isDevRouteAccessAllowed"), `${routePath} should use the shared dev-route guard.`);
  assert(source.includes("notFound"), `${routePath} should return a safe 404-equivalent response.`);
}

const adminAccess = readFileSync(path.resolve("lib/admin-analytics/access.ts"), "utf8");
assert(adminAccess.includes("isDevRouteAccessAllowed"), "Admin analytics access should delegate to the shared dev-route guard.");
assert(!adminAccess.includes("NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS"), "Admin analytics route access should not use a public enable flag.");

const featureFlags = readFileSync(path.resolve("data/feature-flags.ts"), "utf8");
assert(!featureFlags.includes('NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS === "true"'), "Feature flags should not allow production admin analytics through a public flag.");

console.log("Production security tests passed: 24");
