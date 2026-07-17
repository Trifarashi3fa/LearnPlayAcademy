# English Content Pipeline Report

Date: 2026-07-17

## Summary

English Year 1 Forest World now has a local content pipeline for authoring, importing, validating, previewing, and preparing release content without activating English gameplay.

Mathematics remains the only active production subject. The Mathematics active manifest was not modified, Supabase was not changed, and no English question bank was generated.

## Files Changed

Created:

- `ENGLISH_QUESTION_TEMPLATE.csv`
- `content/question-assets/imports/english/year-1/.gitkeep`
- `content/question-assets/english/year-1/forest-world/.gitkeep`
- `generated/question-assets/english/.gitkeep`
- `ENGLISH_CONTENT_PIPELINE_REPORT.md`

Changed:

- `app/dev/question-engine-preview/page.tsx`
- `components/mvp/question-engine/PilotQuestionEnginePreview.tsx`
- `data/question-asset-schema.ts`
- `lib/question-assets/import-question-assets.ts`
- `lib/question-assets/random-question-pool.ts`
- `lib/question-assets/validate-question-assets.ts`
- `package.json`
- `scripts/import-question-assets.mjs`
- `scripts/test-question-asset-import.mjs`

Pre-existing uncommitted architecture files from earlier multi-subject work remain in the working tree and were not reverted.

## Folder Structure

English authoring imports:

```text
content/question-assets/imports/english/year-1/
```

English imported JSON output:

```text
content/question-assets/english/year-1/forest-world/
```

English generated QA reports:

```text
generated/question-assets/english/
```

These folders are intentionally empty except for `.gitkeep` until real English CSV/XLSX exports are imported.

## CSV Template

Created:

```text
ENGLISH_QUESTION_TEMPLATE.csv
```

Columns:

```text
Question ID, Subject, Year, World, Level, Topic, Learning Objective,
Curriculum Alignment, Cambridge Alignment, Question Type, Question,
Instructions, Option A, Option B, Option C, Option D, Correct Answer,
Explanation, LearnBot Tip, Voice Script, Visual Type, Visual Description,
Difficulty, XP, Status, Version, QA Notes
```

The template is header-only. No English questions were generated.

## Import Workflow

PowerShell-friendly commands:

```powershell
npm run import:questions:english-year1-forest -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.csv" --sheet "Forest L01" --level 1
```

Equivalent generic command:

```powershell
npm run import:questions -- --subject english --year 1 --world forest-world --level 1 --file "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.csv" --sheet "Forest L01"
```

The importer writes English outputs to:

```text
content/question-assets/english/year-1/forest-world/forest-l01-imported.json
generated/question-assets/english/year-1-forest-l01-import-report.json
```

## Supported English Question Types

The English pipeline supports these authoring labels:

- Multiple Choice
- Match Pairs
- Tap Correct
- Fill Missing Letter
- Fill Missing Word
- Text Input
- True or False

Runtime mapping:

- Multiple Choice -> multiple-choice renderer
- Match Pairs -> dedicated/preview Match Pairs support when canonical pair data exists
- Tap Correct -> tap-answer renderer
- Fill Missing Letter -> fill-in-blank renderer
- Fill Missing Word -> fill-in-blank renderer
- Text Input -> fill-in-blank renderer
- True or False -> true-false renderer

## Validation Workflow

The importer now keeps these concepts separate:

- schema-valid
- imported/normalized
- renderer-supported
- publishable
- production-active

Rules added or confirmed for English:

- Approved rows are validated and imported.
- Review, Draft, Future, and Backlog rows are skipped before production schema validation.
- Duplicate question IDs are rejected.
- Subject, year, and world identity are checked so English cannot be imported into Mathematics paths accidentally.
- Unsupported approved question types fail.
- Review unsupported rows are skipped, not treated as blocking schema errors.
- English imports do not write to `generated/active-content-manifest.json`.
- English reports write under `generated/question-assets/english/`, not the Mathematics report folder.

## Preview Workflow

The dev-only preview at:

```text
/dev/question-engine-preview
```

now loads imported English Year 1 Forest World sources from:

```text
content/question-assets/english/year-1/forest-world/
```

The preview remains isolated:

- It is not linked from public navigation.
- It does not save learner progress.
- It does not award XP.
- It does not update badges.
- It does not activate English production gameplay.
- It does not modify the approved Mathematics manifest.

The random-session preview now passes the source subject/world into the selector so English preview rows are not filtered by Mathematics-only assumptions.

## Tests

Updated:

```text
scripts/test-question-asset-import.mjs
```

Coverage added:

- English template header validation.
- English approved import.
- English duplicate question ID rejection.
- English Review unsupported row skip.
- English Approved unsupported row failure.
- English subject-isolation failure when a row claims the wrong subject.
- English renderer support classification for supported labels.
- Active manifest isolation.
- Mathematics existing import behavior preserved.

## Command Results

```text
npm run test:question-assets
Result: Passed
Output: Question asset import tests passed.
```

```text
npm run test:mvp-level-access
Result: Passed
Output: MVP level access tests passed: 36
```

```text
npm run validate:curriculum
Result: Passed
Output: Curriculum validation passed. Validated questions: 100. Levels: 10. Warnings: 0.
```

```text
npm run lint
Result: Passed
```

```text
npx tsc --noEmit --incremental false
Result: Passed
```

```text
npm run build
Result: Passed
```

Build note:

Next.js/Turbopack reports one non-blocking warning involving `next.config.ts` in the import trace from `app/dev/question-engine-preview/page.tsx`. This appears related to server-side filesystem scanning in the dev preview. The build succeeds and production gameplay is unchanged.

## Remaining Work Before English Activation

1. Author real English CSV rows using `ENGLISH_QUESTION_TEMPLATE.csv`.
2. Import each English level CSV into local JSON.
3. Review generated English QA reports.
4. Confirm imported rows render correctly in `/dev/question-engine-preview`.
5. Add English governed question-bank records when content is approved.
6. Extend manifest generation to include English only after approval.
7. Enable English package availability in the subject/package registry.
8. Verify English progress appears separately from Mathematics in the Parent Dashboard.
9. Run full mobile and desktop QA.

## Confirmation

- No English gameplay was activated.
- No English production question bank was generated.
- No Supabase schema or policy was changed.
- No Mathematics active content manifest was changed.
- No commit or push was performed.
