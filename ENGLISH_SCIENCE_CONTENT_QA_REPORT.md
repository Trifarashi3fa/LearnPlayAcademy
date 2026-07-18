# English and Science Content QA Report

Date: 2026-07-18
Project: LearnPlay Academy
Scope: English Year 1 free package and Science Year 1 free package only.

## Audit Summary

- Mathematics files were not edited.
- Shared gameplay, routing logic, progress, XP, rewards, UI, and Supabase logic were not changed.
- English Year 1 was reviewed across 10 levels and 120 source questions.
- Science Year 1 was reviewed across 10 levels and 120 source questions.
- Both packages retain `randomizeQuestions: true` and `sessionQuestionCount: 10` with 12 source questions per level.
- Runtime structural inspection confirmed:
  - English: 10 levels, 120 unique question IDs, 0 structural problems.
  - Science: 10 levels, 120 unique question IDs, 0 structural problems.
- All checked questions include a correct answer that appears in the options, unique options, explanation, LearnBot tip, voice script, and visual metadata.

## Corrections Made

| Subject | Level | Question ID | Issue Found | Correction Made | Severity |
| --- | ---: | --- | --- | --- | --- |
| English | 2 | english-forest-l02-q01 through english-forest-l02-q12 | The phonics prompt asked for a beginning sound, but many answers are displayed as letters. This was potentially confusing for Year 1 learners, especially when letters and sounds are not identical. | Updated the shared Level 2 prompt to ask which letter or sound starts the word. Updated explanation, LearnBot tip, and voice script wording to avoid inaccurate slash-sound notation. | High |
| English | 2 | english-forest-l02-q10 | `shell` was mapped to `s`, but the beginning sound is `sh`. | Changed the correct answer from `s` to `sh`, and updated distractors to `s`, `ch`, and `th`. | Critical |
| English | 5 | english-forest-l05-q10 | The question asks which word belongs to school, but the distractors `desk`, `ruler`, and `door` could also belong to school. | Replaced the distractors with family words: `mother`, `father`, and `sister`, keeping `friend` as the correct answer. | High |
| Science | 3 | science-forest-l03-q04 | The question asks which animal can fly, but `duck` appeared as a distractor and many ducks can fly. | Replaced `duck` with `shell` as a non-animal distractor to remove ambiguity. | High |
| Science | 3 | science-forest-l03-q05 | The answer `shell animal` was unnatural and too vague for a Year 1 learner. | Changed the answer to `snail`; updated explanation, LearnBot tip, visual answer, and hint to match. | High |
| Science | 6 | science-forest-l06-q09 | The wording `not cold` could also mean warm, making `hot` less precise. | Reworded the prompt to `Which weather word means very warm?` and tightened the explanation/hint. | Medium |
| Science | 7 | science-forest-l07-q05 | The prompt `looks like vapour` was too abstract and potentially misleading for Year 1 learners. | Reworded the question to ask which form of water can rise from hot water; updated explanation, LearnBot tip, and visual clue. | Medium |

## English QA Notes

- Letter matching questions are accurate and age appropriate.
- Phonics items now avoid overstating letter-sound equivalence.
- `shell` now uses `sh`, which is the correct beginning sound.
- Vocabulary picture-word items are consistent with the available object visual map.
- Grammar questions cover nouns, verbs, adjectives, plurals, capitals, full stops, and simple agreement without changing the question engine.
- Reading comprehension questions use short, direct sentences suitable for Year 1.
- Some Level 10 challenge questions intentionally review earlier skills; these are not treated as content defects because the level is a boss review.

## Science QA Notes

- Factual claims were checked for Year 1 suitability and obvious misleading simplification.
- Living/non-living items now remain simple while avoiding unnecessary technical detail.
- Animal questions now avoid a distractor that could also be correct.
- Plant, senses, weather, water, materials, and environment topics remain aligned with simple observation and classification.
- Some concepts are intentionally simplified for Year 1, such as plants needing water/light and glass being see-through. These are acceptable at MVP foundation level but should be reviewed by a curriculum reviewer before public school alignment claims are finalized.

## Duplicate and Near-Duplicate Review

- No duplicate question IDs were found.
- No duplicate option sets with missing correct answers were found.
- Level 10 in both subjects includes intentional mixed-review items. These are expected boss-review repetitions and were not rewritten.
- Repeated LearnBot strategy language exists by design in generated helper functions, but no repeated tip created an accuracy defect.

## Randomized Session Review

- English and Science both use 12 source questions per level with 10 questions selected per session.
- `randomizeQuestions: true` is present on both package metadata objects.
- `sessionQuestionCount: 10` is present on both package metadata objects.
- Structural inspection found no level with fewer than 12 source questions.

## Remaining Human Review Items

| Subject | Area | Reason | Priority |
| --- | --- | --- | --- |
| English | KSSR/Cambridge alignment wording | The in-app content is suitable for early Year 1 practice, but formal alignment should be signed off by a curriculum reviewer. | Medium |
| Science | Simplified factual statements | Statements are age appropriate, but a Science reviewer should confirm exact phrasing for local curriculum expectations. | Medium |
| English and Science | Voice narration tone | Voice scripts are present and accurate, but should be auditioned once real voice/audio is added. | Low |
| English and Science | Visual specificity | Visual metadata is consistent with current object assets; future custom subject visuals may improve clarity. | Low |

## Final QA Status

- English content errors fixed: 3 correction groups.
- Science content errors fixed: 4 correction groups.
- No unresolved blocking content defects found in the current English and Science package data.
- Remaining items require human curriculum/art/audio review rather than code correction.
