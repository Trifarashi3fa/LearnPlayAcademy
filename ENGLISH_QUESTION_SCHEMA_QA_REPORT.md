# English Question Schema QA Report

Date: 2026-07-19
Project: LearnPlay Academy
Scope: English Year 1 structured question schema only. No interface redesign, no gameplay activation, no Mathematics migration.

## Schema Architecture

A new English-specific structured question schema was added in `data/english-question-types.ts`.

The schema is intentionally separate from the shared Mathematics/MVP question shape. It introduces a discriminated union based on `questionType`, with one branch for each approved English Year 1 type:

- `word-spelling` for Type A: Word Spelling.
- `fill-in-the-blank` for Type B: Fill in the Blank.
- `sentence-meaning` for Type C: Sentence Meaning.
- `matching` for Type D: Matching.
- `sentence-builder` for Type E: Sentence Builder.
- `picture-choice` for Type F: Picture Choice.

Each branch uses a shared English base interface for common fields, then adds only fields that belong to that question type. This avoids turning the shared Mathematics schema into a large optional-field object.

## Discriminated Union Structure

Common fields include:

- `id`
- `legacyId`
- `level`
- `topic`
- `skill`
- `subject: "english"`
- `questionType`
- `instruction`
- `prompt`
- `hint`
- `xpReward`
- `accessibility`
- optional `voice`
- `explanation`
- optional `visual`
- optional `legacyQuestion`

Explanation fields include:

- `correctAnswerText`
- `whyCorrect`
- `example`
- `learnBotTip`
- optional `wordMeaning`
- optional `funFact`
- optional `visual`
- optional `voiceScript`

Type-specific fields include:

- Type A: `correctWord`, `expectedLetterCount` or `spellingSlots`, `wordOptions`, optional letter tiles, image, and clue.
- Type B: `template`, `blankMarker`, `answerOptions`, `correctAnswer`, optional image and option labels.
- Type C: `sentence`, `answerChoices`, `correctAnswerId`, optional picture choices and voice script.
- Type D: `leftItems`, `rightItems`, stable `correctPairs`, optional images.
- Type E: `wordTiles`, `correctSequence`, optional punctuation and distractor tiles.
- Type F: `pictureOptions`, `correctOptionId`, optional short labels.

## Compatibility Adapter Behaviour

A temporary adapter was added in `lib/english/structured-question-adapter.ts`.

The adapter converts current legacy English `MvpQuestion` records into structured English records while preserving current runtime behaviour:

- Existing question IDs are preserved.
- Correct answers are preserved.
- XP rewards are preserved.
- Hints use the current `learnBotTip` value.
- Explanations preserve the existing explanation, visual explanation, and voice script.
- Legacy options are converted into stable choice IDs.
- Current English gameplay is not rewired to use the new schema yet.

The adapter maps current MCQ-shaped English questions into a safe subset of the new schema:

- Spelling-like questions become Type A.
- Missing or blank-style questions become Type B.
- Other legacy MCQ-shaped questions become Type C.

Types D, E, and F are fully defined and validated through fixtures, but current English runtime data is not force-migrated into those richer structures during this phase.

## Mathematics Protection

The adapter explicitly rejects non-English legacy questions. A question must have `subject === "english"` before it can be adapted.

No Mathematics data, routes, renderers, hints, explanations, visuals, progress logic, XP logic, or rewards were modified.

The shared `data/question-engine-types.ts` file was not changed.

## Validation Coverage

The validator checks:

- Supported English `questionType`.
- Required common fields.
- `subject` must be `english`.
- Level must be 1 through 10.
- Non-negative XP reward.
- Required accessibility metadata.
- Required explanation fields.
- Correct answer exists in options where applicable.
- Matching pair integrity.
- Sentence-builder sequence integrity.
- Picture option alt text.
- Duplicate question IDs in a collection.
- Hint text that may reveal the answer when reliably detectable.

The validator does not require `wordMeaning` unless authored content chooses to include it, which keeps non-vocabulary questions lightweight.

## Fixtures Added

`data/english-question-fixtures.ts` adds:

- 6 valid fixtures, one for each approved Type A-F.
- Invalid fixtures for missing required fields.
- Invalid field combination fixture.
- Unsupported question type fixture.
- Correct answer absent from options fixture.
- Invalid matching pair fixture.
- Invalid sentence-builder sequence fixture.
- Missing image alt text fixture.
- Duplicate ID collection fixture.

## Tests Added

`scripts/test-english-question-schema.mjs` verifies:

- The six locked English question types exist.
- Every valid Type A-F fixture passes validation.
- Invalid fixtures fail validation.
- Duplicate IDs are detected.
- Hint answer-reveal warnings are emitted.
- All 120 current English legacy questions adapt successfully.
- Adapted questions preserve ID, XP, correct answer, hint, voice script, and English subject identity.
- Every English level still has at least 10 source questions.
- Every English level still requests a 10-question randomized session.
- Non-English questions are rejected by the English adapter.

`package.json` now includes:

- `test:english-question-schema`
- The new test in the existing `npm test` chain.

## Test Results

Final command results:

- `npm.cmd run lint`: passed.
- `npx.cmd tsc --noEmit --incremental false`: passed.
- `npm.cmd test`: passed.
- `npm.cmd run test:english-year1-content`: passed.
- `npm.cmd run build`: passed.
- `git diff --check`: passed with Git CRLF warnings only.

Build also ran `validate:curriculum` through `prebuild` and passed:

- Validated questions: 100.
- Levels: 10.
- Warnings: 0.

## Files Changed

Created:

- `data/english-question-types.ts`
- `data/english-question-fixtures.ts`
- `lib/english/structured-question-adapter.ts`
- `scripts/test-english-question-schema.mjs`
- `ENGLISH_QUESTION_SCHEMA_QA_REPORT.md`

Modified:

- `package.json`

## Current Gameplay Impact

Current English gameplay remains visually unchanged. The shared `QuestionPlayer`, English routes, progress saving, XP, stars, rewards, randomized sessions, and explanation layout were not modified.

Mathematics files were untouched.

Science files were untouched.

## Remaining Migration Risks

- Current English content is still legacy MCQ-shaped at runtime.
- Type D, Type E, and Type F need dedicated English interface/rendering work before production activation of richer question types.
- The legacy adapter intentionally does not invent matching pairs, sentence-builder sequences, or picture options from incomplete MCQ data.
- Hint answer-reveal detection is conservative and cannot replace human content QA.
- Future migration should be level-by-level, starting with Level 1.

## Level 1 Prototype Recommendation

It is safe to begin the Level 1 English interface prototype after this schema phase.

Recommended next step:

- Build an English-only renderer branch for Level 1 using Type A, Type B, and Type F prototype records.
- Keep Mathematics on the existing approved renderer path.
- Use the schema validator as a gate before any Level 1 prototype content is wired into runtime.

Do not migrate all 120 questions at once.
