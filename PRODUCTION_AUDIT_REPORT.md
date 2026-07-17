# LearnPlay Academy Production Audit Report

Date: 2026-07-17

Scope: full Next.js MVP repository audit covering application routes, MVP gameplay, account/profile flows, Supabase integration, feature flags, assets, content pipelines, developer previews, scripts, documentation, TypeScript, build output, and package usage.

This audit did not intentionally change business logic, Supabase schema, gameplay rules, curriculum content, manifests, or the question engine.

## Executive Summary

LearnPlay Academy is in a strong beta-ready technical state for the active Mathematics Year 1 Forest World MVP:

- ESLint passes.
- TypeScript passes with `strict` enabled.
- Production build passes.
- Curriculum validation passes with 100 approved active Forest questions.
- Existing focused test scripts pass.
- Supabase usage is mostly RLS-based and uses publishable keys, not service role keys.
- Auth redirect handling is production-safe and no longer hardcodes localhost for production redirects.

The remaining production readiness concerns are not compiler blockers. They are operational hardening and cleanup items:

- Very large and duplicated image assets remain in `public/`.
- Child profile deletion still needs a stronger accessible confirmation flow.
- Old non-MVP dashboards/content modules remain in the repo and should be clearly archived or isolated.
- Documentation is split across root files, `docs/`, and `Documentation/`, with some stale README content.

## Security Resolution Update - 2026-07-17

| Finding | Status | Resolution evidence |
| --- | --- | --- |
| Child profile deletion RLS | Resolved | `supabase/migrations/009_allow_parent_child_profile_delete.sql` adds a scoped `FOR DELETE` policy on `public.child_profiles` using `auth.uid() = parent_id`. Existing SELECT, INSERT, and UPDATE policies remain unchanged. The app delete flow already filters `child_profiles` by `.eq("parent_id", user.id)` and does not use service-role access. |
| Production access to `/dev` routes | Resolved | `lib/dev-routes/access.ts` centralizes the `NODE_ENV !== "production"` guard. All current `app/dev/*/page.tsx` routes call this guard and return `notFound()` in production. Admin analytics no longer honors `NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS=true` as a production route-access override. |

## Automatic Low-Risk Fixes Applied

| File | Fix |
| --- | --- |
| `app/dev/curriculum-qa/page.tsx` | Replaced a mojibake separator with ASCII `-` in the dev-only QA summary. |
| `app/dev/curriculum-qa/page.tsx` | Added `turbopackIgnore` scoping to dev-only filesystem path construction. |
| `app/dev/question-engine-preview/page.tsx` | Added `turbopackIgnore` scoping to dev-only filesystem path construction. This removed the production build warning about tracing the whole project. |
| `supabase/migrations/009_allow_parent_child_profile_delete.sql` | Added the minimum parent-owned child profile delete RLS policy. |
| `lib/dev-routes/access.ts` | Added the shared production guard for internal developer routes. |
| `app/dev/*/page.tsx` | Added the shared production guard so internal tooling returns `notFound()` in production. |

## Verification Results

| Command | Result |
| --- | --- |
| `npm.cmd run lint` | Passed |
| `npm.cmd run test:production-security` | Passed |
| `npm.cmd run test:question-assets` | Passed |
| `npm.cmd run test:mvp-level-access` | Passed |
| `npm.cmd run test:mvp-reset-safety` | Passed |
| `npm.cmd run test:mvp-year-availability` | Passed |
| `npm.cmd run test` | Passed (`test-admin-analytics` and `test:learning-analytics`) |
| `npm.cmd run validate:curriculum` | Passed: 100 questions, 10 levels, 0 warnings |
| `npx.cmd tsc --noEmit --incremental false` | Passed |
| `npm.cmd run build` | Passed |

Build output after the low-risk cleanup:

- Static/dynamic routes generated: 88 static pages plus dynamic account route.
- Previous Turbopack NFT trace warning from dev preview was no longer present.
- `.next/static` size observed: about 3.1 MB.
- `public/` asset size observed: about 133.7 MB.

## Critical Issues

No critical issues were found during this audit.

## High Issues

| Severity | File | Reason | Suggested fix |
| --- | --- | --- | --- |
| High | `supabase/migrations/005_create_child_profiles.sql`, `supabase/migrations/007_repair_child_profiles_schema.sql`, `app/account/actions.ts`, `components/account/ChildProfileManager.tsx` | Resolved. The UI and server action support deleting a child profile, and migration 008 grants `DELETE`, while migration 009 now adds the matching parent-owned child profile delete RLS policy. | Keep `supabase/migrations/009_allow_parent_child_profile_delete.sql` in the beta migration sequence. Direct `child_progress` deletion is still not exposed by the current UI; `child_progress.child_id` references `child_profiles.id` with `on delete cascade`. |
| High | `public/`, `app/icon.png` | Public assets total about 133.7 MB. Many PNGs are 1-3 MB each, and `app/icon.png` is 1.3 MB and emitted into `.next/static/media`. This can slow installs, builds, Vercel uploads, cold starts, and first-load image experiences. | Continue the image optimization plan: use WebP/AVIF for large non-transparent artwork, keep small PNG only where transparency is required, replace `app/icon.png` with a much smaller icon, and remove confirmed duplicate PNGs after references point to optimized assets. |
| High | `app/dev/admin-analytics/page.tsx`, `app/dev/curriculum-qa/page.tsx`, `app/dev/question-engine-preview/page.tsx` | Resolved for production access. Developer-only routes are still compiled by Next, but each route now uses the centralized `isDevRouteAccessAllowed()` guard and returns `notFound()` when `NODE_ENV` is production. | Keep internal routes out of public navigation. For post-beta hardening, consider moving internal dashboards to a separate deployment or authenticated admin surface. |

## Medium Issues

| Severity | File | Reason | Suggested fix |
| --- | --- | --- | --- |
| Medium | `components/account/ChildProfileManager.tsx` | Child profile deletion uses `window.confirm`, which is not a fully accessible, branded, two-step destructive confirmation like the local progress reset dialog. | Replace with an accessible modal using the same pattern as `components/mvp/RewardsClient.tsx`: focus management, Escape handling, explicit second action, and non-dismissable destructive confirmation. |
| Medium | `data/feature-flags.ts`, `lib/admin-analytics/access.ts` | Resolved for current beta. Admin analytics can no longer be enabled in production by `NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS=true`; route access delegates to the shared dev-route guard. | If admin analytics is needed after beta, use authenticated admin authorization rather than a public environment flag. |
| Medium | `app/dev/question-engine-preview/page.tsx`, `app/dev/curriculum-qa/page.tsx` | Dev preview pages read local files at request/render time. The Turbopack warning is fixed, but production builds still include file-reading code for internal tooling. | Prefer pre-generated QA JSON or server-only admin tooling outside the production app tree. |
| Medium | `app/dashboard/actions.ts`, `components/StudentDashboard.tsx`, `components/StudentProfileForm.tsx`, `lib/xp.ts` | Legacy student dashboard/progress code remains, while `/dashboard` redirects to `/mvp/parent-dashboard`. This is likely dead or rollback-only code and still references older profile fields and storage keys. | After beta branch is stable, archive or remove the legacy dashboard surface and old XP storage helpers, or move them to `docs/legacy` as reference. |
| Medium | `data/subject-pathways.ts` | This file appears unused by active routes/components and contains older subject pathway assumptions. | Confirm no planned feature imports it, then remove or archive it. |
| Medium | `components/Button.tsx`, `components/Card.tsx`, `components/PageLayout.tsx`, `components/DashboardCard.tsx`, `components/mvp/MvpUi.tsx` | The codebase has two UI systems: general components and MVP-specific components. This increases duplicate styling and inconsistent spacing/radius/button behavior. | Keep both for now, but define a single design-system ownership model. Gradually migrate active MVP/account/admin screens to shared primitives. |
| Medium | `app/subjects/page.tsx`, `app/page.tsx` | Some UI is written as dense inline JSX, which is harder to review for accessibility, responsiveness, and future copy changes. | Refactor into small readable components without changing behavior. |
| Medium | `app/games/*`, `app/life-skills/*`, `app/science/page.tsx` | Inactive modules are safely gated, but their routes are still generated and old content remains in the app tree. This increases QA/build surface for non-MVP features. | Keep feature gates, but consider route groups or separate archived modules for inactive products before public launch. |
| Medium | `app/mvp/question/[level]/page.tsx`, `components/mvp/QuestionPlayer.tsx` | Direct level access is gated in the client player using local/synced progress. That works for the current local-first model, but route-level server code still renders the player shell for any static level. | For authenticated production progress, add server-side progression prechecks where feasible, while keeping client fallback for local-only progress. |
| Medium | `components/account/ChildProfileManager.tsx`, `lib/progress/local-progress.ts`, `components/ScienceContentFactory.tsx`, `components/LifeSkillsProgressPanel.tsx`, `lib/xp.ts` | Multiple localStorage progress models exist across legacy/future modules. This can confuse reset/account wording and future migrations. | Document all storage keys and mark inactive-module keys as legacy/future. Prefer one progress service for active products. |
| Medium | `.env.example`, `data/feature-flags.ts`, `lib/learning-analytics/service.ts` | `.env.example` documents Supabase and site URL only. It does not mention analytics/admin feature flags now present in code. | Add documented optional env vars: `NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS`, `NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS`, `NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER`, and production `NEXT_PUBLIC_SITE_URL`. |
| Medium | `README.md`, root markdown reports, `docs/`, `Documentation/` | Documentation is split across multiple root reports, `docs/project/*`, and `Documentation/*`. README still describes old prototype/demo phases and old Supabase progress tables. | Consolidate production docs under `docs/project/`, refresh README to current MVP status, and move older docs into a clearly named legacy folder. |
| Medium | `tailwind.config.ts`, `app/globals.css`, active components | Brand color tokens exist, but many active components still use repeated hex values directly. This makes theme changes harder and can create subtle inconsistencies. | Introduce named tokens/classes for LearnPlay blue, green, yellow, pink, surface, and text colors, then migrate opportunistically. |
| Medium | `components/mvp/*`, `components/account/*`, `app/*` | No automated browser, viewport, or accessibility test suite is configured. Lint/build/tests pass, but mobile layout and keyboard/screen-reader behavior rely mostly on manual QA. | Add Playwright smoke tests and lightweight axe checks for home, subjects, world map, question flow, account, rewards, and parent dashboard. |

## Low Issues

| Severity | File | Reason | Suggested fix |
| --- | --- | --- | --- |
| Low | `app/dev/curriculum-qa/page.tsx` | Mojibake separator was present in a dev-only summary line. | Fixed in this audit. |
| Low | `app/dev/question-engine-preview/page.tsx`, `app/dev/curriculum-qa/page.tsx` | Turbopack traced dev preview filesystem paths too broadly. | Fixed in this audit with scoped ignore comments. |
| Low | `package.json` | No obviously unused runtime package was found by import scan. `react-dom` is not directly imported, but it is required by Next/React. | No action needed. Re-run a dedicated dependency tool such as Knip before dependency pruning. |
| Low | `components/*`, `app/*` | ESLint found no unused imports. | No action needed. Keep lint required in CI. |
| Low | `public/assets/math-icons/*.png`, `public/rewards/*.png`, `public/assets/math-premium/*.png`, `public/worlds/*.png` | Several exact duplicate images exist in different folders, often with optimized WebP duplicates already present. | Remove only after every reference is migrated and a visual pass confirms no regressions. |
| Low | `proxy.ts` | Middleware excludes static image formats but not `.avif` if added later. | If AVIF assets are introduced, add `avif` to the proxy matcher exclusion. |

## Asset Findings

Largest PNG groups found:

- `public/assets/math-premium/world-galaxy.png` and `public/worlds/level 5-galaxy-world.png`: about 2.8 MB each, exact duplicates.
- `public/assets/math-premium/world-mountain.png` and `public/worlds/level 2-mountain-world.png`: about 2.6 MB each, exact duplicates.
- `public/assets/math-premium/world-forest.png` and `public/worlds/level 1-forest-world.png`: about 2.5 MB each, exact duplicates.
- `public/mascots/explorer-*.png`: many 2.3-2.5 MB files.
- `public/subjects/*.png`: several 2.2-2.5 MB files.
- `public/LearnPlay Academy Logo.png`, `public/learnplay-academy-logo.png`, and `app/icon.png`: 1.3 MB PNG variants; WebP logo is only about 47 KB.

Exact duplicate examples:

- `public/LearnPlay Academy Logo.png` = `public/learnplay-academy-logo.png`
- `public/assets/math-icons/star.png` = `public/rewards/star.png`
- `public/assets/math-icons/coin.png` = `public/rewards/coin.png`
- `public/assets/math-premium/learnbot-helper.png` = `public/mascots/learnbot-happy.png`
- `public/assets/math-premium/world-forest.png` = `public/worlds/level 1-forest-world.png`

## Supabase Security Review

Positive findings:

- Client and server Supabase helpers use the publishable key.
- No service-role key usage was found in app/client code.
- `child_profiles` and `child_progress` have RLS enabled.
- Child progress queries include `parent_id` and/or child ownership checks.
- Auth redirects use `NEXT_PUBLIC_SITE_URL`, `VERCEL_URL`, browser origin, then localhost only in development.

Needs attention:

- Child profile delete RLS is now present in migration 009.
- Document all required Supabase migrations in current order.
- Ensure production Supabase Site URL and redirect URLs include the Vercel production domain.

## Environment Variable Review

Required:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Optional/currently used:

- `VERCEL_URL` (Vercel-provided fallback)
- `NEXT_PUBLIC_ENABLE_ADMIN_ANALYTICS`
- `NEXT_PUBLIC_ENABLE_LEARNING_ANALYTICS`
- `NEXT_PUBLIC_LEARNING_ANALYTICS_PROVIDER`

Recommendation: update `.env.example` and deployment documentation with the optional analytics/admin flags and make admin route protection server-only before beta.

## Bundle and Build Optimization

Build status is clean after this audit. The previous Turbopack warning is fixed.

Remaining optimization work:

- Reduce `app/icon.png` from 1.3 MB to a small icon asset.
- Remove or convert duplicate PNGs once references are migrated.
- Keep developer dashboards out of the production app bundle if possible.
- Consider adding bundle analysis tooling later; no analyzer package is currently installed.

## Folder Organization Findings

Current repo has both:

- `docs/`
- `Documentation/`
- many root-level reports and generated planning files

Recommendation:

- Keep current product docs under `docs/project/`.
- Move old `Documentation/*` to `docs/legacy/` or remove after confirmation.
- Move root reports into `docs/project/release`, `docs/project/qa`, `docs/project/planning`, `docs/project/content`, or `docs/project/analytics`.

## Recommended Production Cleanup Order

1. Replace child profile `window.confirm` with an accessible destructive dialog.
2. Optimize `app/icon.png` and the largest duplicate public assets.
3. Keep `/dev/*` routes guarded in production; consider moving internal dashboards to a separate deployment after beta.
4. Archive or isolate old non-MVP dashboards/content modules.
5. Refresh README and environment documentation.
6. Archive legacy dashboard/progress modules.
7. Add Playwright viewport and accessibility smoke tests.
8. Consolidate shared UI primitives and design tokens.

## Files Modified By This Audit

- `app/dev/curriculum-qa/page.tsx`
- `app/dev/question-engine-preview/page.tsx`
- `app/dev/admin-analytics/page.tsx`
- `data/feature-flags.ts`
- `lib/admin-analytics/access.ts`
- `lib/dev-routes/access.ts`
- `scripts/test-admin-analytics.mjs`
- `scripts/test-production-security.mjs`
- `supabase/migrations/009_allow_parent_child_profile_delete.sql`
- `package.json`
- `PRODUCTION_AUDIT_REPORT.md`
