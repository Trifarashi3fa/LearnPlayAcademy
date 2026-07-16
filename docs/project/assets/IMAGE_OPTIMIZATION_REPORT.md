# Image Optimization Report

Date: 2026-07-13

## Summary

Optimized MVP beta production image delivery by creating resized WebP versions for large PNG assets that are currently referenced by the app, then updating app references to use the WebP files.

Original PNG files were kept in `public/` as source/fallback artwork. No unused duplicate files were deleted in this pass because public assets may be referenced directly outside the codebase, and removal should be reviewed separately.

## Result

- Referenced PNG assets optimized: 31
- New WebP delivery assets created: 31
- Estimated production download savings: about 55,911 KB
- Large WebP files over 300 KB after optimization: 0
- Remaining PNG files over 300 KB in `public/`: 71
- Exact duplicate PNG groups found: 14

## Optimized Files

| Original PNG | New WebP | PNG KB | WebP KB | Estimated KB Saved | WebP Size |
|---|---:|---:|---:|---:|---:|
| `public/learnplay-academy-logo.png` | `public/learnplay-academy-logo.webp` | 1298 | 47 | 1251 | 512x512 |
| `public/worlds/level 1-forest-world.png` | `public/worlds/level 1-forest-world.webp` | 2550 | 244 | 2306 | 900x743 |
| `public/assets/math-premium/world-forest.png` | `public/assets/math-premium/world-forest.webp` | 2550 | 244 | 2306 | 900x743 |
| `public/assets/math-premium/world-mountain.png` | `public/assets/math-premium/world-mountain.webp` | 2594 | 203 | 2391 | 900x600 |
| `public/assets/math-premium/world-ocean.png` | `public/assets/math-premium/world-ocean.webp` | 2494 | 226 | 2268 | 900x720 |
| `public/assets/math-premium/world-space.png` | `public/assets/math-premium/world-space.webp` | 2440 | 196 | 2243 | 900x720 |
| `public/assets/math-premium/world-galaxy.png` | `public/assets/math-premium/world-galaxy.webp` | 2848 | 220 | 2628 | 900x600 |
| `public/assets/math-premium/dashboard-hero.png` | `public/assets/math-premium/dashboard-hero.webp` | 2489 | 116 | 2373 | 600x900 |
| `public/assets/math-premium/learnbot-helper.png` | `public/assets/math-premium/learnbot-helper.webp` | 1217 | 55 | 1162 | 768x768 |
| `public/mascots/learnbot-happy.png` | `public/mascots/learnbot-happy.webp` | 1217 | 55 | 1162 | 768x768 |
| `public/mascots/learnbot-front.png` | `public/mascots/learnbot-front.webp` | 1208 | 57 | 1152 | 768x768 |
| `public/mascots/learnbot-explaining.png` | `public/mascots/learnbot-explaining.webp` | 2202 | 69 | 2133 | 600x900 |
| `public/mascots/learnbot-thinking.png` | `public/mascots/learnbot-thinking.webp` | 2200 | 78 | 2122 | 600x900 |
| `public/mascots/learnbot-celebrate.png` | `public/mascots/learnbot-celebrate.webp` | 2233 | 71 | 2162 | 600x900 |
| `public/mascots/learnbot-trophy.png` | `public/mascots/learnbot-trophy.webp` | 1972 | 79 | 1893 | 600x900 |
| `public/mascots/explorer-boy-front.png` | `public/mascots/explorer-boy-front.webp` | 2498 | 105 | 2393 | 600x900 |
| `public/rewards/star.png` | `public/rewards/star.webp` | 927 | 15 | 912 | 512x512 |
| `public/rewards/badge.png` | `public/rewards/badge.webp` | 1646 | 110 | 1536 | 640x640 |
| `public/rewards/certificate.png` | `public/rewards/certificate.webp` | 1564 | 68 | 1496 | 512x512 |
| `public/assets/math-icons/star.png` | `public/assets/math-icons/star.webp` | 927 | 15 | 912 | 512x512 |
| `public/assets/math-icons/coin.png` | `public/assets/math-icons/coin.webp` | 1550 | 63 | 1486 | 512x512 |
| `public/assets/math-icons/gem.png` | `public/assets/math-icons/gem.webp` | 1637 | 69 | 1568 | 512x512 |
| `public/assets/math-icons/box.png` | `public/assets/math-icons/box.webp` | 1297 | 36 | 1261 | 512x512 |
| `public/assets/math-icons/pencil.png` | `public/assets/math-icons/pencil.webp` | 1419 | 37 | 1383 | 512x512 |
| `public/assets/math-icons/splash.png` | `public/assets/math-icons/splash.webp` | 680 | 5 | 674 | 512x512 |
| `public/subjects/math.png` | `public/subjects/math.webp` | 2206 | 153 | 2052 | 768x768 |
| `public/subjects/english.png` | `public/subjects/english.webp` | 2238 | 163 | 2075 | 768x768 |
| `public/subjects/science.png` | `public/subjects/science.webp` | 2302 | 167 | 2136 | 768x768 |
| `public/subjects/bahasa-melayu.png` | `public/subjects/bahasa-melayu.webp` | 2260 | 173 | 2088 | 768x768 |
| `public/subjects/life-skills.png` | `public/subjects/life-skills.webp` | 2288 | 175 | 2113 | 768x768 |
| `public/subjects/general-knowledge.png` | `public/subjects/general-knowledge.webp` | 2478 | 203 | 2274 | 768x768 |

## Pages And Components Affected

- Navbar logo:
  - `components/Navbar.tsx`
  - `components/mvp/MvpShell.tsx`
  - `components/mvp/learning-session/LearningSessionShell.tsx`
  - `app/games/science-explorer/page.tsx`
- Account and child profile assets:
  - `components/account/ChildProfileManager.tsx`
- Forest World MVP:
  - `components/mvp/LevelIntroClient.tsx`
  - `components/mvp/LockedLevelNotice.tsx`
  - `components/mvp/MathematicsMvpPage.tsx`
  - `components/mvp/WorldMapClient.tsx`
  - `components/mvp/RewardsClient.tsx`
  - `components/mvp/explanation/ForestRewardScreen.tsx`
  - `components/mvp/explanation/HintPanel.tsx`
  - `components/mvp/explanation/XPRewardCard.tsx`
  - `components/mvp/explanation/learnbot-teaching.ts`
- Demo games and reward visuals:
  - `components/games/DemoMathGame.tsx`
- Subject selection and premium math preview data:
  - `data/feature-flags.ts`
  - `data/mathematics-premium.ts`
  - `components/mathematics/PremiumMathematicsExperience.tsx`

## Large PNGs Over 300 KB

The audit found 71 PNG files over 300 KB in `public/`. The large PNGs that are actively referenced by app code now have WebP delivery versions and updated references.

Large PNG originals remain in place as source/fallback artwork. The largest remaining PNG originals include:

- `public/assets/math-premium/world-galaxy.png` at 2848 KB
- `public/worlds/level 5-galaxy-world.png` at 2848 KB
- `public/assets/math-premium/world-mountain.png` at 2594 KB
- `public/worlds/level 2-mountain-world.png` at 2594 KB
- `public/assets/math-premium/world-forest.png` at 2550 KB
- `public/worlds/level 1-forest-world.png` at 2550 KB
- `public/mascots/explorer-boy-exploring.png` at 2525 KB
- `public/mascots/explorer-boy-teamwork.png` at 2519 KB
- `public/mascots/explorer-girl-teamwork.png` at 2518 KB
- `public/mascots/explorer-boy-thinking.png` at 2505 KB

## Duplicate Image Findings

Exact duplicate PNG groups found:

- `public/LearnPlay Academy Logo.png` and `public/learnplay-academy-logo.png`
- `public/assets/math-icons/box.png` and `public/rewards/gift.png`
- `public/assets/math-icons/coin.png` and `public/rewards/coin.png`
- `public/assets/math-icons/gem.png` and `public/rewards/gem.png`
- `public/assets/math-icons/pencil.png` and `public/rewards/book.png`
- `public/assets/math-icons/splash.png` and `public/rewards/energy.png`
- `public/assets/math-icons/star.png` and `public/rewards/star.png`
- `public/assets/math-premium/dashboard-hero.png` and `public/mascots/explorer-boy-celebrate.png`
- `public/assets/math-premium/learnbot-helper.png` and `public/mascots/learnbot-happy.png`
- `public/assets/math-premium/world-forest.png` and `public/worlds/level 1-forest-world.png`
- `public/assets/math-premium/world-mountain.png` and `public/worlds/level 2-mountain-world.png`
- `public/assets/math-premium/world-ocean.png` and `public/worlds/level 3-ocean-world.png`
- `public/assets/math-premium/world-space.png` and `public/worlds/level 4-space-world.png`
- `public/assets/math-premium/world-galaxy.png` and `public/worlds/level 5-galaxy-world.png`

No duplicate PNG files were removed in this pass. Recommended next step is to confirm whether any public URLs are externally used before deleting duplicate source files.

## Transparent PNGs Converted

The following transparent or mascot/reward-style PNGs were converted to WebP while preserving alpha-capable delivery:

- `public/mascots/learnbot-explaining.webp`
- `public/mascots/learnbot-thinking.webp`
- `public/mascots/learnbot-celebrate.webp`
- `public/mascots/learnbot-trophy.webp`
- `public/mascots/explorer-boy-front.webp`
- `public/rewards/badge.webp`
- `public/rewards/certificate.webp`
- `public/assets/math-icons/coin.webp`
- `public/assets/math-icons/gem.webp`

## Unused Or Manual-Review Assets

Several large assets appear unreferenced by code and should be reviewed before deletion:

- `public/worlds/level 2-mountain-world.png`
- `public/worlds/level 3-ocean-world.png`
- `public/worlds/level 4-space-world.png`
- `public/worlds/level 5-galaxy-world.png`
- `public/mascots/explorer-boy-exploring.png`
- `public/mascots/explorer-boy-teamwork.png`
- `public/mascots/explorer-girl-teamwork.png`
- `public/mascots/explorer-boy-thinking.png`
- `public/mascots/explorer-girl-celebrate.png`
- `public/mascots/explorer-boy-reading.png`
- `public/mascots/learnbot-sad.png`
- `public/rewards/chest.png`
- `public/rewards/compass.png`
- `public/rewards/leaderboard.png`
- `public/rewards/rocket-badget.png`
- `public/rewards/1-day-streak.png`
- `public/rewards/7-day-streak.png`

## Remaining Manual Artwork Needed

- Confirm whether PNG originals should remain in the repository as source assets or be moved to an archive folder outside the production bundle.
- Decide whether exact duplicate PNGs should be removed after external/public URL usage is checked.
- Review `public/design-system/*reference.png` files. They are large reference assets and should probably move out of `public/` before beta if they are not intended for production delivery.
- Consider creating explicit `srcset` or responsive image variants for future large hero/world artwork if pages begin using full-width imagery.
- Review misspelled asset name `public/rewards/rocket-badget.png` before future reward work.

## Validation

- `npm.cmd run lint`: passed, exit code 0, 20.94 seconds
- `npx.cmd tsc --noEmit --incremental false`: passed, exit code 0, 16.47 seconds
- `npm.cmd run build`: passed, exit code 0, 44.96 seconds
- Build precheck `npm run validate:curriculum`: passed with 100 approved questions and 0 warnings

## Notes

- Production image references now point to WebP delivery assets.
- Original PNGs were not deleted.
- No gameplay, curriculum, Supabase, progress, or routing logic was changed.
