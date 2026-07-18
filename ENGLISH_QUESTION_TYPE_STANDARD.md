# English Question Type Standard

Date: 2026-07-19
Project: LearnPlay Academy
Status: Production standard for English Year 1 interaction types.

## Scope Lock

This standard locks the six English Year 1 question types. It does not change the current question engine or activate new gameplay behaviour.

## Locked Question Types

| Type | Name | Primary Skill |
| --- | --- | --- |
| A | Word Spelling | Choose the correctly spelled word. |
| B | Fill in the Blank | Complete a word or sentence. |
| C | Sentence Meaning | Understand sentence meaning. |
| D | Matching | Match related English items. |
| E | Sentence Builder | Order words into a sentence. |
| F | Picture Choice | Choose from a picture clue. |

## Global Layout Rules

- The question area must show progress, prompt, interaction, and answer state without unnecessary scrolling.
- The explanation appears after answering as a compact pop-up, modal, drawer, or panel appropriate to viewport size.
- The explanation must use no more than four primary blocks.
- LearnBot supports the answer but does not dominate the question screen.
- Audio controls are optional but should be visually consistent and keyboard accessible.
- All touch targets must be at least 44px high, with 48px preferred.
- All choices must be reachable by keyboard.

## Type A: Word Spelling

- Learning purpose: Help learners recognise the correctly spelled word among close distractors.
- Suitable levels: Level 3, Level 5, Level 10.
- Unsuitable levels: Level 1 single-letter tasks, Level 8 comprehension-only tasks, Level 9 communication-response tasks.
- Desktop layout: Prompt with optional speaker button, two-by-two word choice grid, explanation pop-up with LearnBot and the correct word large.
- Tablet layout: Same card structure; choices may collapse from two columns to one or two depending portrait width.
- Mobile layout: Prompt first, large word choices stacked or two-column only when words stay readable, sticky Next after answer.
- Keyboard interaction: Tab through choices; Enter or Space selects; Escape closes explanation.
- Touch interaction: Tap the whole word card; selected card must show visible state.
- Image requirement: Usually none; optional picture clue only when it does not reveal spelling.
- Audio requirement: Optional speaker reads target word or prompt without revealing the correct spelling.
- Answer validation: Exact normalized word match; trim whitespace and compare case-insensitively when typed.
- Correct-answer state: Highlight correct word in success colour and show a brief Correct label.
- Incorrect-answer state: Mark selected wrong word gently, highlight correct word, explain the spelling clue.
- Explanation behaviour: Correct answer, spelling reason, example sentence, LearnBot tip. Word meaning only when useful.
- Fallback behaviour: If spelling metadata is missing, render as standard multiple choice and flag in developer QA.

## Type B: Fill in the Blank

- Learning purpose: Help learners choose or type the missing letter or word in a word or sentence.
- Suitable levels: Level 1, Level 2, Level 3, Level 5, Level 7, Level 10.
- Unsuitable levels: Level 4 picture-word matching and Level 8 passage comprehension unless the blank is the tested skill.
- Desktop layout: Prompt above a sentence or word card with one visible blank; choices or one input below.
- Tablet layout: Sentence card stays full width; choices wrap cleanly; input field remains large.
- Mobile layout: Large sentence card; choices stack if needed; keyboard must not cover the primary action.
- Keyboard interaction: Tab to input or choices; type answer when input-based; Enter submits when supported by the current flow.
- Touch interaction: Tap choice or input; blank and options must be large.
- Image requirement: Optional for phonics, CVC, and vocabulary blanks.
- Audio requirement: Recommended for phonics and early reading; voice script reads with a natural pause.
- Answer validation: Single blank only; trim whitespace; case-insensitive; accepted variants require review.
- Correct-answer state: Fill or show the blank with the correct answer using success state.
- Incorrect-answer state: Keep the wrong answer visible if typed and show the correct answer clearly.
- Explanation behaviour: Correct answer, why it fits, completed word or sentence, LearnBot tip.
- Fallback behaviour: If blank position is missing, render as multiple choice and flag content for review.

## Type C: Sentence Meaning

- Learning purpose: Help learners understand what a simple sentence means.
- Suitable levels: Level 4, Level 7, Level 8, Level 9, Level 10.
- Unsuitable levels: Level 1 and Level 2 unless the sentence only supports a letter or sound task; Level 5 spelling-only questions.
- Desktop layout: Prompt asks what the sentence means; sentence appears in a highlighted card; answers are text or picture cards.
- Tablet layout: Sentence remains above options; picture choices use two columns in landscape and one column in portrait if needed.
- Mobile layout: Sentence card appears immediately below prompt; choices stack or use two columns only when labels stay readable.
- Keyboard interaction: Tab to each answer card; Enter or Space selects.
- Touch interaction: Tap the whole answer card.
- Image requirement: Recommended for actions or object meaning; images must be unambiguous.
- Audio requirement: Recommended; speaker reads the sentence aloud.
- Answer validation: Choice ID must match the correct meaning; picture metadata must map to choice ID when used.
- Correct-answer state: Highlight the meaning card and state the sentence meaning.
- Incorrect-answer state: Show selected answer as review and guide learner to the action word or clue.
- Explanation behaviour: Correct meaning, why the sentence means that, example or picture clue, LearnBot tip.
- Fallback behaviour: If picture metadata is missing, keep text choices and flag missing visual support.

## Type D: Matching

- Learning purpose: Help learners connect related English items, such as word to picture, sentence to type, uppercase to lowercase, or question to answer.
- Suitable levels: Level 1, Level 4, Level 6, Level 9, Level 10.
- Unsuitable levels: Level 5 spelling-only questions and Level 8 passage questions with one answer.
- Desktop layout: Left column items and right column targets with connectors or paired highlights after answer.
- Tablet layout: Two columns in landscape; stacked groups in portrait if needed.
- Mobile layout: Tap first item, then tap matching item; avoid drag-only interaction.
- Keyboard interaction: Tab through items; Enter or Space selects first item then target; completed state is announced.
- Touch interaction: Tap left, tap right; incorrect pair resets gently.
- Image requirement: Required for word-picture matching; optional for grammar or sentence type matching.
- Audio requirement: Optional for each word or sentence where pronunciation matters.
- Answer validation: Stable pair IDs; each left item maps to exactly one right item; duplicate pair IDs invalid.
- Correct-answer state: Matched pair locks in success colour and completion count updates.
- Incorrect-answer state: Brief review state, then allow another try without clearing correct pairs.
- Explanation behaviour: Correct matches, why each pair belongs together, compact match recap, LearnBot tip.
- Fallback behaviour: If canonical pair data is incomplete, use a developer-only preview fallback and flag source data. Production must not invent pairs.

## Type E: Sentence Builder

- Learning purpose: Help learners arrange words into a simple correct sentence.
- Suitable levels: Level 6, Level 7, Level 9, Level 10.
- Unsuitable levels: Level 1 to Level 3 unless the content is a very short supported phrase; Level 4 vocabulary-only questions.
- Desktop layout: Word tiles above empty sentence slots; target area shows one slot per word; tip card below.
- Tablet layout: Word tiles wrap naturally; sentence slots stay readable.
- Mobile layout: Tap word tiles to place them in order; avoid precise drag requirement; slots may wrap to two lines.
- Keyboard interaction: Tab through tiles; Enter or Space adds selected tile; reset or remove control must be keyboard accessible.
- Touch interaction: Tap tile to place; tap placed tile or reset to correct mistakes when supported.
- Image requirement: Usually none; optional scene for communication contexts.
- Audio requirement: Recommended after answer: read the completed sentence.
- Answer validation: Correct order matches canonical token order; ignore extra whitespace; punctuation is a token only when tested.
- Correct-answer state: Show completed sentence in success card and lock tiles.
- Incorrect-answer state: Prompt learner to check word order; highlight the first misplaced area only if supported.
- Explanation behaviour: Correct sentence, why the order is correct, word meaning or example when useful, LearnBot tip.
- Fallback behaviour: If token data is missing, render as multiple-choice sentence selection and flag for content repair.

## Type F: Picture Choice

- Learning purpose: Help learners use a picture clue to choose the correct word, sentence, sound, or meaning.
- Suitable levels: Level 1, Level 2, Level 3, Level 4, Level 7, Level 8, Level 9, Level 10.
- Unsuitable levels: Level 5 spelling questions where the image would reveal the word too directly unless intentionally designed; grammar questions with no visual meaning.
- Desktop layout: Large image scene or object above answer choices; three or four answer cards below; no baked-in answer text.
- Tablet layout: Image stays wide but not taller than the viewport can support; choices wrap under image.
- Mobile layout: Image appears below prompt and above answers; crop preserves meaningful subject.
- Keyboard interaction: Tab to answers and audio if present; Enter or Space selects answer.
- Touch interaction: Tap answer card; image is not usually the answer unless the question is tap-target based.
- Image requirement: Required, age appropriate, clear, aligned to the correct answer, no hidden answer text.
- Audio requirement: Recommended for reading support; voice reads prompt and choices if available.
- Answer validation: Selected choice ID must match correct answer; image metadata must map to intended clue.
- Correct-answer state: Highlight correct answer and keep image visible; explanation points to visual clue.
- Incorrect-answer state: Mark selected answer as review and tell learner which picture clue to look at.
- Explanation behaviour: Correct answer, why the picture supports it, cropped or repeated visual clue if helpful, LearnBot tip. Fun fact only when educational.
- Fallback behaviour: Missing required image blocks production approval unless the question remains valid as text-only and is flagged for asset review.
