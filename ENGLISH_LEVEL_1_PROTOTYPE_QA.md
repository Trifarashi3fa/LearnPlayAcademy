# English Level 1 Prototype QA

## Scope

Updated the English-only gameplay shell for English Year 1 Level 1: Alphabet Recognition after manual browser review. Mathematics and Science remain on the existing standard renderer and were not modified.

## Files Changed

### Modified

- `components/english/EnglishLevelOneQuestionPlayer.tsx`
- `lib/english/level-one-prototype.ts`
- `scripts/test-english-level1-prototype.mjs`
- `ENGLISH_LEVEL_1_PROTOTYPE_QA.md`

### Existing Untracked Design References

The following design reference images remain untracked and were not used as runtime assets:

- `public/design-system/Educational app English question interface Type D.png`
- `public/design-system/Educational app English question interface Type F.png`
- `public/design-system/English-Alphabet Recognition design question.png`

## Before / After Summary

### Before

- Type D was labelled Matching but behaved like ordinary multiple choice.
- Type B displayed a blank but did not fill it visibly after selecting an option.
- Type F was the clearest interaction, but image presentation was still small and generic.
- Hint and Listen were simple toggles without strong interaction identity.
- All question types shared too much of the same answer layout.

### After

- Type B, Type D, and Type F now render through distinct English Level 1 layouts.
- Selected answers are tracked with stable choice IDs.
- Correctness is still hidden until Submit Answer.
- The compact four-section explanation remains unchanged in timing and scope.
- Existing score, XP, randomized 10-question sessions, completion, unlocking, and progress sync are preserved.

## Level 1 Question Distribution

English Level 1 keeps the existing 12-question source pool and randomized 10-question sessions.

- Type D Matching: 4 questions
- Type B Fill in the Blank: 5 questions
- Type F Picture Choice: 3 questions

English Levels 2-10 were not converted and remain on the compatibility renderer.

## Type B Review: Fill in the Blank

Changes made:

- Added a dedicated blank-completion layout.
- A selected answer now visibly fills the blank before submission.
- The learner can change the selected answer before submitting.
- Only one answer is selected at a time.
- Correctness is not shown before submission.
- Odd-one-out content is labelled as `Different Letter`, not visibly as Fill in the Blank.

Manual review route examples:

- `/english/question/1` questions with `A, B, ___`
- `/english/question/1` questions with `D -> ___`
- `/english/question/1` question with `m  m  ___  m`

## Type D Review: Matching

Changes made:

- Replaced the MCQ-feeling layout with a two-sided tap-to-match layout.
- Left side shows the clue item.
- Right side shows partner choices.
- Tapping a partner creates a visible match line and `Your match` summary.
- Stable choice IDs are used for the interaction contract.
- The chosen match can be changed before submission.
- After submission, the selected pair and correct pair are shown clearly when needed.

Manual review route examples:

- `/english/question/1` uppercase/lowercase partner questions
- `/english/question/1` same-letter matching question

## Type F Review: Picture Choice

Changes made:

- Added a picture-first layout.
- Picture clue is now larger and contained with `object-contain` to avoid cropping.
- Letter options are shown as larger tappable tiles.
- Selected option is visually clear before submission.
- Correctness remains hidden until submission.
- Alt text is required and tested for every Type F prototype question.

Manual review route examples:

- `/english/question/1` apple beginning-letter question
- `/english/question/1` bird beginning-letter question
- `/english/question/1` star beginning-letter question

## Asset Corrections / QA

Added English Level 1 asset QA coverage for:

- missing image metadata
- missing alt text
- unsupported external image paths
- non-public image paths
- map/world/sprite-like image sources
- missing local image files
- very tiny detectable image dimensions
- duplicate picture assets within the Level 1 pool

Current result:

- Blocking asset errors: 0
- Asset warnings: 0
- No runtime asset files were added, deleted, or modified.

Remaining asset note:

- The current Level 1 picture clues use existing lightweight local assets for apple, bird, and star. Final English-specific illustration assets can still replace these later without changing the interaction logic.

## Responsive Results

Automated checks verify the Level 1 contract uses:

- horizontal overflow hidden
- desktop explanation placement beside the activity
- mobile/tablet explanation placement below the activity
- 10-question randomized sessions from the 12-question Level 1 pool

Manual visual review is still recommended for:

- `/english/question/1` at 1920x1080
- `/english/question/1` at 1366x768
- `/english/question/1` at 1024x768
- `/english/question/1` at 768x1024
- `/english/question/1` at 390x844

## Accessibility Results

Implemented or preserved:

- semantic button controls for every selectable answer
- visible focus ring classes
- `aria-pressed` selected state
- `aria-live` feedback for activity and status areas
- accessible labels for Hint and Listen buttons
- picture alt text for Type F
- no color-only correctness communication; text labels such as Correct, Review, Selected, and Correct match are shown

## Automated Tests

`npm run test:english-level1-prototype` now verifies:

- English Level 1 selects the prototype renderer.
- English Levels 2-10 remain on the compatibility renderer.
- Mathematics and Science remain on the standard renderer.
- Type B selected answer fills the blank before submission.
- Type B selection can change before submission.
- Type D uses stable pair and choice IDs.
- Type D selected match can change before submission.
- Type D does not reveal correctness before submission.
- Type F alt text is required.
- Type F rejects invalid external image sources.
- Type F warns on suspicious map/world/sprite-like sources.
- Labels match actual interaction variants.
- English Level 1 visible text does not mention math.
- Initial question state resets to no selection, hint closed, and listen closed.
- Submit is blocked without a valid interaction and blocked again after submission.
- Randomized sessions remain 10 questions.

## Command Results

- `npm.cmd run lint`: passed
- `npx.cmd tsc --noEmit --incremental false`: passed
- `npm.cmd test`: passed
- `npm.cmd run test:english-year1-content`: passed
- `npm.cmd run test:english-question-schema`: passed
- `npm.cmd run test:english-level1-prototype`: passed
- `npm.cmd run build`: passed
  - `npm run validate:curriculum` also passed through the build prebuild hook.
- `git diff --check`: passed with line-ending warnings only; no whitespace errors.

## Remaining Known Limitations

- Type D is tap-to-match, not drag-and-drop. This is intentional for accessibility and touch reliability.
- Browser speech/audio playback is not added; Listen currently reveals the existing voice script text with a safe fallback experience.
- Final English-specific picture artwork is still recommended for a later asset pass.
- Levels 2-10 still use the compatibility renderer by design.

## Template Readiness Recommendation

English Level 1 is now a safe prototype template for expanding the English-specific interface to Levels 2-10. Recommended next step: convert one additional English level with the same isolated subject-specific renderer pattern, then repeat responsive and accessibility QA before bulk migration.

## Production Safety Notes

- No Mathematics files, content, routes, explanations, progress logic, XP logic, rewards, or gameplay behavior were modified.
- No Science files were modified.
- No curriculum manifest files were modified.
- No Supabase, local progress, XP, star, reward, or route logic was changed.
- No commit or push was performed.