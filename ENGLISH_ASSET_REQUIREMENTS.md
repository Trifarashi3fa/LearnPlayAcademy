# English Asset Requirements

Date: 2026-07-19
Project: LearnPlay Academy
Status: Production asset standard for English Year 1.

## Scope

This document defines production asset requirements for the English Year 1 interface and content. It does not create assets, change routes, or modify gameplay.

## Asset Principles

- Use LearnPlay branding and the existing LearnBot character direction.
- Do not copy reference artwork or copyrighted assets.
- Use clean, child-safe, age-appropriate images.
- Avoid text baked into images unless the image is specifically a letter, word, or sentence card produced by the app UI.
- Prefer transparent PNG or WebP for characters and objects.
- Prefer responsive CSS text over image text.
- Every meaningful image needs alt text or equivalent accessibility metadata.
- Decorative assets should be marked decorative in implementation.

## Recommended Asset Formats

| Asset Type | Preferred Format | Transparency | Notes |
| --- | --- | --- | --- |
| LearnBot character | WebP or optimized PNG | Yes | Use existing LearnBot style. |
| Icons | SVG | Yes | Speaker, star, type badges, close icon. |
| Object pictures | WebP or PNG | Optional | Must be clear at mobile size. |
| Scene pictures | WebP | No or optional | Keep focal subject obvious. |
| Badges | WebP, PNG, or SVG | Yes | Avoid broken image fallback. |
| Background accents | CSS or lightweight WebP | Optional | Must not distract from question. |

## Size Guidance

| Asset | Source Size | Display Notes |
| --- | --- | --- |
| LearnBot explanation pose | 512 x 512 minimum | Can display around 140 to 220px depending viewport. |
| LearnBot small helper | 256 x 256 minimum | Use for hint and compact coaching cards. |
| Picture choice scene | 1200 x 675 source | Display as wide card, preserve focal subject. |
| Vocabulary object | 512 x 512 source | Transparent background preferred. |
| Type icon | 128 x 128 source | SVG preferred. |
| Badge | 512 x 512 source | Transparent background preferred. |

Avoid oversized files. Production page assets should normally stay below 300 KB each after optimization unless there is a clear quality reason.

## Required LearnBot Assets

English should reuse the existing LearnBot character, with these state requirements when assets are available:

- Idle or friendly.
- Correct or thumbs up.
- Incorrect or encouraging.
- Thinking or hint.
- Celebration.
- Listening or speaking.

Fallback if pose-specific assets are missing:

- Use the default LearnBot image.
- Change state through speech bubble copy and styling.
- Do not show a broken image.

## Required UI Assets

- Speaker or listen icon.
- Close icon for explanation pop-up.
- Star or XP icon.
- Question type badges for A to F.
- Matching connector or paired-state visual.
- Sentence builder tile style.
- Fill blank underline or slot visual.
- Picture choice answer state checkmark.

Icons should be SVG or existing icon components where possible.

## Question Type Asset Requirements

### Type A: Word Spelling

- Required image: none by default.
- Optional: small object clue when spelling is tied to vocabulary.
- Audio: target word or prompt if useful.
- Avoid: images that reveal the spelling through text.

### Type B: Fill in the Blank

- Required image: none by default.
- Optional: picture clue for phonics, CVC, or vocabulary blanks.
- Audio: sentence with natural pause.
- Avoid: picture clues that make the answer too obvious unless the objective is picture-supported vocabulary.

### Type C: Sentence Meaning

- Required image: optional but recommended for action or object meaning.
- Audio: read the sentence.
- Avoid: ambiguous scenes where multiple answers seem correct.

### Type D: Matching

- Required image: when matching words to pictures.
- Required metadata: one asset or label per pair item where applicable.
- Audio: optional for each word or sentence.
- Avoid: drag-only artwork that cannot work with tap or keyboard fallback.

### Type E: Sentence Builder

- Required image: usually none.
- Optional: scene image for communication contexts.
- Audio: completed sentence after answer.
- Avoid: images that imply a different sentence order.

### Type F: Picture Choice

- Required image: yes.
- Image must show the correct clue clearly.
- Audio: prompt and answer choices where useful.
- Avoid: small details, hidden text, or multiple plausible actions.

## Visual Description Standard

Each asset-backed question should include:

- What the image shows.
- Which part is the learning clue.
- Whether the image is decorative or instructional.
- Required alt text direction.
- Any cropping notes for mobile.

Example:

- Visual description: "A child reading a book at a desk. The book is the clue for reading."
- Alt text: "A child reading a book."
- Mobile crop note: "Keep the child and book visible."

## Audio and Voice Requirements

Voice narration should be available in the content model even if audio playback is implemented later.

- Voice scripts must be short and natural.
- Do not reveal answers before the learner responds.
- For spelling, read the prompt or target spoken word only when appropriate.
- For phonics, emphasize the relevant sound without naming the answer too early.
- For sentence tasks, read the sentence clearly.

## Asset Naming Standard

Recommended future naming pattern:

`english-y1-l{level}-{question-id}-{purpose}.{ext}`

Examples:

- `english-y1-l02-e1-l02-q004-apple.webp`
- `english-y1-l04-e1-l04-q011-classroom-scene.webp`
- `english-y1-learnbot-correct.webp`

Use lowercase, hyphens, and stable question IDs.

## Folder Guidance

Future English assets may live under a structure such as:

- `public/english/year-1/forest-world/learnbot/`
- `public/english/year-1/forest-world/level-01/`
- `public/english/year-1/forest-world/ui/`

Do not move existing assets until implementation is scheduled.

## Fallback Rules

- Missing LearnBot pose: use default LearnBot.
- Missing optional vocabulary image: use text-only if the question remains valid.
- Missing required picture choice image: block production approval for that question.
- Broken image reference: replace with safe placeholder only during development and flag for asset repair.
- Ambiguous image: do not approve until revised.

## Production Asset Checklist

Each English asset must have:

- Approved usage rights.
- Clear educational purpose.
- Correct subject, year, level, and question mapping.
- Optimized file size.
- Responsive display check at mobile and desktop sizes.
- Alt text guidance if instructional.
- No copyrighted reference copy.
- No unwanted text baked into images.
- No cultural or child-safety concerns.
- No duplicate asset unless reuse is intentional.

## Asset QA Questions

Before approval, ask:

1. Can a Year 1 learner understand the picture quickly?
2. Does the picture support the exact skill?
3. Could the picture accidentally make another option look correct?
4. Does it fit inside the approved English layout?
5. Does it remain clear on a 390 x 844 mobile screen?
6. Is the asset legally safe for production use?
