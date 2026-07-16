# LearnPlay Question Author Guide

Version: 1.0  
Audience: Question writers, curriculum writers, LearnBot script writers, and visual prompt writers.

## Purpose

This guide explains how to write LearnPlay questions that are clear, playable, curriculum-aligned, visually teachable, and ready for approval.

Every question should help a child learn, not just test.

## Authoring Principles

1. Write for the child first.
2. Use short, direct sentences.
3. Ask one clear thing at a time.
4. Use visuals as part of teaching.
5. Make every explanation specific to the question.
6. Make LearnBot sound encouraging, not robotic.
7. Make distractors useful but not tricky.
8. Keep age and year level in mind.
9. Avoid repeated wording across many rows.
10. Never use placeholder text in rows marked Approved.

## Question Row Anatomy

Each production question needs:

- Question ID
- Subject
- Year
- World or module
- Level
- Topic
- Subtopic
- Learning Objective
- Difficulty
- Question Type
- Question
- Visual Object
- Visual Description
- Options
- Correct Answer
- Step 1
- Step 2
- Step 3
- Final Explanation
- LearnBot Tip
- Voice Script
- Curriculum Alignment
- Assessment Eligible
- Status
- Review Status
- Version Notes.

## Writing Good Question Text

Good question text is:

- short
- clear
- age-appropriate
- tied to the visual
- not overloaded with instructions.

Weak:

```text
Match each group to the correct number.
```

Better:

```text
Count each forest group. Which number card matches it?
```

Weak:

```text
1 apple plus 1 more apples. How many apples altogether?
```

Better:

```text
There is 1 apple on the branch. 1 more apple appears. How many apples are there now?
```

## Question Type Standards

### Multiple Choice

Use when the child should select one answer from choices.

Rules:

- 3 or 4 options for early primary.
- Correct answer must appear exactly once.
- Distractors should be close but fair.
- Avoid repeated option sets across many rows.

Example:

```text
Question: Count the apples. How many apples are there?
Options: 2 | 3 | 4
Correct Answer: 3
```

### Count And Type

Use when the child counts objects and enters the number.

Rules:

- Visual must show exact count.
- Correct answer should be numeric.
- Voice script should encourage pointing while counting.

### Tap Correct Group

Use when the child compares two or more groups.

Rules:

- Group labels must be clear.
- Visual description must include each group count.
- Explanation must compare totals.

Example:

```text
Step 1: Count Group A.
Step 2: Count Group B.
Step 3: Choose the group with more.
```

### Fill Missing Number

Use for number paths, sequences, and missing positions.

Rules:

- Show the full sequence with one blank.
- Explanation must say what comes before and after.
- Avoid using the same number path repeatedly across levels.

### Match Pairs

Use for matching groups to numbers, words, labels, or concepts.

Rules:

- Each pair must be clear.
- Pair data must be complete.
- Do not use Match Pairs if the source row does not include enough pair information.

### True Or False

Use when the child verifies a statement.

Rules:

- Statement must be unambiguous.
- Explanation must say why it is true or false.
- Avoid too many obvious true statements in a row.

## Writing Explanations

Every explanation should teach the process.

Use this structure:

1. Understand the question.
2. Work it out.
3. Check the answer.
4. State the answer.

Weak:

```text
The correct answer is 6.
```

Better:

```text
Count each flower once. There are 6 flowers. So the answer is 6.
```

Weak:

```text
The correct answer is Group B.
```

Better:

```text
Group A has 3 apples. Group B has 5 apples. 5 is more than 3, so Group B is correct.
```

## LearnBot Tip Rules

LearnBot tips should be:

- one short idea
- friendly
- actionable
- varied
- specific to the skill.

Weak:

```text
Addition means putting groups together.
```

Better variations:

```text
Put both groups together, then count them all.
```

```text
Start with the first group and count on.
```

```text
The plus sign tells us to join the groups.
```

## Voice Narration Rules

Voice scripts should sound like a teacher sitting beside the child.

Use:

- short sentences
- gentle encouragement
- clear steps
- row-specific numbers or objects.

Avoid:

- long paragraphs
- repeated scripts
- adult technical language
- reading every field exactly as written.

Weak:

```text
Let's solve it together. Count Group A. Count Group B. Compare the two totals.
```

Better:

```text
Let's count the apples. Group A has 3. Group B has 5. 5 is more, so tap Group B.
```

## Visual Prompt Rules

A visual prompt should tell the renderer or illustrator exactly what to show.

Include:

- object type
- exact count
- grouping
- labels
- operator
- answer highlight
- scene context when useful.

Weak:

```text
Show objects.
```

Better:

```text
Show Group A with 3 apples and Group B with 5 apples. Label both groups and highlight Group B after answering.
```

For addition:

```text
Show 3 flowers + 2 flowers = 5. Use a visible plus sign and highlight the total.
```

For missing number:

```text
Show stepping stones labelled 4, 5, __, 7. Highlight the blank, then reveal 6.
```

## Distractor Option Rules

Distractors should reveal common learning mistakes.

Good distractors:

- one less than correct answer
- one more than correct answer
- common counting slip
- reversed comparison group.

Poor distractors:

- impossible values
- repeated same option sets across many rows
- duplicated options
- trick answers.

Example:

Correct answer: 6

Good options:

```text
5 | 6 | 7
```

But if this set appears many times, vary by context:

```text
4 | 6 | 8
```

```text
6 | 7 | 9
```

## Question Variation Rules

Do not repeat the same stem unless it is intentional practice.

Vary:

- object
- setting
- action
- target skill
- wording
- option order
- explanation
- LearnBot tip
- voice narration.

Repeated concept:

```text
Tap the group with more apples.
```

Variation:

```text
Which apple basket has more?
```

```text
The forest helper needs the bigger apple group. Which one should they choose?
```

```text
Count both apple groups. Tap the group with the larger number.
```

## Difficulty Progression

Difficulty should progress gently.

### Easy

- direct counting
- numbers 1-5
- one clear visual
- simple language.

### Medium

- numbers 6-10
- compare two groups
- missing number
- simple addition.

### Hard

- mixed skills
- review context
- more reasoning
- fewer hints.

### Challenge

- mixed skill selection
- boss style
- child must decide method.

## Subject Guidance

### Mathematics

Use visuals, objects, number paths, and equations. Show the thinking.

### English

Use short sentences, phonics where needed, and meaningful vocabulary context.

### Science

Use observation, cause and effect, and fact-checked explanations.

### Life Skills

Use real-life scenarios, safe choices, and gentle reflection.

## Curriculum Alignment Writing

Avoid vague values such as:

```text
Both
```

Use explicit values:

```text
KSSR Mathematics Year 1 - Numbers 1-10 - Count objects
```

```text
Cambridge Primary Mathematics Stage 1 - Number - Count and compare small sets
```

Combined example:

```text
KSSR Year 1 Numbers + Cambridge Stage 1 Number
```

## Author Self-Check

Before sending a row to review, confirm:

- Question is clear.
- Correct answer is correct.
- Options are unique.
- Explanation teaches, not just confirms.
- LearnBot tip is short and useful.
- Voice script is natural.
- Visual description is specific.
- Curriculum alignment is explicit.
- Difficulty matches the level.
- No placeholder text remains.
- Row status is not Approved until review is complete.

