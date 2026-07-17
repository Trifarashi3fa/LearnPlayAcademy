# Multi-Subject Architecture Report

## Summary

This phase added the universal subject and package architecture needed for a consistent 10-level Forest World beta across Mathematics, English, Science, and future subjects.

Mathematics Year 1 Forest World remains the only active learning package. English and Science are registered as Coming Soon only. No English or Science gameplay was activated.

No Supabase schema, payment logic, question bank, active manifest, or Mathematics route was changed.

## Files Changed

### Created

- `data/subject-registry.ts`
- `data/learning-packages.ts`
- `MULTI_SUBJECT_ARCHITECTURE_REPORT.md`

### Updated

- `data/feature-flags.ts`
- `data/forest-world-identity.ts`
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

### Existing Planning Inputs Observed

These were already present as untracked planning files and were left unchanged:

- `ENGLISH_FOREST_WORLD_MVP_PLAN.md`
- `ENGLISH_LEVEL_CURRICULUM_MAP.md`
- `ENGLISH_IMPLEMENTATION_CHECKLIST.md`
- `ENGLISH_E1_ARCHITECTURE_REPORT.md`

## Subject Registry Design

The new Subject Registry lives in:

- `data/subject-registry.ts`

Each subject entry defines:

- subject ID
- display name
- short label
- description
- icon
- asset reference
- status
- free-beta availability
- supported years
- default learning package
- theme token
- navigation route
- Parent Dashboard display name
- ordering priority
- feature flag ID
- subject-selection visibility

Registered subjects:

| Subject | Status | Free Beta | Default Package |
| --- | --- | --- | --- |
| Mathematics | Active | Available | `mathematics-year-1-forest-world` |
| English | Coming Soon | Coming Soon | `english-year-1-forest-world` |
| Science | Coming Soon | Coming Soon | `science-year-1-forest-world` |
| Bahasa Melayu | Coming Soon | Coming Soon | None yet |
| Life Skills | Coming Soon | Coming Soon | None yet |
| AI Literacy | Coming Soon | Coming Soon | None yet |
| General Knowledge | Coming Soon | Coming Soon | None yet |

Only Mathematics is active.

## Learning Package Registry Relationship

The Learning Package Registry remains separate from the Subject Registry:

- `data/subject-registry.ts` describes subject-level availability and navigation.
- `data/learning-packages.ts` describes playable or planned learning packages.

Hierarchy:

```text
Subject
Year
Learning Package
World
Levels
Questions
```

Current registered packages:

| Package | Subject | Year | World ID | Levels | Status |
| --- | --- | --- | --- | --- | --- |
| `mathematics-year-1-forest-world` | Mathematics | 1 | `forest-world` | 10 | Active |
| `english-year-1-forest-world` | English | 1 | `forest-world` | 10 | Coming Soon |
| `science-year-1-forest-world` | Science | 1 | `forest-world` | 10 | Coming Soon |

All packages use the same Forest World ID. Progress remains isolated because the progress key includes subject, year, and world:

```text
subject:year:worldId
```

Examples:

- `mathematics:1:forest-world`
- `english:1:forest-world`
- `science:1:forest-world`

## Standardized 10-Level Package Contract

The standardized Forest World package contract is defined in:

- `data/learning-packages.ts`

Every standardized Forest package must define exactly 10 levels using this node sequence:

1. Learn
2. Practice
3. Mini Game
4. Learn
5. Practice
6. Mini Game
7. Learn
8. Review
9. Challenge
10. Boss

Each level metadata entry includes:

- level number
- node type
- title
- topic
- description
- learning objective
- difficulty
- active question count
- unlock rule
- reward data
- assessment role
- asset references
- question source

Validation helper:

- `validateStandardForestPackage(package)`

Validation rejects:

- duplicate level numbers
- missing levels
- more or fewer than 10 levels
- invalid node sequence
- invalid unlock sequence
- invalid subject registry identity
- unsupported year
- non-standard Forest world ID
- missing required level metadata

## Backward Compatibility Approach

Compatibility was preserved through adapters and wrappers:

- Existing Mathematics URLs stay unchanged.
- Existing active manifest stays unchanged.
- Existing Mathematics progress key stays `mathematics:1:forest-world`.
- Legacy world IDs still normalize to the standard `forest-world`.
- Legacy `Forest Guardian Badge` still normalizes to `Forest Explorer Badge`.
- `forestWorldIdentity` remains available for existing Mathematics code.
- `getForestLevelAccess` and `isForestLevelAccessible` remain available as wrappers.
- `/mvp/*` routes still represent the active Mathematics Year 1 Forest World MVP.

The active content loader still serves only the active Mathematics package.

## Remaining Mathematics-Specific Hardcoding

The following hardcoding remains intentionally after this phase:

- `/mvp/*` routes are Mathematics MVP routes.
- `data/mvp-forest-world.ts` remains Mathematics-specific.
- `useMvpProgress` still uses `FOREST_PROGRESS_REF` for the active MVP.
- `WorldMapClient`, `QuestionPlayer`, `LevelIntroClient`, and `RewardsClient` still render the Mathematics Forest runtime.
- Parent Dashboard still focuses on the active Mathematics Forest package.
- Curriculum validation remains scoped to the approved Mathematics manifest.
- Question asset import scripts remain Mathematics Year 1 Forest-specific.
- English and Science route bases are registry metadata only and are not playable routes.

These are acceptable because the requirement was to create universal architecture without activating English or Science.

## English Activation Prerequisites

Before English can be enabled:

1. Produce approved English Year 1 Forest question assets.
2. Extend importer validation for English subject rows.
3. Generate an approved English manifest or subject-aware manifest.
4. Add runtime content loading by package context.
5. Add package-aware route selection or English-specific adapter routes.
6. Add English badge/reward assets.
7. Add Parent Dashboard multi-subject progress views.
8. Add English QA and playtest coverage.

## Science Activation Prerequisites

Before Science can be enabled:

1. Finalize Science Year 1 curriculum map.
2. Produce approved Science question assets.
3. Extend importer and QA reports for Science.
4. Generate approved Science runtime content.
5. Add Science visual object and explanation support where needed.
6. Add Science reward/badge assets.
7. Add Science package route adapters.
8. Add Science QA and playtest coverage.

## Tests Added

The focused architecture coverage was added to:

- `scripts/test-mvp-level-access.mjs`

New checks include:

- Subject Registry resolves Mathematics, English, Science, Bahasa Melayu, Life Skills, and AI Literacy.
- Mathematics remains the only active subject.
- English remains Coming Soon.
- Science remains Coming Soon.
- Mathematics package passes 10-level Forest validation.
- English package passes 10-level Forest validation.
- Science package passes 10-level Forest validation.
- Missing level metadata is rejected.
- Duplicate level numbers are rejected.
- Invalid world identity is rejected.
- Mathematics, English, and Science progress keys do not collide.
- Package lookup does not confuse Mathematics, English, and Science.
- Existing Mathematics level-access rules continue to pass.

## Command Results

All required commands passed.

| Command | Result |
| --- | --- |
| `npm.cmd run test:mvp-level-access` | Passed. `MVP level access tests passed: 36` |
| `npm.cmd run test:mvp-reset-safety` | Passed. `MVP reset safety tests passed: 7` |
| `npm.cmd run test:mvp-year-availability` | Passed. `MVP year availability tests passed: 22` |
| `npm.cmd run test:question-assets` | Passed. `Question asset import tests passed.` |
| `npm.cmd run validate:curriculum` | Passed. 100 approved questions, 10 levels, 0 warnings |
| `npm.cmd run lint` | Passed |
| `npx.cmd tsc --noEmit --incremental false` | Passed |
| `npm.cmd run build` | Passed |

Production build completed successfully with Next.js 16.2.9.

## Risks

- The app still has active route and UI assumptions around Mathematics Forest World. This is safe for beta but must be abstracted before enabling English or Science gameplay.
- English and Science packages use planned question sources only. They must not be marked active until approved manifests exist.
- The Subject Registry uses the existing Life Skills artwork for AI Literacy until a dedicated asset is produced.
- Parent Dashboard displays coming-soon subjects, but it is not yet a full multi-subject analytics view.
- Import and validation scripts are still Mathematics-specific.

## Assumptions

- Mathematics Year 1 Forest World remains the only active beta learning product.
- The latest 10-level universal Forest World direction supersedes the earlier English planning documents that described a 5-level English beta and `english-forest-world` ID.
- English and Science should share the standard `forest-world` world ID while progress remains isolated by subject and year.
- No user has active English or Science progress yet.
- Supabase progress JSON can safely store future subject/world keys without a schema change.
- Existing local and synced Mathematics progress must remain readable.

## Recommendation

The next safe phase is to make the question import and manifest pipeline package-aware without changing production gameplay.

Recommended next task:

Create a package-aware content-source adapter that can validate and preview English and Science content while continuing to serve only the active Mathematics manifest in production.
