# LearnPlay MVP Release Candidate Report

Audit date: 2026-07-12
Project: `E:\Codex\learnplay-academy`
Scope: Current LearnPlay Academy MVP from first visit through Mathematics Year 1 Forest World completion.

## Audit Guardrails

- Audit only.
- No code was modified.
- No assets were generated.
- No curriculum, manifest, Supabase schema, gameplay, routing, XP, progress, or question-engine logic was changed.
- No commit or push was performed.

## Audit Method

This was a static release-candidate audit of the current repository state. I inspected the main app routes, MVP learning flow, auth/account flow, progress persistence, Supabase-facing services, active content manifest, UI components, asset usage, and existing audit documents already present in the repository.

No browser automation, mobile device run, lint, type check, or production build was executed for this audit because the request was report-only.

## Executive Verdict

Verdict: **PROCEED WITH CHANGES**

The MVP is coherent enough for internal demo and controlled stakeholder review. It is not yet ready for a parent-facing beta without fixes to progression protection, destructive progress actions, onboarding clarity, privacy copy, dashboard usefulness, and performance hygiene.

The current strongest path is:

Home -> Subjects -> Mathematics Year 1 / Forest World -> World Map -> Level Intro -> Question Session -> Level Complete -> Rewards / Parent Dashboard / Account

The current active learning product is clearly scoped:

- Subject: Mathematics
- Year: Year 1
- World: Forest World
- Active content: 100 approved questions in `generated/active-content-manifest.json`
- Storage: localStorage first, optional child profile sync through Supabase

## Persona Summary

### Parent View

Parents will understand that Forest World is the current active product. Registration, login, account, child profile setup, and dashboard exist. However, the parent dashboard still feels like a progress summary, not a parent insight product. Privacy and settings language need tightening before beta.

### Year 1 Student View

The Forest World flow is child-friendly, colorful, and much stronger than earlier versions. The lesson screen has visuals, answer feedback, LearnBot support, and rewards. However, students can bypass locked progression by direct URL, and mini-game/boss labels still behave like standard quiz sessions.

### Teacher View

The curriculum scope is reasonable for Year 1 foundation math. The active manifest is governed and stable. However, visible dashboard analytics do not yet provide true weak-topic detection, and the learning content still depends heavily on multiple-choice style production flow.

## Current Strengths

- Clear MVP scope and feature flags keep non-MVP content inactive.
- Home and subject pages route users toward the active Forest World MVP.
- Active manifest contains 100 approved Mathematics Year 1 Forest questions.
- Lesson session hides global navigation and uses a focused learning shell.
- Question visuals, explanations, LearnBot hints, XP, and reward feedback are present.
- Supabase auth, child profile setup, and child progress persistence are implemented.
- RLS migrations exist for child profile and child progress tables.
- Parent dashboard, rewards page, and account page exist and use reusable MVP UI components.
- Dev-only question engine preview is hidden in production through a feature flag and `notFound()`.
- Analytics and Speed Insights are integrated at the root layout.

## Critical Issues

| ID | Severity | Category | Area | Issue | Recommendation | Effort |
|---|---|---|---|---|---|---|
| RC-C01 | Critical | Technical / UX | Forest World progression | `/mvp/question/[level]` renders a level directly and does not enforce unlock state. A child can manually open `/mvp/question/10` and play the Forest Guardian boss before completing earlier levels. | Add a client or server-side guard for question routes that checks unlocked level state and redirects locked levels to `/mvp/world-map`. Keep level intro and world map behavior unchanged. | Medium |
| RC-C02 | Critical | UX / Technical | Rewards / progress safety | `RewardsClient` exposes `Reset Local Progress` without confirmation. Because reset also calls remote sync when signed in, a parent or child can wipe saved child progress accidentally. | Add a confirmation flow and clear copy explaining that reset removes local and synced child progress. Consider moving reset into Account or Settings only. | Small |

## High Issues

| ID | Severity | Category | Area | Issue | Recommendation | Effort |
|---|---|---|---|---|---|---|
| RC-H01 | High | Technical | Release process | The current working tree is not clean and contains many modified/untracked files from earlier phases. This makes the local state unsuitable as a reproducible release candidate until changes are reviewed and committed or discarded intentionally. | Before beta deployment, require clean `git status`, a named release commit, and recorded command results for validation, lint, type check, and build. | Small |
| RC-H02 | High | UX | Parent Dashboard access | Home and navigation link directly to Parent Dashboard even when the user has not logged in or created a child profile. The page can show local or empty progress, which may confuse parents expecting account-backed data. | Route parent dashboard entry through account onboarding when no child profile exists, or add a prominent "local-only until logged in" explanation at the top. | Medium |
| RC-H03 | High | UX / Education | Child onboarding | Child profile year selector allows Year 1 through Year 6, but the active MVP only supports Year 1. This can set wrong expectations for parents and children. | Keep the database range, but limit the MVP UI to Year 1 or label other years as coming soon. | Small |
| RC-H04 | High | Privacy / Content | Privacy page | Privacy copy says the app may store student name, age, favorite subject, and grade-level details. The MVP intentionally collects nickname, year level, and avatar. This conflicts with data minimization messaging. | Update privacy language to match current MVP fields and keep broader data collection as a future possibility only after review. | Small |
| RC-H05 | High | Education | Parent Dashboard | Strong topics are currently derived from the last completed levels, and practice topics are the first incomplete levels. This is useful navigation, but it is not true weak-topic detection. | Rename the widgets to "Recently completed" and "Practice next" or implement topic-level mastery from question attempts later. | Medium |
| RC-H06 | High | Education / UX | Mini Game and Boss nodes | Levels 3 and 6 are labeled "Mini Game", and Level 10 is "Boss", but the active production flow is still standard question answering. A child may expect a different interaction. | Before beta, either relabel as "Mini Game Practice" / "Boss Quiz" or add a clear "quiz mission" explanation until real game shells exist. | Small |
| RC-H07 | High | UX / Technical | Progress sync | `useMvpProgress` loads local progress first and then fetches child progress. Screens can briefly display default or stale local data before Supabase progress finishes loading. | Use the `ready` and `syncStatus` state to show a small loading/sync banner on dashboard, rewards, world map, and account summaries. | Medium |
| RC-H08 | High | Performance | Assets | Many P0/P1 images are 1 MB to 2.9 MB PNGs. This can slow first load on mobile connections, especially world and mascot images. | Convert large production images to optimized WebP/AVIF variants, add responsive sizes, and keep original source files separately. | Medium |

## Medium Issues

| ID | Severity | Category | Area | Issue | Recommendation | Effort |
|---|---|---|---|---|---|---|
| RC-M01 | Medium | Content | Landing page | Home highlights "Local XP and rewards", but progress can now sync to a child profile. | Change copy to "XP, rewards, and optional child profile sync." | Small |
| RC-M02 | Medium | UX / UI | Navigation | Desktop navigation wraps into multiple rows on smaller screens instead of using a mobile menu. It is usable but can feel crowded. | Add a simple mobile menu or compact "Menu" disclosure for small screens. | Medium |
| RC-M03 | Medium | UX | Subject selection | `/subjects` and `/mvp/subjects` both exist and can present overlapping subject selection experiences. | Pick `/subjects` as the canonical public subject selection route and redirect or retire `/mvp/subjects` after compatibility review. | Small |
| RC-M04 | Medium | UX | World map | The world map component is path-first, but it sits inside `MvpPage`; on small screens users may see page hero/title before the trail. | Keep the current route but reduce wrapper hero height on `/mvp/world-map` so the trail appears faster. | Small |
| RC-M05 | Medium | UX / Education | Level intro | Level intro repeats the same description in "What you will learn" and the hero copy. | Use distinct text: one learning objective and one mission goal. | Small |
| RC-M06 | Medium | Education | Question variety | Active production questions are still effectively multiple-choice. The question engine supports more types in dev, but production uses the 100-question manifest. | Keep production stable for beta, but plan A/B testing of Count Objects, Fill Blank, and Tap Correct Group after import approval. | Large |
| RC-M07 | Medium | Content | Active explanations | Active manifest has repeated explanation text. A quick static check found 10 repeated explanation groups affecting 21 active rows. | Author more specific explanations for repeated rows, especially addition and subtraction. | Medium |
| RC-M08 | Medium | Content | Active duplicate prompt | Active manifest has one exact duplicate prompt: `What is 3 + 2?` appears in Level 4 and Level 8. | Accept only if Level 8 is intentionally review; otherwise rewrite the Level 8 question as a story or visual review item. | Small |
| RC-M09 | Medium | UX / Accessibility | Explanation drawer focus | The explanation drawer opens after answering, but focus does not appear to move to notes or announce the opened panel beyond `aria-live` content. | On open, move focus to the drawer heading or provide a clear skip/focus target, while keeping Escape close behavior. | Medium |
| RC-M10 | Medium | Accessibility | Global navigation | There is no skip link to main content. Keyboard users must tab through navigation on every non-lesson page. | Add a visually hidden "Skip to content" link at the start of the body. | Small |
| RC-M11 | Medium | UX | Auth forms | Login/register forms use raw Supabase error messages and do not include password visibility toggle or confirm-password field. | Add friendlier error mapping and a password visibility toggle. Consider confirm password for registration. | Medium |
| RC-M12 | Medium | UI / UX | Account page | Delete child profile uses native browser confirmation. It is safe, but visually inconsistent with the rest of LearnPlay. | Replace with a branded confirmation modal later, while preserving native safety until then. | Medium |
| RC-M13 | Medium | UX / Technical | Settings | No `/settings` route exists. Account page handles child profile management, but there is no clear place for password, email, privacy, notification, data export, or account deletion settings. | Add a minimal Account Settings section or explicitly mark settings as post-beta. | Medium |
| RC-M14 | Medium | UX | Rewards | Level badges are generic (`Level X Badge`) and displayed as text chips. This is understandable but less motivating for children. | Define named level badges or show visual badge placeholders per milestone. | Medium |
| RC-M15 | Medium | Performance | Inactive legacy routes | Old games and subject pages remain in the app and are guarded. This is safe, but it increases QA surface and could expose stale experiences if a flag is changed. | Keep flags locked for beta and add tests/assertions that inactive routes render `FeatureUnavailablePage`. | Small |
| RC-M16 | Medium | Technical | Question completion timing | `QuestionPlayer` derives final XP and correct count from React state. It likely works after re-render, but the finish path would be safer if it used the latest computed attempt array directly. | Refactor completion calculation to use a local `nextAttempts` and `nextCorrectCount` value when the final answer is selected. | Medium |
| RC-M17 | Medium | UX | Parent Dashboard insights | No weekly progress, learning streak, recent activity timeline, or topic-specific recommendations are shown yet. | Implement the P0 dashboard improvements from `PARENT_DASHBOARD_IMPROVEMENT_PLAN.md`. | Medium |
| RC-M18 | Medium | Technical / Privacy | Child profile deletion | Deleting a child profile cascades saved progress. The warning is present, but there is no secondary typed confirmation. | For beta, add "type DELETE" or a two-step modal before irreversible child profile deletion. | Medium |

## Low Issues

| ID | Severity | Category | Area | Issue | Recommendation | Effort |
|---|---|---|---|---|---|---|
| RC-L01 | Low | UI | Subject cards | Inactive subject cards use `div aria-disabled="true"` and are visually muted. This is acceptable, but not highly explanatory for screen-reader users. | Add visible and screen-reader copy saying "This subject is not active in the MVP." | Small |
| RC-L02 | Low | UI | Home hero | The hero image card is polished, but a parent may not immediately see "free starter world" until reading the copy. | Add a small "Free Year 1 pilot" pill in the hero card. | Small |
| RC-L03 | Low | Content | Parents page | Parent page still describes ages 7 to 12 broadly while active MVP is Year 1. | Add "Current pilot: Mathematics Year 1" near the top. | Small |
| RC-L04 | Low | Content | About page | About page talks about games/quizzes/rewards broadly. It is true for the vision, but broader than the current MVP. | Add "The current pilot begins with Forest World." | Small |
| RC-L05 | Low | UX | Forgot password | Forgot-password support exists, but no post-reset password update page is present in the inspected files. | Confirm Supabase redirect behavior and add a password update screen if needed. | Medium |
| RC-L06 | Low | Accessibility | Status pills | Most status pills include text, but some rely strongly on color tone for quick scanning. | Keep text labels visible and add icon/text only where useful. | Small |
| RC-L07 | Low | UI | LearnBot consistency | LearnBot appears in learning, account, and level intro, but not consistently in parent dashboard or rewards empty states. | Add LearnBot helper only where it adds clarity; avoid decorative overuse. | Small |
| RC-L08 | Low | Technical | Generated manifest date | `generated/active-content-manifest.json` has an older `generatedAt` timestamp. This is acceptable if content has not changed, but release traceability should note it. | Regenerate manifest during release packaging and record the command output. | Small |
| RC-L09 | Low | UX | Contact | Contact page uses `support@learnplayacademy.com`. Confirm that inbox exists before beta. | Verify support email routing. | Small |
| RC-L10 | Low | UI | Empty states | Empty states are friendly, but some use generic "LP" blocks instead of LearnBot or context-specific icons. | Replace only the highest-traffic empty states with branded helpers. | Small |

## Audit Area Notes

### 1. Landing Page

Status: Mostly ready with copy adjustments.

Strengths:

- Clear MVP positioning.
- Start Learning points to `/subjects`.
- Subject cards show only Mathematics as active.

Risks:

- Parent Dashboard CTA can be used before parent onboarding.
- "Local XP and rewards" copy is stale now that child profile sync exists.

### 2. Navigation

Status: Functional.

Strengths:

- Signed-out and signed-in navigation are separated.
- Login/Register redirect to the auth routes.
- Learning session hides global nav for focus.

Risks:

- Mobile nav can wrap and feel crowded.
- No Settings entry exists.

### 3. Login

Status: MVP-ready with polish needed.

Strengths:

- Email/password login uses Supabase.
- Loading and basic error states exist.
- Forgot password page exists.

Risks:

- Raw Supabase messages can be technical.
- No password visibility toggle.

### 4. Registration

Status: MVP-ready with polish needed.

Strengths:

- Email/password registration exists.
- Email confirmation case is handled.

Risks:

- No confirm-password field.
- OAuth is shown as future placeholder, not active.

### 5. Parent Onboarding

Status: Functional but should guide more clearly.

Strengths:

- `/account` protects logged-out users.
- Parent account page explains family space.

Risks:

- Parent Dashboard is public and can be reached before account setup.

### 6. Child Onboarding

Status: Functional.

Strengths:

- One-child MVP model is clear.
- Nickname-only privacy note is present.
- Child profile persists through Supabase.

Risks:

- Year 1 through Year 6 selector conflicts with Year 1-only MVP.

### 7. Subject Selection

Status: Functional.

Strengths:

- Only Mathematics is active.
- Other subjects are visibly coming soon.

Risks:

- `/subjects` and `/mvp/subjects` duplicate the concept.

### 8. World Map

Status: Strong.

Strengths:

- Trail path is visible.
- Completed/current/locked states are distinct.
- Level 10 is a clear final destination.

Risks:

- Page wrapper may push trail lower on small screens.

### 9. Forest World

Status: Good foundation.

Strengths:

- 10-level structure is clear.
- Forest Guardian and Forest Explorer Badge naming is consistent.

Risks:

- Direct question route bypasses lock logic.

### 10. Question Flow

Status: Good learning MVP.

Strengths:

- One focused session shell.
- Visual model, answers, feedback, XP, notes, and next button are present.

Risks:

- Production flow remains mainly multiple-choice.
- Completion calculation should be hardened against stale state.

### 11. Explanations

Status: Improved but still content-dependent.

Strengths:

- Compact teaching steps and visual recap exist.
- Wrong-answer guidance is friendlier.

Risks:

- Active manifest has repeated explanation text.

### 12. LearnBot

Status: Present and helpful.

Strengths:

- LearnBot states and hint messages exist.
- Lesson hints and account onboarding use LearnBot.

Risks:

- Parent-facing LearnBot support is lighter than child-facing support.

### 13. Rewards

Status: Functional but needs safety guard.

Strengths:

- XP, stars, badges, and Forest badge messaging exist.

Risks:

- Reset progress action is dangerous without confirmation.

### 14. Parent Dashboard

Status: Useful MVP summary, not yet beta-insight quality.

Strengths:

- XP, completed levels, accuracy, mastery, questions answered, and stars are visible.

Risks:

- Weak-topic detection and strong-topic detection are not true learning analytics.

### 15. Account Page

Status: Good MVP account surface.

Strengths:

- Profile dashboard, edit form, child delete, Continue Learning, and MVP note exist.

Risks:

- Delete uses native confirm and cascade deletes progress.

### 16. Settings

Status: Missing.

The audit found no Settings page or navigation. Account page partially covers profile management but not account settings.

### 17. Mobile Responsiveness

Status: Likely usable, must be device-tested.

Strengths:

- Lesson shell uses `100dvh`.
- Learning session hides global nav.
- Buttons use large tap targets.

Risks:

- Nav wrapping and large images need real device testing.

### 18. Desktop Responsiveness

Status: Strong for lesson and dashboard.

Strengths:

- Lesson uses a focused multi-column layout.
- Dashboard grids adapt well.

Risks:

- Large hero wrappers can require scrolling before task content.

### 19. Accessibility

Status: Better than early MVP, needs beta hardening.

Strengths:

- Focus rings are common.
- Buttons are large.
- Progress bars include screen-reader labels in MVP UI.
- Error/status roles are used in many forms.

Risks:

- No skip link.
- Drawer focus management can be improved.
- Inactive cards need clearer screen-reader explanation.

### 20. Performance

Status: Needs optimization before public beta.

Strengths:

- Next Image is used across many image surfaces.
- Vercel Analytics and Speed Insights are installed.

Risks:

- Large PNG assets are common.
- No confirmed production Lighthouse run in this audit.

### 21. Loading States

Status: Basic.

Strengths:

- App-level MVP loading page exists.
- Auth forms show loading button text.

Risks:

- Parent dashboard and rewards can show local data while remote sync is loading.

### 22. Empty States

Status: Present.

Strengths:

- Rewards empty state and dashboard topic empty states exist.
- Account setup empty state is friendly.

Risks:

- Some empty states are generic and could better direct the next action.

### 23. Error Handling

Status: Basic but workable.

Strengths:

- MVP error route exists.
- Account page logs Supabase error details server-side.

Risks:

- Auth error messages are raw.
- Progress sync errors surface as brief status labels without recovery instructions.

### 24. Branding Consistency

Status: Mostly strong.

Strengths:

- LearnPlay colors, logo, rounded cards, and LearnBot assets are consistently used.

Risks:

- Some legacy pages use older generic card/page components, but they are mostly inactive or secondary.

### 25. Visual Consistency

Status: Mostly strong in MVP surfaces.

Strengths:

- MVP UI components centralize buttons, cards, fields, progress bars, metrics, and status pills.

Risks:

- Global pages and legacy components use a different design layer than MVP pages.

### 26. Educational Consistency

Status: Good for a pilot, not final beta quality.

Strengths:

- Forest World sequence is developmentally appropriate for Year 1 foundations.
- Visual learning and tutor steps are present.

Risks:

- Production questions are mainly multiple-choice.
- Mini-game and boss terminology over-promises.
- Repeated explanations reduce teaching quality.

## Recommended Release Plan

### Before Parent Beta

1. Guard `/mvp/question/[level]` against locked-level access.
2. Add confirmation and safer location for progress reset.
3. Limit child year selector to Year 1 or label future years inactive.
4. Update privacy copy to match nickname/year/avatar data.
5. Add loading/sync states to parent dashboard and rewards.
6. Rename dashboard "Strong Topics" and "Topics To Practice Next" or implement true topic mastery.
7. Optimize core image assets.
8. Run full command gate: curriculum validation, lint, TypeScript, production build.
9. Perform manual device QA on at least one small Android phone, one tablet width, and desktop.

### After Parent Beta

1. Add Settings.
2. Add weekly progress, streaks, and recent activity.
3. Add real mini-game and boss shells.
4. Activate non-MCQ question types only after content approval.
5. Improve content variation and reduce repeated explanations.

## Release Decision

Current state is suitable for:

- Internal team demo.
- Guided stakeholder walkthrough.
- Content and UX review.

Current state is not yet suitable for:

- Unguided parent beta.
- Paid launch.
- School pilot with teacher reporting claims.

