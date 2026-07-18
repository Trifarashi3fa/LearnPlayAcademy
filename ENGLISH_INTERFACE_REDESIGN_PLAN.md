# English Interface Redesign Plan

Date: 2026-07-19
Project: LearnPlay Academy
Scope: Audit and implementation plan only. No gameplay implementation in this task.

## 1. Audit Summary

English Year 1 is active at:

- `/english`
- `/english/world-map`
- `/english/level/[level]`
- `/english/question/[level]`

The current English gameplay reuses the same shared MVP question runtime as Mathematics and Science. That reuse is good for progress, XP, stars, level unlocking, random sessions, accessibility basics, and production routing, but the presentation layer is still heavily Mathematics-shaped.

The approved English experience is not a generic MCQ lesson. It is a subject-specific literacy interface with six presentation types:

- Type A: Word Spelling
- Type B: Fill in the Blank
- Type C: Sentence Meaning
- Type D: Matching
- Type E: Sentence Builder
- Type F: Picture Choice

The safest path is to keep the existing `QuestionPlayer` state machine and add English-only presentation branches underneath it.

## 2. Current Architecture

### Shared Runtime

`components/mvp/QuestionPlayer.tsx`

Key responsibilities:

- Creates randomized sessions from `level.questions` using `sessionQuestionCount`.
- Tracks current question index, selected answer, correct count, attempts, completion state, XP, and explanation open state.
- Calls `useMvpProgress` with `subject/year/worldId` from the supplied level.
- Enforces level access with `getForestLevelAccess`.
- Saves progress only after level completion.
- Renders:
  - `LearningSessionShell`
  - `ProgressTracker`
  - `HintPanel`
  - `QuestionCard`
  - `ExplanationDrawer`
  - `ExplanationTabs`
  - `StickyActionBar`
  - `XPRewardCard`
  - `ForestRewardScreen`

Important line anchors:

- Random session selection: `components/mvp/QuestionPlayer.tsx:22`
- Main player: `components/mvp/QuestionPlayer.tsx:34`
- Progress hook: `components/mvp/QuestionPlayer.tsx:41`
- Completion save: `components/mvp/QuestionPlayer.tsx:109`
- Explanation support branch: `components/mvp/QuestionPlayer.tsx:165`
- Sticky action bar: `components/mvp/QuestionPlayer.tsx:200`
- Question card render: `components/mvp/QuestionPlayer.tsx:221`

### Shared Lesson Shell

`components/mvp/learning-session/LearningSessionShell.tsx`

Current behavior:

- Fixed `100dvh` lesson shell.
- Header, progress strip, main/support grid, bottom action bar.
- Desktop uses a two-column layout with a large right support panel.
- Header exit currently links to `/mvp/world-map`.
- Header text says `Forest World - Level {level} - {nodeType}` without subject-specific wording.

Risk: changing this directly can affect Mathematics and Science.

### Shared Action Bar

`components/mvp/learning-session/StickyActionBar.tsx`

Current behavior:

- Bottom action bar with `Exit`, notes toggle, and next/finish button.
- Exit currently links to `/mvp/world-map`.
- Button state is controlled by `answered`.

Risk: the hardcoded exit route is wrong for English, but fixing it must preserve the default for Mathematics.

### Shared Question Card

`components/mvp/explanation/QuestionCard.tsx`

Current behavior:

- Normalizes questions through `normalizeQuestion`.
- Always renders `MathVisualRenderer`.
- Always renders `QuestionRenderer` below the visual.
- Subject label can show `English`, but the layout remains math-like.

Important line anchors:

- Normalization: `components/mvp/explanation/QuestionCard.tsx:15`
- Subject/topic pill: `components/mvp/explanation/QuestionCard.tsx:28`
- Math visual renderer: `components/mvp/explanation/QuestionCard.tsx:54`
- Question renderer: `components/mvp/explanation/QuestionCard.tsx:58`

Main issue: English visuals are forced into the Mathematics visual model.

### Question Engine

Files:

- `data/question-engine-types.ts`
- `lib/question-engine/normalize-question.ts`
- `components/mvp/question-engine/QuestionRenderer.tsx`
- `components/mvp/question-engine/renderers/*`

Current state:

- `QuestionRenderer` has routes for multiple choice, true/false, count objects, tap answer, fill blank, and match pairs.
- `normalizeQuestion` still normalizes legacy questions only as `multiple-choice` when no `interactionType` exists.
- If a runtime question declares a non-MCQ `interactionType`, `normalizeQuestion` throws.

Important line anchors:

- Supported response types: `data/question-engine-types.ts:165`
- Renderer switch: `components/mvp/question-engine/QuestionRenderer.tsx:35`
- Legacy MCQ normalization: `lib/question-engine/normalize-question.ts:28`
- Runtime-only MCQ gate: `lib/question-engine/normalize-question.ts:70`

Main issue: existing English questions are still legacy MCQ at runtime.

### English Data

`data/mvp-english-world.ts`

Current state:

- Generates 10 levels.
- Generates 12 source questions per level.
- Uses `sessionQuestionCount: 10` and `randomizeQuestions: true`.
- Uses generic `MvpQuestion` and `VisualLearningModel` from Mathematics.
- Questions include English-specific explanations, LearnBot tips, voice scripts, steps, and visual explanation text.

Important line anchors:

- English seed type: `data/mvp-english-world.ts:14`
- Session count: `data/mvp-english-world.ts:44`
- Question ID and conversion: `data/mvp-english-world.ts:88`
- Level construction: `data/mvp-english-world.ts:113`
- English levels export: `data/mvp-english-world.ts:597`

Main issue: there is no `englishQuestionType` or English presentation schema yet.

### English-Specific Branches Already Present

`components/mvp/explanation/ExplanationTabs.tsx`

Current English branch:

- Detects English using `content.levelId.startsWith("english-")`.
- Uses `EnglishExplanation` instead of `MathExplanation`.
- Shows status, visual recap, three steps, voice, word meaning, example, and LearnBot tip.

Important line anchors:

- English detection: `components/mvp/explanation/ExplanationTabs.tsx:395`
- English visual recap: `components/mvp/explanation/ExplanationTabs.tsx:647`
- English teaching card: `components/mvp/explanation/ExplanationTabs.tsx:696`
- English explanation: `components/mvp/explanation/ExplanationTabs.tsx:722`
- Branch decision: `components/mvp/explanation/ExplanationTabs.tsx:956`

Current problem:

- The English explanation is subject-aware but too dense.
- It permanently displays too many blocks after each answer.
- It does not match the approved modal-style English explanation cards.

`components/mvp/explanation/HintPanel.tsx`

Current English branch:

- Detects English using the question ID seed pattern.
- Provides level-based English hints.
- Shows `Reading Hint`, `English Helper`, and `English tip` copy.

Important line anchors:

- English hint map: `components/mvp/explanation/HintPanel.tsx:49`
- English level detection: `components/mvp/explanation/HintPanel.tsx:112`
- Think-mode hint selector: `components/mvp/explanation/HintPanel.tsx:148`
- Hint panel render: `components/mvp/explanation/HintPanel.tsx:172`

Current problem:

- The left hint panel still follows the Mathematics three-column lesson pattern.
- The approved English references use a smaller type label/instruction area and a focused English activity card.

### Progress, XP, Rewards, and Completion

Progress files:

- `components/mvp/useMvpProgress.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `data/progress-types.ts`

Current state:

- Progress is isolated by `subject:year:worldId`.
- English uses `ENGLISH_PROGRESS_REF` from `data/english-world-identity.ts`.
- `QuestionPlayer` passes the level subject/year/world into `useMvpProgress`.
- XP, stars, attempts, level completion, badge completion, and remote sync are shared.

These should remain untouched for the English interface redesign.

Reward/completion file:

- `components/mvp/explanation/ForestRewardScreen.tsx`

Current issue:

- The component is still forest/generic and includes Mathematics-flavored fallback skill labels.
- It does accept `skillLearned`, `worldName`, `bossName`, `completionBadge`, `mapHref`, and `rewardsHref` props, so English can remain safe without changing reward logic.

## 3. Design Comparison Against Approved References

Attached references:

- `public/design-system/english question and explanation design Type A to Type C.png`
- `public/design-system/english question and explanation design Type 4 to Type 6.png`

### Approved Design Principles Observed

Before answer:

- One compact question card.
- Subject/topic/progress/XP metadata inside the card.
- A clear question type label on the left or top.
- A speaker/audio icon near the prompt.
- Activity UI changes by question type.
- Minimal hint text.
- Children see the task first, not a large generic LearnBot panel.

After answer:

- A focused explanation pop-up/modal.
- Large LearnBot illustration but not a full dense right-side notes document.
- One clear result heading.
- One concise teaching explanation.
- Optional example or word meaning only when useful.
- `+10 XP` and `Next Question` are prominent.
- Explanations are specific to the English question type.

### Current Implementation Gap

Current English gameplay still shows:

- Shared three-column MVP layout.
- Generic center question card using `MathVisualRenderer`.
- Generic MCQ buttons for all English questions.
- Dense right explanation panel with too many repeated sections.
- Hint and explanation content that can duplicate each other.
- No intentional Type A-F renderer map.
- No English-specific visual/prompt layouts for spelling, blanks, sentence meaning, matching, sentence builder, or picture choice.

## 4. Files That Could Affect Mathematics

These shared files must be treated as high-risk:

- `components/mvp/QuestionPlayer.tsx`
- `components/mvp/explanation/QuestionCard.tsx`
- `components/mvp/explanation/ExplanationTabs.tsx`
- `components/mvp/explanation/HintPanel.tsx`
- `components/mvp/learning-session/LearningSessionShell.tsx`
- `components/mvp/learning-session/StickyActionBar.tsx`
- `components/mvp/explanation/ProgressTracker.tsx`
- `components/mvp/explanation/XPRewardCard.tsx`
- `components/mvp/explanation/ForestRewardScreen.tsx`
- `lib/question-engine/normalize-question.ts`
- `data/question-engine-types.ts`
- `data/mvp-forest-world.ts`

If these are modified later, changes must be default-preserving and tested against Mathematics.

## 5. Safest English-Only Extension Points

Recommended safe seams:

1. Add English-specific components under `components/mvp/english/`.
2. Add English-specific presentation types under `data/english-question-types.ts`.
3. Add English presentation metadata to English questions only in `data/mvp-english-world.ts`.
4. In `QuestionPlayer`, branch only when `level.subject === "english"`.
5. Use existing `chooseAnswer(answer)` callback and existing `selectedAnswer` string state.
6. Preserve the current shared `nextQuestion`, `completeLevel`, XP, progress, and reward calls.
7. Add default-preserving props to shell/action-bar only when needed, for example `exitHref`, `subjectLabel`, and `learningModeLabel`.

Avoid:

- Rewriting `QuestionPlayer`.
- Changing `useMvpProgress`.
- Changing Mathematics question data.
- Changing `MathVisualRenderer`.
- Replacing `QuestionRenderer` globally.
- Reworking Science during this task.

## 6. Proposed Architecture

### Proposed Component Tree

Current shared flow should remain:

```txt
QuestionPlayer
  LearningSessionShell
    ProgressTracker
    subject-specific hint/support
    subject-specific question card
    StickyActionBar
```

Recommended English branch:

```txt
QuestionPlayer
  if level.subject === "english":
    EnglishHintPanel
    EnglishQuestionCard
      EnglishQuestionRenderer
        TypeAWordSpellingRenderer
        TypeBFillBlankRenderer
        TypeCSentenceMeaningRenderer
        TypeDMatchingRenderer
        TypeESentenceBuilderRenderer
        TypeFPictureChoiceRenderer
    EnglishExplanationPanel or EnglishExplanationPopup
  else:
    existing HintPanel
    existing QuestionCard
    existing ExplanationTabs
```

### Proposed Files To Add

- `data/english-question-types.ts`
- `lib/english/english-question-presentation.ts`
- `components/mvp/english/EnglishQuestionCard.tsx`
- `components/mvp/english/EnglishQuestionRenderer.tsx`
- `components/mvp/english/EnglishExplanationPanel.tsx`
- `components/mvp/english/EnglishHintPanel.tsx`
- `components/mvp/english/renderers/TypeAWordSpellingRenderer.tsx`
- `components/mvp/english/renderers/TypeBFillBlankRenderer.tsx`
- `components/mvp/english/renderers/TypeCSentenceMeaningRenderer.tsx`
- `components/mvp/english/renderers/TypeDMatchingRenderer.tsx`
- `components/mvp/english/renderers/TypeESentenceBuilderRenderer.tsx`
- `components/mvp/english/renderers/TypeFPictureChoiceRenderer.tsx`
- `scripts/test-english-interface-schema.mjs`

### Proposed Files To Modify

Only with English-gated/default-preserving changes:

- `data/mvp-english-world.ts`
  - Add English presentation metadata for each question.
  - Preserve IDs, correct answers, options, XP, level count, random session settings.

- `components/mvp/QuestionPlayer.tsx`
  - Add `const isEnglish = level.subject === "english"`.
  - Use English components only when `isEnglish`.
  - Keep all state, answer checking, progress, XP, completion logic unchanged.

- `components/mvp/learning-session/LearningSessionShell.tsx`
  - Optional safe props: `subjectLabel`, `exitHref`, `modeLabel`.
  - Defaults must remain current Mathematics behavior.

- `components/mvp/learning-session/StickyActionBar.tsx`
  - Optional safe prop: `exitHref`.
  - Default must stay `/mvp/world-map`.

- `package.json`
  - Add a focused English interface/schema test script if implemented.

### Files That Must Remain Untouched

- `data/mvp-forest-world.ts`
- `content/math/**`
- `content/question-bank/mathematics/**`
- `generated/active-content-manifest.json`
- `lib/curriculum/active-content.ts`
- `components/mvp/useMvpProgress.ts`
- `lib/progress/local-progress.ts`
- `lib/progress/child-progress.ts`
- `data/progress-types.ts`
- Supabase migrations and clients
- Mathematics routes under `app/mvp/**`
- Science routes and data under `app/science/**`, `data/mvp-science-world.ts`
- XP, stars, badge, and reward calculation logic

## 7. Proposed TypeScript Schema Changes

Add a new English presentation schema rather than changing the global question engine first.

```ts
export type EnglishQuestionType =
  | "word-spelling"
  | "fill-blank"
  | "sentence-meaning"
  | "matching"
  | "sentence-builder"
  | "picture-choice";

export type EnglishQuestionPresentation = {
  englishType: EnglishQuestionType;
  typeLabel: "TYPE A" | "TYPE B" | "TYPE C" | "TYPE D" | "TYPE E" | "TYPE F";
  skillLabel: string;
  instruction: string;
  audioPrompt?: string;
  promptDisplay?: {
    sentence?: string;
    blankTemplate?: string;
    pictureObject?: string;
    pictureAlt?: string;
    wordTiles?: string[];
    matchPairs?: Array<{ left: string; right: string }>;
  };
  explanation: {
    resultTitle: string;
    correctLine: string;
    meaning?: string;
    example?: string;
    learnBotTip: string;
    visualAlt?: string;
  };
};
```

Short-term placement options:

- Preferred: add `englishPresentation?: EnglishQuestionPresentation` to English-generated questions only using a type guard/helper.
- Acceptable: add optional `englishPresentation?: unknown` to `MvpQuestion` only if TypeScript requires it. This is safe because it is optional and unused by Mathematics.

Do not replace the global question engine schema until English presentation is validated.

## 8. Question-Type Renderer Map

| Approved Type | Renderer | Existing data mapping | Interaction behavior |
| --- | --- | --- | --- |
| Type A: Word Spelling | `TypeAWordSpellingRenderer` | Letter/spelling/word choice questions | Large word buttons, optional audio icon, answer selected through existing `onSelectAnswer(correctLabel)` flow. |
| Type B: Fill in the Blank | `TypeBFillBlankRenderer` | Missing letter and sentence completion | Show sentence/word with one blank, answer chips or text input. Must return selected answer string compatible with existing `correctAnswer`. |
| Type C: Sentence Meaning | `TypeCSentenceMeaningRenderer` | Reading comprehension and meaning questions | Show sentence/passage card, then meaning choices, preferably with small picture/scene choices when available. |
| Type D: Matching | `TypeDMatchingRenderer` | Category, pair, upper/lowercase, word-picture matching | First version should use tap-to-match pairs locally, then submit a final string answer compatible with existing `correctAnswer`. Avoid changing global grading in this phase. |
| Type E: Sentence Builder | `TypeESentenceBuilderRenderer` | Sentence ordering or grammar sequence questions | Use word tiles and target slots. For initial migration, only enable on questions with authored tile order. Do not infer tiles silently. |
| Type F: Picture Choice | `TypeFPictureChoiceRenderer` | Vocabulary, beginning sounds, colours/shapes with picture clues | Large visual/picture area with 2-4 choice cards. Use existing object icon assets until production images are authored. |

Important compatibility rule:

- Every renderer must ultimately call the existing `onSelectAnswer(answer: string)` with a value that preserves current `selectedAnswer === currentQuestion.correctAnswer` answer checking, unless a later dedicated grading refactor is explicitly approved.

## 9. Explanation Panel Behavior

Current English explanation shows too many permanent sections:

- status
- visual recap
- three teaching steps
- voice
- word meaning
- example
- LearnBot tip

Approved English behavior should be:

Before answer:

- No dense learning notes document.
- Use a small hint/instruction card only.
- Keep question and answer area visually dominant.

After answer:

- Show a focused English explanation pop-up/card.
- Maximum content:
  - result: `Correct`, `Great Job`, `Excellent`, or gentle review state
  - LearnBot image
  - answer or completed sentence
  - one short meaning/explanation paragraph
  - optional example card
  - LearnBot tip only when useful
  - `+10 XP` display
  - next action remains in sticky action bar or inside the popup only if shared flow permits

Type-specific explanation examples:

- Type A: Correct spelling + meaning + one example.
- Type B: Completed sentence + why the word fits.
- Type C: Sentence meaning + clue sentence.
- Type D: Matched pairs recap.
- Type E: Correct sentence + word meaning for key words.
- Type F: Picture evidence + answer sentence.

Implementation recommendation:

- Add `EnglishExplanationPanel` and use it only when `level.subject === "english"`.
- Keep `ExplanationDrawer` as the mobile container if needed, but the content should behave like the approved concise pop-up.
- Do not add tabs for English.
- Do not display every possible note section every time.

## 10. Hint Behavior

Current English hint panel is better than the original math hint, but it still occupies a full left column on desktop and can duplicate explanation copy.

Recommended English hint behavior:

- Before answer only.
- One short instruction sentence.
- One type label, for example `TYPE A`, `TYPE B`.
- One optional audio/speaker cue.
- No long rule card.
- No repeated explanation content.

Type-specific examples:

- Type A: `Look carefully at each letter.`
- Type B: `Read the sentence and try each word.`
- Type C: `Read the sentence first.`
- Type D: `Match the item on the left to the best item on the right.`
- Type E: `Put the words in an order that sounds like a sentence.`
- Type F: `Look at the picture before choosing.`

## 11. Mobile and Tablet Behavior

### 1366 x 768

Risk level: High.

Current risks:

- Header + progress + bottom action bar consume vertical space.
- Three-column desktop layout leaves a narrow question area.
- Right explanation panel is dense and may visually feel like a document.
- English explanation content can crowd the panel after answering.

Plan:

- English question card should be compact and type-specific.
- Hide large helper panel for English unless needed.
- After answer, use one concise explanation card rather than many sections.

### 1440 x 900

Risk level: Medium.

Current risks:

- More room, but the interface still feels generic and dense.
- The right panel is still too prominent for before-answer Think Mode.

Plan:

- Use approved two-zone English layout: activity card + concise feedback/explanation.

### 1024 x 768

Risk level: Very High.

Current risks:

- `lg` breakpoint activates at 1024px.
- The support panel uses `minmax(29rem,38rem)`, leaving limited question width.
- Left hint column inside the question area also consumes width.
- English text answers and sentence prompts may wrap heavily.

Plan:

- For English, switch to a tablet layout before 1180px or make the support panel collapsible/bottom-sheet style.
- Keep question prompt, choices, and Next visible.

### 768 x 1024

Risk level: Medium.

Current behavior:

- Below `lg`, support becomes bottom sheet after answer.
- Question area can scroll naturally.

Plan:

- English explanation bottom sheet must show concise content first.
- Avoid showing all notes sections.
- Keep answer options large enough for touch.

### 390 x 844

Risk level: High.

Current risks:

- Long English explanations will require internal scrolling.
- Four-answer grids and long sentence prompts may become tall.
- Sticky action bar can hide lower content if explanation content is too long.

Plan:

- One natural page flow:
  - type label
  - prompt
  - type-specific activity
  - choices/interaction
  - concise explanation after answer
  - sticky action
- No permanent right panel on mobile.

## 12. Migration Strategy for Existing 120 Questions

Do not rewrite content first. Add presentation metadata in a controlled pass.

### Step 1: Classify Questions

Add `englishType` per question based on generator/source:

- `letterPairQuestion`, `differentLetterQuestion`, `sameLetterQuestion`: Type A or Type D depending on UI target.
- `missingLetterQuestion`: Type B.
- `nextLetterQuestion`: Type A initially, or Type B if rendered as sequence blank.
- `firstLetterQuestion`, `soundQuestion`, `vocabularyQuestion`: Type F.
- `colourQuestion`, `shapeQuestion`: Type F.
- `homeSchoolWord`, `categoryQuestion`: Type D or Type F depending on authored visual.
- `sentenceCompletion`: Type B.
- `grammarQuestion`: Type B or Type C depending on sentence structure.
- `readingQuestion`: Type C.
- New sentence ordering items only: Type E.

### Step 2: Preserve Existing Runtime Values

For every migrated question:

- Keep `id` unchanged.
- Keep `correctAnswer` unchanged.
- Keep `options` unchanged unless a question is proven defective in a separate content QA task.
- Keep `xpReward` unchanged.
- Keep `level`, `nodeType`, `worldId`, and `levelId` unchanged.
- Keep randomized 10-question sessions unchanged.

### Step 3: Add Presentation Metadata

Add fields such as:

- `englishPresentation.englishType`
- `englishPresentation.typeLabel`
- `englishPresentation.instruction`
- `englishPresentation.promptDisplay`
- `englishPresentation.explanation`

### Step 4: Validate Metadata

Add a test that checks:

- All 120 English questions have a valid English type.
- Every type used has required presentation data.
- Type E only appears when word tiles and correct order are authored.
- Type D only appears when pairs are authored.
- Picture-choice questions have visual alt text.
- Existing correct answer remains in options where MCQ-compatible.

### Step 5: Roll Out Rendering by Type

Safe implementation order:

1. Type A Word Spelling
2. Type F Picture Choice
3. Type B Fill in the Blank
4. Type C Sentence Meaning
5. Type D Matching
6. Type E Sentence Builder

Rationale:

- Types A/F/B/C can preserve the current string answer model easily.
- Type D/E need more careful interaction state while keeping final answer compatibility.

## 13. Testing Strategy

### Required Regression Commands

Run after implementation:

- `npm.cmd run test:english-year1-content`
- `npm.cmd run test:mvp-level-access`
- `npm.cmd run test:mvp-reset-safety`
- `npm.cmd run test:mvp-year-availability`
- `npm.cmd run test:question-assets`
- `npm.cmd run validate:curriculum`
- `npm.cmd run lint`
- `npx.cmd tsc --noEmit --incremental false`
- `npm.cmd run build`

### New Tests To Add

Add `scripts/test-english-interface-schema.mjs` covering:

- 120 English questions classified into Type A-F.
- No unsupported English type values.
- Required fields exist per type.
- Type-specific renderer map covers every `englishType`.
- Existing IDs, correct answers, XP, and level counts unchanged.
- Random session count remains 10.
- Mathematics files are not imported or mutated by English schema tests.

### Manual QA Routes

Smoke-test:

- `/english/question/1` for Type A/B letter tasks.
- `/english/question/2` for sound/picture choice tasks.
- `/english/question/3` for picture vocabulary.
- `/english/question/6` for fill blank.
- `/english/question/8` for matching/categorising.
- `/english/question/9` for sentence meaning.
- `/english/question/10` for mixed challenge.

Viewport checks:

- 1366 x 768
- 1440 x 900
- 1024 x 768
- 768 x 1024
- 390 x 844

Check:

- No horizontal scrolling.
- Next button remains visible.
- Answer choices fit or scroll naturally.
- Explanation does not feel like a dense document.
- Type label and instruction are clear.
- LearnBot appears in the explanation, not as a distracting pre-answer document.

## 14. Risks

### High Risk: Shared Component Regression

`QuestionPlayer`, `QuestionCard`, `LearningSessionShell`, and `StickyActionBar` are shared. Any global change can affect Mathematics.

Mitigation:

- Use `level.subject === "english"` branches.
- Add props with Mathematics-preserving defaults.
- Run Math route smoke tests after implementation.

### High Risk: Type D and Type E Answer Compatibility

Matching and sentence-builder interactions are not simple MCQ selections. Current `QuestionPlayer` answer checking is string equality.

Mitigation:

- First version should convert final completed interaction into the existing `correctAnswer` string.
- Do not change grading globally unless explicitly approved later.
- Keep local internal renderer state separate from level progress state.

### Medium Risk: Dense Explanation Moving Into Popup

If the popup contains too much information, it will repeat the current problem.

Mitigation:

- Enforce one compact explanation model per English type.
- Do not show voice, meaning, example, and LearnBot tip all at once unless that type requires them.

### Medium Risk: Visual Assets

Approved references show picture-rich English cards. Current English data mostly uses object icons or text visuals.

Mitigation:

- Use current icon/object assets first.
- Add `visualAlt` and `pictureObject` metadata.
- Do not add production image dependencies until assets are approved.

### Medium Risk: Responsive Breakpoints

The current desktop layout starts at 1024px and may be too tight for English sentence tasks.

Mitigation:

- English-specific layout should use a wider single-card composition on tablet/laptop.
- Avoid keeping both left hint and right explanation panels visible at 1024px.

## 15. Rollback Plan

Safe rollback should be simple:

1. Remove the `level.subject === "english"` branch from `QuestionPlayer`.
2. Revert English route rendering back to existing `QuestionCard`, `HintPanel`, and `ExplanationTabs`.
3. Leave English content metadata in place if it is optional and unused.
4. Do not touch progress storage or localStorage keys.
5. Mathematics remains unaffected because defaults and existing components are retained.

## 16. Recommended Implementation Phases

### E-UI1: Schema and Classification Only

Goal:

- Add English type metadata to all 120 questions.
- Add tests that verify classification and metadata.

Files:

- Add `data/english-question-types.ts`.
- Modify `data/mvp-english-world.ts` only.
- Add `scripts/test-english-interface-schema.mjs`.
- Update `package.json` test script only if desired.

Acceptance:

- No UI changes.
- English session count remains 10.
- All existing tests pass.

### E-UI2: English Question Card and Type A/F/B/C Renderers

Goal:

- Add English-specific before-answer interface for the easiest four types.

Files:

- Add `components/mvp/english/EnglishQuestionCard.tsx`.
- Add `components/mvp/english/EnglishQuestionRenderer.tsx`.
- Add Type A, B, C, F renderers.
- Modify `QuestionPlayer` only to branch for English.

Acceptance:

- Mathematics still uses existing `QuestionCard`.
- English questions feel visibly different from Math.
- Existing answer checking still works.

### E-UI3: English Explanation Popup

Goal:

- Replace dense English notes with concise type-specific explanation cards.

Files:

- Add `components/mvp/english/EnglishExplanationPanel.tsx`.
- Modify `QuestionPlayer` English support branch only.
- Leave `ExplanationTabs` Math branch intact.

Acceptance:

- English after-answer UI matches reference behavior more closely.
- No tabs for English.
- Desktop explanations fit at 1366 x 768 for normal questions.

### E-UI4: Type D Matching and Type E Sentence Builder

Goal:

- Add richer English interactions without changing global grading.

Files:

- Add Type D and Type E renderers.
- Add validation for authored pairs and word tiles.

Acceptance:

- Renderer local state works with keyboard and touch.
- Final answer remains compatible with current `QuestionPlayer` string answer model.

### E-UI5: Responsive QA and Polish

Goal:

- Tune English layout at required breakpoints.

Files:

- English components only.
- Optional default-preserving props in `LearningSessionShell` and `StickyActionBar`.

Acceptance:

- 1366 x 768 and 1024 x 768 no longer feel cramped.
- 390 x 844 has natural scrolling only where necessary.

## 17. Explicit Non-Goals

Do not do these in the English interface redesign:

- Do not modify Mathematics content or visuals.
- Do not change Mathematics routes or layout.
- Do not change XP or star calculations.
- Do not change progress saving or Supabase sync.
- Do not redesign Science.
- Do not replace the global question engine.
- Do not modify the active Mathematics manifest.
- Do not add new backend tables.
- Do not commit or push until reviewed.

## 18. Recommended First Implementation Task

Start with E-UI1 only:

> Add `EnglishQuestionType` metadata and a validation test for all 120 English questions. Do not change UI yet.

Why first:

- It is low risk.
- It does not affect Mathematics.
- It creates the contract that the English UI can safely render.
- It prevents ad hoc type inference inside React components.