# LearnPlay MVP Release Checklist

Audit date: 2026-07-12
Project: `E:\Codex\learnplay-academy`

## Release Gate Summary

Status legend:

- `[x]` Pass or already present
- `[ ]` Required before parent beta
- `[~]` Present but needs polish or manual verification
- `[n/a]` Not applicable to current MVP

## P0 Beta Blockers

- [ ] Guard `/mvp/question/[level]` so locked levels cannot be opened directly.
- [ ] Add confirmation before resetting local/synced progress.
- [ ] Review and resolve current dirty working tree before naming a release candidate.
- [ ] Run `npm run validate:curriculum`.
- [ ] Run `npm run lint`.
- [ ] Run `npx tsc --noEmit --incremental false`.
- [ ] Run `npm run build`.
- [ ] Test the full first-visit to Forest completion flow on desktop.
- [ ] Test the full question flow on a small mobile phone.
- [ ] Confirm Supabase auth, child profile, and progress sync work in the deployed environment.

## First Visit and Landing Page

- [x] Landing page exists at `/`.
- [x] Start Learning links to `/subjects`.
- [x] Active product is clearly Mathematics Year 1 Forest World.
- [x] Inactive subjects are shown as coming soon.
- [~] Parent Dashboard CTA exists but can bypass onboarding.
- [~] Home copy still says "Local XP and rewards" even though child profile sync exists.
- [ ] Confirm hero image load time on mobile.
- [ ] Confirm support email and legal links are production-ready.

## Navigation

- [x] Global navigation exists.
- [x] Signed-in and signed-out navigation differ.
- [x] Login and Register links point to auth routes.
- [x] Learning session hides global navigation.
- [~] Mobile navigation wraps instead of using a compact menu.
- [ ] Add or explicitly defer Settings.
- [ ] Add skip-to-content link for keyboard users.

## Login and Registration

- [x] Email/password login exists.
- [x] Email/password registration exists.
- [x] Forgot password route exists.
- [x] Logout exists.
- [x] Logged-out `/account` redirects to login.
- [~] Error messages are raw Supabase text.
- [~] No password visibility toggle.
- [~] No confirm password field for registration.
- [ ] Verify email confirmation settings in production Supabase.
- [ ] Verify forgot-password redirect flow in production.

## Parent Onboarding

- [x] Account route exists at `/account`.
- [x] Parent account area shows signed-in state.
- [x] Child profile setup is shown when no child exists.
- [x] Friendly nickname-only guidance exists.
- [~] Parent Dashboard can be reached before account setup.
- [ ] Add clearer "create profile to save progress" path from dashboard.

## Child Onboarding

- [x] One-child MVP model is clear.
- [x] Nickname field exists.
- [x] Avatar choice exists.
- [x] Edit profile is hidden until requested.
- [x] Delete profile requires confirmation.
- [~] Year selector allows Year 1 to Year 6 while the MVP only supports Year 1.
- [ ] Limit year selector or label non-Year 1 values as future support.
- [ ] Add a safer profile delete confirmation for beta.

## Subject Selection

- [x] `/subjects` exists.
- [x] Mathematics Year 1 is active.
- [x] Other subjects are coming soon.
- [x] Mathematics leads to the Forest World flow.
- [~] `/mvp/subjects` still exists and overlaps with `/subjects`.
- [ ] Decide canonical subject route before beta.

## Mathematics and Forest World

- [x] `/subjects/mathematics` exists.
- [x] Mathematics page shows Forest World as active.
- [x] Forest World Map link works.
- [x] Current progress appears.
- [x] Locked levels are visible.
- [x] Completed/current/locked states are visually distinct on the world map.
- [ ] Ensure direct question routes respect locked state.

## World Map

- [x] `/mvp/world-map` exists.
- [x] 10 level nodes are shown.
- [x] Level 1 is available by default.
- [x] Level 10 is positioned as Forest Guardian final destination.
- [x] Stars and progress display.
- [~] Wrapper page may push the path lower on small screens.
- [ ] Device-test portrait mobile path visibility.

## Level Intro

- [x] `/mvp/level/[level]` exists for levels 1 to 10.
- [x] Intro page shows level title, node type, goals, LearnBot, and Start Mission.
- [x] Locked levels redirect back to world map through the intro UI.
- [~] Text repeats level description in multiple places.
- [ ] Use distinct "What you will learn" and "Mission goal" copy.

## Question Flow

- [x] `/mvp/question/[level]` exists for levels 1 to 10.
- [x] Lesson shell hides global nav.
- [x] Progress, score, XP, save status, hint, question, answers, explanation, and next action exist.
- [x] Next button is disabled until answered.
- [x] Correct and incorrect states are visible.
- [x] Level completion screen appears.
- [~] Direct question URL can bypass progression.
- [~] Production questions remain mostly multiple-choice.
- [ ] Run full Level 1 through Level 10 completion test.

## Explanations

- [x] Explanation card appears after answering.
- [x] Visual recap exists.
- [x] Steps are short.
- [x] Wrong-answer feedback is gentle.
- [x] LearnBot tip is shown.
- [~] Some active explanations are repeated.
- [ ] Author row-specific explanations for repeated active rows.
- [ ] Confirm explanation drawer focus behavior with keyboard testing.

## LearnBot

- [x] LearnBot appears in lesson hints.
- [x] LearnBot states and message variations exist.
- [x] LearnBot appears in account setup and level intro.
- [~] LearnBot is lighter in parent dashboard and rewards empty states.
- [ ] Verify all LearnBot image transparency and size on mobile.

## Rewards

- [x] Rewards page exists at `/mvp/rewards`.
- [x] XP, stars, and badges are visible.
- [x] Forest Explorer Badge naming is present.
- [x] Reward screen appears after level completion.
- [~] Generic level badges are text-based.
- [ ] Add confirmation to Reset Local Progress.
- [ ] Confirm reset behavior when signed in before beta.

## Parent Dashboard

- [x] Parent Dashboard exists at `/mvp/parent-dashboard`.
- [x] XP, completed levels, accuracy, mastery, subject progress, and level status are visible.
- [x] Sync state is shown.
- [~] Strong topics are based on last completed levels, not mastery.
- [~] Practice topics are based on incomplete levels, not missed skills.
- [~] No weekly progress or recent activity timeline.
- [ ] Add P0 dashboard insight cards before parent beta.
- [ ] Add loading state while remote progress is loading.

## Account Page

- [x] `/account` exists.
- [x] Protected route redirects logged-out users.
- [x] Child profile dashboard card exists.
- [x] Continue Learning opens Forest World.
- [x] Edit Profile works from a hidden form.
- [x] Delete profile warns that saved progress is removed.
- [~] Delete profile uses native confirm.
- [ ] Limit year choices or explain Year 1-only MVP.

## Settings

- [ ] Settings route exists.
- [ ] Password/email settings exist.
- [ ] Privacy/data settings exist.
- [ ] Notification settings exist.
- [ ] Account deletion settings exist.
- [n/a] This may be explicitly deferred if Account page is the beta settings surface.

## Mobile Responsiveness

- [x] Lesson session uses `100dvh`.
- [x] Sticky action bar exists.
- [x] Buttons generally meet large tap target expectations.
- [~] Global navigation can wrap.
- [~] Large PNGs may hurt mobile load.
- [ ] Test at 360x640 portrait.
- [ ] Test at 640x360 landscape.
- [ ] Test on an Android low-end phone.

## Desktop Responsiveness

- [x] Lesson UI is optimized for desktop.
- [x] Parent dashboard uses responsive grids.
- [x] Account page uses responsive cards.
- [~] Page-level heroes can push task content below fold.
- [ ] Test at 1366x768 and 1536x864.

## Accessibility

- [x] Many buttons and links have visible focus styles.
- [x] Error/status messages use `role="alert"` or `role="status"` in key forms.
- [x] Progress bars expose screen-reader labels in MVP UI.
- [x] Learning session uses `aria-live` for LearnBot and explanation feedback.
- [~] No skip link.
- [~] Explanation drawer focus management needs keyboard verification.
- [~] Inactive cards need clearer screen-reader context.
- [ ] Run keyboard-only test from Home to Level 1 completion.
- [ ] Run screen-reader smoke test for one question.

## Performance

- [x] Vercel Analytics is installed.
- [x] Vercel Speed Insights is installed.
- [x] Next Image is used widely.
- [~] Multiple P0/P1 images are over 1 MB.
- [ ] Optimize large PNGs to WebP/AVIF.
- [ ] Run Lighthouse mobile and desktop.
- [ ] Verify no production route imports dev-only heavy data.

## Loading States

- [x] MVP loading page exists.
- [x] Auth forms have loading button text.
- [~] Dashboard/rewards can show local data before remote sync completes.
- [ ] Add loading or syncing skeleton for account-backed progress.

## Empty States

- [x] Rewards has empty badge state.
- [x] Parent Dashboard topic lists have empty states.
- [x] Account setup appears when no child exists.
- [~] Some empty states are generic.
- [ ] Add more specific next-action guidance for dashboard/rewards empty states.

## Error Handling

- [x] MVP error page exists.
- [x] Account server logs include Supabase error details.
- [x] User-facing account error remains friendly.
- [~] Auth form errors are raw.
- [~] Progress sync error is only a compact status.
- [ ] Add recovery copy for save/sync errors.

## Branding Consistency

- [x] LearnPlay logo is used globally.
- [x] MVP color palette is consistent.
- [x] Rounded cards and large buttons are consistent in MVP flow.
- [~] Legacy global pages use older components and broader product wording.
- [ ] Add current MVP note to About and Parents pages.

## Visual Consistency

- [x] MVP UI uses reusable `MvpUi` components.
- [x] Lesson UI, account, rewards, and dashboard use similar card/button language.
- [~] Some inactive routes contain legacy designs behind feature gates.
- [ ] Keep inactive routes guarded during beta.

## Educational Consistency

- [x] Forest World follows 10-level structure.
- [x] Content is Year 1 foundation math.
- [x] Visual learning support exists.
- [~] Mini-game and boss labels over-promise current behavior.
- [~] Active explanations have repeated text.
- [ ] Rename current "Mini Game" and "Boss" experiences or implement shells later.

## Manual Release Smoke Test

Use this script before beta:

1. Open `/`.
2. Click Start Learning.
3. Confirm `/subjects` loads.
4. Click Mathematics Year 1.
5. Confirm Forest World Map loads.
6. Confirm Level 1 is current/unlocked.
7. Confirm Level 2-10 locked before completion.
8. Open Level 1.
9. Start Mission.
10. Answer one question correctly.
11. Confirm feedback, explanation, visual, LearnBot tip, XP, and Next button.
12. Answer one question incorrectly.
13. Confirm gentle wrong-answer support.
14. Complete Level 1.
15. Confirm reward screen.
16. Return to World Map.
17. Confirm Level 2 unlocks.
18. Open Rewards.
19. Confirm XP/stars/badges update.
20. Register a parent account.
21. Create a child profile.
22. Complete another level.
23. Refresh browser.
24. Confirm progress persists.
25. Log out and log in.
26. Confirm progress reloads.
27. Open Parent Dashboard.
28. Confirm child progress is shown.
29. Attempt direct `/mvp/question/10`.
30. Confirm locked access is blocked after fix.

## Release Command Gate

Run these commands before any release tag:

```powershell
npm run validate:curriculum
npm run lint
npx tsc --noEmit --incremental false
npm run build
```

Also record:

- command exit code
- command duration
- commit hash
- branch
- Vercel deployment URL
- Supabase project/environment

