# Production Asset Checklist

Audit date: 2026-07-12  
Project: `E:\Codex\learnplay-academy`  
Scope: Static scan of image files and image references in `app/`, `components/`, `data/`, `lib/`, `content/`, and `public/`.

## Summary

| Area | Result |
|---|---:|
| Image files found under `public/` | 104 |
| Image references found in code/data | 66 |
| Referenced images resolved | 66 |
| Missing referenced images | 0 |
| Images referenced from `public/` | 65 |
| App Router icon referenced as `/icon.png` | 1, served by `app/icon.png` |
| Unreferenced public images | 39 |
| Design/reference placeholder images | 10 |

## Priority Guide

| Priority | Meaning |
|---|---|
| P0 | Core production brand or MVP learning experience asset. Must be fixed before production. |
| P1 | MVP account, rewards, progress, or lesson support asset. Fix before broad launch. |
| P2 | Subject, demo, premium preview, or inactive feature asset. Fix before public marketing or activation. |
| P3 | Secondary asset. Fix when the related surface is activated. |
| P4 | Reference/design-system placeholder. Should not be shipped as visible product artwork. |

## Missing Assets

No missing referenced image asset was confirmed.

Note: `/icon.png` is referenced from `app/layout.tsx`; it is not in `public/`, but it exists as `app/icon.png`, so Next.js can serve it through the App Router.

## High-Priority Findings

1. Several P0/P1 assets are large PNGs over 1 MB. This can hurt mobile performance.
2. Some character/reward/logo assets that should ideally be transparent do not have alpha transparency.
3. `app/page.tsx` currently references `/design-system/learnbot-reference.png`, which is a design/reference image and should be replaced with a production LearnBot mascot before launch.
4. Question asset rows use virtual visual hints such as `visual:apple|type:Multiple Choice`, not concrete image files. This is acceptable for renderer-driven visuals, but it needs an asset registry before production content expansion.

## Complete Used Image Checklist

| Filename | Folder | Page / Usage | Current / Required Size | Transparent Background | Priority | Production Status |
|---|---|---|---|---|---|---|
| icon.png | app | app/layout.tsx | 1254x1254; required 512x512 app icon | No | P0 | Resolved by App Router; consider optimized icon variants |
| learnplay-academy-logo.png | / | app/games/science-explorer/page.tsx; components/Navbar.tsx; components/mvp/MvpShell.tsx; components/mvp/learning-session/LearningSessionShell.tsx | 1254x1254; required 512x512 source, display 40-180px | No | P0 | Needs review: transparent background preferred, large PNG |
| add-it-up.png | /assets/math | data/math-demo-games.ts; data/mathematics-adventure.ts | 198x176; required 198x176 demo cover minimum | No | P2 | Production ready |
| count-and-collect.png | /assets/math | data/math-demo-games.ts; data/mathematics-adventure.ts | 198x176; required 198x176 demo cover minimum | No | P2 | Production ready |
| number-hunt.png | /assets/math | data/math-demo-games.ts; data/mathematics-adventure.ts | 199x176; required 198x176 demo cover minimum | No | P2 | Production ready |
| shape-match.png | /assets/math | data/math-demo-games.ts; data/mathematics-adventure.ts | 198x176; required 198x176 demo cover minimum | No | P2 | Production ready |
| subtraction-splash.png | /assets/math | data/math-demo-games.ts; data/mathematics-adventure.ts | 198x176; required 198x176 demo cover minimum | No | P2 | Production ready |
| apple.png | /assets/math-icons | components/games/DemoMathGame.tsx | 74x78; required 80-256px object icon | No | P2 | Needs review: slightly below minimum width |
| bird.png | /assets/math-icons | components/games/DemoMathGame.tsx | 98x80; required 80-256px object icon | No | P2 | Production ready |
| box.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1254x1254; required 80-256px object icon | No | P2 | Needs review: oversized PNG |
| circle.png | /assets/math-icons | components/games/DemoMathGame.tsx | 82x82; required 80-256px object icon | No | P2 | Production ready |
| coin.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1024x1024; required 80-256px object icon | Yes | P2 | Needs review: oversized PNG |
| fish.png | /assets/math-icons | components/games/DemoMathGame.tsx | 96x80; required 80-256px object icon | No | P2 | Production ready |
| gem.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1024x1024; required 80-256px object icon | Yes | P2 | Needs review: oversized PNG |
| pencil.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1254x1254; required 80-256px object icon | No | P2 | Needs review: oversized PNG |
| splash.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1254x1254; required 80-256px object icon | No | P2 | Needs review: oversized PNG |
| square.png | /assets/math-icons | components/games/DemoMathGame.tsx | 82x82; required 80-256px object icon | No | P2 | Production ready |
| star.png | /assets/math-icons | components/games/DemoMathGame.tsx | 1254x1254; required 80-256px object icon | No | P2 | Needs review: oversized PNG |
| triangle.png | /assets/math-icons | components/games/DemoMathGame.tsx | 74x82; required 80-256px object icon | No | P2 | Needs review: slightly below minimum width |
| activity-addition-quest.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-data-wizard.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-decimal-detective.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-division-dash.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-fraction-builder.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-geometry-lab.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-logic-challenge.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-master-challenge.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-math-detective.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-math-escape-room.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-math-mission.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-multiplication-kingdom.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-number-ninja.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-number-patterns.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-pattern-hunter.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-problem-solver.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-shape-explorer.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-subtraction-hero.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-time-traveller.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| activity-treasure-calculator.png | /assets/math-premium | data/mathematics-premium.ts | 112x96; required 112x96 activity thumbnail | No | P2 | Production ready |
| addition-question.png | /assets/math-premium | components/mathematics/PremiumMathematicsExperience.tsx | 318x190; required 320x190 visual minimum | No | P2 | Production ready |
| dashboard-hero.png | /assets/math-premium | components/mathematics/PremiumMathematicsExperience.tsx | 1024x1536; required 1024px+ hero character | Yes | P2 | Needs review: large PNG |
| explanation-visual.png | /assets/math-premium | components/mathematics/PremiumMathematicsExperience.tsx | 306x178; required 306x178 explanation sample | No | P2 | Production ready |
| learnbot-helper.png | /assets/math-premium | components/mathematics/PremiumMathematicsExperience.tsx | 1254x1254; required 512-1024px helper character | No | P2 | Needs review: transparent background preferred, large PNG |
| world-forest.png | /assets/math-premium | data/mathematics-premium.ts | 1380x1140; required 1536x1024 world card | No | P2 | Needs review: large PNG and nonstandard ratio |
| world-galaxy.png | /assets/math-premium | data/mathematics-premium.ts | 1536x1024; required 1536x1024 world card | No | P2 | Needs review: large PNG |
| world-mountain.png | /assets/math-premium | data/mathematics-premium.ts | 1536x1024; required 1536x1024 world card | No | P2 | Needs review: large PNG |
| world-ocean.png | /assets/math-premium | data/mathematics-premium.ts | 1402x1122; required 1536x1024 world card | No | P2 | Needs review: large PNG and nonstandard ratio |
| world-space.png | /assets/math-premium | data/mathematics-premium.ts | 1402x1122; required 1536x1024 world card | No | P2 | Needs review: large PNG and nonstandard ratio |
| learnbot-reference.png | /design-system | app/page.tsx | 1254x1254; required production LearnBot mascot instead | No | P4 | Placeholder/reference image currently visible; replace before production |
| explorer-boy-front.png | /mascots | components/account/ChildProfileManager.tsx | 1024x1536; required 1024px+ transparent character | Yes | P1 | Needs review: large PNG |
| learnbot-celebrate.png | /mascots | components/mvp/explanation/learnbot-teaching.ts | 1024x1536; required 1024px+ transparent character | Yes | P0 | Needs review: large PNG |
| learnbot-explaining.png | /mascots | components/mvp/explanation/learnbot-teaching.ts | 1024x1536; required 1024px+ transparent character | Yes | P0 | Needs review: large PNG |
| learnbot-front.png | /mascots | components/account/ChildProfileManager.tsx; components/mvp/explanation/learnbot-teaching.ts | 1254x1254; required 1024px+ transparent character | No | P0 | Needs review: transparent background needed, large PNG |
| learnbot-happy.png | /mascots | components/account/ChildProfileManager.tsx; components/mvp/explanation/HintPanel.tsx; components/mvp/explanation/learnbot-teaching.ts | 1254x1254; required 1024px+ transparent character | No | P0 | Needs review: transparent background needed, large PNG |
| learnbot-thinking.png | /mascots | components/mvp/LevelIntroClient.tsx; components/mvp/explanation/learnbot-teaching.ts | 1024x1536; required 1024px+ transparent character | Yes | P0 | Needs review: large PNG |
| learnbot-trophy.png | /mascots | components/mvp/explanation/learnbot-teaching.ts | 1024x1536; required 1024px+ transparent character | Yes | P0 | Needs review: large PNG |
| badge.png | /rewards | components/games/DemoMathGame.tsx; components/mvp/RewardsClient.tsx; components/mvp/explanation/ForestRewardScreen.tsx | 1024x1024; required 512x512 reward badge | Yes | P0 | Needs review: large PNG |
| certificate.png | /rewards | components/games/DemoMathGame.tsx | 1024x1024; required 512x512 icon | Yes | P3 | Needs review: large PNG |
| star.png | /rewards | components/account/ChildProfileManager.tsx; components/games/DemoMathGame.tsx; components/mvp/WorldMapClient.tsx; components/mvp/explanation/XPRewardCard.tsx | 1254x1254; required 512x512 transparent icon | No | P1 | Needs review: transparent background preferred |
| bahasa-melayu.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| english.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| general-knowledge.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| life-skills.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| math.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| science.png | /subjects | data/feature-flags.ts | 1254x1254; required 1024x1024 subject card | No | P2 | Needs review: large PNG |
| level 1-forest-world.png | /worlds | components/games/DemoMathGame.tsx; components/mvp/LevelIntroClient.tsx; components/mvp/MathematicsMvpPage.tsx; components/mvp/WorldMapClient.tsx | 1380x1140; required 1536x1024 world card | No | P0 | Needs review: large PNG and nonstandard ratio |

## Placeholder / Reference Images

These assets should be treated as design references or placeholders, not final product artwork.

| Filename | Folder | Current Usage | Priority | Production Status |
|---|---|---|---|---|
| learnbot-reference.png | /design-system | Used on `app/page.tsx` | P0 | Replace with production LearnBot mascot |
| english-explanation-notes-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| explanation-notes-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| game-card-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| learning-screen-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| lifeskills-explanation-notes-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| malay-explanation-notes-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| progress-dashboard-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| rewards-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |
| science-explanation-notes-reference.png | /design-system | Not referenced | P4 | Keep only as design reference or move outside public assets |

## Virtual / Renderer-Driven Asset Hints

The imported question assets contain `Required Assets` entries such as:

- `visual:number path|type:Fill Missing Number`
- `visual:apple|type:Multiple Choice`
- `visual:star|type:Tap Correct Group`
- `visual:apple,duck,star|type:Match Pairs`

These are not missing file paths. They are renderer hints for the local visual system.

Production status: **Needs registry before scale-up**

Recommended next step:

Create a `visualAssetRegistry` that maps each object key to:

- display label
- renderer icon or emoji fallback
- optional image file path
- transparent background requirement
- minimum size
- accessibility text.

## Unreferenced Public Images

Several public images are available but not currently referenced by scanned app code/data. This is not automatically a bug, but it increases repository weight.

Notable groups:

- Unused design-system references in `public/design-system/`
- Unused mascot variants such as explorer-girl poses and some LearnBot poses
- Unused reward icons such as streaks, book, chest, compass, gift, heart, leaderboard, rocket badge
- Duplicate logo file `public/LearnPlay Academy Logo.png`

Recommendation:

Keep source artwork in a private design/source folder and keep `public/` limited to assets needed at runtime.

## Production Readiness Actions

### P0 Before Production

1. Replace `/design-system/learnbot-reference.png` on the home page with a production LearnBot mascot.
2. Provide transparent-background versions of:
   - `/learnplay-academy-logo.png`
   - `/mascots/learnbot-front.png`
   - `/mascots/learnbot-happy.png`
   - `/rewards/star.png`
3. Optimize large P0 PNGs:
   - LearnBot states
   - reward badge
   - Forest World card
   - logo/app icon.

### P1 Before Broad User Testing

1. Optimize account/profile mascot assets.
2. Verify reward icon appearance on dark, white, and gradient backgrounds.
3. Confirm all P1 images have clear alt text where they are meaningful.

### P2 Before Activating Non-MVP Areas

1. Optimize subject card images.
2. Optimize premium math world images.
3. Confirm inactive/premium preview assets are not loaded unnecessarily in active MVP routes.

## Notes

- This audit was static. It did not open a browser or inspect rendered pixels.
- Transparency was checked from PNG metadata.
- Required sizes are recommended production targets based on current usage, not strict existing design-system tokens.
- No code files or assets were modified by this audit; only this checklist file was generated.

