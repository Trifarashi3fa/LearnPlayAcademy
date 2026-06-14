# LearnPlay Academy

Phase 1B front-end prototype for LearnPlay Academy.

LearnPlay Academy is a playful learning website for children aged 7 to 12 and their parents. This prototype now includes Supabase Authentication wiring for login, registration, logout, and dashboard protection. Payments and deployment setup are still intentionally excluded.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- App Router

## Pages

- Home
- Subjects
- Games
- About
- Student Dashboard
- Math Quiz Battle demo game
- English Word Builder demo game

## Phase 4 Includes

- Supabase progress tracking for completed games
- `game_results` table for game history, scores, XP, and level after play
- `progress` table for subject-level XP, level, games played, best score, and last played time
- Dashboard reads real Supabase profile, progress, and game history data
- Games still work locally, but signed-in students also save results to Supabase

Run the SQL in `supabase/migrations/002_create_progress_tracking.sql` after the Phase 3 profile migration.
## Phase 3 Includes

- Supabase Authentication integration
- Login page at `/login`
- Register page at `/register`
- Email signup and email/password login
- Logout button on the protected dashboard
- Dashboard protection with server-side auth checks
- Supabase SSR client helpers in `lib/supabase`
- User profile table SQL migration in `supabase/migrations/001_create_profiles.sql`
- Environment variable example in `.env.example`

### Supabase Setup

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Run the SQL in `supabase/migrations/001_create_profiles.sql` in the Supabase SQL editor to create the `profiles` table and new-user trigger.
## Phase 2 Includes

- Student Dashboard at `/dashboard`
- Reusable dashboard cards in `components/DashboardCard.tsx`
- Mock subject progress and recent activity data
- Current XP, current level, games played, level progress, subject progress, and recent activity sections
- Local XP fallback from the Phase 1D browser storage system
- No authentication or database yet
## Phase 1D Includes

- Reusable XP utilities in `lib/xp.ts`
- `calculateXP()` for game XP totals
- `calculateLevel()` for LearnPlay levels
- Level thresholds: Level 1 at 0 XP, Level 2 at 100 XP, Level 3 at 250 XP, Level 4 at 500 XP, and Level 5 at 1000 XP
- Local browser storage for total XP, level, completed game counts, and future dashboard integration
- XP and level display on game result screens
## Phase 1C Includes

- A playable English Word Builder demo at /games/word-builder`r
- 10 local static word-building challenges
- Letter selection, answer checking, feedback, score tracking, XP tracking, final results, and restart flow
- No database, API, authentication, payments, or external services

## Design System

The project includes a reusable LearnPlay Academy design system using the official logo from `public/learnplay-academy-logo.png`.

Brand colors are configured in Tailwind and shared theme tokens:

- Blue: `#0D5FEA`
- Yellow: `#FFB300`
- Green: `#66CC00`
- Purple: `#8E44FF`
- Pink: `#FF4FA0`
- Navy: `#082A7A`

Typography uses Poppins for headings and Nunito for body text, with local fallbacks so the app does not depend on external font services.

Reusable UI components:

- `Button`
- `Card`
- `PageLayout`
- `PageSection`
- `SubjectCard`
- `GameCard`
- `QuizGame`

## Phase 1B Includes

- LearnPlay Academy logo and favicon
- Brand color updates based on the logo
- A playable Math Quiz Battle demo at `/games/math-quiz-battle`
- Start screen, instructions, 10 multiple-choice questions, feedback, score tracking, XP tracking, final results, restart, and back-to-games navigation
- Local static quiz data only

## Install Dependencies

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Run the Demo Game

Start the local server, then open:

[http://localhost:3000/games/math-quiz-battle](http://localhost:3000/games/math-quiz-battle)

English Word Builder:

[http://localhost:3000/games/word-builder](http://localhost:3000/games/word-builder)

## Build

```bash
npm run build
```

## Future Plan

Local XP progress is stored in the browser for now. User accounts, synced XP history, rewards, and parent dashboards can be connected later when the project is ready for backend services.

## Notes

- Math Quiz Battle is functional on the frontend only.
- Science Explorer remains a placeholder card.
- Payments and deployment setup are intentionally excluded. Supabase Authentication is introduced in Phase 3.






