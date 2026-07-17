# LearnPlay Academy Beta Readiness Checklist

Prepared for controlled closed beta. Date: 2026-07-17.

## Release Scope

- Mathematics Year 1 Forest World: production-ready active MVP.
- English Year 1 Forest World Level 1: approved content package, not active in gameplay yet.
- English Levels 2-10: inactive and remain in Review.
- Science and other subjects: Coming Soon or inactive.
- Supabase schema: unchanged for this package.
- Production manifest: unchanged unless a later explicit release step imports/activates English.

## Feature Checklist

| Item | Status | Notes |
| --- | --- | --- |
| Public landing page | Ready | Entry point for LearnPlay Academy. |
| Subject selection | Ready | Mathematics active; other subjects gated/coming soon. |
| Mathematics Forest World | Ready | 10 levels, 100 approved questions. |
| Level progression guard | Ready | Direct locked-level URLs are blocked. |
| Question engine | Ready for current beta | MCQ and preview-supported interaction types exist; production Mathematics remains stable. |
| Rewards and completion flow | Ready | Forest completion and badge flow available. |
| Parent account auth | Ready for beta | Email/password auth implemented. |
| Child profile setup | Ready for beta | One-child MVP profile, Year 1 active only. |
| Parent dashboard | Ready for beta | Parent-friendly summaries without overclaiming analytics. |
| English Level 1 content | Staging-ready | Approved source rows only; gameplay remains inactive. |
| English Levels 2-10 | Not active | Keep unavailable for beta. |

## Content Checklist

| Content Area | Status | Notes |
| --- | --- | --- |
| Mathematics approved manifest | Ready | 100 active questions validate with 0 warnings. |
| Mathematics Forest identity | Ready | forest-world, Forest Guardian, Forest Explorer Badge. |
| English Level 1 source content | Approved for controlled staging | 30 approved Level 1 source rows. |
| English Level 1 quality score | Ready | 93/100; duplicate groups 0. |
| English Levels 2-10 content | Not release-ready | Remain Review. |
| Curriculum QA workflow | Ready for reviewer use | Reports and QA guidance exist. |
| Asset coverage | Beta acceptable | Remaining production-art polish tracked separately. |

## Testing Checklist

- [x] Question asset import tests pass.
- [x] Active curriculum validation passes.
- [x] ESLint passes.
- [x] TypeScript no-emit passes.
- [x] Production build passes.
- [ ] Manual closed-beta smoke test on production Vercel URL.
- [ ] Manual account registration and email confirmation test.
- [ ] Manual Supabase child profile create/load test.
- [ ] Manual progression replay and locked-level bypass test.
- [ ] Manual reset-local-progress safety test.

## Browser / Device Checklist

| Target | Status | Manual Notes |
| --- | --- | --- |
| Chrome desktop | Required | Test landing, auth, lesson flow, dashboard. |
| Edge desktop | Required | Windows parent-user baseline. |
| Safari iOS | Recommended | Mobile parent/child flow. |
| Chrome Android | Required | Redmi-style small phone viewport. |
| Tablet portrait | Recommended | Lesson screen and dashboard layout. |
| Tablet landscape | Recommended | Lesson screen and explanation layout. |

## Parent Account Checklist

- [ ] Parent can register with email/password.
- [ ] Parent can log in.
- [ ] Parent can log out.
- [ ] Forgot-password flow shows safe message.
- [ ] Protected account routes redirect when logged out.
- [ ] Privacy/terms wording matches MVP data model.

## Child Profile Checklist

- [ ] Parent can create one child nickname profile.
- [ ] Year 1 is selectable.
- [ ] Years 2-6 are disabled or clearly marked Coming Soon.
- [ ] Existing unsupported-year profile does not crash.
- [ ] Parent can edit nickname/year/avatar.
- [ ] Delete child profile requires clear confirmation.
- [ ] Progress ownership remains scoped to parent/child.

## Analytics Checklist

- [x] Vercel Analytics installed at root layout.
- [x] Vercel Speed Insights installed at root layout.
- [ ] Confirm data appears in Vercel project dashboard after production visit.
- [ ] Do not use analytics as child-performance evidence in Parent Dashboard.
- [ ] Confirm privacy copy mentions analytics only as actually implemented.

## Rollback Checklist

1. Keep the current production deployment URL available before beta invites.
2. Tag the beta candidate only after final manual smoke test.
3. If deployment fails, roll back in Vercel to the previous successful production deployment.
4. If English staging import is accidentally run, do not connect it to active gameplay; verify active manifest remains Mathematics-only.
5. If child progress issues appear, pause invites and preserve Supabase data for investigation.
6. If authentication email redirects fail, verify NEXT_PUBLIC_SITE_URL and Supabase Site URL before more invites.
