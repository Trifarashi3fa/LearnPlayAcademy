# English Forest World Content Factory

## Purpose

This content factory document explains how the generated English Year 1 Forest World source bank should be authored, reviewed, imported, and prepared for release without activating gameplay prematurely.

## Output Files

CSV source files:

- content/question-assets/imports/english/year-1/forest-l01.csv
- content/question-assets/imports/english/year-1/forest-l02.csv
- content/question-assets/imports/english/year-1/forest-l03.csv
- content/question-assets/imports/english/year-1/forest-l04.csv
- content/question-assets/imports/english/year-1/forest-l05.csv
- content/question-assets/imports/english/year-1/forest-l06.csv
- content/question-assets/imports/english/year-1/forest-l07.csv
- content/question-assets/imports/english/year-1/forest-l08.csv
- content/question-assets/imports/english/year-1/forest-l09.csv
- content/question-assets/imports/english/year-1/forest-l10.csv

Each file follows:

- ENGLISH_QUESTION_TEMPLATE.csv
- 30 source questions per level
- Status = Review
- XP = 10
- Version = 1.0.0

## Authoring Standard

Every question includes:

- Question ID
- Topic
- Learning objective
- Question
- Options where required
- Correct answer
- Explanation
- LearnBot Tip
- Voice Script
- Visual Description
- Difficulty
- XP
- Curriculum Alignment
- Cambridge Alignment
- Version
- Status = Review
- QA Notes

## Question Type Guidance

**Multiple Choice**

- Use 4 clear choices.
- Distractors should be plausible but not confusing.
- Correct answer must match one option exactly.

**Match Pairs**

- Use parseable pairs such as A = a or cat = cat picture.
- Provide at least 2 complete pairs.
- Store the full pair mapping in Correct Answer using semicolons.

**Tap Correct**

- Use 2 to 4 tap targets.
- Use a visual clue in the visual description.
- Correct answer must match one target exactly.

**Fill Missing Letter**

- Use one missing letter only.
- Keep the answer short.
- Use visual support such as a picture or sound box.

**Fill Missing Word**

- Use one missing word only.
- Keep the sentence simple.
- The answer should be an age-appropriate word.

**Text Input**

- Use short text answers.
- Avoid spelling traps unless the level explicitly teaches the spelling.

**True / False**

- Use simple factual statements.
- Avoid trick wording.

## Review Workflow

1. Open the relevant level CSV.
2. Review learning objective, visual description, explanation, LearnBot tip, and voice script.
3. Check that every correct answer matches the expected type.
4. Confirm KSSR and Cambridge alignment wording.
5. Confirm the question is suitable for Year 1.
6. Update QA Notes.
7. Only after approval, change Status from Review to Approved.

## Import Workflow Later

Use a command like:

```powershell
npm run import:questions:english-year1-forest -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\english\year-1\forest-l01.csv" --sheet "Forest L01" --level 1
```

Do not import these files until the review pass is complete.

## Validation Checklist

- 30 rows per level.
- 300 rows total.
- No duplicate Question IDs.
- No unsupported question types.
- Every row has a visual description.
- Every row has an explanation.
- Every row has a LearnBot tip.
- Every row has a voice script.
- Status remains Review until approved.

## Activation Guardrails

- Do not write English rows into the Mathematics active manifest.
- Do not enable English routes until a package-aware English manifest exists.
- Do not mix English progress with Mathematics progress.
- Do not mark content Approved automatically.
- Do not generate Supabase data during content authoring.

## Remaining Production Work

- Educator review.
- KSSR/Cambridge alignment review.
- Visual asset review.
- Voice narration review.
- Import and QA report generation.
- English manifest generation.
- English gameplay activation behind feature flag.
