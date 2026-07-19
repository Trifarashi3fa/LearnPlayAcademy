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
- forbidden world-map, map, mountain, screenshot, sprite, UI, dashboard, badge, reward, thumbnail, Mathematics, Science, and subject-card sources
- missing local image files
- very tiny detectable image dimensions
- duplicate picture assets within the Level 1 pool
- invalid picture kind
- mismatched vocabulary label
- mismatched expected first letter
- explicit placeholder picture assets

Current result:

- Blocking asset errors: 0
- Asset warnings: 0
- English Level 1 now uses subject-owned Type F assets:
  - `/english/year1/level1/apple.svg`
  - `/english/year1/level1/bird.svg`
  - `/english/year1/level1/star.svg`

Asset report:

- `ENGLISH_LEVEL_1_ASSET_QA_REPORT.md`

Remaining asset note:

- The new SVGs are safe local English Level 1 learning-object assets. A later artwork pass can replace them with final brand illustrations without changing the Type F metadata contract.

## Type F Responsive Hotfix

Manual review at common laptop sizes found that Type F Picture Choice questions could push the answer row partly outside the visible frame before submission. The root cause was the combination of an oversized fixed picture frame (`h-36`, `sm:h-44`, `lg:h-48`), generous Type F padding, a late one-row answer grid breakpoint, and desktop content clipping from the English lesson shell.

Changes made:

- Type F now uses a compact height-aware image frame with `clamp(...)` and `dvh` sizing.
- The picture/clue area switches to a compact two-column layout from tablet width upward.
- Type F answers now use a responsive grid: 2 columns on tablet and 4 columns on laptop/desktop.
- Type F answer buttons use a picture-only compact density while Type B and Type D keep their existing answer density.
- The English Level 1 content shell no longer clips desktop overflow and uses scroll padding for the bottom action bar safe area.
- The image remains `object-contain`, centered, and never cropped or stretched.

Responsive sizing rules:

- Mobile picture frame target: about 90-125px tall.
- Tablet picture frame target: about 105-140px tall.
- 1366 x 768 laptop target: about 120-155px tall.
- Taller desktop target: about 150-190px tall when space allows.

Viewport review targets:

- 1600 x 900: Type F image, word label, clue, all four answers, and bottom action bar should be visible before submission.
- 1366 x 768: Type F should use the compact frame; answer choices should not be hidden behind the bottom action bar.
- 1024 x 768: Type F picture and clue should remain two-column where space allows, with answers visible below.
- 768 x 1024: Type F should remain readable with the responsive two-column answer grid.
- 390 x 844: Type F may stack naturally, but must avoid horizontal overflow and keep the action button accessible.
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
- Type F uses the compact responsive picture frame and answer grid.
- Type F no longer uses the old tall fixed `h-36`, `sm:h-44`, or `lg:h-48` picture frame.
- The English Level 1 shell reserves action-bar scroll padding and does not clip desktop activity content.
- Type B and Type D do not inherit the Type F picture-only answer density.
- Type F rejects invalid external image sources.
- Type F rejects forbidden world/map/sprite, Mathematics, Science, screenshot, and UI-like image sources.
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
- A future artwork pass may replace the simple English Level 1 SVGs with final LearnPlay-branded illustrations using the same metadata contract.
- Levels 2-10 still use the compatibility renderer by design.

## Template Readiness Recommendation

English Level 1 is now a safe prototype template for expanding the English-specific interface to Levels 2-10. Recommended next step: convert one additional English level with the same isolated subject-specific renderer pattern, then repeat responsive and accessibility QA before bulk migration.

## Production Safety Notes

- No Mathematics files, content, routes, explanations, progress logic, XP logic, rewards, or gameplay behavior were modified.
- No Science files were modified.
- No curriculum manifest files were modified.
- No Supabase, local progress, XP, star, reward, or route logic was changed.
- No commit or push was performed.
