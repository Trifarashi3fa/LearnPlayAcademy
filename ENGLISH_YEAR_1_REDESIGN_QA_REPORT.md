# English Year 1 Redesign QA Report

Date: 2026-07-18
Project: LearnPlay Academy
Scope: English Year 1 Forest World only

## Summary

English Year 1 was redesigned as a subject-specific learning experience while preserving the existing LearnPlay platform architecture. Mathematics content, Mathematics gameplay, Forest World mechanics, XP, rewards, progress, Supabase, analytics, routing contracts, and the shared question engine were not changed.

The English package remains a 10-level Forest World with 120 source questions and randomized 10-question play sessions. The work focused on content quality, presentation language, answer-hidden pre-answer visuals, English-specific hints, and English-specific explanation notes.

## Files Changed

- `data/mvp-english-world.ts`
- `components/mvp/explanation/ExplanationTabs.tsx`
- `components/mvp/explanation/HintPanel.tsx`
- `components/mvp/LevelIntroClient.tsx`
- `scripts/test-english-year1-content.mjs`
- `package.json`

## What Was Corrected

### Answer-Revealing Questions

Pre-answer visual prompts in English no longer reveal the answer using labels such as `Answer:` or direct answer-matching wording. The answer is now shown only after the learner has responded, through the existing review/explanation flow.

### Level 1 Variety

Level 1 was expanded beyond repeated letter-name prompts. It now includes uppercase/lowercase recognition, missing letters, first-letter identification, next-letter sequencing, same-letter matching, and spot-the-different letter tasks.

### English-Specific Teaching

English explanations now use reading and language-learning wording instead of Mathematics wording. The hint and explanation systems avoid Math-specific phrases such as `Math rule`, `number pattern`, and counting-group language for English lessons.

### Child-Friendly Explanations

Each English question includes three short teaching steps, a short explanation, a LearnBot tip, a voice script, and a visual explanation. The wording is kept suitable for Year 1 learners and avoids advanced grammar terminology.

### Session Count Display

The English level intro now displays the randomized session count when present, so English missions show 10 playable questions rather than the 12-question source pool size.

## Level-by-Level QA Notes

### Level 1: Alphabet Recognition

Status: Corrected and diversified.

Focus areas improved:
- Uppercase and lowercase matching
- Missing-letter recognition
- First-letter identification
- Simple alphabet sequencing
- Distinct visible question wording

### Level 2: Letter Sounds

Status: Corrected and diversified.

Focus areas improved:
- Beginning sound prompts use child-friendly wording
- Picture and sound clues are aligned
- Letter-sound explanations are short and direct

### Level 3: Basic Vocabulary

Status: Corrected and diversified.

Focus areas improved:
- Repeated `Which word names the picture?` presentation was replaced with varied prompt patterns
- Visual description and word meaning are aligned
- LearnBot tips focus on picture clues and word reading

### Level 4: Colours & Shapes

Status: Corrected and diversified.

Focus areas improved:
- Colour and shape questions no longer reveal the answer in pre-answer visuals
- Prompt wording is varied across the level
- Visual explanations point to the colour or shape clue

### Level 5: Family & School Words

Status: Corrected and diversified.

Focus areas improved:
- Home and school vocabulary prompts are varied
- Distractors are kept simple and age-appropriate
- Explanations connect the word to a familiar setting

### Level 6: Simple Sentences

Status: Reviewed and corrected for Year 1 clarity.

Focus areas improved:
- Sentence-completion tasks use simple daily language
- Explanations focus on sentence meaning
- LearnBot guidance encourages reading the full sentence

### Level 7: Grammar Basics

Status: Reviewed and simplified.

Focus areas improved:
- Grammar wording avoids advanced terminology
- Questions focus on nouns, verbs, adjectives, and basic sentence sense
- Voice scripts model reading aloud

### Level 8: Matching & Categorising

Status: Reviewed and clarified.

Focus areas improved:
- Category and opposite-word prompts are clearer
- Visual explanation supports grouping and meaning
- LearnBot tips encourage comparing word meaning

### Level 9: Reading Practice

Status: Reviewed and kept age-appropriate.

Focus areas improved:
- Short sentence comprehension remains simple
- Correct answers are supported by direct text clues
- Voice scripts encourage rereading the sentence

### Level 10: Forest Guardian English Challenge

Status: Reviewed and polished.

Focus areas improved:
- Mixed-review prompts cover letters, sounds, words, sentences, and simple grammar
- Boss-style LearnBot wording remains encouraging without changing gameplay
- Explanations stay short and supportive

## Automated QA Coverage Added

Added `npm run test:english-year1-content`.

The test checks:
- 10 English levels exist
- At least 12 source questions per level
- Randomized 10-question sessions remain configured
- Every English question ID is unique
- Correct answer exists in options
- Options are unique
- Explanation, LearnBot tip, voice script, and visual explanation are present
- Each question has three teaching steps
- English content does not use Math-specific helper wording
- English content avoids unsuitable advanced language
- Pre-answer visual fields do not reveal answers
- Each level has sufficient visible prompt variety
- English route files exist

## Verification Results

- `npm.cmd run validate:curriculum`: Passed
- `npm.cmd test`: Passed
  - `test:question-assets`: Passed
  - `test:mvp-level-access`: Passed
  - `test:mvp-reset-safety`: Passed
  - `test:mvp-year-availability`: Passed
  - `test:english-year1-content`: Passed
- `npm.cmd run lint`: Passed
- `npx.cmd tsc --noEmit --incremental false`: Passed
- `npm.cmd run build`: Passed

## Route Smoke Test

A local production server was started from the built app and these English routes returned HTTP 200:

- `/english`
- `/english/world-map`
- `/english/level/1`
- `/english/question/1`
- `/english/question/2`
- `/english/question/3`
- `/english/question/4`
- `/english/question/8`
- `/english/question/10`

This verifies production route rendering for the requested English Level 1, Level 2, Level 3, Level 4, reading level, and Level 10 smoke paths. A final human visual check on real desktop, tablet, and phone screens is still recommended before release because no browser viewport automation is installed in this project.

## Preserved Behavior

Unchanged:
- Mathematics content and gameplay
- Mathematics Forest World mechanics
- Question engine architecture
- English route structure
- English progress identity
- XP and rewards logic
- Level unlocking logic
- Parent dashboard architecture
- Supabase schema and auth logic
- Production active Mathematics manifest

## Remaining Human Review Items

- Confirm final English voice narration style with a teacher or curriculum reviewer.
- Review each English level on real devices for visual comfort and reading load.
- Confirm if future English-specific non-MCQ interactions should be activated after this content pass.
- Confirm English artwork needs if production wants richer language visuals beyond existing object/icon rendering.