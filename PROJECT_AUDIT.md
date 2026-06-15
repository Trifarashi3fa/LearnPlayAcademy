# LearnPlay Academy Project Audit

## Scope

This audit cleaned and standardized the existing LearnPlay Academy codebase only. No new pages, games, database features, payment features, or authentication features were added.

## Problems Found

- Navigation links were defined inside the navigation component, while footer links were defined separately. This made it easier for public navigation to drift over time.
- Life Skills appeared as a top-level public navigation item even though it should live inside the subject learning structure.
- The root layout directly assembled the header and footer instead of using one shared site shell.
- The dashboard showed fallback sample learning activity and fixed-looking reward counts when no real activity existed.
- The Math and English game start screens still used demo wording even though the games are working learning activities.
- The subject pathway is mostly standardized, but several future games, quizzes, and assessments are still intentionally marked as Coming Soon.
- Some larger learning modules have page-specific internal layouts, although they still use LearnPlay colors, cards, buttons, and typography.

## Changes Made

- Created a shared navigation data file at `data/navigation.ts`.
- Updated the global navigation to use the required public links only: Home, Subjects, Games, Parents, About, Login, Register.
- Kept Life Skills available through subject content instead of top-level navigation.
- Updated the footer to use the same shared navigation data source.
- Added a reusable `layouts/SiteShell.tsx` to centralize the shared header, main content area, and footer.
- Updated `app/layout.tsx` to use the shared site shell.
- Removed sample dashboard activity and fixed-looking reward values from the student dashboard.
- Updated dashboard empty states so personal progress only appears after real activity exists.
- Updated Math Quiz Battle and English Word Builder start labels from demo wording to learning activity wording.
- Verified the existing subject structure supports Subjects -> Topics -> Games -> Assessments through `data/subject-pathways.ts` and `/subjects/[subject]`.

## Design Standard Check

- Brand colors remain aligned with LearnPlay Academy:
  - Blue `#0D5FEA`
  - Yellow `#FFB300`
  - Green `#66CC00`
  - Purple `#8E44FF`
  - Pink `#FF4FA0`
  - Navy `#082A7A`
- The app continues to use rounded cards, large buttons, visible focus rings, and child-friendly spacing.
- Fonts remain managed through the existing global theme and Tailwind setup.

## Route Check

Important existing routes remain available:

- `/`
- `/subjects`
- `/subjects/mathematics`
- `/subjects/english`
- `/subjects/science`
- `/subjects/bahasa-melayu`
- `/subjects/critical-thinking`
- `/subjects/life-skills`
- `/games`
- `/games/math-quiz-battle`
- `/games/word-builder`
- `/games/science-explorer`
- `/science`
- `/life-skills`
- `/parents`
- `/about`
- `/login`
- `/register`
- `/dashboard`
- `/privacy`
- `/terms`
- `/contact`

## Remaining Issues

- Science and Life Skills content modules still contain their own local progress panels. This is acceptable for the current local/static content stage, but they can later be moved into a shared progress component.
- Several subject games, quizzes, and assessments are Coming Soon. This is content roadmap work, not a standardization bug.
- The dashboard uses real saved progress where available, but advanced metrics like true daily streaks need a future activity-date model.
- Some game flows still have custom internal card layouts. They work, but a future pass could introduce one shared game shell component.

## Recommended Next Phase

- Build a shared `GameShell` component for Start, Playing, and Result screens.
- Move local learning progress into one shared progress utility for Science, Life Skills, and language modules.
- Expand subject assessments using the existing Subjects -> Topics -> Games -> Assessments structure.
- Add automated route/link checks when the app grows further.