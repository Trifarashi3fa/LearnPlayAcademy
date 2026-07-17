# LearnPlay English Forest World MVP Plan

## Executive Summary

LearnPlay can add a free Year 1 English Forest World MVP by reusing much of the existing Mathematics Forest World foundation, but it should not be added by copying the Mathematics runtime as-is. The current app is partially multi-subject at the data type and progress-key level, while the active lesson routes, manifest loader, validation script, Parent Dashboard, and Forest identity still assume Mathematics Year 1.

Recommended beta scope:

- Subject: English
- Year: 1
- World: English Forest World
- Access: free during beta
- Levels: 5
- Active gameplay questions: 50
- Active questions per level: 10
- Recommended source pool: 30 to 50 questions per level
- Question model: local governed JSON generated from authoring sheets
- Progress: separate from Mathematics by subject, year, and world identity

Recommended world identity:

```txt
subject = english
year = 1
worldId = english-forest-world
worldName = English Forest World
completionBadge = English Forest Explorer Badge
```

Using `english-forest-world` avoids ambiguity in the existing Supabase `current_world` field and makes parent dashboard copy clearer. The progress model can already key progress by subject/year/world, but several active screens still import the Mathematics `forestWorldIdentity`.

## Existing Architecture Reviewed

Files and folders inspected for this plan:

- `app/page.tsx`
- `app/subjects/page.tsx`
- `app/subjects/[subject]/page.tsx`
- `app/mvp/world-map`
- `app/mvp/level/[level]/page.tsx`
- `app/mvp/question/[level]/page.tsx`
- `app/mvp/rewards`
- `app/mvp/parent-dashboard/page.tsx`
- `components/mvp/MathematicsMvpPage.tsx`
- `components/mvp/WorldMapClient.tsx`
- `components/mvp/LevelIntroClient.tsx`
- `components/mvp/QuestionPlayer.tsx`
- `components/mvp/ParentDashboardClient.tsx`
- `components/mvp/useMvpProgress.ts`
- `components/mvp/question-engine/QuestionRenderer.tsx`
- `components/mvp/question-engine/renderers/*`
- `data/feature-flags.ts`
- `data/subject-pathways.ts`
- `data/curriculum-types.ts`
- `data/forest-world-identity.ts`
- `data/mvp-forest-world.ts`
- `data/progress-types.ts`
- `data/question-engine-types.ts`
- `data/question-asset-schema.ts`
- `lib/curriculum/active-content.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `lib/progress/level-access.ts`
- `lib/question-engine/normalize-question.ts`
- `lib/question-assets/import-question-assets.ts`
- `lib/question-assets/random-question-pool.ts`
- `lib/question-assets/validate-question-assets.ts`
- `scripts/validate-curriculum.mjs`
- `scripts/import-question-assets.mjs`
- `scripts/import-year1-forest-question-assets.mjs`
- `scripts/test-question-asset-import.mjs`
- `content/curriculum/`
- `content/question-bank/mathematics/year-1/forest-world/`
- `content/question-assets/mathematics/year-1/forest-world/`
- `content/question-assets/imports/mathematics/year-1/`
- `generated/active-content-manifest.json`
- `public/subjects/`
- `public/worlds/`
- `public/mascots/`
- `public/rewards/`
- `package.json`

## What Can Be Reused Without Code Changes

These areas can be reused conceptually and, in some cases, directly:

- LearnPlay visual system: buttons, cards, lesson shell, rewards styling, LearnBot presentation.
- Question Engine renderers:
  - Multiple Choice
  - True or False
  - Count Objects as a text/numeric input pattern, adapted later as Count or Type for English
  - Tap Answer
  - Fill In Blank
  - Match Pairs, where canonical pair data exists
- Dev-only question asset preview approach.
- Random question pool concept.
- Local question asset CSV-to-JSON workflow.
- Governance fields: status, review status, approved by, approval date, version, version notes, assessment eligibility.
- World-aware progress type structure in `data/progress-types.ts`.
- `progressWorldKey(ref)` pattern in `lib/progress/local-progress.ts`.
- Supabase `child_progress.progress_data` JSON shape, provided it receives a separate English world key.
- Parent account and child profile model.
- Existing subject card assets, especially `public/subjects/english.webp`.
- Existing LearnBot and reward assets.

## What Requires Subject-General Refactoring

English should not be enabled until these Mathematics-specific assumptions are isolated:

1. Active content manifest loader
   - Current `lib/curriculum/active-content.ts` validates exactly `mathematics`, Year 1, `forest-world`, and 100 questions.
   - English needs a package-aware loader, for example:
     `getApprovedQuestionsForPackage({ subject, year, worldId, level })`.

2. Curriculum validation
   - `scripts/validate-curriculum.mjs` is hardcoded to Mathematics Year 1 Forest World and exactly 100 questions.
   - English needs either a second validator or a package registry that can validate Mathematics and English independently.

3. Routes
   - Active routes under `/mvp/*` are Mathematics Forest by default.
   - English needs either subject-specific routes or a generalized route:
     `/learn/[subject]/year-[year]/[worldId]/...`.
   - For beta safety, a parallel English route is easier:
     `/mvp/english/world-map`, `/mvp/english/level/[level]`, `/mvp/english/question/[level]`.

4. World identity
   - `data/forest-world-identity.ts` is Mathematics-specific.
   - Create a subject-general world registry before activating English.

5. Level model
   - `data/mvp-forest-world.ts` contains the Mathematics level list, question adapter, visual inference, and subject list.
   - English needs its own level config and content adapter, not more conditionals inside the Mathematics file.

6. Level access
   - `lib/progress/level-access.ts` assumes a 10-level Forest World.
   - English has 5 beta levels, so access helpers need `totalLevels` and `worldRef`.

7. Parent Dashboard
   - `components/mvp/ParentDashboardClient.tsx` imports Mathematics `forestLevels`, `mvpSubjects`, and `forestWorldIdentity`.
   - English requires subject rows and per-world recommendations that do not overwrite Mathematics progress.

8. Rewards
   - Reward copy and badge names are Forest Mathematics oriented.
   - English needs configurable badge and skill labels.

9. Question visual renderer
   - Current `data/mvp-forest-world.ts` visual inference is math/object-counting oriented.
   - English should use authored visual metadata for letters, sounds, words, and pictures.

10. Import pipeline
   - Current batch importer is Mathematics Year 1 Forest specific.
   - English needs generic subject/year/world arguments and English type mapping.

## Existing Mathematics Hardcoding Risks

High-risk hardcoded areas:

- `data/forest-world-identity.ts`
  - `subject: "mathematics"`
  - `worldId: "forest-world"`
  - badge and boss names.

- `lib/curriculum/active-content.ts`
  - Blocks any manifest that is not Mathematics Year 1 `forest-world`.

- `scripts/validate-curriculum.mjs`
  - Assumes Mathematics Year 1 and 100 questions.

- `app/subjects/[subject]/page.tsx`
  - Only Mathematics returns the MVP page. English is unavailable.

- `components/mvp/QuestionPlayer.tsx`
  - Uses Mathematics Forest identity and level content.

- `components/mvp/ParentDashboardClient.tsx`
  - Uses Mathematics Forest levels and labels.

- `components/mvp/WorldMapClient.tsx`
  - Uses Mathematics 10-level Forest path.

- `lib/progress/level-access.ts`
  - Assumes 10 levels.

- `lib/progress/local-progress.ts`
  - Defaults new progress to Mathematics Forest.

- `content/question-bank/mathematics/year-1/forest-world/`
  - Current governed content source is Mathematics only.

Medium-risk hardcoded areas:

- `/games/word-builder` exists but is gated as an inactive English game, not aligned with the proposed English Forest World flow.
- Subject cards have English artwork, but the English card is disabled by feature flags.
- Existing account and dashboard pages may display `current_world` as Forest World without subject context.

## Recommended English Content Architecture

Create these future content areas:

```txt
content/question-assets/english/year-1/english-forest-world/
content/question-assets/imports/english/year-1/
content/question-bank/english/year-1/english-forest-world/
content/world-mapping/english/year-1/english-forest-world.json
content/curriculum/english/year-1/
```

Recommended generated manifests:

```txt
generated/active-content-manifests/mathematics-year-1-forest-world.json
generated/active-content-manifests/english-year-1-english-forest-world.json
```

If the current single `generated/active-content-manifest.json` must remain for Mathematics, add English as a second generated file first. Do not merge into the live manifest until the loader is package-aware.

## English-Specific Data Types Needed

Keep the generic Question Engine types, but extend the question asset schema with English-specific authored metadata.

Recommended English asset fields:

- `Language Skill`
  - Letters
  - Phonics
  - Vocabulary
  - Word Reading
  - Simple Sentences
- `Letter Focus`
  - Example: A/a, B/b, m, s, t
- `Sound Focus`
  - Example: /m/, /s/, /a/
- `Word Focus`
  - Example: cat, sun, pen
- `CVC Pattern`
  - Example: CVC, short-a, short-e
- `Picture Asset Key`
  - Example: apple, cat, dog, sun
- `Accepted Answers`
  - For fill-in-blank or type-answer questions.
- `Case Sensitive`
  - Usually false for beta unless the task is explicitly uppercase/lowercase.
- `Audio Prompt`
  - Text that should be narrated.
- `Voice Target`
  - Letter name, letter sound, word, or sentence.
- `Distractor Rationale`
  - Why each wrong answer is plausible.

Recommended normalized visual metadata:

```ts
type EnglishVisualMetadata =
  | { type: "letter-match"; uppercase: string; lowercase: string }
  | { type: "beginning-sound"; sound: string; letter: string; pictureKey: string; word: string }
  | { type: "word-picture"; word: string; pictureKey: string }
  | { type: "cvc-word"; word: string; missingLetter?: string; letterSlots: string[] }
  | { type: "sentence-picture"; sentence: string; pictureKey: string; targetWord?: string };
```

## English Progress in Parent Dashboard

English progress should appear as a separate subject summary, not mixed into Mathematics totals.

Recommended parent dashboard structure:

- Overall beta progress
  - Mathematics Year 1 Forest World
  - English Year 1 Forest World
- Per subject card:
  - Subject
  - Current world
  - Current level
  - Completed levels
  - Stars
  - XP
  - Badge
  - Recommended next mission
- Recent skills:
  - Mathematics skills and English skills separated.
- Recommended practice:
  - English letter/sound/word practice should not be labelled as weak-topic analytics unless true attempt-level analytics exists.

How to prevent progress overwrites:

- Use a unique world ref:

```ts
{
  subject: "english",
  year: 1,
  worldId: "english-forest-world"
}
```

- Store progress under `progress.worlds[progressWorldKey(ref)]`.
- Avoid using only `current_world` to identify progress.
- When syncing to Supabase, include `current_subject`, `current_world`, `current_level`, and `progress_data.worlds`.
- Update all reset, delete, and dashboard flows to preserve both Mathematics and English world entries unless the user explicitly resets all local progress.

## Required Routes and Navigation

Minimum beta route plan:

```txt
/subjects
/subjects/english
/mvp/english/world-map
/mvp/english/level/[level]
/mvp/english/question/[level]
/mvp/english/rewards
```

Alternative long-term route plan:

```txt
/learn/[subject]/year-[year]/[worldId]/world-map
/learn/[subject]/year-[year]/[worldId]/level/[level]
/learn/[subject]/year-[year]/[worldId]/question/[level]
```

Recommended beta approach:

- Keep Mathematics routes unchanged for safety.
- Add English-specific routes behind `englishYear1ForestWorld`.
- Later consolidate into a generic route after parent testing.

Navigation changes:

- Activate the English subject card only after E3 or E5 acceptance.
- Keep `/games/word-builder` separate and still coming soon unless intentionally folded into English Forest World later.
- Add subject switcher or breadcrumb from English pages back to Subjects.

## Required Image Assets

Existing assets that can be reused:

- `public/subjects/english.webp`
- `public/mascots/learnbot-*.webp`
- `public/rewards/star.webp`
- generic rewards and badge assets
- forest world background assets, with caution that current world art is Mathematics branded in some places

New English-specific assets recommended before beta:

- English Forest World cover card
- English Forest Explorer Badge
- Level icons:
  - Letters
  - Beginning sounds
  - Picture words
  - CVC words
  - Simple sentences
- Alphabet card visuals
- Picture vocabulary set:
  - apple, ant, ball, bat, cat, dog, sun, pen, hat, cup, fish, bird, tree, bag, book
- Sound icon or speaker icon treatment
- Letter tile components should be CSS/HTML where possible, not heavy images.

Asset rule:

- Use existing LearnPlay style.
- Do not copy third-party phonics artwork.
- Prefer reusable SVG/CSS tiles for letters.
- Use transparent WebP/PNG only when character or picture art requires transparency.

## Required Importer and Manifest Changes

Importer changes:

- Generalize scripts to accept:
  - subject
  - year
  - worldId
  - level
  - source file
  - sheet name
- Add English question type label mapping:
  - `Multiple Choice` -> `multiple-choice`
  - `True or False` -> `true-false`
  - `Count & Type` / `Type Answer` -> `fill-in-blank` or `count-objects` depending on target response
  - `Tap Correct Answer` -> `tap-answer`
  - `Tap Correct Group` -> `tap-answer`
  - `Fill Missing Letter` -> `fill-in-blank`
  - `Fill Missing Word` -> `fill-in-blank`
  - `Match Pairs` -> `match-pairs`
- Keep unsupported labels as skipped Review/Future rows, not errors, unless Approved.

Manifest changes:

- Do not replace the Mathematics manifest.
- Add a package-aware manifest output.
- Validate English package separately:
  - 5 levels
  - 10 active questions per level
  - 50 active approved questions
  - all rows approved by Fara before production activation
  - no Draft/Review/Pending rows in active English manifest

## Required Tests

Add tests before activating English:

- Subject feature flag tests:
  - English unavailable before activation.
  - English playable after activation flag and manifest are present.

- Loader tests:
  - Mathematics manifest still loads 100 questions.
  - English manifest loads 50 questions.
  - Invalid subject/world mismatch fails.

- Progress tests:
  - Mathematics progress and English progress use different keys.
  - Completing English Level 1 does not unlock Mathematics Level 2.
  - Completing Mathematics levels does not unlock English levels.
  - Reset local progress copy is clear about both subjects.

- Level access tests:
  - English Level 1 accessible with no English progress.
  - English Level 2 blocked until English Level 1 complete.
  - English Level 5 blocked until Level 4 complete.
  - English route cannot bypass locked levels.

- Import tests:
  - English Approved supported row imports.
  - English Approved unsupported row fails.
  - English Review unsupported row skips without blocking.
  - Fill Missing Letter accepted answers normalize case and whitespace.
  - Match Pairs has canonical pairs.

- Parent Dashboard tests:
  - Shows Mathematics and English as separate subject progress.
  - Uses parent-friendly labels, not weak-topic claims.
  - Handles no English progress yet.

- Route smoke tests:
  - `/subjects/english`
  - `/mvp/english/world-map`
  - `/mvp/english/level/1`
  - `/mvp/english/question/1`

## Risks and Dependencies

Critical risks:

- English progress could overwrite or confuse Mathematics if screens rely on `current_world` alone.
- Current active manifest loader rejects non-Mathematics content.
- Parent Dashboard currently imports Mathematics Forest data directly.
- Level access assumes 10 levels, while English beta has 5.

High risks:

- Question visual metadata is currently math-oriented.
- English voice narration requirements may expand scope if audio playback is expected in beta.
- Match Pairs must be validated with English letter/word pairs before public use.
- KSSR and Cambridge alignment must be checked by a curriculum reviewer before marking content Approved.

Medium risks:

- Existing English Word Builder route may confuse parents if English Forest is activated separately.
- English assets may feel inconsistent if only subject card art exists.
- Fill-in-blank needs clear mobile keyboard behavior.

Dependencies:

- Approved English question template.
- English import mapping.
- English content review workflow.
- Package-aware manifest loader.
- Subject-aware progress and dashboard display.
- Minimum English visual asset pack.

## Implementation Phases

### E1: Architecture and Subject Isolation

Codex level recommendation: Very High

Goal:
Make the current MVP safely able to host more than one active subject without changing Mathematics behavior.

Files likely affected:

- `data/feature-flags.ts`
- `data/forest-world-identity.ts`
- new `data/learning-worlds.ts`
- `data/mvp-forest-world.ts`
- `lib/curriculum/active-content.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/level-access.ts`
- `components/mvp/useMvpProgress.ts`
- `components/mvp/ParentDashboardClient.tsx`
- `app/subjects/[subject]/page.tsx`

Acceptance criteria:

- Mathematics behaves exactly as before.
- English remains hidden or coming soon.
- Progress world keys support Mathematics and English separately.
- Level access accepts configurable total levels.
- No active manifest change.

Tests required:

- Existing build and curriculum validation.
- Level access tests for 10-level and 5-level worlds.
- Progress key separation test.

Estimated complexity: Large

### E2: English Question Template and Importer Support

Codex level recommendation: High

Goal:
Add English authoring/import schema support while keeping production inactive.

Files likely affected:

- `data/question-asset-schema.ts`
- `lib/question-assets/import-question-assets.ts`
- `lib/question-assets/validate-question-assets.ts`
- `lib/question-assets/random-question-pool.ts`
- `scripts/import-question-assets.mjs`
- `scripts/test-question-asset-import.mjs`
- `docs/content/QUESTION_ASSET_IMPORT_WORKFLOW.md`
- new English template under `content/question-assets/imports/english/year-1/`

Acceptance criteria:

- English CSV rows can be imported locally.
- Unsupported future types are skipped or blocked according to approval status.
- English-specific fields are preserved.
- No production route consumes English content yet.

Tests required:

- English import tests.
- English fill-in-blank normalization tests.
- English Match Pairs canonical mapping tests.

Estimated complexity: Medium to Large

### E3: Level 1 Pilot With 10 Questions

Codex level recommendation: High

Goal:
Create a playable, dev/beta-gated Level 1 English pilot using uppercase/lowercase letters.

Files likely affected:

- `content/question-assets/english/year-1/english-forest-world/`
- `content/question-bank/english/year-1/english-forest-world/`
- generated English manifest file
- English route files, if E1 chooses parallel routes
- English level config
- dev preview source selector

Acceptance criteria:

- Level 1 has at least 30 source questions.
- 10 approved active Level 1 questions are generated.
- English Level 1 plays without changing Mathematics.
- Progress is stored under English world key.
- Parent Dashboard can show English no-progress or Level 1 progress.

Tests required:

- English Level 1 route smoke.
- Direct URL access guard.
- Progress separation test.
- Import and manifest validation for English Level 1.

Estimated complexity: Medium

### E4: Levels 2-5 Content Production

Codex level recommendation: High

Goal:
Produce and approve English Levels 2-5.

Files likely affected:

- English CSV/source files
- English imported JSON files
- English governed question-bank files
- English manifest generator output
- English level config
- English asset references

Acceptance criteria:

- 5 levels have 10 active approved questions each.
- Each level has a reusable source pool.
- All content has complete explanations, LearnBot tips, voice scripts, visual descriptions, and asset references.
- No future unsupported question types are active.

Tests required:

- English full package validation.
- Random pool distribution by level.
- Renderer support summary.
- Manual playtest on mobile and desktop.

Estimated complexity: Large

### E5: QA, Import, Playtest, and Beta Release

Codex level recommendation: Very High

Goal:
Activate English Forest World for parent testing.

Files likely affected:

- `data/feature-flags.ts`
- subject routing
- English manifest registry
- Parent Dashboard display
- Rewards/badge config
- beta checklist and release documentation

Acceptance criteria:

- English subject card is active.
- English route is accessible from Subjects.
- All 5 levels enforce progression.
- Mathematics progress remains intact.
- English progress persists locally and syncs under child profile.
- Parent Dashboard shows English separately.
- Release checklist passes.

Tests required:

- Full English smoke test.
- Full Mathematics regression smoke test.
- Parent Dashboard two-subject test.
- Mobile compatibility check.
- Build, lint, typecheck, curriculum validation.

Estimated complexity: Large

## Recommended First Implementation Task

Start with E1 only:

Create a subject-general learning package registry and progress/world access helpers while preserving all current Mathematics imports and behavior. Do not create English content first. The biggest risk is not content writing; it is activating a second subject on top of Mathematics-specific runtime assumptions.

## External Curriculum References Checked

The curriculum map should be reviewed against current official documents before content approval. Public references checked while preparing this plan:

- Cambridge International, Cambridge Primary English (0058): https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/english/
- Cambridge International, Cambridge Primary English as a Second Language (0057): https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/resource-list/cambridge-primary-english-as-a-second-language-0057/
- Cambridge Help, Primary stages and age guidance: https://help.cambridgeinternational.org/hc/en-gb/articles/360000048218-At-what-age-should-children-start-following-Cambridge-Primary-curriculum-frameworks
- Malaysia Ministry of Education note on KSSR Semakan 2017 English alignment and CEFR context: https://www.moe.gov.my/rethink-revamp-teaching-and-learning-of-english-new-straits-times-22-mei-2019
- Malaysia Ministry of Education 2025 curriculum alignment notice for Bahasa Melayu and Bahasa Inggeris Tahap 1: https://www.moe.gov.my/index.php/surat-siaran-kpm-bil-1-tahun-2025-pelaksanaan-dokumen-penjajaran-kurikulum-standard-sekolah-rendah-semakan-2017
