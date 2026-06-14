# LearnPlay Academy

Phase 1B front-end prototype for LearnPlay Academy.

LearnPlay Academy is a playful learning website for children aged 7 to 12 and their parents. This prototype uses local static frontend data only. It does not connect to Supabase, Vercel, payments, a database, authentication, APIs, or other external services.

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
- Math Quiz Battle demo game

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

## Build

```bash
npm run build
```

## Future Plan

Progress, XP history, user accounts, rewards, and parent dashboards can be connected later when the project is ready for backend services.

## Notes

- Math Quiz Battle is functional on the frontend only.
- Word Builder and Science Explorer remain placeholder cards.
- Backend services, payments, database, authentication, and deployment setup are intentionally excluded from Phase 1B.
