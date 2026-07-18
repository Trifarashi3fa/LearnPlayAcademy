# English Responsive QA Checklist

Date: 2026-07-19
Project: LearnPlay Academy
Status: Production QA standard for English Year 1 lesson screens.

## Scope

This checklist verifies the English Year 1 interface against the approved English question designs. It does not change Mathematics, Science, gameplay logic, progress, XP, rewards, or Supabase.

## Required Viewports

Test each approved question type at:

- Desktop: 1366 x 768.
- Desktop: 1440 x 900.
- Tablet landscape: 1024 x 768.
- Tablet portrait: 768 x 1024.
- Mobile portrait: 390 x 844.

Optional extra checks:

- Mobile landscape: 844 x 390.
- Small Android: 360 x 640.

## Global Acceptance Criteria

- Progress is visible before answering.
- Question text is visible without awkward scrolling.
- Answer interaction is visible and usable.
- Submit or Next is visible or sticky when needed.
- Explanation appears after answering and does not feel like a dense notes page.
- No horizontal scrolling.
- No clipped text, images, tiles, or answer cards.
- All controls have visible focus states.
- Touch targets are at least 44px high.
- The design remains clearly English-specific.
- Mathematics screens remain unchanged.

## Desktop QA

### 1366 x 768

- The full question card should fit naturally.
- Explanation popup or panel should fit without needing multiple scrolls.
- Next Question remains visible after answer.
- LearnBot appears in explanation but does not crowd the text.
- Word tiles and match items do not wrap into unusable layouts.

### 1440 x 900

- Layout should feel spacious but not stretched.
- Question type label, topic, progress, and XP remain aligned.
- Images and cards use consistent maximum width.
- Explanation blocks stay short and visually balanced.

## Tablet QA

### 1024 x 768 Landscape

- Question card and explanation must not overlap.
- Matching columns may remain side by side if readable.
- Sentence builder tiles wrap cleanly.
- Picture choice images remain large enough to understand.

### 768 x 1024 Portrait

- Question content may stack vertically.
- Explanation can use bottom sheet or modal pattern.
- Sticky action bar must not cover answer choices.
- LearnBot and visual examples must scale down without becoming tiny.

## Mobile QA

### 390 x 844 Portrait

- One natural page scroll is acceptable.
- Avoid nested scrollbars.
- The answer interaction must be reachable before excessive explanation content.
- Explanation should use compact blocks.
- Next Question must remain visible or easy to reach.
- Audio and close buttons must be large enough to tap.

### Mobile Landscape

- Avoid fixed-height cards that cut content.
- Explanation modal should use safe viewport height.
- Controls must not be hidden behind browser UI.

## Question Type QA

### Type A: Word Spelling

- Word choices fit in cards without wrapping awkwardly.
- Correct and incorrect spelling choices are readable.
- Explanation shows the correct spelling clearly.
- Optional word meaning does not crowd the popup.

### Type B: Fill in the Blank

- Blank is easy to see.
- Input or choice controls remain visible with mobile keyboard.
- Completed sentence fits inside the explanation.
- The correct answer is inserted or shown clearly.

### Type C: Sentence Meaning

- Sentence card is readable.
- Picture choices, if used, have consistent size.
- Explanation names the meaning in one short block.
- LearnBot tip points to the clue, action word, or sentence meaning.

### Type D: Matching

- Left and right items are aligned on desktop.
- Mobile supports tap-left then tap-right interaction.
- Completed pairs are visually locked.
- Explanation recap shows matches without crowding.

### Type E: Sentence Builder

- Word tiles wrap without clipping.
- Sentence slots fit and remain tappable.
- Reset or correction control is reachable when present.
- Explanation shows the completed sentence as the main answer.

### Type F: Picture Choice

- Image is large enough to understand.
- Image does not contain baked-in answer text.
- Answer choices are not pushed below the sticky action area.
- Explanation points to the visual clue.

## Accessibility QA

- Keyboard can reach all choices, audio buttons, close buttons, and Next.
- Enter or Space activates focused choices.
- Escape closes explanation when open.
- Focus order follows reading order.
- Correct and incorrect states are not colour-only.
- Screen reader labels identify question type and answer state.
- Images have meaningful alt text when they carry information.
- Decorative images are hidden from assistive technology.
- Motion respects reduced-motion preferences.

## Content QA In Responsive Context

- Hints stay under the hint length limit.
- Explanations use no more than four primary blocks.
- Optional word meaning appears only when needed.
- No text block exceeds two short lines where avoidable.
- The correct answer is visible in the explanation.
- Incorrect answer feedback stays friendly.

## Regression QA

Before approving English UI changes, confirm:

- Mathematics question flow still works.
- Science question flow is not redesigned accidentally.
- Progress saving still works.
- XP and stars still update.
- Level unlocking still works.
- Parent Dashboard still reads progress.
- Random 10-question sessions still work.
- Developer previews remain isolated from production.

## Manual QA Record Template

| Date | Device/Viewport | Level | Type | Result | Issue | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| | 1366 x 768 | | | Pass/Fail | | |
| | 1440 x 900 | | | Pass/Fail | | |
| | 1024 x 768 | | | Pass/Fail | | |
| | 768 x 1024 | | | Pass/Fail | | |
| | 390 x 844 | | | Pass/Fail | | |
