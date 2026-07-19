# English Level 1 Prototype QA

## Scope

Implemented an English-only gameplay shell for English Year 1 Level 1: Alphabet Recognition. Mathematics and Science continue to use the existing shared MVP question player.

## Files Changed

### Created

- `components/english/EnglishLevelOneQuestionPlayer.tsx`
- `lib/english/level-one-prototype.ts`
- `scripts/test-english-level1-prototype.mjs`
- `ENGLISH_LEVEL_1_PROTOTYPE_QA.md`

### Modified

- `components/mvp/QuestionPlayer.tsx`
- `package.json`

## Level 1 Question Distribution

English Level 1 keeps the existing 12-question source pool and still uses randomized 10-question sessions.

- Type D Matching: 4 questions
- Type B Fill in the Blank: 5 questions
- Type F Picture Choice: 3 questions

No English Levels 2-10 content was converted. They remain on the compatibility renderer.

## English-Only Renderer Selection

`QuestionPlayer` now checks whether the incoming level is English Level 1. If yes, it renders `EnglishLevelOneQuestionPlayer`. Otherwise, it renders the existing `StandardQuestionPlayer` path.

This protects:

- Mathematics gameplay
- Science gameplay
- Existing progress logic
- XP and star calculations
- Rewards
- Level unlocking
- Supabase sync

## Prototype Behaviour

### Before Answering

- No permanent three-column English layout.
- Main activity card is the primary focus.
- Hint and Listen are compact buttons.
- Hint starts collapsed.
- Voice script starts collapsed.
- Correct answer is hidden before submission.
- Explanation is hidden before submission.
- Learner selects an answer first, then presses Submit Answer.

### After Answering

- Question area remains visible.
- Desktop shows explanation beside the activity where space allows.
- Tablet and mobile stack explanation below the activity.
- Explanation does not cover answer controls.
- Continue/Next remains in the sticky action bar.

## Explanation Standard

The English Level 1 explanation is limited to four primary sections:

1. Correct answer
2. Why it works
3. Example or picture clue
4. LearnBot tip

Word Meaning is intentionally not shown for isolated alphabet answers such as C, E, or t.

## Responsive QA Targets

Manual visual review is still recommended for:

- `/english/question/1` at 1366x768
- `/english/question/1` at 1440x900
- `/english/question/1` at 1024x768
- `/english/question/1` at 768x1024
- `/english/question/1` at 390x844

Expected behaviour:

- Desktop: activity and explanation sit side-by-side after answering.
- Tablet/mobile: explanation stacks below the activity with no horizontal overflow.
- Sticky action bar remains reachable.
- Site navigation is visually covered by the fixed English lesson shell.

## Automated Tests Added

`npm run test:english-level1-prototype` verifies:

- English Level 1 selects the prototype renderer.
- English Level 2 remains on the compatibility renderer.
- Mathematics and Science do not select the English prototype renderer.
- Hints start collapsed.
- Correct answer is not revealed before submission.
- Explanation is not shown before submission.
- Explanation uses exactly four primary blocks.
- Word Meaning is not shown for Level 1 alphabet answers.
- Renderer metadata maps to Type B, Type D, and Type F.
- Responsive contract prevents horizontal overflow.
- Keyboard activation guidance is present.

## Command Results

- `npm run lint`: passed
- `npx tsc --noEmit --incremental false`: passed
- `npm test`: passed
- `npm run build`: passed
  - `npm run validate:curriculum` also passed through the build prebuild hook.

## Remaining Issues / Manual Review

- The Level 1 picture-choice prototype uses existing lightweight local picture assets for apple, bird, and star. These should be replaced with final English-specific artwork when the production asset set is ready.
- The prototype does not yet implement the full approved English modal artwork style. It establishes the safe English-only shell and interaction behaviour first.
- Levels 2-10 still use the compatibility experience by design.

## Production Safety Notes

- No Mathematics files were changed except the shared dispatcher in `QuestionPlayer`, which preserves the original path for non-English-Level-1 levels.
- No Science files were changed.
- No curriculum manifest files were changed.
- No Supabase, progress storage, XP, star, reward, or route logic was changed.
- No commit or push was performed.