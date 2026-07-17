# English Forest World Implementation Checklist

## Release Goal

Add English Year 1 Forest World as a free beta subject with 5 levels and 50 active questions while preserving Mathematics Year 1 Forest World behavior.

Do not activate English until the package-aware loader, progress isolation, and content validation are complete.

## Go / No-Go Summary

Go when:

- English content package has 50 approved active questions.
- English progress is stored separately from Mathematics.
- Parent Dashboard shows English and Mathematics separately.
- English routes cannot bypass progression.
- All unsupported future question types are excluded from active content.
- Mathematics regression passes.

No-go when:

- The active manifest loader still accepts only Mathematics.
- Parent Dashboard still imports Mathematics-only levels.
- English uses the same Supabase `current_world` semantics without subject context.
- English content has Review/Pending rows in active gameplay.
- Required visual assets are missing.

## Phase E1: Architecture and Subject Isolation

Codex level recommendation: Very High

Goal:
Prepare the app to support English without changing current Mathematics behavior.

Files likely affected:

- `data/feature-flags.ts`
- `data/forest-world-identity.ts`
- new `data/learning-worlds.ts`
- `data/mvp-forest-world.ts`
- `lib/curriculum/active-content.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `lib/progress/level-access.ts`
- `components/mvp/useMvpProgress.ts`
- `components/mvp/ParentDashboardClient.tsx`
- `components/mvp/MathematicsMvpPage.tsx`
- `app/subjects/[subject]/page.tsx`

Implementation checklist:

- [ ] Create a subject-general `LearningWorldRef` or `LearningPackage` registry.
- [ ] Register current Mathematics package with no behavior change.
- [ ] Add future English package as inactive.
- [ ] Make level access accept `totalLevels`.
- [ ] Make progress lookup accept subject/year/worldId.
- [ ] Ensure `progressWorldKey` separates Mathematics and English.
- [ ] Keep `/mvp/*` Mathematics routes unchanged.
- [ ] Decide beta route strategy for English.
- [ ] Keep English subject card disabled until E3 or E5.

Acceptance criteria:

- Mathematics routes still work.
- Mathematics progress remains readable.
- No English route is publicly active yet.
- Data model can represent English separately.
- Existing localStorage migration still works.

Tests required:

- `npm run test:mvp-level-access`
- New test: Mathematics and English progress keys do not collide.
- New test: 5-level world access works.
- New test: 10-level Mathematics access still works.
- Lint, typecheck, build.

Estimated complexity: Large

## Phase E2: English Question Template and Importer Support

Codex level recommendation: High

Goal:
Allow local English CSV/XLSX exports to validate and import into local JSON without production activation.

Files likely affected:

- `data/question-asset-schema.ts`
- `lib/question-assets/import-question-assets.ts`
- `lib/question-assets/validate-question-assets.ts`
- `lib/question-assets/random-question-pool.ts`
- `scripts/import-question-assets.mjs`
- `scripts/import-year1-forest-question-assets.mjs` or a new generic script
- `scripts/test-question-asset-import.mjs`
- `app/dev/question-engine-preview/page.tsx`
- `docs/content/QUESTION_ASSET_IMPORT_WORKFLOW.md`
- new `content/question-assets/imports/english/year-1/`

Implementation checklist:

- [ ] Create English question asset template.
- [ ] Add subject/year/world arguments to importer.
- [ ] Map English fields to normalized question engine format.
- [ ] Support English labels:
  - Multiple Choice
  - True or False
  - Tap Correct Answer
  - Tap Correct Group
  - Fill Missing Letter
  - Fill Missing Word
  - Match Pairs
  - Count or Type
- [ ] Skip Review/Future unsupported rows without blocking.
- [ ] Block Approved unsupported rows.
- [ ] Add English source selector to dev preview.
- [ ] Keep production manifest unchanged.

Acceptance criteria:

- English sample imports locally.
- English rows are validated but not active.
- English dev preview can render imported rows.
- Existing Mathematics importer tests still pass.

Tests required:

- Approved supported English row imports.
- Approved unsupported English row fails.
- Review unsupported English row skips.
- Fill Missing Letter accepted answer matching is case-insensitive.
- Match Pairs canonical data is generated.
- Duplicate English Question IDs fail.

Estimated complexity: Medium to Large

## Phase E3: Level 1 Pilot With 10 Questions

Codex level recommendation: High

Goal:
Build and test a controlled English Level 1 pilot for uppercase/lowercase letters.

Files likely affected:

- `content/question-assets/imports/english/year-1/english-forest-l01.csv`
- `content/question-assets/english/year-1/english-forest-world/english-forest-l01-imported.json`
- `content/question-bank/english/year-1/english-forest-world/level-1.json`
- generated English pilot manifest
- English dev preview source list
- English route files if enabled behind dev/beta flag
- English level config

Implementation checklist:

- [ ] Author 30-40 Level 1 source rows.
- [ ] Validate KSSR/Cambridge working alignment.
- [ ] Include at least:
  - Multiple Choice
  - Match Pairs
  - Tap Correct Answer
  - Fill Missing Letter
  - True or False
- [ ] Approve exactly 10 active Level 1 rows for beta pilot.
- [ ] Generate English Level 1 manifest.
- [ ] Test in dev preview.
- [ ] Test in gated English lesson route.
- [ ] Confirm no Mathematics content changes.

Acceptance criteria:

- English Level 1 has 10 active approved questions.
- English Level 1 uses supported production question types only.
- English progress is saved under English world key.
- English Level 2 remains locked or unavailable.
- Parent Dashboard can show English as not started or Level 1 in progress.

Tests required:

- English Level 1 import validation.
- English Level 1 route smoke.
- English Level 1 progression guard.
- English and Mathematics progress separation.
- Mobile lesson playtest.

Estimated complexity: Medium

## Phase E4: Levels 2-5 Content Production

Codex level recommendation: High

Goal:
Complete English beta content package.

Files likely affected:

- `content/question-assets/imports/english/year-1/*.csv`
- `content/question-assets/english/year-1/english-forest-world/*.json`
- `content/question-bank/english/year-1/english-forest-world/level-2.json`
- `content/question-bank/english/year-1/english-forest-world/level-3.json`
- `content/question-bank/english/year-1/english-forest-world/level-4.json`
- `content/question-bank/english/year-1/english-forest-world/level-5.json`
- English manifest output
- English world mapping config
- English asset checklist

Implementation checklist:

- [ ] Level 2: Beginning sounds.
- [ ] Level 3: Match words to pictures.
- [ ] Level 4: Simple CVC words.
- [ ] Level 5: Vocabulary and simple sentences.
- [ ] Each level has source pool and 10 active approved rows.
- [ ] Every row has explanation, LearnBot tip, voice script, visual description, and required asset.
- [ ] All unsupported future rows remain Review/Future, not active.
- [ ] All assets exist or are CSS-rendered.
- [ ] Run full content QA.

Acceptance criteria:

- 50 active approved English beta questions.
- 5 levels with 10 active questions each.
- No active unsupported question types.
- All English visual metadata renders.
- All voice scripts are present for future narration.
- Content is age-appropriate.

Tests required:

- Full English package validation.
- Question type distribution report.
- Duplicate wording/explanation/tip audit.
- Renderer diagnostics.
- Random pool session test.
- Manual playtest for all five levels.

Estimated complexity: Large

## Phase E5: QA, Import, Playtest, and Beta Release

Codex level recommendation: Very High

Goal:
Release English Forest World into parent testing.

Files likely affected:

- `data/feature-flags.ts`
- `app/subjects/[subject]/page.tsx`
- English routes
- English manifest registry
- Parent Dashboard display
- Rewards/badge config
- Release checklist documents

Implementation checklist:

- [ ] Activate `englishYear1ForestWorld` feature flag.
- [ ] Keep `englishWordBuilder` coming soon unless intentionally connected.
- [ ] Confirm English appears on Subjects page as playable.
- [ ] Confirm English Level 1 opens from subject page.
- [ ] Confirm progression lock for Levels 2-5.
- [ ] Confirm Level 5 completion awards English badge.
- [ ] Confirm Parent Dashboard shows English separately.
- [ ] Confirm reset local progress messaging accounts for multiple subjects.
- [ ] Confirm Supabase sync preserves Mathematics and English.
- [ ] Run mobile and desktop smoke tests.

Acceptance criteria:

- Parent can choose Mathematics or English.
- English is clearly free during beta.
- English Forest World has 5 playable levels.
- English questions do not affect Mathematics progress.
- Parent Dashboard summarizes both subjects.
- No broken assets.
- No future unsupported question types in active English.

Tests required:

- Full Mathematics regression.
- Full English smoke test.
- Parent Dashboard two-subject test.
- Supabase sync test.
- Locked route bypass test.
- Mobile responsiveness test.
- Accessibility check.
- Lint, typecheck, build.

Estimated complexity: Large

## Required File Groups

Architecture:

- `data/learning-worlds.ts`
- `data/feature-flags.ts`
- `lib/progress/level-access.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`

Content:

- `content/question-assets/imports/english/year-1/`
- `content/question-assets/english/year-1/english-forest-world/`
- `content/question-bank/english/year-1/english-forest-world/`
- `content/world-mapping/english/year-1/`

Runtime:

- `lib/curriculum/active-content.ts`
- English subject page and routes
- world map and level/question route adapters
- Parent Dashboard

Tests:

- importer tests
- level access tests
- progress isolation tests
- subject routing tests
- manifest validation tests

Documentation:

- English question author guide
- English asset checklist
- English beta QA checklist
- English release notes

## Progress Isolation Checklist

- [ ] Mathematics progress key remains `mathematics:1:forest-world`.
- [ ] English progress key becomes `english:1:english-forest-world`.
- [ ] English level completion never writes to Mathematics world entry.
- [ ] English badge has a distinct badge name.
- [ ] Parent Dashboard reads both entries.
- [ ] Reset flows state whether they clear local all-subject progress or current subject only.
- [ ] Synced child progress preserves all `worlds` entries.

## English Asset Checklist

Minimum beta assets:

- [ ] English subject image exists and is used.
- [ ] English Forest World cover.
- [ ] English Forest Explorer Badge.
- [ ] Letter tile component.
- [ ] Word card component.
- [ ] Picture card set for Level 2 and Level 3.
- [ ] CVC word picture set.
- [ ] Simple sentence picture set.
- [ ] LearnBot states reused cleanly.
- [ ] No placeholder or broken image icons.

## Content QA Checklist

For every active English question:

- [ ] Question ID is unique.
- [ ] Subject = English.
- [ ] Year = 1.
- [ ] World = English Forest World.
- [ ] Level is 1-5.
- [ ] Question type is supported.
- [ ] Correct answer is valid.
- [ ] Explanation is complete.
- [ ] LearnBot tip is short and useful.
- [ ] Voice script is present.
- [ ] Visual description is present.
- [ ] Required asset exists or is CSS-rendered.
- [ ] KSSR working alignment filled.
- [ ] Cambridge working alignment filled where appropriate.
- [ ] Review Status = Approved.
- [ ] Status = Approved.
- [ ] Approved by Fara.

## Recommended First Implementation Task

Implement E1 first:

Create a subject-general world/package registry and adapt progress/level-access helpers to accept a world reference and total level count. Keep all Mathematics route behavior unchanged. This creates the safety layer English needs before any content is imported or activated.

## Estimated English Beta Scope

Minimum parent-testing scope:

- 5 English levels.
- 50 active questions.
- 210+ source questions recommended.
- English subject card active.
- English progress separate from Mathematics.
- Parent Dashboard shows English separately.

Recommended parent-testing message:

```txt
English Forest World is included free during beta. It helps children practise letters, sounds, words, and simple sentences.
```

