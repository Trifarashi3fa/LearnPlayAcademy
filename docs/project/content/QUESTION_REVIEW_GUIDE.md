# LearnPlay Question Review Guide

Version: 1.0  
Audience: curriculum reviewers, QA reviewers, subject leads, and approvers.

## Purpose

This guide defines how to review LearnPlay content before it can be approved, imported, and released.

The reviewer protects:

- child learning quality
- curriculum accuracy
- age appropriateness
- gameplay clarity
- content consistency
- production safety.

## Review Outcomes

| Decision | Meaning |
|---|---|
| Approved | Row is ready for import and production QA. |
| Revision Needed | Row has fixable issues. |
| Rejected | Row is not suitable for the package. |
| Future | Row is valid as an idea but not supported now. |

Only Approved rows should be production-imported.

## Review Order

Review each row in this order:

1. Identity fields
2. Curriculum fields
3. Question text
4. Options and correct answer
5. Explanation
6. LearnBot tip
7. Voice script
8. Visual description
9. Difficulty
10. Duplicate risk
11. Renderer compatibility
12. Approval fields.

## Severity Levels

| Severity | Meaning | Example |
|---|---|---|
| Critical | Must not release. | Correct answer is wrong. |
| High | Must fix before approval. | Explanation does not teach or is misleading. |
| Medium | Should fix before release. | Too much duplicate wording. |
| Low | Nice to improve. | Minor wording polish. |

## Identity Review

Check:

- Question ID is present.
- Question ID is unique.
- Subject is correct.
- Year is correct.
- World/module is correct.
- Level is correct.
- Topic and subtopic are present.

Reject if:

- ID is missing
- row is in the wrong level
- subject/year mismatch exists.

## Curriculum Review

Check:

- Learning objective matches the question.
- KSSR alignment is explicit where applicable.
- Cambridge alignment is explicit where applicable.
- Topic and subtopic are consistent.
- Assessment eligibility makes sense.

High issue:

```text
Curriculum Alignment = Both
```

This is too broad for production release. Ask author to specify the standards.

## Question Text Review

Good question text:

- asks one task
- uses age-appropriate words
- is connected to the visual
- avoids confusing grammar
- avoids unnecessary story text.

Flag if:

- child may not know what to do
- question asks two things at once
- wording repeats too often
- wording is too adult
- grammar is incorrect.

## Answer And Options Review

Check:

- Correct answer is actually correct.
- Correct answer appears in options when required.
- Options are unique.
- Distractors are fair.
- Distractors are not too obvious.
- Option order is not always the same.

Flag if:

- options are repeated across too many rows
- true/false statements are all obvious
- comparison options do not match visual groups
- numeric options are impossible.

## Explanation Review

A good explanation should:

- tell the child how to solve
- use the row's exact numbers or objects
- include 2-3 short steps
- state the final answer
- avoid shame after wrong answers.

Weak:

```text
The correct answer is 5.
```

Review comment:

```text
Please explain how the child gets 5. Include the object count or number path.
```

## LearnBot Tip Review

A LearnBot tip should:

- be one short coaching sentence
- match the skill
- avoid repetition
- use encouraging language.

Flag if:

- tip repeats across many rows
- tip is too generic
- tip gives away the answer without teaching
- tip is too long.

## Voice Script Review

Voice script should:

- sound natural aloud
- use short sentences
- include row-specific objects or numbers
- match the question type
- avoid repeated boilerplate.

Read it aloud. If it sounds stiff, mark Revision Needed.

## Visual Description Review

Check:

- exact object counts are included
- group labels are clear
- operators are correct
- answer reveal is described
- visual matches question text
- visual is not too crowded.

For comparison:

```text
Show Group A with 3 apples and Group B with 5 apples. Highlight Group B after answering.
```

For addition:

```text
Show 3 apples + 2 apples = 5.
```

For missing number:

```text
Show 1, 2, __, 4 and highlight the missing number 3 after answering.
```

## Duplicate Review

Duplicates are not always wrong. Young children need repeated patterns. But excessive exact repetition reduces quality.

Flag high-impact duplicates:

- same explanation appears more than 10 times
- same LearnBot tip appears more than 10 times
- same voice script appears more than 10 times
- same question stem appears across multiple levels
- boss/challenge rows repeat beginner wording.

Reviewer should ask:

- Is repetition intentional practice?
- Does this level need more variety?
- Does the explanation teach this exact row?

## Age Appropriateness Review

Check:

- words are familiar
- sentences are short
- no fear-based or shaming language
- no sensitive personal information
- no unsafe scenario
- reading demand matches age.

For Year 1:

- use concrete objects
- use numbers within scope
- avoid multi-step text-heavy instructions.

## Difficulty Progression Review

Check progression within a world:

- Learn levels introduce.
- Practice levels reinforce.
- Mini Game levels feel interactive.
- Review levels mix earlier skills.
- Challenge levels require thinking.
- Boss levels feel special and mixed.

Flag if:

- challenge level is easier than practice
- boss repeats beginner stems
- all rows are Easy
- question type distribution is too narrow.

## Subject Review Notes

### Mathematics

Check numeric correctness, visual count, operator, and explanation.

### English

Check grammar, vocabulary level, phonics, sentence accuracy, and reading level.

### Science

Check factual accuracy, safety, and clarity.

### Life Skills

Check scenario safety, emotional tone, privacy, and parent appropriateness.

## Renderer Compatibility Review

Supported launch-safe types:

- Multiple Choice
- Count and Type
- Tap Correct Group
- Fill Missing Number
- Match Pairs
- True or False.

Future types should be marked Review/Future until supported:

- Drag and Drop
- Sorting
- Puzzle
- Drawing
- Audio answer
- Open response.

## Approval Rules

A row can be approved only if:

- Status = Approved
- Review Status = Approved
- Approved By = Fara
- Approval Date filled
- Version Notes filled
- no placeholder fields
- no unsupported production question type
- no curriculum mismatch
- no wrong answer
- no missing explanation
- no missing visual description.

## Reviewer Comment Format

Use this structure:

```text
Issue:
Why it matters:
Recommended fix:
Severity:
```

Example:

```text
Issue: Explanation only says "The correct answer is 6."
Why it matters: The child does not learn the counting strategy.
Recommended fix: Add "Count each flower once. There are 6 flowers, so the answer is 6."
Severity: High
```

## Final Review Checklist

- Identity fields correct
- Question ID unique
- Curriculum alignment explicit
- Question text clear
- Correct answer correct
- Options valid
- Explanation teaches
- LearnBot tip helpful
- Voice script natural
- Visual description specific
- Difficulty appropriate
- Duplicate risk acceptable
- Renderer supported
- Approval fields complete.

