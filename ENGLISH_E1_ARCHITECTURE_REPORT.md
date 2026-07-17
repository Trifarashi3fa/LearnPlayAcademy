# English Phase E1 Architecture Report

## Summary

English Phase E1 introduced a subject-general learning package registry and progress identity helpers while preserving the existing Mathematics Year 1 Forest World MVP flow.

No English gameplay was activated. No question content, curriculum files, active manifest, Supabase schema, XP rules, rewards rules, or route structure were changed.

## Files Changed

### Created

- `data/learning-packages.ts`
- `ENGLISH_E1_ARCHITECTURE_REPORT.md`

### Updated

- `data/forest-world-identity.ts`
- `data/feature-flags.ts`
- `lib/progress/level-access.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `lib/curriculum/active-content.ts`
- `components/mvp/QuestionPlayer.tsx`
- `components/mvp/WorldMapClient.tsx`
- `components/mvp/MathematicsMvpPage.tsx`
- `components/mvp/ParentDashboardClient.tsx`
- `components/mvp/explanation/ForestRewardScreen.tsx`
- `scripts/test-mvp-level-access.mjs`

### Existing Untracked Planning Inputs Observed

These planning documents were already present in the working tree and were used as E1 input references:

- `ENGLISH_FOREST_WORLD_MVP_PLAN.md`
- `ENGLISH_LEVEL_CURRICULUM_MAP.md`
- `ENGLISH_IMPLEMENTATION_CHECKLIST.md`

## Registry Design

The new registry lives in `data/learning-packages.ts`.

Each package now defines:

- `packageId`
- `subject`
- `subjectName`
- `year`
- `worldId`
- `worldName`
- `totalLevels`
- `routeBase`
- `access`
- `packageType`
- `status`
- `availabilityStatus`
- `badge`
- `reward`
- `levelSource`
- `levelMetadata`
- `questionContentSource`

The active package is:

- `mathematics-year-1-forest-world`
- Subject: `mathematics`
- Year: `1`
- World ID: `forest-world`
- Status: `active`
- Availability: `available`
- Route base: `/mvp`
- Content source: `generated/active-content-manifest.json`

The future placeholder package is:

- `english-year-1-english-forest-world`
- Subject: `english`
- Year: `1`
- World ID: `english-forest-world`
- Status: `coming-soon`
- Availability: `coming-soon`
- Route base: `/mvp/english`
- Content source: planned local question assets

English is registered only as an unavailable future package. It does not expose gameplay.

## Backward Compatibility Approach

The existing Mathematics MVP remains the runtime path.

Compatibility is preserved through adapters instead of a large rewrite:

- `data/forest-world-identity.ts` now derives canonical Mathematics Forest identity from the registry.
- `forestWorldIdentity` remains available for existing Mathematics components.
- Legacy world ID `math-forest-world` still normalizes to `forest-world`.
- Legacy badge `Forest Guardian Badge` still normalizes to `Forest Explorer Badge`.
- `FOREST_PROGRESS_REF` remains exported for existing hooks and components.
- `getForestLevelAccess` and `isForestLevelAccessible` remain exported as wrappers around the new generic level-access helper.

Existing URLs are unchanged:

- `/mvp/world-map`
- `/mvp/level/[level]`
- `/mvp/question/[level]`
- `/mvp/rewards`
- `/mvp/parent-dashboard`

## Progress Isolation Design

Progress remains keyed by subject, year, and world:

```text
subject:year:worldId
```

The active Mathematics key remains:

```text
mathematics:1:forest-world
```

The future English key is:

```text
english:1:english-forest-world
```

This prevents future English progress from overwriting Mathematics progress.

The progress normalizer now:

- normalizes legacy world IDs,
- normalizes world-progress map keys,
- preserves existing Mathematics progress,
- keeps the active world fallback as Mathematics Forest World,
- supports multiple world progress summaries for future sync payloads,
- keeps V1 and V2 localStorage compatibility.

Supabase schema was not changed. Synced progress payloads can now preserve multiple world summaries when present.

## Reused and Refactored Areas

### Reused

- Mathematics routes
- Mathematics Forest World content manifest
- Existing MVP progress hook
- Existing reward and completion flow
- Existing Parent Dashboard layout
- Existing level access behavior

### Refactored Lightly

- Forest identity now derives from the registry.
- Level access now supports arbitrary total-level counts.
- Parent Dashboard subject summary can display active and coming-soon registered packages.
- Child-progress summary can include more than one world summary in the future.
- Active content loader checks the registered Mathematics package rather than standalone literals.

## Remaining Mathematics Hardcoding

The following areas intentionally remain Mathematics/Forest-specific after E1:

- `/mvp/*` route structure still represents the active Mathematics Forest MVP.
- `data/mvp-forest-world.ts` remains the Mathematics runtime model.
- Question pages still load Mathematics Forest levels.
- `useMvpProgress` still uses `FOREST_PROGRESS_REF` for the active MVP hook.
- `ParentDashboardClient` still presents Forest-specific parent summaries.
- `WorldMapClient`, `MathematicsMvpPage`, `RewardsClient`, `LevelIntroClient`, and lesson chrome still contain Forest-specific copy and imagery.
- Curriculum validation remains scoped to the approved Mathematics Forest manifest.
- Question asset import scripts remain Mathematics Forest-specific.

These are acceptable for E1 because the requirement was to create subject-isolation foundations without activating English or rewriting the active application.

## English Activation Prerequisites

Before English gameplay can be activated:

1. Create governed English question assets.
2. Add English import and validation support.
3. Generate an English approved content manifest or subject-aware manifest.
4. Add English level metadata and content loader support.
5. Create or adapt subject-aware route handling.
6. Add English world map and level intro UI.
7. Extend progress hooks to choose package context at runtime.
8. Update Parent Dashboard to show Mathematics and English separately.
9. Add English rewards and badge assets.
10. Add E2-E5 tests covering English content and progress.

## Test Results

All required commands passed.

| Command | Result |
| --- | --- |
| `npm.cmd run test:mvp-level-access` | Passed. `MVP level access tests passed: 14` |
| `npm.cmd run test:mvp-reset-safety` | Passed. `MVP reset safety tests passed: 7` |
| `npm.cmd run test:mvp-year-availability` | Passed. `MVP year availability tests passed: 22` |
| `npm.cmd run test:question-assets` | Passed. `Question asset import tests passed.` |
| `npm.cmd run validate:curriculum` | Passed. 100 approved questions, 10 levels, 0 warnings |
| `npm.cmd run lint` | Passed |
| `npx.cmd tsc --noEmit --incremental false` | Passed |
| `npm.cmd run build` | Passed |

## Command Results

Production build completed successfully with Next.js 16.2.9.

Build generated the existing application routes, including the active `/mvp/*` Mathematics routes and the existing static subject routes. No English gameplay route was activated.

## Assumptions

- The active MVP remains Mathematics Year 1 Forest World.
- English beta should be planned as a separate learning package rather than overloading the Mathematics package.
- English should remain unavailable until approved content, manifest, and route support are ready.
- Supabase progress can continue storing JSON summaries without a schema change during E1.
- Legacy localStorage progress should be preserved even if old world IDs or old badge names appear.

## Risks

- Some route and UI labels still mention Forest World directly. This is safe for the current MVP but must be revisited before English activation.
- The active content loader is still intentionally limited to the Mathematics package.
- Parent Dashboard can display coming-soon package summaries, but it is not yet a fully multi-subject analytics dashboard.
- Question asset import and curriculum validation are still Mathematics-specific.
- English route base `/mvp/english` is registry metadata only; no gameplay route exists yet.

## Recommendation For Next Phase

Proceed to English Phase E2 only after this E1 registry layer is reviewed.

Recommended first E2 task:

Create English question asset schema/import support while keeping all English content dev-only and excluded from production manifests.
