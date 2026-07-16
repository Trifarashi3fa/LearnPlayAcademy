# Forest World Content Improvement Report

Audit date: 2026-07-12
Project: `E:\Codex\learnplay-academy`
Scope: Approved imported Forest World Year 1 question assets in `content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json` through `forest-l10-imported.json`.

## Guardrails

This report is audit-only. No code, importer, JSON, manifests, routes, gameplay, or question-engine files were modified. Recommendations below are content-editing guidance only.

## Executive Summary

Approved imported rows reviewed: **293**.

Exact duplicate groups detected:

| Area | Duplicate Groups | Rows In Duplicate Groups |
|---|---:|---:|
| Question | 61 | 246 |
| Final Explanation | 19 | 269 |
| LearnBot Tip | 18 | 278 |
| Voice Script | 51 | 252 |
| Visual Description | 62 | 252 |
| Options | 30 | 191 |

Main finding: Forest World has strong coverage of Year 1 skills, but the approved imported bank still reads too template-driven. The biggest quality issue is not correctness; it is repetition. Many rows share identical stems, generic explanations, repeated LearnBot tips, repeated voice scripts, and repeated visual descriptions. This lowers replay value and makes later levels feel less advanced than they should.

## Level Snapshot

| Level | Rows | Topics | Types | Difficulty | Curriculum Alignment |
|---|---:|---|---|---|---|
| L01 | 30 | Number Recognition: 30 | Multiple Choice: 10, Fill Missing Number: 10, Match Pairs: 10 | Easy: 26, Medium: 4 | Both: 30 |
| L02 | 30 | Counting Objects: 30 | Multiple Choice: 11, Fill Missing Number: 10, Tap Correct Group: 8, True or False: 1 | Easy: 21, Medium: 9 | Both: 30 |
| L03 | 23 | Number Matching: 23 | Match Pairs: 10, Multiple Choice: 3, Count & Type: 2, Tap Correct Group: 3, Fill Missing Number: 3, True or False: 2 | Easy: 9, Medium: 14 | Both: 23 |
| L04 | 30 | Addition Basics: 30 | Multiple Choice: 12, Count & Type: 6, Fill Missing Number: 6, Tap Correct Group: 6 | Easy: 30 | Both: 30 |
| L05 | 30 | Addition Practice: 30 | Multiple Choice: 12, Count & Type: 6, Fill Missing Number: 6, Tap Correct Group: 6 | Easy: 11, Medium: 19 | Both: 30 |
| L06 | 30 | Addition Mini Game: 30 | Multiple Choice: 12, Count & Type: 6, Fill Missing Number: 6, Tap Correct Group: 6 | Easy: 11, Medium: 19 | Both: 30 |
| L07 | 30 | Comparison: 30 | Tap Correct Group: 14, True or False: 8, Multiple Choice: 7, Fill Missing Number: 1 | Easy: 15, Medium: 15 | Both: 30 |
| L08 | 30 | Review: 30 | Multiple Choice: 16, Fill Missing Number: 7, Tap Correct Group: 7 | Easy: 24, Medium: 6 | Both: 30 |
| L09 | 30 | Challenge: 30 | Multiple Choice: 11, Tap Correct Group: 6, True or False: 1, Fill Missing Number: 6, Match Pairs: 6 | Easy: 25, Medium: 5 | Both: 30 |
| L10 | 30 | Boss Challenge: 30 | Multiple Choice: 13, Tap Correct Group: 5, Fill Missing Number: 6, Match Pairs: 6 | Easy: 26, Medium: 4 | Both: 30 |

## Cross-Level Educational Quality Findings

1. **Duplicate wording is high.** 61 duplicate question-stem groups affect 246 rows. Repetition is especially heavy in matching, comparison, addition, and missing-number rows.
2. **Explanations are often answer-only.** Examples such as `The correct answer is Group B.` or `The correct answer is 6.` confirm the result but do not teach the reasoning.
3. **LearnBot tips are over-reused.** The tip `Addition means putting groups together.` appears 114 times, and `Compare by counting both groups first.` appears 52 times.
4. **Voice scripts repeat too often.** 51 voice-script duplicate groups affect 252 rows. Voice narration should feel row-specific and supportive.
5. **Visual descriptions are repeated.** 62 duplicate visual-description groups affect 252 rows. Several descriptions should include row-specific totals, highlighted answer, and visual action.
6. **Distractor options repeat.** 30 duplicate option groups affect 191 rows. Repeated sets such as `5|6|7`, `3|4|5`, and `4|5|6` should be varied where possible.
7. **Curriculum mapping is too broad.** All rows currently use `Both` as curriculum alignment. Replace with explicit mapping such as `KSSR Year 1 Numbers 1-10`, `Cambridge Primary Stage 1 Number`, or a controlled combined value.
8. **Difficulty progression needs sharpening.** L09 Challenge and L10 Boss still contain many Easy items and repeated prompts from earlier levels. Add more reasoning language without increasing beyond Year 1 age appropriateness.

## Level-Based Duplicate Recommendations

Each group below is an exact normalized duplicate. A group is placed under its earliest affected level, while the Question IDs list shows every affected row.

### L01

#### L01.1 P1 - Final Explanation duplicate (addition, 38 rows)

- Affected levels: L01, L02, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L01-Q014, FW-Y1-L02-Q005, FW-Y1-L02-Q014, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q012, FW-Y1-L04-Q013, FW-Y1-L04-Q014, FW-Y1-L04-Q015, FW-Y1-L04-Q016, FW-Y1-L04-Q017, FW-Y1-L04-Q018, FW-Y1-L04-Q019, FW-Y1-L04-Q020, FW-Y1-L04-Q021, FW-Y1-L04-Q022, FW-Y1-L04-Q023, FW-Y1-L04-Q024, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q012, FW-Y1-L05-Q013, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q012, FW-Y1-L06-Q013, FW-Y1-L08-Q005, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L08-Q020, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L09-Q022, FW-Y1-L10-Q005, FW-Y1-L10-Q022
- Current wording: The correct answer is 6.
- Recommended new wording: There are row-specific flower in the first group and more in the second group. How many flower altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the flower to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.2 P1 - Final Explanation duplicate (addition, 25 rows)

- Affected levels: L01, L02, L04, L05, L06, L07, L08, L09, L10
- Question IDs: FW-Y1-L01-Q003, FW-Y1-L01-Q012, FW-Y1-L02-Q003, FW-Y1-L02-Q012, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q011, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q011, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q011, FW-Y1-L07-Q020, FW-Y1-L08-Q003, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L09-Q020, FW-Y1-L10-Q003, FW-Y1-L10-Q009, FW-Y1-L10-Q010, FW-Y1-L10-Q020
- Current wording: The correct answer is 4.
- Recommended new wording: There are row-specific number path in the first group and more in the second group. How many number path altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the number path to get 4.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 4.
- Recommended visual description: Show Group A + Group B = 4; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.3 P1 - Final Explanation duplicate (addition, 24 rows)

- Affected levels: L01, L02, L04, L05, L06, L07, L08, L09, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L01-Q013, FW-Y1-L01-Q020, FW-Y1-L02-Q004, FW-Y1-L02-Q013, FW-Y1-L02-Q020, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L07-Q021, FW-Y1-L08-Q004, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L08-Q019, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L09-Q021, FW-Y1-L10-Q004, FW-Y1-L10-Q011, FW-Y1-L10-Q012, FW-Y1-L10-Q021
- Current wording: The correct answer is 5.
- Recommended new wording: There are row-specific ball in the first group and more in the second group. How many ball altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the ball to get 5.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 5.
- Recommended visual description: Show Group A + Group B = 5; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.4 P1 - Final Explanation duplicate (addition, 19 rows)

- Affected levels: L01, L02, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L01-Q015, FW-Y1-L02-Q006, FW-Y1-L02-Q015, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L05-Q014, FW-Y1-L05-Q021, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L06-Q014, FW-Y1-L06-Q021, FW-Y1-L08-Q006, FW-Y1-L08-Q021, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L09-Q023, FW-Y1-L10-Q006, FW-Y1-L10-Q023
- Current wording: The correct answer is 7.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.5 P1 - Final Explanation duplicate (addition, 18 rows)

- Affected levels: L01, L02, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L01-Q016, FW-Y1-L02-Q007, FW-Y1-L02-Q016, FW-Y1-L05-Q015, FW-Y1-L05-Q016, FW-Y1-L05-Q017, FW-Y1-L05-Q018, FW-Y1-L05-Q022, FW-Y1-L06-Q015, FW-Y1-L06-Q016, FW-Y1-L06-Q017, FW-Y1-L06-Q018, FW-Y1-L06-Q022, FW-Y1-L08-Q007, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- Current wording: The correct answer is 8.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.6 P1 - Final Explanation duplicate (addition, 18 rows)

- Affected levels: L01, L02, L05, L06, L07, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L01-Q017, FW-Y1-L01-Q019, FW-Y1-L02-Q008, FW-Y1-L02-Q017, FW-Y1-L02-Q019, FW-Y1-L05-Q019, FW-Y1-L05-Q020, FW-Y1-L05-Q023, FW-Y1-L05-Q024, FW-Y1-L06-Q019, FW-Y1-L06-Q020, FW-Y1-L06-Q023, FW-Y1-L06-Q024, FW-Y1-L07-Q019, FW-Y1-L07-Q024, FW-Y1-L08-Q008, FW-Y1-L08-Q023
- Current wording: The correct answer is 9.
- Recommended new wording: There are row-specific leaf in the first group and more in the second group. How many leaf altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the leaf to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.7 P1 - Final Explanation duplicate (addition, 15 rows)

- Affected levels: L01, L02, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q002, FW-Y1-L01-Q011, FW-Y1-L02-Q002, FW-Y1-L02-Q011, FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q002, FW-Y1-L08-Q010, FW-Y1-L08-Q017, FW-Y1-L09-Q002, FW-Y1-L09-Q019, FW-Y1-L10-Q002, FW-Y1-L10-Q008, FW-Y1-L10-Q019
- Current wording: The correct answer is 3.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 3.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 3.
- Recommended visual description: Show Group A + Group B = 3; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.8 P1 - Final Explanation duplicate (addition, 13 rows)

- Affected levels: L01, L02, L04, L05, L06, L07, L08, L09, L10
- Question IDs: FW-Y1-L01-Q001, FW-Y1-L01-Q018, FW-Y1-L02-Q001, FW-Y1-L02-Q018, FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L07-Q022, FW-Y1-L08-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q001, FW-Y1-L10-Q007
- Current wording: The correct answer is 2.
- Recommended new wording: There are row-specific number path in the first group and more in the second group. How many number path altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the number path to get 2.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 2.
- Recommended visual description: Show Group A + Group B = 2; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.9 P1 - Final Explanation duplicate (match-pairs, 8 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q026, FW-Y1-L03-Q001, FW-Y1-L03-Q021, FW-Y1-L09-Q025, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q030
- Current wording: The correct answer is 2 apples=2; 4 ducks=4; 3 stars=3.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.10 P1 - Final Explanation duplicate (match-pairs, 7 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q025, FW-Y1-L01-Q030, FW-Y1-L03-Q005, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q029, FW-Y1-L10-Q029
- Current wording: The correct answer is 5 stars=5; 7 ducks=7; 10 flowers=10.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.11 P1 - Final Explanation duplicate (match-pairs, 6 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q023, FW-Y1-L01-Q028, FW-Y1-L03-Q013, FW-Y1-L03-Q018, FW-Y1-L09-Q027, FW-Y1-L10-Q027
- Current wording: The correct answer is 8 shells=8; 9 berries=9; 10 balls=10.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.12 P1 - Final Explanation duplicate (match-pairs, 6 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q024, FW-Y1-L01-Q029, FW-Y1-L03-Q009, FW-Y1-L03-Q014, FW-Y1-L09-Q028, FW-Y1-L10-Q028
- Current wording: The correct answer is 1 bird=1; 6 oranges=6; 9 apples=9.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.13 P1 - Final Explanation duplicate (match-pairs, 5 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q022, FW-Y1-L01-Q027, FW-Y1-L03-Q002, FW-Y1-L09-Q026, FW-Y1-L10-Q026
- Current wording: The correct answer is 5 flowers=5; 6 fish=6; 7 leaves=7.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.14 P1 - Final Explanation duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: The correct answer is 10.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.15 P1 - Final Explanation duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: The correct answer is 1.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.16 P1 - LearnBot Tip duplicate (missing-number, 39 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q011, FW-Y1-L01-Q012, FW-Y1-L01-Q013, FW-Y1-L01-Q014, FW-Y1-L01-Q015, FW-Y1-L01-Q016, FW-Y1-L01-Q017, FW-Y1-L01-Q018, FW-Y1-L01-Q019, FW-Y1-L01-Q020, FW-Y1-L02-Q011, FW-Y1-L02-Q012, FW-Y1-L02-Q013, FW-Y1-L02-Q014, FW-Y1-L02-Q015, FW-Y1-L02-Q016, FW-Y1-L02-Q017, FW-Y1-L02-Q018, FW-Y1-L02-Q019, FW-Y1-L02-Q020, FW-Y1-L08-Q017, FW-Y1-L08-Q018, FW-Y1-L08-Q019, FW-Y1-L08-Q020, FW-Y1-L08-Q021, FW-Y1-L08-Q022, FW-Y1-L08-Q023, FW-Y1-L09-Q019, FW-Y1-L09-Q020, FW-Y1-L09-Q021, FW-Y1-L09-Q022, FW-Y1-L09-Q023, FW-Y1-L09-Q024, FW-Y1-L10-Q019, FW-Y1-L10-Q020, FW-Y1-L10-Q021, FW-Y1-L10-Q022, FW-Y1-L10-Q023, FW-Y1-L10-Q024
- Current wording: A blank is like an empty step on the path.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4.
- Recommended new explanation: Read the numbers in order. The missing step is the row-specific correct answer because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is the row-specific correct answer.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal the row-specific correct answer in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.17 P1 - LearnBot Tip duplicate (match-pairs, 32 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- Current wording: Finish one match before starting the next.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.18 P3 - LearnBot Tip duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- Current wording: Point to each ball once as you count.
- Recommended new wording: Count the ball in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each ball once. Count slowly. The total is 5.
- Recommended LearnBot tip: Touch each ball one time as you count.
- Recommended voice narration: Point to each ball. Count one, two, three, and keep going until the last one. The total is 5.
- Recommended visual description: Show exactly the row-specific number of ball in a clean forest scene, with small count labels appearing 1 to 5.
- Recommended distractor options: Use 5 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.19 P3 - LearnBot Tip duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- Current wording: Point to each flower once as you count.
- Recommended new wording: Count the flower in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each flower once. Count slowly. The total is 6.
- Recommended LearnBot tip: Touch each flower one time as you count.
- Recommended voice narration: Point to each flower. Count one, two, three, and keep going until the last one. The total is 6.
- Recommended visual description: Show exactly the row-specific number of flower in a clean forest scene, with small count labels appearing 1 to 6.
- Recommended distractor options: Use 6 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.20 P3 - LearnBot Tip duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- Current wording: Point to each orange once as you count.
- Recommended new wording: Count the orange in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each orange once. Count slowly. The total is 7.
- Recommended LearnBot tip: Touch each orange one time as you count.
- Recommended voice narration: Point to each orange. Count one, two, three, and keep going until the last one. The total is 7.
- Recommended visual description: Show exactly the row-specific number of orange in a clean forest scene, with small count labels appearing 1 to 7.
- Recommended distractor options: Use 7 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.21 P3 - LearnBot Tip duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- Current wording: Point to each fish once as you count.
- Recommended new wording: Count the fish in this Forest mission. How many do you see?
- Recommended new explanation: Point to each fish once. Count slowly. The total is 8.
- Recommended LearnBot tip: Touch each fish one time as you count.
- Recommended voice narration: Point to each fish. Count one, two, three, and keep going until the last one. The total is 8.
- Recommended visual description: Show exactly the row-specific number of fish in a clean forest scene, with small count labels appearing 1 to 8.
- Recommended distractor options: Use 8 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.22 P3 - LearnBot Tip duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- Current wording: Point to each leaf once as you count.
- Recommended new wording: Count the leaf in this Forest mission. How many do you see?
- Recommended new explanation: Point to each leaf once. Count slowly. The total is 9.
- Recommended LearnBot tip: Touch each leaf one time as you count.
- Recommended voice narration: Point to each leaf. Count one, two, three, and keep going until the last one. The total is 9.
- Recommended visual description: Show exactly the row-specific number of leaf in a clean forest scene, with small count labels appearing 1 to 9.
- Recommended distractor options: Use 9 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.23 P3 - LearnBot Tip duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: Point to each bird once as you count.
- Recommended new wording: Count the bird in this Forest mission. How many do you see?
- Recommended new explanation: Point to each bird once. Count slowly. The total is 10.
- Recommended LearnBot tip: Touch each bird one time as you count.
- Recommended voice narration: Point to each bird. Count one, two, three, and keep going until the last one. The total is 10.
- Recommended visual description: Show exactly the row-specific number of bird in a clean forest scene, with small count labels appearing 1 to 10.
- Recommended distractor options: Use 10 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.24 P3 - LearnBot Tip duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: Point to each shell once as you count.
- Recommended new wording: Count the shell in this Forest mission. How many do you see?
- Recommended new explanation: Point to each shell once. Count slowly. The total is 1.
- Recommended LearnBot tip: Touch each shell one time as you count.
- Recommended voice narration: Point to each shell. Count one, two, three, and keep going until the last one. The total is 1.
- Recommended visual description: Show exactly the row-specific number of shell in a clean forest scene, with small count labels appearing 1 to 1.
- Recommended distractor options: Use 1 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.25 P1 - Options duplicate (addition, 20 rows)

- Affected levels: L01, L02, L03, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L03-Q031, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q012, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q012, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q012, FW-Y1-L08-Q005, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L10-Q005
- Current wording: 5\|6\|7
- Recommended new wording: There are row-specific flower in the first group and more in the second group. How many flower altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the flower to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.26 P2 - Options duplicate (addition, 16 rows)

- Affected levels: L01, L02, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L08-Q004, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L10-Q004, FW-Y1-L10-Q011, FW-Y1-L10-Q012
- Current wording: 4\|5\|6
- Recommended new wording: There are row-specific ball in the first group and more in the second group. How many ball altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the ball to get 5.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 5.
- Recommended visual description: Show Group A + Group B = 5; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.27 P2 - Options duplicate (addition, 11 rows)

- Affected levels: L01, L02, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q001, FW-Y1-L01-Q002, FW-Y1-L02-Q002, FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q002, FW-Y1-L10-Q008
- Current wording: 2\|3\|4
- Recommended new wording: There are row-specific number path in the first group and more in the second group. How many number path altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the number path to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.28 P2 - Options duplicate (addition, 10 rows)

- Affected levels: L01, L02, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L08-Q006, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L10-Q006
- Current wording: 6\|7\|8
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L01.29 P2 - Options duplicate (match-pairs, 8 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q026, FW-Y1-L03-Q001, FW-Y1-L03-Q021, FW-Y1-L09-Q025, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q030
- Current wording: 2 apples = 2\|4 ducks = 4\|3 stars = 3
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.30 P3 - Options duplicate (match-pairs, 7 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q025, FW-Y1-L01-Q030, FW-Y1-L03-Q005, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q029, FW-Y1-L10-Q029
- Current wording: 5 stars = 5\|7 ducks = 7\|10 flowers = 10
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.31 P3 - Options duplicate (match-pairs, 6 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q023, FW-Y1-L01-Q028, FW-Y1-L03-Q013, FW-Y1-L03-Q018, FW-Y1-L09-Q027, FW-Y1-L10-Q027
- Current wording: 8 shells = 8\|9 berries = 9\|10 balls = 10
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.32 P3 - Options duplicate (match-pairs, 6 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q024, FW-Y1-L01-Q029, FW-Y1-L03-Q009, FW-Y1-L03-Q014, FW-Y1-L09-Q028, FW-Y1-L10-Q028
- Current wording: 1 bird = 1\|6 oranges = 6\|9 apples = 9
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.33 P3 - Options duplicate (match-pairs, 5 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q022, FW-Y1-L01-Q027, FW-Y1-L03-Q002, FW-Y1-L09-Q026, FW-Y1-L10-Q026
- Current wording: 5 flowers = 5\|6 fish = 6\|7 leaves = 7
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.34 P3 - Options duplicate (general, 4 rows)

- Affected levels: L01, L02, L03, L08
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L03-Q033, FW-Y1-L08-Q007
- Current wording: 7\|8\|9
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.35 P3 - Options duplicate (general, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- Current wording: 8\|9\|10
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.36 P3 - Options duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: 9\|10\|11
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.37 P3 - Options duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: 1\|1\|2
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.38 P1 - Question duplicate (match-pairs, 32 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- Current wording: Match each group to the correct number.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.39 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- Current wording: Fill in the missing number: 1, 2, __, 4.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4.
- Recommended new explanation: Read the numbers in order. The missing step is 3 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 3.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 3 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.40 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- Current wording: Fill in the missing number: 2, 3, __, 5.
- Recommended new wording: Which number is missing from the forest path? 2, 3, __, 5.
- Recommended new explanation: Read the numbers in order. The missing step is 4 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 4.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 4 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.41 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q013, FW-Y1-L02-Q013, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- Current wording: Fill in the missing number: 3, 4, __, 6.
- Recommended new wording: Which number is missing from the forest path? 3, 4, __, 6.
- Recommended new explanation: Read the numbers in order. The missing step is 5 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 5.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 5 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.42 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- Current wording: Fill in the missing number: 4, 5, __, 7.
- Recommended new wording: Which number is missing from the forest path? 4, 5, __, 7.
- Recommended new explanation: Read the numbers in order. The missing step is 6 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 6.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 6 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.43 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- Current wording: Fill in the missing number: 5, 6, __, 8.
- Recommended new wording: Which number is missing from the forest path? 5, 6, __, 8.
- Recommended new explanation: Read the numbers in order. The missing step is 7 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 7.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 7 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.44 P2 - Question duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- Current wording: Fill in the missing number: 6, 7, __, 9.
- Recommended new wording: Which number is missing from the forest path? 6, 7, __, 9.
- Recommended new explanation: Read the numbers in order. The missing step is 8 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 8.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 8 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.45 P3 - Question duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q002, FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- Current wording: Count the apples. How many apples are there?
- Recommended new wording: Count the apple in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each apple once. Count slowly. The total is the row-specific correct answer.
- Recommended LearnBot tip: Touch each apple one time as you count.
- Recommended voice narration: Point to each apple. Count one, two, three, and keep going until the last one. The total is the row-specific correct answer.
- Recommended visual description: Show exactly the row-specific number of apple in a clean forest scene, with small count labels appearing 1 to the row-specific correct answer.
- Recommended distractor options: Use the row-specific correct answer plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.46 P3 - Question duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- Current wording: Count the balls. How many balls are there?
- Recommended new wording: Count the ball in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each ball once. Count slowly. The total is 5.
- Recommended LearnBot tip: Touch each ball one time as you count.
- Recommended voice narration: Point to each ball. Count one, two, three, and keep going until the last one. The total is 5.
- Recommended visual description: Show exactly the row-specific number of ball in a clean forest scene, with small count labels appearing 1 to 5.
- Recommended distractor options: Use 5 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.47 P3 - Question duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- Current wording: Count the flowers. How many flowers are there?
- Recommended new wording: Count the flower in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each flower once. Count slowly. The total is 6.
- Recommended LearnBot tip: Touch each flower one time as you count.
- Recommended voice narration: Point to each flower. Count one, two, three, and keep going until the last one. The total is 6.
- Recommended visual description: Show exactly the row-specific number of flower in a clean forest scene, with small count labels appearing 1 to 6.
- Recommended distractor options: Use 6 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.48 P3 - Question duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- Current wording: Count the oranges. How many oranges are there?
- Recommended new wording: Count the orange in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each orange once. Count slowly. The total is 7.
- Recommended LearnBot tip: Touch each orange one time as you count.
- Recommended voice narration: Point to each orange. Count one, two, three, and keep going until the last one. The total is 7.
- Recommended visual description: Show exactly the row-specific number of orange in a clean forest scene, with small count labels appearing 1 to 7.
- Recommended distractor options: Use 7 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.49 P3 - Question duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- Current wording: Count the fish. How many fish are there?
- Recommended new wording: Count the fish in this Forest mission. How many do you see?
- Recommended new explanation: Point to each fish once. Count slowly. The total is 8.
- Recommended LearnBot tip: Touch each fish one time as you count.
- Recommended voice narration: Point to each fish. Count one, two, three, and keep going until the last one. The total is 8.
- Recommended visual description: Show exactly the row-specific number of fish in a clean forest scene, with small count labels appearing 1 to 8.
- Recommended distractor options: Use 8 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.50 P3 - Question duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- Current wording: Count the leaves. How many leaves are there?
- Recommended new wording: Count the leaf in this Forest mission. How many do you see?
- Recommended new explanation: Point to each leaf once. Count slowly. The total is 9.
- Recommended LearnBot tip: Touch each leaf one time as you count.
- Recommended voice narration: Point to each leaf. Count one, two, three, and keep going until the last one. The total is 9.
- Recommended visual description: Show exactly the row-specific number of leaf in a clean forest scene, with small count labels appearing 1 to 9.
- Recommended distractor options: Use 9 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.51 P3 - Question duplicate (missing-number, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q017, FW-Y1-L02-Q017, FW-Y1-L08-Q023
- Current wording: Fill in the missing number: 7, 8, __, 10.
- Recommended new wording: Which number is missing from the forest path? 7, 8, __, 10.
- Recommended new explanation: Read the numbers in order. The missing step is 9 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 9.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 9 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.52 P3 - Question duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: Count the birds. How many birds are there?
- Recommended new wording: Count the bird in this Forest mission. How many do you see?
- Recommended new explanation: Point to each bird once. Count slowly. The total is 10.
- Recommended LearnBot tip: Touch each bird one time as you count.
- Recommended voice narration: Point to each bird. Count one, two, three, and keep going until the last one. The total is 10.
- Recommended visual description: Show exactly the row-specific number of bird in a clean forest scene, with small count labels appearing 1 to 10.
- Recommended distractor options: Use 10 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.53 P3 - Question duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: Count the shells. How many shells are there?
- Recommended new wording: Count the shell in this Forest mission. How many do you see?
- Recommended new explanation: Point to each shell once. Count slowly. The total is 1.
- Recommended LearnBot tip: Touch each shell one time as you count.
- Recommended voice narration: Point to each shell. Count one, two, three, and keep going until the last one. The total is 1.
- Recommended visual description: Show exactly the row-specific number of shell in a clean forest scene, with small count labels appearing 1 to 1.
- Recommended distractor options: Use 1 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.54 P3 - Question duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- Current wording: Fill in the missing number: 1, __, 3.
- Recommended new wording: Which number is missing from the forest path? 1, __, 3.
- Recommended new explanation: Read the numbers in order. The missing step is 2 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 2.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 2 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.55 P3 - Question duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q019, FW-Y1-L02-Q019
- Current wording: Fill in the missing number: 8, __, 10.
- Recommended new wording: Which number is missing from the forest path? 8, __, 10.
- Recommended new explanation: Read the numbers in order. The missing step is 9 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 9.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 9 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.56 P3 - Question duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q020, FW-Y1-L02-Q020
- Current wording: Fill in the missing number: 4, __, 6.
- Recommended new wording: Which number is missing from the forest path? 4, __, 6.
- Recommended new explanation: Read the numbers in order. The missing step is 5 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 5.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 5 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.57 P1 - Visual Description duplicate (match-pairs, 32 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- Current wording: Show three object groups and three matching number cards.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.58 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- Current wording: Show forest stepping stones labelled 1, 2, __, 4.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4.
- Recommended new explanation: Read the numbers in order. The missing step is 3 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 3.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 3 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.59 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- Current wording: Show forest stepping stones labelled 2, 3, __, 5.
- Recommended new wording: Which number is missing from the forest path? 2, 3, __, 5.
- Recommended new explanation: Read the numbers in order. The missing step is 4 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 4.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 4 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.60 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q013, FW-Y1-L02-Q013, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- Current wording: Show forest stepping stones labelled 3, 4, __, 6.
- Recommended new wording: Which number is missing from the forest path? 3, 4, __, 6.
- Recommended new explanation: Read the numbers in order. The missing step is 5 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 5.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 5 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.61 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- Current wording: Show forest stepping stones labelled 4, 5, __, 7.
- Recommended new wording: Which number is missing from the forest path? 4, 5, __, 7.
- Recommended new explanation: Read the numbers in order. The missing step is 6 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 6.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 6 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.62 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- Current wording: Show forest stepping stones labelled 5, 6, __, 8.
- Recommended new wording: Which number is missing from the forest path? 5, 6, __, 8.
- Recommended new explanation: Read the numbers in order. The missing step is 7 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 7.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 7 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.63 P2 - Visual Description duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- Current wording: Show forest stepping stones labelled 6, 7, __, 9.
- Recommended new wording: Which number is missing from the forest path? 6, 7, __, 9.
- Recommended new explanation: Read the numbers in order. The missing step is 8 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 8.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 8 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.64 P3 - Visual Description duplicate (general, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- Current wording: Show exactly 5 balls in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.65 P3 - Visual Description duplicate (general, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- Current wording: Show exactly 6 flowers in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.66 P3 - Visual Description duplicate (general, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- Current wording: Show exactly 7 oranges in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.67 P3 - Visual Description duplicate (general, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- Current wording: Show exactly 8 fish in a clear forest scene.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.68 P3 - Visual Description duplicate (general, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- Current wording: Show exactly 9 leaves in a clear forest scene.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.69 P3 - Visual Description duplicate (missing-number, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q017, FW-Y1-L02-Q017, FW-Y1-L08-Q023
- Current wording: Show forest stepping stones labelled 7, 8, __, 10.
- Recommended new wording: Which number is missing from the forest path? 7, 8, __, 10.
- Recommended new explanation: Read the numbers in order. The missing step is 9 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 9.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 9 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.70 P3 - Visual Description duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: Show exactly 10 birds in a clear forest scene.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.71 P3 - Visual Description duplicate (general, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: Show exactly 1 shell in a clear forest scene.
- Recommended new wording: Use Forest mission context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L01.72 P3 - Visual Description duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- Current wording: Show forest stepping stones labelled 1, __, 3.
- Recommended new wording: Which number is missing from the forest path? 1, __, 3.
- Recommended new explanation: Read the numbers in order. The missing step is 2 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 2.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 2 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.73 P3 - Visual Description duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q019, FW-Y1-L02-Q019
- Current wording: Show forest stepping stones labelled 8, __, 10.
- Recommended new wording: Which number is missing from the forest path? 8, __, 10.
- Recommended new explanation: Read the numbers in order. The missing step is 9 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 9.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 9 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.74 P3 - Visual Description duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q020, FW-Y1-L02-Q020
- Current wording: Show forest stepping stones labelled 4, __, 6.
- Recommended new wording: Which number is missing from the forest path? 4, __, 6.
- Recommended new explanation: Read the numbers in order. The missing step is 5 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 5.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 5 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.75 P1 - Voice Script duplicate (match-pairs, 32 rows)

- Affected levels: L01, L03, L09, L10
- Question IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- Current wording: Let's solve it together. Choose one group. Count the objects. Match it to the same number.
- Recommended new wording: Match each forest group to the number card with the same total.
- Recommended new explanation: Choose one group, count it, then connect it to the number card with the same total. Repeat for each pair.
- Recommended LearnBot tip: Finish one pair before starting the next.
- Recommended voice narration: Pick one group. Count the objects. Find the number card that shows the same amount. Now match them.
- Recommended visual description: Show three distinct object groups and three number cards; use varied objects per repeated row.
- Recommended distractor options: Use mismatched number cards only if the renderer supports distractors; otherwise vary pair order and object sets.
- Estimated educational improvement: Makes matching feel like a game and reduces the repeated generic prompt.

#### L01.76 P3 - Voice Script duplicate (missing-number, 7 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q013, FW-Y1-L01-Q020, FW-Y1-L02-Q013, FW-Y1-L02-Q020, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 5.
- Recommended new wording: Which number is missing from the forest path? 3, 4, __, 6.
- Recommended new explanation: Read the numbers in order. The missing step is 5 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 5.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 5 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.77 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 3.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4.
- Recommended new explanation: Read the numbers in order. The missing step is 3 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 3.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 3 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.78 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 4.
- Recommended new wording: Which number is missing from the forest path? 2, 3, __, 5.
- Recommended new explanation: Read the numbers in order. The missing step is 4 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 4.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 4 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.79 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 6.
- Recommended new wording: Which number is missing from the forest path? 4, 5, __, 7.
- Recommended new explanation: Read the numbers in order. The missing step is 6 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 6.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 6 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.80 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 7.
- Recommended new wording: Which number is missing from the forest path? 5, 6, __, 8.
- Recommended new explanation: Read the numbers in order. The missing step is 7 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 7.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 7 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.81 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08, L09, L10
- Question IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 8.
- Recommended new wording: Which number is missing from the forest path? 6, 7, __, 9.
- Recommended new explanation: Read the numbers in order. The missing step is 8 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 8.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 8 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.82 P3 - Voice Script duplicate (missing-number, 5 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q017, FW-Y1-L01-Q019, FW-Y1-L02-Q017, FW-Y1-L02-Q019, FW-Y1-L08-Q023
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 9.
- Recommended new wording: Which number is missing from the forest path? 7, 8, __, 10.
- Recommended new explanation: Read the numbers in order. The missing step is 9 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 9.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 9 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L01.83 P3 - Voice Script duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- Current wording: Let's solve it together. Look at the objects. Count each ball one by one. The total is 5.
- Recommended new wording: Count the ball in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each ball once. Count slowly. The total is 5.
- Recommended LearnBot tip: Touch each ball one time as you count.
- Recommended voice narration: Point to each ball. Count one, two, three, and keep going until the last one. The total is 5.
- Recommended visual description: Show exactly the row-specific number of ball in a clean forest scene, with small count labels appearing 1 to 5.
- Recommended distractor options: Use 5 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.84 P3 - Voice Script duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- Current wording: Let's solve it together. Look at the objects. Count each flower one by one. The total is 6.
- Recommended new wording: Count the flower in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each flower once. Count slowly. The total is 6.
- Recommended LearnBot tip: Touch each flower one time as you count.
- Recommended voice narration: Point to each flower. Count one, two, three, and keep going until the last one. The total is 6.
- Recommended visual description: Show exactly the row-specific number of flower in a clean forest scene, with small count labels appearing 1 to 6.
- Recommended distractor options: Use 6 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.85 P3 - Voice Script duplicate (counting, 4 rows)

- Affected levels: L01, L02, L08, L10
- Question IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- Current wording: Let's solve it together. Look at the objects. Count each orange one by one. The total is 7.
- Recommended new wording: Count the orange in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each orange once. Count slowly. The total is 7.
- Recommended LearnBot tip: Touch each orange one time as you count.
- Recommended voice narration: Point to each orange. Count one, two, three, and keep going until the last one. The total is 7.
- Recommended visual description: Show exactly the row-specific number of orange in a clean forest scene, with small count labels appearing 1 to 7.
- Recommended distractor options: Use 7 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.86 P3 - Voice Script duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- Current wording: Let's solve it together. Look at the objects. Count each fish one by one. The total is 8.
- Recommended new wording: Count the fish in this Forest mission. How many do you see?
- Recommended new explanation: Point to each fish once. Count slowly. The total is 8.
- Recommended LearnBot tip: Touch each fish one time as you count.
- Recommended voice narration: Point to each fish. Count one, two, three, and keep going until the last one. The total is 8.
- Recommended visual description: Show exactly the row-specific number of fish in a clean forest scene, with small count labels appearing 1 to 8.
- Recommended distractor options: Use 8 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.87 P3 - Voice Script duplicate (counting, 3 rows)

- Affected levels: L01, L02, L08
- Question IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- Current wording: Let's solve it together. Look at the objects. Count each leaf one by one. The total is 9.
- Recommended new wording: Count the leaf in this Forest mission. How many do you see?
- Recommended new explanation: Point to each leaf once. Count slowly. The total is 9.
- Recommended LearnBot tip: Touch each leaf one time as you count.
- Recommended voice narration: Point to each leaf. Count one, two, three, and keep going until the last one. The total is 9.
- Recommended visual description: Show exactly the row-specific number of leaf in a clean forest scene, with small count labels appearing 1 to 9.
- Recommended distractor options: Use 9 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.88 P3 - Voice Script duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- Current wording: Let's solve it together. Look at the objects. Count each bird one by one. The total is 10.
- Recommended new wording: Count the bird in this Forest mission. How many do you see?
- Recommended new explanation: Point to each bird once. Count slowly. The total is 10.
- Recommended LearnBot tip: Touch each bird one time as you count.
- Recommended voice narration: Point to each bird. Count one, two, three, and keep going until the last one. The total is 10.
- Recommended visual description: Show exactly the row-specific number of bird in a clean forest scene, with small count labels appearing 1 to 10.
- Recommended distractor options: Use 10 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.89 P3 - Voice Script duplicate (counting, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- Current wording: Let's solve it together. Look at the objects. Count each shell one by one. The total is 1.
- Recommended new wording: Count the shell in this Forest mission. How many do you see?
- Recommended new explanation: Point to each shell once. Count slowly. The total is 1.
- Recommended LearnBot tip: Touch each shell one time as you count.
- Recommended voice narration: Point to each shell. Count one, two, three, and keep going until the last one. The total is 1.
- Recommended visual description: Show exactly the row-specific number of shell in a clean forest scene, with small count labels appearing 1 to 1.
- Recommended distractor options: Use 1 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L01.90 P3 - Voice Script duplicate (missing-number, 2 rows)

- Affected levels: L01, L02
- Question IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- Current wording: Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 2.
- Recommended new wording: Which number is missing from the forest path? 1, __, 3.
- Recommended new explanation: Read the numbers in order. The missing step is 2 because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is 2.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal 2 in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

### L02

#### L02.1 P1 - Final Explanation duplicate (comparison, 46 rows)

- Affected levels: L02, L04, L05, L06, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L04-Q025, FW-Y1-L04-Q026, FW-Y1-L04-Q027, FW-Y1-L04-Q028, FW-Y1-L04-Q029, FW-Y1-L04-Q030, FW-Y1-L05-Q025, FW-Y1-L05-Q026, FW-Y1-L05-Q027, FW-Y1-L05-Q028, FW-Y1-L05-Q029, FW-Y1-L05-Q030, FW-Y1-L06-Q025, FW-Y1-L06-Q026, FW-Y1-L06-Q027, FW-Y1-L06-Q028, FW-Y1-L06-Q029, FW-Y1-L06-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017
- Current wording: The correct answer is Group B.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.2 P1 - Final Explanation duplicate (comparison, 11 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q018
- Current wording: The correct answer is Group A.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group A.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.3 P1 - LearnBot Tip duplicate (comparison, 52 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L07-Q019, FW-Y1-L07-Q020, FW-Y1-L07-Q021, FW-Y1-L07-Q022, FW-Y1-L07-Q023, FW-Y1-L07-Q024, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q026, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017, FW-Y1-L10-Q018
- Current wording: Compare by counting both groups first.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.4 P3 - LearnBot Tip duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- Current wording: Point to each apple once as you count.
- Recommended new wording: Count the apple in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each apple once. Count slowly. The total is 2.
- Recommended LearnBot tip: Touch each apple one time as you count.
- Recommended voice narration: Point to each apple. Count one, two, three, and keep going until the last one. The total is 2.
- Recommended visual description: Show exactly the row-specific number of apple in a clean forest scene, with small count labels appearing 1 to 2.
- Recommended distractor options: Use 2 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.5 P3 - LearnBot Tip duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- Current wording: Point to each star once as you count.
- Recommended new wording: Count the star in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each star once. Count slowly. The total is 3.
- Recommended LearnBot tip: Touch each star one time as you count.
- Recommended voice narration: Point to each star. Count one, two, three, and keep going until the last one. The total is 3.
- Recommended visual description: Show exactly the row-specific number of star in a clean forest scene, with small count labels appearing 1 to 3.
- Recommended distractor options: Use 3 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.6 P3 - LearnBot Tip duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- Current wording: Point to each duck once as you count.
- Recommended new wording: Count the duck in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each duck once. Count slowly. The total is 4.
- Recommended LearnBot tip: Touch each duck one time as you count.
- Recommended voice narration: Point to each duck. Count one, two, three, and keep going until the last one. The total is 4.
- Recommended visual description: Show exactly the row-specific number of duck in a clean forest scene, with small count labels appearing 1 to 4.
- Recommended distractor options: Use 4 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.7 P2 - Options duplicate (addition, 19 rows)

- Affected levels: L02, L03, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L02-Q003, FW-Y1-L03-Q032, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q011, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q011, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q011, FW-Y1-L08-Q003, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L10-Q003, FW-Y1-L10-Q009, FW-Y1-L10-Q010
- Current wording: 3\|4\|5
- Recommended new wording: There are row-specific duck in the first group and more in the second group. How many duck altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the duck to get 4.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 4.
- Recommended visual description: Show Group A + Group B = 4; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L02.8 P2 - Options duplicate (true-false, 12 rows)

- Affected levels: L02, L03, L07, L09
- Question IDs: FW-Y1-L02-Q023, FW-Y1-L03-Q052, FW-Y1-L03-Q053, FW-Y1-L07-Q003, FW-Y1-L07-Q018, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L09-Q018
- Current wording: TRUE\|FALSE
- Recommended new wording: True or false: write a row-specific statement that checks one clear idea.
- Recommended new explanation: Show the visual, check the statement, then explain why it is true or false.
- Recommended LearnBot tip: Check the picture before choosing true or false.
- Recommended voice narration: Look at the picture and read the sentence. If the sentence matches the picture, choose true. If not, choose false.
- Recommended visual description: Show the object group or number path beside the statement so children can verify it.
- Recommended distractor options: True/False is fixed; vary the statement and avoid too many obvious answers.
- Estimated educational improvement: Encourages verification instead of guessing.

#### L02.9 P2 - Options duplicate (addition, 9 rows)

- Affected levels: L02, L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L02-Q001, FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q001, FW-Y1-L10-Q007
- Current wording: 1\|2\|3
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 2.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 2.
- Recommended visual description: Show Group A + Group B = 2; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L02.10 P3 - Options duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- Current wording: Group A: 3 apples\|Group B: 5 apples
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.11 P3 - Options duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- Current wording: Group A: 6 stars\|Group B: 2 stars
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.12 P3 - Options duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- Current wording: Group A: 7 flowers\|Group B: 9 flowers
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.13 P3 - Options duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- Current wording: Group A: 8 fish\|Group B: 5 fish
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.14 P3 - Options duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- Current wording: Group A: 10 leaves\|Group B: 6 leaves
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group A.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.15 P3 - Options duplicate (comparison, 5 rows)

- Affected levels: L02, L07, L08, L09
- Question IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- Current wording: Group A: 1 shell\|Group B: 3 shells
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group A.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.16 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009
- Current wording: Group A: 2 balls\|Group B: 9 balls
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.17 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010
- Current wording: Group A: 8 birds\|Group B: 4 birds
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer bird?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.18 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- Current wording: Tap the group with more apples.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.19 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- Current wording: Tap the group with fewer stars.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.20 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- Current wording: Tap the group with more flowers.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.21 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- Current wording: Tap the group with fewer fish.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.22 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- Current wording: Tap the group with more leaves.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group A.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.23 P2 - Question duplicate (comparison, 5 rows)

- Affected levels: L02, L07, L08, L09
- Question IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- Current wording: Tap the group with fewer shells.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group A.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.24 P3 - Question duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- Current wording: Count the stars. How many stars are there?
- Recommended new wording: Count the star in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each star once. Count slowly. The total is 3.
- Recommended LearnBot tip: Touch each star one time as you count.
- Recommended voice narration: Point to each star. Count one, two, three, and keep going until the last one. The total is 3.
- Recommended visual description: Show exactly the row-specific number of star in a clean forest scene, with small count labels appearing 1 to 3.
- Recommended distractor options: Use 3 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.25 P3 - Question duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- Current wording: Count the ducks. How many ducks are there?
- Recommended new wording: Count the duck in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each duck once. Count slowly. The total is 4.
- Recommended LearnBot tip: Touch each duck one time as you count.
- Recommended voice narration: Point to each duck. Count one, two, three, and keep going until the last one. The total is 4.
- Recommended visual description: Show exactly the row-specific number of duck in a clean forest scene, with small count labels appearing 1 to 4.
- Recommended distractor options: Use 4 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.26 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q028, FW-Y1-L07-Q008
- Current wording: Which group has more berries?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.27 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009
- Current wording: Tap the group with more balls.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.28 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010
- Current wording: Tap the group with fewer birds.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer bird?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.29 P2 - Visual Description duplicate (comparison, 7 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L07-Q021, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- Current wording: Show Group A with 3 apples and Group B with 5 apples. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.30 P2 - Visual Description duplicate (comparison, 7 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L07-Q022, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- Current wording: Show Group A with 6 stars and Group B with 2 stars. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.31 P2 - Visual Description duplicate (comparison, 7 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L07-Q024, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- Current wording: Show Group A with 7 flowers and Group B with 9 flowers. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.32 P2 - Visual Description duplicate (comparison, 7 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L07-Q025, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- Current wording: Show Group A with 8 fish and Group B with 5 fish. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.33 P2 - Visual Description duplicate (comparison, 7 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L07-Q026, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- Current wording: Show Group A with 10 leaves and Group B with 6 leaves. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.34 P2 - Visual Description duplicate (comparison, 6 rows)

- Affected levels: L02, L07, L08, L09
- Question IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L07-Q027, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- Current wording: Show Group A with 1 shell and Group B with 3 shells. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.35 P3 - Visual Description duplicate (comparison, 4 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009, FW-Y1-L07-Q019, FW-Y1-L07-Q029
- Current wording: Show Group A with 2 balls and Group B with 9 balls. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.36 P3 - Visual Description duplicate (comparison, 4 rows)

- Affected levels: L02, L07
- Question IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010, FW-Y1-L07-Q020, FW-Y1-L07-Q030
- Current wording: Show Group A with 8 birds and Group B with 4 birds. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer bird?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.37 P3 - Visual Description duplicate (general, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- Current wording: Show exactly 2 apples in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L02.38 P3 - Visual Description duplicate (general, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- Current wording: Show exactly 3 stars in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L02.39 P3 - Visual Description duplicate (general, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- Current wording: Show exactly 4 ducks in a clear forest scene.
- Recommended new wording: Use Forest Guardian challenge context and row-specific numbers so this item does not repeat the same stem.
- Recommended new explanation: Explain the exact row values in 2-3 child-friendly steps, then state the answer.
- Recommended LearnBot tip: Point, count, then choose.
- Recommended voice narration: Let's solve this one carefully. Look at the picture, count or compare, then choose the answer.
- Recommended visual description: Use the row's object counts with clear labels and highlight the correct answer.
- Recommended distractor options: Use close distractors around the correct answer; avoid reusing the same option set too many times.
- Estimated educational improvement: Improves replay variety and makes the teaching note feel specific to the question.

#### L02.40 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L02, L09
- Question IDs: FW-Y1-L02-Q023, FW-Y1-L09-Q013
- Current wording: Show Group A with 4 ducks and Group B with 6 ducks. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.41 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L02, L09
- Question IDs: FW-Y1-L02-Q028, FW-Y1-L09-Q018
- Current wording: Show Group A with 5 berries and Group B with 7 berries. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.42 P1 - Voice Script duplicate (comparison, 52 rows)

- Affected levels: L02, L07, L08, L09, L10
- Question IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L07-Q019, FW-Y1-L07-Q020, FW-Y1-L07-Q021, FW-Y1-L07-Q022, FW-Y1-L07-Q023, FW-Y1-L07-Q024, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q026, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017, FW-Y1-L10-Q018
- Current wording: Let's solve it together. Count Group A. Count Group B. Compare the two totals.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L02.43 P3 - Voice Script duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- Current wording: Let's solve it together. Look at the objects. Count each apple one by one. The total is 2.
- Recommended new wording: Count the apple in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each apple once. Count slowly. The total is 2.
- Recommended LearnBot tip: Touch each apple one time as you count.
- Recommended voice narration: Point to each apple. Count one, two, three, and keep going until the last one. The total is 2.
- Recommended visual description: Show exactly the row-specific number of apple in a clean forest scene, with small count labels appearing 1 to 2.
- Recommended distractor options: Use 2 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.44 P3 - Voice Script duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- Current wording: Let's solve it together. Look at the objects. Count each star one by one. The total is 3.
- Recommended new wording: Count the star in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each star once. Count slowly. The total is 3.
- Recommended LearnBot tip: Touch each star one time as you count.
- Recommended voice narration: Point to each star. Count one, two, three, and keep going until the last one. The total is 3.
- Recommended visual description: Show exactly the row-specific number of star in a clean forest scene, with small count labels appearing 1 to 3.
- Recommended distractor options: Use 3 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L02.45 P3 - Voice Script duplicate (counting, 3 rows)

- Affected levels: L02, L08, L10
- Question IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- Current wording: Let's solve it together. Look at the objects. Count each duck one by one. The total is 4.
- Recommended new wording: Count the duck in this Forest Guardian challenge. How many do you see?
- Recommended new explanation: Point to each duck once. Count slowly. The total is 4.
- Recommended LearnBot tip: Touch each duck one time as you count.
- Recommended voice narration: Point to each duck. Count one, two, three, and keep going until the last one. The total is 4.
- Recommended visual description: Show exactly the row-specific number of duck in a clean forest scene, with small count labels appearing 1 to 4.
- Recommended distractor options: Use 4 plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

### L03

#### L03.1 P3 - LearnBot Tip duplicate (comparison, 3 rows)

- Affected levels: L03
- Question IDs: FW-Y1-L03-Q043, FW-Y1-L03-Q044, FW-Y1-L03-Q045
- Current wording: Do not guess—count every group.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer balloon?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L03.2 P3 - LearnBot Tip duplicate (missing-number, 3 rows)

- Affected levels: L03
- Question IDs: FW-Y1-L03-Q046, FW-Y1-L03-Q047, FW-Y1-L03-Q049
- Current wording: Count forward one number at a time.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4
- Recommended new explanation: Read the numbers in order. The missing step is the row-specific correct answer because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is the row-specific correct answer.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal the row-specific correct answer in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

#### L03.3 P3 - LearnBot Tip duplicate (counting, 2 rows)

- Affected levels: L03
- Question IDs: FW-Y1-L03-Q037, FW-Y1-L03-Q040
- Current wording: Check your count before typing.
- Recommended new wording: Count the butterfly in this Forest mission. How many do you see?
- Recommended new explanation: Point to each butterfly once. Count slowly. The total is the row-specific correct answer.
- Recommended LearnBot tip: Touch each butterfly one time as you count.
- Recommended voice narration: Point to each butterfly. Count one, two, three, and keep going until the last one. The total is the row-specific correct answer.
- Recommended visual description: Show exactly the row-specific number of butterfly in a clean forest scene, with small count labels appearing 1 to the row-specific correct answer.
- Recommended distractor options: Use the row-specific correct answer plus one lower and one higher value when possible; avoid repeated sets such as 5\|6\|7 across many rows.
- Estimated educational improvement: Strengthens one-to-one counting and reduces memorization from repeated stems.

#### L03.4 P3 - LearnBot Tip duplicate (true-false, 2 rows)

- Affected levels: L03
- Question IDs: FW-Y1-L03-Q052, FW-Y1-L03-Q053
- Current wording: A match must show the same amount on both sides.
- Recommended new wording: True or false: write a row-specific statement that checks one clear idea.
- Recommended new explanation: Show the visual, check the statement, then explain why it is true or false.
- Recommended LearnBot tip: Check the picture before choosing true or false.
- Recommended voice narration: Look at the picture and read the sentence. If the sentence matches the picture, choose true. If not, choose false.
- Recommended visual description: Show the object group or number path beside the statement so children can verify it.
- Recommended distractor options: True/False is fixed; vary the statement and avoid too many obvious answers.
- Estimated educational improvement: Encourages verification instead of guessing.

#### L03.5 P3 - Voice Script duplicate (missing-number, 3 rows)

- Affected levels: L03
- Question IDs: FW-Y1-L03-Q046, FW-Y1-L03-Q047, FW-Y1-L03-Q049
- Current wording: Let's solve it together. Read the numbers in order. Think about the number that comes next. Type the missing number.
- Recommended new wording: Which number is missing from the forest path? 1, 2, __, 4
- Recommended new explanation: Read the numbers in order. The missing step is the row-specific correct answer because it comes between the numbers shown.
- Recommended LearnBot tip: Say the sequence out loud and listen for the empty step.
- Recommended voice narration: Let's read the path together. Say each number in order. The number that fits the blank is the row-specific correct answer.
- Recommended visual description: Show stepping stones or number cards with the blank highlighted, then reveal the row-specific correct answer in the missing spot.
- Recommended distractor options: Use nearby sequence values only; avoid identical 3-option sets repeated across review and boss levels.
- Estimated educational improvement: Builds sequence reasoning instead of simple answer recognition.

### L04

#### L04.1 P1 - LearnBot Tip duplicate (comparison, 114 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q001, FW-Y1-L04-Q002, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q011, FW-Y1-L04-Q012, FW-Y1-L04-Q013, FW-Y1-L04-Q014, FW-Y1-L04-Q015, FW-Y1-L04-Q016, FW-Y1-L04-Q017, FW-Y1-L04-Q018, FW-Y1-L04-Q019, FW-Y1-L04-Q020, FW-Y1-L04-Q021, FW-Y1-L04-Q022, FW-Y1-L04-Q023, FW-Y1-L04-Q024, FW-Y1-L04-Q025, FW-Y1-L04-Q026, FW-Y1-L04-Q027, FW-Y1-L04-Q028, FW-Y1-L04-Q029, FW-Y1-L04-Q030, FW-Y1-L05-Q001, FW-Y1-L05-Q002, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L05-Q011, FW-Y1-L05-Q012, FW-Y1-L05-Q013, FW-Y1-L05-Q014, FW-Y1-L05-Q015, FW-Y1-L05-Q016, FW-Y1-L05-Q017, FW-Y1-L05-Q018, FW-Y1-L05-Q019, FW-Y1-L05-Q020, FW-Y1-L05-Q021, FW-Y1-L05-Q022, FW-Y1-L05-Q023, FW-Y1-L05-Q024, FW-Y1-L05-Q025, FW-Y1-L05-Q026, FW-Y1-L05-Q027, FW-Y1-L05-Q028, FW-Y1-L05-Q029, FW-Y1-L05-Q030, FW-Y1-L06-Q001, FW-Y1-L06-Q002, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L06-Q011, FW-Y1-L06-Q012, FW-Y1-L06-Q013, FW-Y1-L06-Q014, FW-Y1-L06-Q015, FW-Y1-L06-Q016, FW-Y1-L06-Q017, FW-Y1-L06-Q018, FW-Y1-L06-Q019, FW-Y1-L06-Q020, FW-Y1-L06-Q021, FW-Y1-L06-Q022, FW-Y1-L06-Q023, FW-Y1-L06-Q024, FW-Y1-L06-Q025, FW-Y1-L06-Q026, FW-Y1-L06-Q027, FW-Y1-L06-Q028, FW-Y1-L06-Q029, FW-Y1-L06-Q030, FW-Y1-L08-Q009, FW-Y1-L08-Q010, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L09-Q001, FW-Y1-L09-Q002, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L10-Q007, FW-Y1-L10-Q008, FW-Y1-L10-Q009, FW-Y1-L10-Q010, FW-Y1-L10-Q011, FW-Y1-L10-Q012
- Current wording: Addition means putting groups together.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.2 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- Current wording: 1 apple plus 1 more apples. How many apples altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 2.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.3 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- Current wording: 2 stars plus 1 more stars. How many stars altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 3.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.4 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- Current wording: 2 oranges plus 2 more oranges. How many oranges altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer orange?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.5 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- Current wording: 3 fish plus 1 more fish. How many fish altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.6 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- Current wording: 3 flowers plus 2 more flowers. How many flowers altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 5.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.7 P2 - Question duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- Current wording: 4 ducks plus 1 more ducks. How many ducks altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 5.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.8 P2 - Question duplicate (comparison, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- Current wording: 4 leaves plus 2 more leaves. How many leaves altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.9 P2 - Question duplicate (comparison, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008
- Current wording: 5 shells plus 1 more shells. How many shells altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.10 P3 - Question duplicate (comparison, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- Current wording: 1 apple plus 3 more apples. How many apples altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.11 P3 - Question duplicate (comparison, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- Current wording: 2 stars plus 4 more stars. How many stars altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.12 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- Current wording: Count all the oranges. Type the answer.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.13 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q014, FW-Y1-L05-Q014, FW-Y1-L06-Q014
- Current wording: Count all the fish. Type the answer.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.14 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q015, FW-Y1-L05-Q015, FW-Y1-L06-Q015
- Current wording: Count all the flowers. Type the answer.
- Recommended new wording: There are row-specific flower in the first group and more in the second group. How many flower altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the flower to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.15 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q016, FW-Y1-L05-Q016, FW-Y1-L06-Q016
- Current wording: Count all the ducks. Type the answer.
- Recommended new wording: There are row-specific duck in the first group and more in the second group. How many duck altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the duck to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.16 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q017, FW-Y1-L05-Q017, FW-Y1-L06-Q017
- Current wording: Count all the leaves. Type the answer.
- Recommended new wording: There are row-specific leaf in the first group and more in the second group. How many leaf altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the leaf to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.17 P3 - Question duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q018, FW-Y1-L05-Q018, FW-Y1-L06-Q018
- Current wording: Count all the shells. Type the answer.
- Recommended new wording: There are row-specific shell in the first group and more in the second group. How many shell altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the shell to get the row-specific correct answer.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives the row-specific correct answer.
- Recommended visual description: Show Group A + Group B = the row-specific correct answer; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.18 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L04
- Question IDs: FW-Y1-L04-Q021, FW-Y1-L04-Q022
- Current wording: Fill in the missing number: 1 + 5 = __.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.19 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- Current wording: Show 1 apple + 1 apple = 2. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 2.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 2.
- Recommended visual description: Show Group A + Group B = 2; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.20 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- Current wording: Show 2 stars + 1 star = 3. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific star in the first group and more in the second group. How many star altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the star to get 3.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 3.
- Recommended visual description: Show Group A + Group B = 3; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.21 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- Current wording: Show 2 oranges + 2 oranges = 4. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 4.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 4.
- Recommended visual description: Show Group A + Group B = 4; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.22 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- Current wording: Show 3 fish + 1 fish = 4. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get 4.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 4.
- Recommended visual description: Show Group A + Group B = 4; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.23 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- Current wording: Show 3 flowers + 2 flowers = 5. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific flower in the first group and more in the second group. How many flower altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the flower to get 5.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 5.
- Recommended visual description: Show Group A + Group B = 5; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.24 P2 - Visual Description duplicate (addition, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- Current wording: Show 4 ducks + 1 duck = 5. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific duck in the first group and more in the second group. How many duck altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the duck to get 5.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 5.
- Recommended visual description: Show Group A + Group B = 5; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.25 P2 - Visual Description duplicate (addition, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- Current wording: Show 4 leaves + 2 leaves = 6. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific leaf in the first group and more in the second group. How many leaf altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the leaf to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.26 P2 - Visual Description duplicate (addition, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008
- Current wording: Show 5 shells + 1 shell = 6. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific shell in the first group and more in the second group. How many shell altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the shell to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.27 P3 - Visual Description duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- Current wording: Show 1 apple + 3 apples = 4. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 4.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 4.
- Recommended visual description: Show Group A + Group B = 4; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.28 P3 - Visual Description duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- Current wording: Show 2 stars + 4 stars = 6. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific star in the first group and more in the second group. How many star altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the star to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.29 P3 - Visual Description duplicate (addition, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- Current wording: Show 3 oranges + 3 oranges = 6. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 6.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 6.
- Recommended visual description: Show Group A + Group B = 6; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L04.30 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- Current wording: Let's solve it together. Start with 1 apple. Add 1 more apples. Count all: 2.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 2.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.31 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- Current wording: Let's solve it together. Start with 2 stars. Add 1 more stars. Count all: 3.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 3.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.32 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- Current wording: Let's solve it together. Start with 2 oranges. Add 2 more oranges. Count all: 4.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer orange?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.33 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- Current wording: Let's solve it together. Start with 3 fish. Add 1 more fish. Count all: 4.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.34 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- Current wording: Let's solve it together. Start with 3 flowers. Add 2 more flowers. Count all: 5.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 5.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.35 P3 - Voice Script duplicate (comparison, 6 rows)

- Affected levels: L04, L05, L06, L08, L09, L10
- Question IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- Current wording: Let's solve it together. Start with 4 ducks. Add 1 more ducks. Count all: 5.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 5.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.36 P3 - Voice Script duplicate (comparison, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- Current wording: Let's solve it together. Start with 4 leaves. Add 2 more leaves. Count all: 6.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.37 P3 - Voice Script duplicate (comparison, 5 rows)

- Affected levels: L04, L05, L06, L08, L09
- Question IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008
- Current wording: Let's solve it together. Start with 5 shells. Add 1 more shells. Count all: 6.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.38 P3 - Voice Script duplicate (comparison, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- Current wording: Let's solve it together. Start with 1 apple. Add 3 more apples. Count all: 4.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 4.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.39 P3 - Voice Script duplicate (comparison, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- Current wording: Let's solve it together. Start with 2 stars. Add 4 more stars. Count all: 6.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L04.40 P3 - Voice Script duplicate (comparison, 3 rows)

- Affected levels: L04, L05, L06
- Question IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- Current wording: Let's solve it together. Start with 3 oranges. Add 3 more oranges. Count all: 6.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer orange?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 6.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

### L05

#### L05.1 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- Current wording: Group A: 9 flowers\|Group B: 10 flowers\|Group C: 11 flower
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.2 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- Current wording: Group A: 9 ducks\|Group B: 10 ducks\|Group C: 11 duck
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.3 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- Current wording: Group A: 9 leaves\|Group B: 10 leaves\|Group C: 11 leaf
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.4 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- Current wording: Group A: 9 shells\|Group B: 10 shells\|Group C: 11 shell
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.5 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- Current wording: Group A: 9 berries\|Group B: 10 berries\|Group C: 11 berry
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.6 P3 - Options duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- Current wording: Group A: 8 balls\|Group B: 9 balls\|Group C: 10 balls
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.7 P3 - Question duplicate (comparison, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- Current wording: 5 berries plus 2 more berries. How many berries altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.8 P3 - Question duplicate (comparison, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- Current wording: 6 balls plus 1 more balls. How many balls altogether?
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.9 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- Current wording: Fill in the missing number: 5 + 4 = __.
- Recommended new wording: There are row-specific berry in the first group and more in the second group. How many berry altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the berry to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.10 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- Current wording: Fill in the missing number: 6 + 3 = __.
- Recommended new wording: There are row-specific ball in the first group and more in the second group. How many ball altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the ball to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.11 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- Current wording: Fill in the missing number: 2 + 5 = __.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.12 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- Current wording: Fill in the missing number: 3 + 5 = __.
- Recommended new wording: There are row-specific star in the first group and more in the second group. How many star altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the star to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.13 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- Current wording: Fill in the missing number: 7 + 2 = __.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.14 P3 - Question duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- Current wording: Fill in the missing number: 8 + 1 = __.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.15 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- Current wording: Tap the group that shows 5 flowers plus 5 more flowers.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.16 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- Current wording: Tap the group that shows 6 ducks plus 4 more ducks.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.17 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- Current wording: Tap the group that shows 7 leaves plus 3 more leaves.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.18 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- Current wording: Tap the group that shows 8 shells plus 2 more shells.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.19 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- Current wording: Tap the group that shows 9 berries plus 1 more berries.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.20 P3 - Question duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- Current wording: Tap the group that shows 4 balls plus 5 more balls.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.21 P3 - Visual Description duplicate (addition, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- Current wording: Show 5 berries + 2 berries = 7. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific berry in the first group and more in the second group. How many berry altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the berry to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.22 P3 - Visual Description duplicate (addition, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- Current wording: Show 6 balls + 1 ball = 7. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific ball in the first group and more in the second group. How many ball altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the ball to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.23 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q014, FW-Y1-L06-Q014
- Current wording: Show 4 fish + 3 fish = 7. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.24 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q015, FW-Y1-L06-Q015
- Current wording: Show 5 flowers + 3 flowers = 8. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific flower in the first group and more in the second group. How many flower altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the flower to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.25 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q016, FW-Y1-L06-Q016
- Current wording: Show 6 ducks + 2 ducks = 8. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific duck in the first group and more in the second group. How many duck altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the duck to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.26 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q017, FW-Y1-L06-Q017
- Current wording: Show 7 leaves + 1 leaf = 8. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific leaf in the first group and more in the second group. How many leaf altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the leaf to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.27 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q018, FW-Y1-L06-Q018
- Current wording: Show 4 shells + 4 shells = 8. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific shell in the first group and more in the second group. How many shell altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the shell to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.28 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- Current wording: Show 5 berries + 4 berries = 9. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific berry in the first group and more in the second group. How many berry altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the berry to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.29 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- Current wording: Show 6 balls + 3 balls = 9. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific ball in the first group and more in the second group. How many ball altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the ball to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.30 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- Current wording: Show 2 apples + 5 apples = 7. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific apple in the first group and more in the second group. How many apple altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the apple to get 7.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 7.
- Recommended visual description: Show Group A + Group B = 7; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.31 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- Current wording: Show 3 stars + 5 stars = 8. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific star in the first group and more in the second group. How many star altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the star to get 8.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 8.
- Recommended visual description: Show Group A + Group B = 8; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.32 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- Current wording: Show 7 oranges + 2 oranges = 9. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific orange in the first group and more in the second group. How many orange altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the orange to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.33 P3 - Visual Description duplicate (addition, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- Current wording: Show 8 fish + 1 fish = 9. Use a plus sign, never 'or'.
- Recommended new wording: There are row-specific fish in the first group and more in the second group. How many fish altogether?
- Recommended new explanation: Start with the first group. Add the second group. Count all the fish to get 9.
- Recommended LearnBot tip: Addition means joining groups and counting all.
- Recommended voice narration: First count the starting group. Now add the new group. Count everything together. That gives 9.
- Recommended visual description: Show Group A + Group B = 9; keep the plus sign visible and highlight the total.
- Recommended distractor options: Use answer -1 and answer +1 where age-appropriate; avoid repeating the same 1\|2\|3, 2\|3\|4, 3\|4\|5 patterns.
- Estimated educational improvement: Connects addition language to visible groups and supports conceptual understanding.

#### L05.34 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- Current wording: Show 5 flowers + 5 flowers = 10. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.35 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- Current wording: Show 6 ducks + 4 ducks = 10. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.36 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- Current wording: Show 7 leaves + 3 leaves = 10. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.37 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- Current wording: Show 8 shells + 2 shells = 10. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.38 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- Current wording: Show 9 berries + 1 berry = 10. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.39 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- Current wording: Show 4 balls + 5 balls = 9. Use a plus sign, never 'or'.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.40 P3 - Voice Script duplicate (comparison, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- Current wording: Let's solve it together. Start with 5 berries. Add 2 more berries. Count all: 7.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.41 P3 - Voice Script duplicate (comparison, 3 rows)

- Affected levels: L05, L06, L09
- Question IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- Current wording: Let's solve it together. Start with 6 balls. Add 1 more balls. Count all: 7.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.42 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q014, FW-Y1-L06-Q014
- Current wording: Let's solve it together. Start with 4 fish. Add 3 more fish. Count all: 7.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.43 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q015, FW-Y1-L06-Q015
- Current wording: Let's solve it together. Start with 5 flowers. Add 3 more flowers. Count all: 8.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 8.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.44 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q016, FW-Y1-L06-Q016
- Current wording: Let's solve it together. Start with 6 ducks. Add 2 more ducks. Count all: 8.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 8.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.45 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q017, FW-Y1-L06-Q017
- Current wording: Let's solve it together. Start with 7 leaves. Add 1 more leaves. Count all: 8.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 8.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.46 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q018, FW-Y1-L06-Q018
- Current wording: Let's solve it together. Start with 4 shells. Add 4 more shells. Count all: 8.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 8.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.47 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- Current wording: Let's solve it together. Start with 5 berries. Add 4 more berries. Count all: 9.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 9.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.48 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- Current wording: Let's solve it together. Start with 6 balls. Add 3 more balls. Count all: 9.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 9.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.49 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- Current wording: Let's solve it together. Start with 2 apples. Add 5 more apples. Count all: 7.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer apple?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 7.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.50 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- Current wording: Let's solve it together. Start with 3 stars. Add 5 more stars. Count all: 8.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer star?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 8.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.51 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- Current wording: Let's solve it together. Start with 7 oranges. Add 2 more oranges. Count all: 9.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer orange?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 9.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.52 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- Current wording: Let's solve it together. Start with 8 fish. Add 1 more fish. Count all: 9.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer fish?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is 9.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.53 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- Current wording: Let's solve it together. Start with 5 flowers. Add 5 more flowers. Count all: 10.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer flower?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.54 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- Current wording: Let's solve it together. Start with 6 ducks. Add 4 more ducks. Count all: 10.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.55 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- Current wording: Let's solve it together. Start with 7 leaves. Add 3 more leaves. Count all: 10.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer leaf?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.56 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- Current wording: Let's solve it together. Start with 8 shells. Add 2 more shells. Count all: 10.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer shell?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.57 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- Current wording: Let's solve it together. Start with 9 berries. Add 1 more berries. Count all: 10.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer berry?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

#### L05.58 P3 - Voice Script duplicate (comparison, 2 rows)

- Affected levels: L05, L06
- Question IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- Current wording: Let's solve it together. Start with 4 balls. Add 5 more balls. Count all: 9.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer ball?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is Group B.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

### L06

No primary duplicate groups begin at this level.

### L07

#### L07.1 P1 - Final Explanation duplicate (true-false, 3 rows)

- Affected levels: L07
- Question IDs: FW-Y1-L07-Q025, FW-Y1-L07-Q029, FW-Y1-L07-Q030
- Current wording: The correct answer is False.
- Recommended new wording: True or false: write a row-specific statement that checks one clear idea.
- Recommended new explanation: Show the visual, check the statement, then explain why it is true or false.
- Recommended LearnBot tip: Check the picture before choosing true or false.
- Recommended voice narration: Look at the picture and read the sentence. If the sentence matches the picture, choose true. If not, choose false.
- Recommended visual description: Show the object group or number path beside the statement so children can verify it.
- Recommended distractor options: True/False is fixed; vary the statement and avoid too many obvious answers.
- Estimated educational improvement: Encourages verification instead of guessing.

#### L07.2 P1 - Final Explanation duplicate (true-false, 3 rows)

- Affected levels: L07
- Question IDs: FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028
- Current wording: The correct answer is True.
- Recommended new wording: True or false: write a row-specific statement that checks one clear idea.
- Recommended new explanation: Show the visual, check the statement, then explain why it is true or false.
- Recommended LearnBot tip: Check the picture before choosing true or false.
- Recommended voice narration: Look at the picture and read the sentence. If the sentence matches the picture, choose true. If not, choose false.
- Recommended visual description: Show the object group or number path beside the statement so children can verify it.
- Recommended distractor options: True/False is fixed; vary the statement and avoid too many obvious answers.
- Estimated educational improvement: Encourages verification instead of guessing.

#### L07.3 P3 - Visual Description duplicate (comparison, 2 rows)

- Affected levels: L07
- Question IDs: FW-Y1-L07-Q003, FW-Y1-L07-Q023
- Current wording: Show Group A with 4 ducks and Group B with 4 ducks. Use labels.
- Recommended new wording: Count both groups. Which group has the row-specific target: more or fewer duck?
- Recommended new explanation: Count Group A. Count Group B. Compare the totals. The correct group is the row-specific correct answer.
- Recommended LearnBot tip: Count both sides before you tap.
- Recommended voice narration: Let's compare. Count Group A first. Now count Group B. Choose the group that matches the question.
- Recommended visual description: Show Group A and Group B side by side with totals, then highlight the winning group using success color.
- Recommended distractor options: Keep Group A and Group B choices, but vary object counts and avoid repeating the same pair across levels.
- Estimated educational improvement: Improves comparison reasoning and prevents children from guessing by repeated layout.

### L08

No primary duplicate groups begin at this level.

### L09

No primary duplicate groups begin at this level.

### L10

No primary duplicate groups begin at this level.

## Priority 1 (Must Change)

These are the highest-impact improvements before using the imported bank as production content.

- **Final Explanation (38 rows, L01, L02, L04, L05, L06, L08, L09, L10):** The correct answer is 6.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q005, FW-Y1-L01-Q014, FW-Y1-L02-Q005, FW-Y1-L02-Q014, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q012, FW-Y1-L04-Q013, FW-Y1-L04-Q014, FW-Y1-L04-Q015, FW-Y1-L04-Q016, FW-Y1-L04-Q017, FW-Y1-L04-Q018, FW-Y1-L04-Q019, FW-Y1-L04-Q020, FW-Y1-L04-Q021, FW-Y1-L04-Q022, FW-Y1-L04-Q023, FW-Y1-L04-Q024, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q012, FW-Y1-L05-Q013, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q012, FW-Y1-L06-Q013, FW-Y1-L08-Q005, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L08-Q020, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L09-Q022, FW-Y1-L10-Q005, FW-Y1-L10-Q022
- **Final Explanation (25 rows, L01, L02, L04, L05, L06, L07, L08, L09, L10):** The correct answer is 4.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q003, FW-Y1-L01-Q012, FW-Y1-L02-Q003, FW-Y1-L02-Q012, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q011, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q011, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q011, FW-Y1-L07-Q020, FW-Y1-L08-Q003, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L09-Q020, FW-Y1-L10-Q003, FW-Y1-L10-Q009, FW-Y1-L10-Q010, FW-Y1-L10-Q020
- **Final Explanation (24 rows, L01, L02, L04, L05, L06, L07, L08, L09, L10):** The correct answer is 5.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q004, FW-Y1-L01-Q013, FW-Y1-L01-Q020, FW-Y1-L02-Q004, FW-Y1-L02-Q013, FW-Y1-L02-Q020, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L07-Q021, FW-Y1-L08-Q004, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L08-Q019, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L09-Q021, FW-Y1-L10-Q004, FW-Y1-L10-Q011, FW-Y1-L10-Q012, FW-Y1-L10-Q021
- **Final Explanation (19 rows, L01, L02, L05, L06, L08, L09, L10):** The correct answer is 7.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q006, FW-Y1-L01-Q015, FW-Y1-L02-Q006, FW-Y1-L02-Q015, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L05-Q014, FW-Y1-L05-Q021, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L06-Q014, FW-Y1-L06-Q021, FW-Y1-L08-Q006, FW-Y1-L08-Q021, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L09-Q023, FW-Y1-L10-Q006, FW-Y1-L10-Q023
- **Final Explanation (18 rows, L01, L02, L05, L06, L08, L09, L10):** The correct answer is 8.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q007, FW-Y1-L01-Q016, FW-Y1-L02-Q007, FW-Y1-L02-Q016, FW-Y1-L05-Q015, FW-Y1-L05-Q016, FW-Y1-L05-Q017, FW-Y1-L05-Q018, FW-Y1-L05-Q022, FW-Y1-L06-Q015, FW-Y1-L06-Q016, FW-Y1-L06-Q017, FW-Y1-L06-Q018, FW-Y1-L06-Q022, FW-Y1-L08-Q007, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- **Final Explanation (18 rows, L01, L02, L05, L06, L07, L08):** The correct answer is 9.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q008, FW-Y1-L01-Q017, FW-Y1-L01-Q019, FW-Y1-L02-Q008, FW-Y1-L02-Q017, FW-Y1-L02-Q019, FW-Y1-L05-Q019, FW-Y1-L05-Q020, FW-Y1-L05-Q023, FW-Y1-L05-Q024, FW-Y1-L06-Q019, FW-Y1-L06-Q020, FW-Y1-L06-Q023, FW-Y1-L06-Q024, FW-Y1-L07-Q019, FW-Y1-L07-Q024, FW-Y1-L08-Q008, FW-Y1-L08-Q023
- **Final Explanation (15 rows, L01, L02, L04, L05, L06, L08, L09, L10):** The correct answer is 3.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q002, FW-Y1-L01-Q011, FW-Y1-L02-Q002, FW-Y1-L02-Q011, FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q002, FW-Y1-L08-Q010, FW-Y1-L08-Q017, FW-Y1-L09-Q002, FW-Y1-L09-Q019, FW-Y1-L10-Q002, FW-Y1-L10-Q008, FW-Y1-L10-Q019
- **Final Explanation (13 rows, L01, L02, L04, L05, L06, L07, L08, L09, L10):** The correct answer is 2.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q001, FW-Y1-L01-Q018, FW-Y1-L02-Q001, FW-Y1-L02-Q018, FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L07-Q022, FW-Y1-L08-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q001, FW-Y1-L10-Q007
- **Final Explanation (8 rows, L01, L03, L09, L10):** The correct answer is 2 apples=2; 4 ducks=4; 3 stars=3.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q026, FW-Y1-L03-Q001, FW-Y1-L03-Q021, FW-Y1-L09-Q025, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q030
- **Final Explanation (7 rows, L01, L03, L09, L10):** The correct answer is 5 stars=5; 7 ducks=7; 10 flowers=10.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q025, FW-Y1-L01-Q030, FW-Y1-L03-Q005, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q029, FW-Y1-L10-Q029
- **Final Explanation (6 rows, L01, L03, L09, L10):** The correct answer is 8 shells=8; 9 berries=9; 10 balls=10.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q023, FW-Y1-L01-Q028, FW-Y1-L03-Q013, FW-Y1-L03-Q018, FW-Y1-L09-Q027, FW-Y1-L10-Q027
- **Final Explanation (6 rows, L01, L03, L09, L10):** The correct answer is 1 bird=1; 6 oranges=6; 9 apples=9.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q024, FW-Y1-L01-Q029, FW-Y1-L03-Q009, FW-Y1-L03-Q014, FW-Y1-L09-Q028, FW-Y1-L10-Q028
- **Final Explanation (5 rows, L01, L03, L09, L10):** The correct answer is 5 flowers=5; 6 fish=6; 7 leaves=7.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q022, FW-Y1-L01-Q027, FW-Y1-L03-Q002, FW-Y1-L09-Q026, FW-Y1-L10-Q026
- **Final Explanation (2 rows, L01, L02):** The correct answer is 10.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **Final Explanation (2 rows, L01, L02):** The correct answer is 1.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **LearnBot Tip (39 rows, L01, L02, L08, L09, L10):** A blank is like an empty step on the path.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q011, FW-Y1-L01-Q012, FW-Y1-L01-Q013, FW-Y1-L01-Q014, FW-Y1-L01-Q015, FW-Y1-L01-Q016, FW-Y1-L01-Q017, FW-Y1-L01-Q018, FW-Y1-L01-Q019, FW-Y1-L01-Q020, FW-Y1-L02-Q011, FW-Y1-L02-Q012, FW-Y1-L02-Q013, FW-Y1-L02-Q014, FW-Y1-L02-Q015, FW-Y1-L02-Q016, FW-Y1-L02-Q017, FW-Y1-L02-Q018, FW-Y1-L02-Q019, FW-Y1-L02-Q020, FW-Y1-L08-Q017, FW-Y1-L08-Q018, FW-Y1-L08-Q019, FW-Y1-L08-Q020, FW-Y1-L08-Q021, FW-Y1-L08-Q022, FW-Y1-L08-Q023, FW-Y1-L09-Q019, FW-Y1-L09-Q020, FW-Y1-L09-Q021, FW-Y1-L09-Q022, FW-Y1-L09-Q023, FW-Y1-L09-Q024, FW-Y1-L10-Q019, FW-Y1-L10-Q020, FW-Y1-L10-Q021, FW-Y1-L10-Q022, FW-Y1-L10-Q023, FW-Y1-L10-Q024
- **LearnBot Tip (32 rows, L01, L03, L09, L10):** Finish one match before starting the next.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- **Options (20 rows, L01, L02, L03, L04, L05, L06, L08, L09, L10):** 5\|6\|7. Update to row-specific teaching language. IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L03-Q031, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q012, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q012, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q012, FW-Y1-L08-Q005, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L10-Q005
- **Question (32 rows, L01, L03, L09, L10):** Match each group to the correct number.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- **Visual Description (32 rows, L01, L03, L09, L10):** Show three object groups and three matching number cards.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- **Voice Script (32 rows, L01, L03, L09, L10):** Let's solve it together. Choose one group. Count the objects. Match it to the same number.. Update to row-specific teaching language. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q022, FW-Y1-L01-Q023, FW-Y1-L01-Q024, FW-Y1-L01-Q025, FW-Y1-L01-Q026, FW-Y1-L01-Q027, FW-Y1-L01-Q028, FW-Y1-L01-Q029, FW-Y1-L01-Q030, FW-Y1-L03-Q001, FW-Y1-L03-Q002, FW-Y1-L03-Q005, FW-Y1-L03-Q009, FW-Y1-L03-Q013, FW-Y1-L03-Q014, FW-Y1-L03-Q018, FW-Y1-L03-Q021, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q025, FW-Y1-L09-Q026, FW-Y1-L09-Q027, FW-Y1-L09-Q028, FW-Y1-L09-Q029, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q026, FW-Y1-L10-Q027, FW-Y1-L10-Q028, FW-Y1-L10-Q029, FW-Y1-L10-Q030
- **Final Explanation (46 rows, L02, L04, L05, L06, L07, L08, L09, L10):** The correct answer is Group B.. Update to row-specific teaching language. IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L04-Q025, FW-Y1-L04-Q026, FW-Y1-L04-Q027, FW-Y1-L04-Q028, FW-Y1-L04-Q029, FW-Y1-L04-Q030, FW-Y1-L05-Q025, FW-Y1-L05-Q026, FW-Y1-L05-Q027, FW-Y1-L05-Q028, FW-Y1-L05-Q029, FW-Y1-L05-Q030, FW-Y1-L06-Q025, FW-Y1-L06-Q026, FW-Y1-L06-Q027, FW-Y1-L06-Q028, FW-Y1-L06-Q029, FW-Y1-L06-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017
- **Final Explanation (11 rows, L02, L07, L08, L09, L10):** The correct answer is Group A.. Update to row-specific teaching language. IDs: FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q018
- **LearnBot Tip (52 rows, L02, L07, L08, L09, L10):** Compare by counting both groups first.. Update to row-specific teaching language. IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L07-Q019, FW-Y1-L07-Q020, FW-Y1-L07-Q021, FW-Y1-L07-Q022, FW-Y1-L07-Q023, FW-Y1-L07-Q024, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q026, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017, FW-Y1-L10-Q018
- **Voice Script (52 rows, L02, L07, L08, L09, L10):** Let's solve it together. Count Group A. Count Group B. Compare the two totals.. Update to row-specific teaching language. IDs: FW-Y1-L02-Q021, FW-Y1-L02-Q022, FW-Y1-L02-Q024, FW-Y1-L02-Q025, FW-Y1-L02-Q026, FW-Y1-L02-Q027, FW-Y1-L02-Q029, FW-Y1-L02-Q030, FW-Y1-L07-Q001, FW-Y1-L07-Q002, FW-Y1-L07-Q004, FW-Y1-L07-Q005, FW-Y1-L07-Q006, FW-Y1-L07-Q007, FW-Y1-L07-Q009, FW-Y1-L07-Q010, FW-Y1-L07-Q011, FW-Y1-L07-Q012, FW-Y1-L07-Q014, FW-Y1-L07-Q015, FW-Y1-L07-Q016, FW-Y1-L07-Q017, FW-Y1-L07-Q019, FW-Y1-L07-Q020, FW-Y1-L07-Q021, FW-Y1-L07-Q022, FW-Y1-L07-Q023, FW-Y1-L07-Q024, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L08-Q024, FW-Y1-L08-Q025, FW-Y1-L08-Q026, FW-Y1-L08-Q027, FW-Y1-L08-Q028, FW-Y1-L08-Q029, FW-Y1-L08-Q030, FW-Y1-L09-Q011, FW-Y1-L09-Q012, FW-Y1-L09-Q014, FW-Y1-L09-Q015, FW-Y1-L09-Q016, FW-Y1-L09-Q017, FW-Y1-L10-Q013, FW-Y1-L10-Q014, FW-Y1-L10-Q016, FW-Y1-L10-Q017, FW-Y1-L10-Q018
- **LearnBot Tip (114 rows, L04, L05, L06, L08, L09, L10):** Addition means putting groups together.. Update to row-specific teaching language. IDs: FW-Y1-L04-Q001, FW-Y1-L04-Q002, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L04-Q007, FW-Y1-L04-Q008, FW-Y1-L04-Q009, FW-Y1-L04-Q010, FW-Y1-L04-Q011, FW-Y1-L04-Q012, FW-Y1-L04-Q013, FW-Y1-L04-Q014, FW-Y1-L04-Q015, FW-Y1-L04-Q016, FW-Y1-L04-Q017, FW-Y1-L04-Q018, FW-Y1-L04-Q019, FW-Y1-L04-Q020, FW-Y1-L04-Q021, FW-Y1-L04-Q022, FW-Y1-L04-Q023, FW-Y1-L04-Q024, FW-Y1-L04-Q025, FW-Y1-L04-Q026, FW-Y1-L04-Q027, FW-Y1-L04-Q028, FW-Y1-L04-Q029, FW-Y1-L04-Q030, FW-Y1-L05-Q001, FW-Y1-L05-Q002, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L05-Q007, FW-Y1-L05-Q008, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L05-Q011, FW-Y1-L05-Q012, FW-Y1-L05-Q013, FW-Y1-L05-Q014, FW-Y1-L05-Q015, FW-Y1-L05-Q016, FW-Y1-L05-Q017, FW-Y1-L05-Q018, FW-Y1-L05-Q019, FW-Y1-L05-Q020, FW-Y1-L05-Q021, FW-Y1-L05-Q022, FW-Y1-L05-Q023, FW-Y1-L05-Q024, FW-Y1-L05-Q025, FW-Y1-L05-Q026, FW-Y1-L05-Q027, FW-Y1-L05-Q028, FW-Y1-L05-Q029, FW-Y1-L05-Q030, FW-Y1-L06-Q001, FW-Y1-L06-Q002, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L06-Q007, FW-Y1-L06-Q008, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L06-Q011, FW-Y1-L06-Q012, FW-Y1-L06-Q013, FW-Y1-L06-Q014, FW-Y1-L06-Q015, FW-Y1-L06-Q016, FW-Y1-L06-Q017, FW-Y1-L06-Q018, FW-Y1-L06-Q019, FW-Y1-L06-Q020, FW-Y1-L06-Q021, FW-Y1-L06-Q022, FW-Y1-L06-Q023, FW-Y1-L06-Q024, FW-Y1-L06-Q025, FW-Y1-L06-Q026, FW-Y1-L06-Q027, FW-Y1-L06-Q028, FW-Y1-L06-Q029, FW-Y1-L06-Q030, FW-Y1-L08-Q009, FW-Y1-L08-Q010, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L08-Q015, FW-Y1-L08-Q016, FW-Y1-L09-Q001, FW-Y1-L09-Q002, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L09-Q007, FW-Y1-L09-Q008, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L10-Q007, FW-Y1-L10-Q008, FW-Y1-L10-Q009, FW-Y1-L10-Q010, FW-Y1-L10-Q011, FW-Y1-L10-Q012
- **Final Explanation (3 rows, L07):** The correct answer is False.. Update to row-specific teaching language. IDs: FW-Y1-L07-Q025, FW-Y1-L07-Q029, FW-Y1-L07-Q030
- **Final Explanation (3 rows, L07):** The correct answer is True.. Update to row-specific teaching language. IDs: FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028

## Priority 2 (Should Change)

- **Options (16 rows, L01, L02, L04, L05, L06, L08, L09, L10):** 4\|5\|6. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L04-Q005, FW-Y1-L04-Q006, FW-Y1-L05-Q005, FW-Y1-L05-Q006, FW-Y1-L06-Q005, FW-Y1-L06-Q006, FW-Y1-L08-Q004, FW-Y1-L08-Q013, FW-Y1-L08-Q014, FW-Y1-L09-Q005, FW-Y1-L09-Q006, FW-Y1-L10-Q004, FW-Y1-L10-Q011, FW-Y1-L10-Q012
- **Options (11 rows, L01, L02, L04, L05, L06, L08, L09, L10):** 2\|3\|4. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q001, FW-Y1-L01-Q002, FW-Y1-L02-Q002, FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q002, FW-Y1-L10-Q008
- **Options (10 rows, L01, L02, L05, L06, L08, L09, L10):** 6\|7\|8. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L05-Q009, FW-Y1-L05-Q010, FW-Y1-L06-Q009, FW-Y1-L06-Q010, FW-Y1-L08-Q006, FW-Y1-L09-Q009, FW-Y1-L09-Q010, FW-Y1-L10-Q006
- **Options (8 rows, L01, L03, L09, L10):** 2 apples = 2\|4 ducks = 4\|3 stars = 3. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q021, FW-Y1-L01-Q026, FW-Y1-L03-Q001, FW-Y1-L03-Q021, FW-Y1-L09-Q025, FW-Y1-L09-Q030, FW-Y1-L10-Q025, FW-Y1-L10-Q030
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 1, 2, __, 4.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 2, 3, __, 5.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 3, 4, __, 6.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q013, FW-Y1-L02-Q013, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 4, 5, __, 7.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 5, 6, __, 8.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- **Question (5 rows, L01, L02, L08, L09, L10):** Fill in the missing number: 6, 7, __, 9.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 1, 2, __, 4.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 2, 3, __, 5.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 3, 4, __, 6.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q013, FW-Y1-L02-Q013, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 4, 5, __, 7.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 5, 6, __, 8.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- **Visual Description (5 rows, L01, L02, L08, L09, L10):** Show forest stepping stones labelled 6, 7, __, 9.. Improve variety and row-specific reasoning. IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- **Options (19 rows, L02, L03, L04, L05, L06, L08, L09, L10):** 3\|4\|5. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q003, FW-Y1-L03-Q032, FW-Y1-L04-Q003, FW-Y1-L04-Q004, FW-Y1-L04-Q011, FW-Y1-L05-Q003, FW-Y1-L05-Q004, FW-Y1-L05-Q011, FW-Y1-L06-Q003, FW-Y1-L06-Q004, FW-Y1-L06-Q011, FW-Y1-L08-Q003, FW-Y1-L08-Q011, FW-Y1-L08-Q012, FW-Y1-L09-Q003, FW-Y1-L09-Q004, FW-Y1-L10-Q003, FW-Y1-L10-Q009, FW-Y1-L10-Q010
- **Options (12 rows, L02, L03, L07, L09):** TRUE\|FALSE. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q023, FW-Y1-L03-Q052, FW-Y1-L03-Q053, FW-Y1-L07-Q003, FW-Y1-L07-Q018, FW-Y1-L07-Q025, FW-Y1-L07-Q026, FW-Y1-L07-Q027, FW-Y1-L07-Q028, FW-Y1-L07-Q029, FW-Y1-L07-Q030, FW-Y1-L09-Q018
- **Options (9 rows, L02, L04, L05, L06, L08, L09, L10):** 1\|2\|3. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q001, FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q001, FW-Y1-L10-Q007
- **Question (6 rows, L02, L07, L08, L09, L10):** Tap the group with more apples.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- **Question (6 rows, L02, L07, L08, L09, L10):** Tap the group with fewer stars.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- **Question (6 rows, L02, L07, L08, L09, L10):** Tap the group with more flowers.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- **Question (6 rows, L02, L07, L08, L09, L10):** Tap the group with fewer fish.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- **Question (6 rows, L02, L07, L08, L09, L10):** Tap the group with more leaves.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- **Question (5 rows, L02, L07, L08, L09):** Tap the group with fewer shells.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- **Visual Description (7 rows, L02, L07, L08, L09, L10):** Show Group A with 3 apples and Group B with 5 apples. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L07-Q021, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- **Visual Description (7 rows, L02, L07, L08, L09, L10):** Show Group A with 6 stars and Group B with 2 stars. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L07-Q022, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- **Visual Description (7 rows, L02, L07, L08, L09, L10):** Show Group A with 7 flowers and Group B with 9 flowers. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L07-Q024, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- **Visual Description (7 rows, L02, L07, L08, L09, L10):** Show Group A with 8 fish and Group B with 5 fish. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L07-Q025, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- **Visual Description (7 rows, L02, L07, L08, L09, L10):** Show Group A with 10 leaves and Group B with 6 leaves. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L07-Q026, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- **Visual Description (6 rows, L02, L07, L08, L09):** Show Group A with 1 shell and Group B with 3 shells. Use labels.. Improve variety and row-specific reasoning. IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L07-Q027, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 1 apple plus 1 more apples. How many apples altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 2 stars plus 1 more stars. How many stars altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 2 oranges plus 2 more oranges. How many oranges altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 3 fish plus 1 more fish. How many fish altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 3 flowers plus 2 more flowers. How many flowers altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- **Question (6 rows, L04, L05, L06, L08, L09, L10):** 4 ducks plus 1 more ducks. How many ducks altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- **Question (5 rows, L04, L05, L06, L08, L09):** 4 leaves plus 2 more leaves. How many leaves altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- **Question (5 rows, L04, L05, L06, L08, L09):** 5 shells plus 1 more shells. How many shells altogether?. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 1 apple + 1 apple = 2. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 2 stars + 1 star = 3. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 2 oranges + 2 oranges = 4. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 3 fish + 1 fish = 4. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 3 flowers + 2 flowers = 5. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- **Visual Description (6 rows, L04, L05, L06, L08, L09, L10):** Show 4 ducks + 1 duck = 5. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- **Visual Description (5 rows, L04, L05, L06, L08, L09):** Show 4 leaves + 2 leaves = 6. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- **Visual Description (5 rows, L04, L05, L06, L08, L09):** Show 5 shells + 1 shell = 6. Use a plus sign, never 'or'.. Improve variety and row-specific reasoning. IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008

## Priority 3 (Nice to Improve)

- **LearnBot Tip (4 rows, L01, L02, L08, L10):** Point to each ball once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- **LearnBot Tip (4 rows, L01, L02, L08, L10):** Point to each flower once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- **LearnBot Tip (4 rows, L01, L02, L08, L10):** Point to each orange once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- **LearnBot Tip (3 rows, L01, L02, L08):** Point to each fish once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- **LearnBot Tip (3 rows, L01, L02, L08):** Point to each leaf once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- **LearnBot Tip (2 rows, L01, L02):** Point to each bird once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **LearnBot Tip (2 rows, L01, L02):** Point to each shell once as you count.. Consider light wording variation. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **Options (7 rows, L01, L03, L09, L10):** 5 stars = 5\|7 ducks = 7\|10 flowers = 10. Consider light wording variation. IDs: FW-Y1-L01-Q025, FW-Y1-L01-Q030, FW-Y1-L03-Q005, FW-Y1-L03-Q025, FW-Y1-L03-Q030, FW-Y1-L09-Q029, FW-Y1-L10-Q029
- **Options (6 rows, L01, L03, L09, L10):** 8 shells = 8\|9 berries = 9\|10 balls = 10. Consider light wording variation. IDs: FW-Y1-L01-Q023, FW-Y1-L01-Q028, FW-Y1-L03-Q013, FW-Y1-L03-Q018, FW-Y1-L09-Q027, FW-Y1-L10-Q027
- **Options (6 rows, L01, L03, L09, L10):** 1 bird = 1\|6 oranges = 6\|9 apples = 9. Consider light wording variation. IDs: FW-Y1-L01-Q024, FW-Y1-L01-Q029, FW-Y1-L03-Q009, FW-Y1-L03-Q014, FW-Y1-L09-Q028, FW-Y1-L10-Q028
- **Options (5 rows, L01, L03, L09, L10):** 5 flowers = 5\|6 fish = 6\|7 leaves = 7. Consider light wording variation. IDs: FW-Y1-L01-Q022, FW-Y1-L01-Q027, FW-Y1-L03-Q002, FW-Y1-L09-Q026, FW-Y1-L10-Q026
- **Options (4 rows, L01, L02, L03, L08):** 7\|8\|9. Consider light wording variation. IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L03-Q033, FW-Y1-L08-Q007
- **Options (3 rows, L01, L02, L08):** 8\|9\|10. Consider light wording variation. IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- **Options (2 rows, L01, L02):** 9\|10\|11. Consider light wording variation. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **Options (2 rows, L01, L02):** 1\|1\|2. Consider light wording variation. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **Question (4 rows, L01, L02, L08, L10):** Count the apples. How many apples are there?. Consider light wording variation. IDs: FW-Y1-L01-Q002, FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- **Question (4 rows, L01, L02, L08, L10):** Count the balls. How many balls are there?. Consider light wording variation. IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- **Question (4 rows, L01, L02, L08, L10):** Count the flowers. How many flowers are there?. Consider light wording variation. IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- **Question (4 rows, L01, L02, L08, L10):** Count the oranges. How many oranges are there?. Consider light wording variation. IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- **Question (3 rows, L01, L02, L08):** Count the fish. How many fish are there?. Consider light wording variation. IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- **Question (3 rows, L01, L02, L08):** Count the leaves. How many leaves are there?. Consider light wording variation. IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- **Question (3 rows, L01, L02, L08):** Fill in the missing number: 7, 8, __, 10.. Consider light wording variation. IDs: FW-Y1-L01-Q017, FW-Y1-L02-Q017, FW-Y1-L08-Q023
- **Question (2 rows, L01, L02):** Count the birds. How many birds are there?. Consider light wording variation. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **Question (2 rows, L01, L02):** Count the shells. How many shells are there?. Consider light wording variation. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **Question (2 rows, L01, L02):** Fill in the missing number: 1, __, 3.. Consider light wording variation. IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- **Question (2 rows, L01, L02):** Fill in the missing number: 8, __, 10.. Consider light wording variation. IDs: FW-Y1-L01-Q019, FW-Y1-L02-Q019
- **Question (2 rows, L01, L02):** Fill in the missing number: 4, __, 6.. Consider light wording variation. IDs: FW-Y1-L01-Q020, FW-Y1-L02-Q020
- **Visual Description (4 rows, L01, L02, L08, L10):** Show exactly 5 balls in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- **Visual Description (4 rows, L01, L02, L08, L10):** Show exactly 6 flowers in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- **Visual Description (4 rows, L01, L02, L08, L10):** Show exactly 7 oranges in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- **Visual Description (3 rows, L01, L02, L08):** Show exactly 8 fish in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- **Visual Description (3 rows, L01, L02, L08):** Show exactly 9 leaves in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- **Visual Description (3 rows, L01, L02, L08):** Show forest stepping stones labelled 7, 8, __, 10.. Consider light wording variation. IDs: FW-Y1-L01-Q017, FW-Y1-L02-Q017, FW-Y1-L08-Q023
- **Visual Description (2 rows, L01, L02):** Show exactly 10 birds in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **Visual Description (2 rows, L01, L02):** Show exactly 1 shell in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **Visual Description (2 rows, L01, L02):** Show forest stepping stones labelled 1, __, 3.. Consider light wording variation. IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- **Visual Description (2 rows, L01, L02):** Show forest stepping stones labelled 8, __, 10.. Consider light wording variation. IDs: FW-Y1-L01-Q019, FW-Y1-L02-Q019
- **Visual Description (2 rows, L01, L02):** Show forest stepping stones labelled 4, __, 6.. Consider light wording variation. IDs: FW-Y1-L01-Q020, FW-Y1-L02-Q020
- **Voice Script (7 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 5.. Consider light wording variation. IDs: FW-Y1-L01-Q013, FW-Y1-L01-Q020, FW-Y1-L02-Q013, FW-Y1-L02-Q020, FW-Y1-L08-Q019, FW-Y1-L09-Q021, FW-Y1-L10-Q021
- **Voice Script (5 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 3.. Consider light wording variation. IDs: FW-Y1-L01-Q011, FW-Y1-L02-Q011, FW-Y1-L08-Q017, FW-Y1-L09-Q019, FW-Y1-L10-Q019
- **Voice Script (5 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 4.. Consider light wording variation. IDs: FW-Y1-L01-Q012, FW-Y1-L02-Q012, FW-Y1-L08-Q018, FW-Y1-L09-Q020, FW-Y1-L10-Q020
- **Voice Script (5 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 6.. Consider light wording variation. IDs: FW-Y1-L01-Q014, FW-Y1-L02-Q014, FW-Y1-L08-Q020, FW-Y1-L09-Q022, FW-Y1-L10-Q022
- **Voice Script (5 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 7.. Consider light wording variation. IDs: FW-Y1-L01-Q015, FW-Y1-L02-Q015, FW-Y1-L08-Q021, FW-Y1-L09-Q023, FW-Y1-L10-Q023
- **Voice Script (5 rows, L01, L02, L08, L09, L10):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 8.. Consider light wording variation. IDs: FW-Y1-L01-Q016, FW-Y1-L02-Q016, FW-Y1-L08-Q022, FW-Y1-L09-Q024, FW-Y1-L10-Q024
- **Voice Script (5 rows, L01, L02, L08):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 9.. Consider light wording variation. IDs: FW-Y1-L01-Q017, FW-Y1-L01-Q019, FW-Y1-L02-Q017, FW-Y1-L02-Q019, FW-Y1-L08-Q023
- **Voice Script (4 rows, L01, L02, L08, L10):** Let's solve it together. Look at the objects. Count each ball one by one. The total is 5.. Consider light wording variation. IDs: FW-Y1-L01-Q004, FW-Y1-L02-Q004, FW-Y1-L08-Q004, FW-Y1-L10-Q004
- **Voice Script (4 rows, L01, L02, L08, L10):** Let's solve it together. Look at the objects. Count each flower one by one. The total is 6.. Consider light wording variation. IDs: FW-Y1-L01-Q005, FW-Y1-L02-Q005, FW-Y1-L08-Q005, FW-Y1-L10-Q005
- **Voice Script (4 rows, L01, L02, L08, L10):** Let's solve it together. Look at the objects. Count each orange one by one. The total is 7.. Consider light wording variation. IDs: FW-Y1-L01-Q006, FW-Y1-L02-Q006, FW-Y1-L08-Q006, FW-Y1-L10-Q006
- **Voice Script (3 rows, L01, L02, L08):** Let's solve it together. Look at the objects. Count each fish one by one. The total is 8.. Consider light wording variation. IDs: FW-Y1-L01-Q007, FW-Y1-L02-Q007, FW-Y1-L08-Q007
- **Voice Script (3 rows, L01, L02, L08):** Let's solve it together. Look at the objects. Count each leaf one by one. The total is 9.. Consider light wording variation. IDs: FW-Y1-L01-Q008, FW-Y1-L02-Q008, FW-Y1-L08-Q008
- **Voice Script (2 rows, L01, L02):** Let's solve it together. Look at the objects. Count each bird one by one. The total is 10.. Consider light wording variation. IDs: FW-Y1-L01-Q009, FW-Y1-L02-Q009
- **Voice Script (2 rows, L01, L02):** Let's solve it together. Look at the objects. Count each shell one by one. The total is 1.. Consider light wording variation. IDs: FW-Y1-L01-Q010, FW-Y1-L02-Q010
- **Voice Script (2 rows, L01, L02):** Let's solve it together. Read the numbers in order. Count forward to find the blank. The missing number is 2.. Consider light wording variation. IDs: FW-Y1-L01-Q018, FW-Y1-L02-Q018
- **LearnBot Tip (3 rows, L02, L08, L10):** Point to each apple once as you count.. Consider light wording variation. IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- **LearnBot Tip (3 rows, L02, L08, L10):** Point to each star once as you count.. Consider light wording variation. IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- **LearnBot Tip (3 rows, L02, L08, L10):** Point to each duck once as you count.. Consider light wording variation. IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- **Options (6 rows, L02, L07, L08, L09, L10):** Group A: 3 apples\|Group B: 5 apples. Consider light wording variation. IDs: FW-Y1-L02-Q021, FW-Y1-L07-Q001, FW-Y1-L07-Q011, FW-Y1-L08-Q024, FW-Y1-L09-Q011, FW-Y1-L10-Q013
- **Options (6 rows, L02, L07, L08, L09, L10):** Group A: 6 stars\|Group B: 2 stars. Consider light wording variation. IDs: FW-Y1-L02-Q022, FW-Y1-L07-Q002, FW-Y1-L07-Q012, FW-Y1-L08-Q025, FW-Y1-L09-Q012, FW-Y1-L10-Q014
- **Options (6 rows, L02, L07, L08, L09, L10):** Group A: 7 flowers\|Group B: 9 flowers. Consider light wording variation. IDs: FW-Y1-L02-Q024, FW-Y1-L07-Q004, FW-Y1-L07-Q014, FW-Y1-L08-Q027, FW-Y1-L09-Q014, FW-Y1-L10-Q016
- **Options (6 rows, L02, L07, L08, L09, L10):** Group A: 8 fish\|Group B: 5 fish. Consider light wording variation. IDs: FW-Y1-L02-Q025, FW-Y1-L07-Q005, FW-Y1-L07-Q015, FW-Y1-L08-Q028, FW-Y1-L09-Q015, FW-Y1-L10-Q017
- **Options (6 rows, L02, L07, L08, L09, L10):** Group A: 10 leaves\|Group B: 6 leaves. Consider light wording variation. IDs: FW-Y1-L02-Q026, FW-Y1-L07-Q006, FW-Y1-L07-Q016, FW-Y1-L08-Q029, FW-Y1-L09-Q016, FW-Y1-L10-Q018
- **Options (5 rows, L02, L07, L08, L09):** Group A: 1 shell\|Group B: 3 shells. Consider light wording variation. IDs: FW-Y1-L02-Q027, FW-Y1-L07-Q007, FW-Y1-L07-Q017, FW-Y1-L08-Q030, FW-Y1-L09-Q017
- **Options (2 rows, L02, L07):** Group A: 2 balls\|Group B: 9 balls. Consider light wording variation. IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009
- **Options (2 rows, L02, L07):** Group A: 8 birds\|Group B: 4 birds. Consider light wording variation. IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010
- **Question (3 rows, L02, L08, L10):** Count the stars. How many stars are there?. Consider light wording variation. IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- **Question (3 rows, L02, L08, L10):** Count the ducks. How many ducks are there?. Consider light wording variation. IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- **Question (2 rows, L02, L07):** Which group has more berries?. Consider light wording variation. IDs: FW-Y1-L02-Q028, FW-Y1-L07-Q008
- **Question (2 rows, L02, L07):** Tap the group with more balls.. Consider light wording variation. IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009
- **Question (2 rows, L02, L07):** Tap the group with fewer birds.. Consider light wording variation. IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010
- **Visual Description (4 rows, L02, L07):** Show Group A with 2 balls and Group B with 9 balls. Use labels.. Consider light wording variation. IDs: FW-Y1-L02-Q029, FW-Y1-L07-Q009, FW-Y1-L07-Q019, FW-Y1-L07-Q029
- **Visual Description (4 rows, L02, L07):** Show Group A with 8 birds and Group B with 4 birds. Use labels.. Consider light wording variation. IDs: FW-Y1-L02-Q030, FW-Y1-L07-Q010, FW-Y1-L07-Q020, FW-Y1-L07-Q030
- **Visual Description (3 rows, L02, L08, L10):** Show exactly 2 apples in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- **Visual Description (3 rows, L02, L08, L10):** Show exactly 3 stars in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- **Visual Description (3 rows, L02, L08, L10):** Show exactly 4 ducks in a clear forest scene.. Consider light wording variation. IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- **Visual Description (2 rows, L02, L09):** Show Group A with 4 ducks and Group B with 6 ducks. Use labels.. Consider light wording variation. IDs: FW-Y1-L02-Q023, FW-Y1-L09-Q013
- **Visual Description (2 rows, L02, L09):** Show Group A with 5 berries and Group B with 7 berries. Use labels.. Consider light wording variation. IDs: FW-Y1-L02-Q028, FW-Y1-L09-Q018
- **Voice Script (3 rows, L02, L08, L10):** Let's solve it together. Look at the objects. Count each apple one by one. The total is 2.. Consider light wording variation. IDs: FW-Y1-L02-Q001, FW-Y1-L08-Q001, FW-Y1-L10-Q001
- **Voice Script (3 rows, L02, L08, L10):** Let's solve it together. Look at the objects. Count each star one by one. The total is 3.. Consider light wording variation. IDs: FW-Y1-L02-Q002, FW-Y1-L08-Q002, FW-Y1-L10-Q002
- **Voice Script (3 rows, L02, L08, L10):** Let's solve it together. Look at the objects. Count each duck one by one. The total is 4.. Consider light wording variation. IDs: FW-Y1-L02-Q003, FW-Y1-L08-Q003, FW-Y1-L10-Q003
- **LearnBot Tip (3 rows, L03):** Do not guess—count every group.. Consider light wording variation. IDs: FW-Y1-L03-Q043, FW-Y1-L03-Q044, FW-Y1-L03-Q045
- **LearnBot Tip (3 rows, L03):** Count forward one number at a time.. Consider light wording variation. IDs: FW-Y1-L03-Q046, FW-Y1-L03-Q047, FW-Y1-L03-Q049
- **LearnBot Tip (2 rows, L03):** Check your count before typing.. Consider light wording variation. IDs: FW-Y1-L03-Q037, FW-Y1-L03-Q040
- **LearnBot Tip (2 rows, L03):** A match must show the same amount on both sides.. Consider light wording variation. IDs: FW-Y1-L03-Q052, FW-Y1-L03-Q053
- **Voice Script (3 rows, L03):** Let's solve it together. Read the numbers in order. Think about the number that comes next. Type the missing number.. Consider light wording variation. IDs: FW-Y1-L03-Q046, FW-Y1-L03-Q047, FW-Y1-L03-Q049
- **Question (3 rows, L04, L05, L06):** 1 apple plus 3 more apples. How many apples altogether?. Consider light wording variation. IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- **Question (3 rows, L04, L05, L06):** 2 stars plus 4 more stars. How many stars altogether?. Consider light wording variation. IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- **Question (3 rows, L04, L05, L06):** Count all the oranges. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- **Question (3 rows, L04, L05, L06):** Count all the fish. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q014, FW-Y1-L05-Q014, FW-Y1-L06-Q014
- **Question (3 rows, L04, L05, L06):** Count all the flowers. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q015, FW-Y1-L05-Q015, FW-Y1-L06-Q015
- **Question (3 rows, L04, L05, L06):** Count all the ducks. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q016, FW-Y1-L05-Q016, FW-Y1-L06-Q016
- **Question (3 rows, L04, L05, L06):** Count all the leaves. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q017, FW-Y1-L05-Q017, FW-Y1-L06-Q017
- **Question (3 rows, L04, L05, L06):** Count all the shells. Type the answer.. Consider light wording variation. IDs: FW-Y1-L04-Q018, FW-Y1-L05-Q018, FW-Y1-L06-Q018
- **Question (2 rows, L04):** Fill in the missing number: 1 + 5 = __.. Consider light wording variation. IDs: FW-Y1-L04-Q021, FW-Y1-L04-Q022
- **Visual Description (3 rows, L04, L05, L06):** Show 1 apple + 3 apples = 4. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- **Visual Description (3 rows, L04, L05, L06):** Show 2 stars + 4 stars = 6. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- **Visual Description (3 rows, L04, L05, L06):** Show 3 oranges + 3 oranges = 6. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 1 apple. Add 1 more apples. Count all: 2.. Consider light wording variation. IDs: FW-Y1-L04-Q001, FW-Y1-L05-Q001, FW-Y1-L06-Q001, FW-Y1-L08-Q009, FW-Y1-L09-Q001, FW-Y1-L10-Q007
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 2 stars. Add 1 more stars. Count all: 3.. Consider light wording variation. IDs: FW-Y1-L04-Q002, FW-Y1-L05-Q002, FW-Y1-L06-Q002, FW-Y1-L08-Q010, FW-Y1-L09-Q002, FW-Y1-L10-Q008
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 2 oranges. Add 2 more oranges. Count all: 4.. Consider light wording variation. IDs: FW-Y1-L04-Q003, FW-Y1-L05-Q003, FW-Y1-L06-Q003, FW-Y1-L08-Q011, FW-Y1-L09-Q003, FW-Y1-L10-Q009
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 3 fish. Add 1 more fish. Count all: 4.. Consider light wording variation. IDs: FW-Y1-L04-Q004, FW-Y1-L05-Q004, FW-Y1-L06-Q004, FW-Y1-L08-Q012, FW-Y1-L09-Q004, FW-Y1-L10-Q010
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 3 flowers. Add 2 more flowers. Count all: 5.. Consider light wording variation. IDs: FW-Y1-L04-Q005, FW-Y1-L05-Q005, FW-Y1-L06-Q005, FW-Y1-L08-Q013, FW-Y1-L09-Q005, FW-Y1-L10-Q011
- **Voice Script (6 rows, L04, L05, L06, L08, L09, L10):** Let's solve it together. Start with 4 ducks. Add 1 more ducks. Count all: 5.. Consider light wording variation. IDs: FW-Y1-L04-Q006, FW-Y1-L05-Q006, FW-Y1-L06-Q006, FW-Y1-L08-Q014, FW-Y1-L09-Q006, FW-Y1-L10-Q012
- **Voice Script (5 rows, L04, L05, L06, L08, L09):** Let's solve it together. Start with 4 leaves. Add 2 more leaves. Count all: 6.. Consider light wording variation. IDs: FW-Y1-L04-Q007, FW-Y1-L05-Q007, FW-Y1-L06-Q007, FW-Y1-L08-Q015, FW-Y1-L09-Q007
- **Voice Script (5 rows, L04, L05, L06, L08, L09):** Let's solve it together. Start with 5 shells. Add 1 more shells. Count all: 6.. Consider light wording variation. IDs: FW-Y1-L04-Q008, FW-Y1-L05-Q008, FW-Y1-L06-Q008, FW-Y1-L08-Q016, FW-Y1-L09-Q008
- **Voice Script (3 rows, L04, L05, L06):** Let's solve it together. Start with 1 apple. Add 3 more apples. Count all: 4.. Consider light wording variation. IDs: FW-Y1-L04-Q011, FW-Y1-L05-Q011, FW-Y1-L06-Q011
- **Voice Script (3 rows, L04, L05, L06):** Let's solve it together. Start with 2 stars. Add 4 more stars. Count all: 6.. Consider light wording variation. IDs: FW-Y1-L04-Q012, FW-Y1-L05-Q012, FW-Y1-L06-Q012
- **Voice Script (3 rows, L04, L05, L06):** Let's solve it together. Start with 3 oranges. Add 3 more oranges. Count all: 6.. Consider light wording variation. IDs: FW-Y1-L04-Q013, FW-Y1-L05-Q013, FW-Y1-L06-Q013
- **Options (2 rows, L05, L06):** Group A: 9 flowers\|Group B: 10 flowers\|Group C: 11 flower. Consider light wording variation. IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- **Options (2 rows, L05, L06):** Group A: 9 ducks\|Group B: 10 ducks\|Group C: 11 duck. Consider light wording variation. IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- **Options (2 rows, L05, L06):** Group A: 9 leaves\|Group B: 10 leaves\|Group C: 11 leaf. Consider light wording variation. IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- **Options (2 rows, L05, L06):** Group A: 9 shells\|Group B: 10 shells\|Group C: 11 shell. Consider light wording variation. IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- **Options (2 rows, L05, L06):** Group A: 9 berries\|Group B: 10 berries\|Group C: 11 berry. Consider light wording variation. IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- **Options (2 rows, L05, L06):** Group A: 8 balls\|Group B: 9 balls\|Group C: 10 balls. Consider light wording variation. IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- **Question (3 rows, L05, L06, L09):** 5 berries plus 2 more berries. How many berries altogether?. Consider light wording variation. IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- **Question (3 rows, L05, L06, L09):** 6 balls plus 1 more balls. How many balls altogether?. Consider light wording variation. IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- **Question (2 rows, L05, L06):** Fill in the missing number: 5 + 4 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- **Question (2 rows, L05, L06):** Fill in the missing number: 6 + 3 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- **Question (2 rows, L05, L06):** Fill in the missing number: 2 + 5 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- **Question (2 rows, L05, L06):** Fill in the missing number: 3 + 5 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- **Question (2 rows, L05, L06):** Fill in the missing number: 7 + 2 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- **Question (2 rows, L05, L06):** Fill in the missing number: 8 + 1 = __.. Consider light wording variation. IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- **Question (2 rows, L05, L06):** Tap the group that shows 5 flowers plus 5 more flowers.. Consider light wording variation. IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- **Question (2 rows, L05, L06):** Tap the group that shows 6 ducks plus 4 more ducks.. Consider light wording variation. IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- **Question (2 rows, L05, L06):** Tap the group that shows 7 leaves plus 3 more leaves.. Consider light wording variation. IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- **Question (2 rows, L05, L06):** Tap the group that shows 8 shells plus 2 more shells.. Consider light wording variation. IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- **Question (2 rows, L05, L06):** Tap the group that shows 9 berries plus 1 more berries.. Consider light wording variation. IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- **Question (2 rows, L05, L06):** Tap the group that shows 4 balls plus 5 more balls.. Consider light wording variation. IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- **Visual Description (3 rows, L05, L06, L09):** Show 5 berries + 2 berries = 7. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- **Visual Description (3 rows, L05, L06, L09):** Show 6 balls + 1 ball = 7. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- **Visual Description (2 rows, L05, L06):** Show 4 fish + 3 fish = 7. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q014, FW-Y1-L06-Q014
- **Visual Description (2 rows, L05, L06):** Show 5 flowers + 3 flowers = 8. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q015, FW-Y1-L06-Q015
- **Visual Description (2 rows, L05, L06):** Show 6 ducks + 2 ducks = 8. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q016, FW-Y1-L06-Q016
- **Visual Description (2 rows, L05, L06):** Show 7 leaves + 1 leaf = 8. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q017, FW-Y1-L06-Q017
- **Visual Description (2 rows, L05, L06):** Show 4 shells + 4 shells = 8. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q018, FW-Y1-L06-Q018
- **Visual Description (2 rows, L05, L06):** Show 5 berries + 4 berries = 9. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- **Visual Description (2 rows, L05, L06):** Show 6 balls + 3 balls = 9. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- **Visual Description (2 rows, L05, L06):** Show 2 apples + 5 apples = 7. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- **Visual Description (2 rows, L05, L06):** Show 3 stars + 5 stars = 8. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- **Visual Description (2 rows, L05, L06):** Show 7 oranges + 2 oranges = 9. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- **Visual Description (2 rows, L05, L06):** Show 8 fish + 1 fish = 9. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- **Visual Description (2 rows, L05, L06):** Show 5 flowers + 5 flowers = 10. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- **Visual Description (2 rows, L05, L06):** Show 6 ducks + 4 ducks = 10. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- **Visual Description (2 rows, L05, L06):** Show 7 leaves + 3 leaves = 10. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- **Visual Description (2 rows, L05, L06):** Show 8 shells + 2 shells = 10. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- **Visual Description (2 rows, L05, L06):** Show 9 berries + 1 berry = 10. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- **Visual Description (2 rows, L05, L06):** Show 4 balls + 5 balls = 9. Use a plus sign, never 'or'.. Consider light wording variation. IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- **Voice Script (3 rows, L05, L06, L09):** Let's solve it together. Start with 5 berries. Add 2 more berries. Count all: 7.. Consider light wording variation. IDs: FW-Y1-L05-Q009, FW-Y1-L06-Q009, FW-Y1-L09-Q009
- **Voice Script (3 rows, L05, L06, L09):** Let's solve it together. Start with 6 balls. Add 1 more balls. Count all: 7.. Consider light wording variation. IDs: FW-Y1-L05-Q010, FW-Y1-L06-Q010, FW-Y1-L09-Q010
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 4 fish. Add 3 more fish. Count all: 7.. Consider light wording variation. IDs: FW-Y1-L05-Q014, FW-Y1-L06-Q014
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 5 flowers. Add 3 more flowers. Count all: 8.. Consider light wording variation. IDs: FW-Y1-L05-Q015, FW-Y1-L06-Q015
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 6 ducks. Add 2 more ducks. Count all: 8.. Consider light wording variation. IDs: FW-Y1-L05-Q016, FW-Y1-L06-Q016
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 7 leaves. Add 1 more leaves. Count all: 8.. Consider light wording variation. IDs: FW-Y1-L05-Q017, FW-Y1-L06-Q017
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 4 shells. Add 4 more shells. Count all: 8.. Consider light wording variation. IDs: FW-Y1-L05-Q018, FW-Y1-L06-Q018
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 5 berries. Add 4 more berries. Count all: 9.. Consider light wording variation. IDs: FW-Y1-L05-Q019, FW-Y1-L06-Q019
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 6 balls. Add 3 more balls. Count all: 9.. Consider light wording variation. IDs: FW-Y1-L05-Q020, FW-Y1-L06-Q020
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 2 apples. Add 5 more apples. Count all: 7.. Consider light wording variation. IDs: FW-Y1-L05-Q021, FW-Y1-L06-Q021
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 3 stars. Add 5 more stars. Count all: 8.. Consider light wording variation. IDs: FW-Y1-L05-Q022, FW-Y1-L06-Q022
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 7 oranges. Add 2 more oranges. Count all: 9.. Consider light wording variation. IDs: FW-Y1-L05-Q023, FW-Y1-L06-Q023
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 8 fish. Add 1 more fish. Count all: 9.. Consider light wording variation. IDs: FW-Y1-L05-Q024, FW-Y1-L06-Q024
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 5 flowers. Add 5 more flowers. Count all: 10.. Consider light wording variation. IDs: FW-Y1-L05-Q025, FW-Y1-L06-Q025
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 6 ducks. Add 4 more ducks. Count all: 10.. Consider light wording variation. IDs: FW-Y1-L05-Q026, FW-Y1-L06-Q026
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 7 leaves. Add 3 more leaves. Count all: 10.. Consider light wording variation. IDs: FW-Y1-L05-Q027, FW-Y1-L06-Q027
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 8 shells. Add 2 more shells. Count all: 10.. Consider light wording variation. IDs: FW-Y1-L05-Q028, FW-Y1-L06-Q028
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 9 berries. Add 1 more berries. Count all: 10.. Consider light wording variation. IDs: FW-Y1-L05-Q029, FW-Y1-L06-Q029
- **Voice Script (2 rows, L05, L06):** Let's solve it together. Start with 4 balls. Add 5 more balls. Count all: 9.. Consider light wording variation. IDs: FW-Y1-L05-Q030, FW-Y1-L06-Q030
- **Visual Description (2 rows, L07):** Show Group A with 4 ducks and Group B with 4 ducks. Use labels.. Consider light wording variation. IDs: FW-Y1-L07-Q003, FW-Y1-L07-Q023

## Curriculum, Age, and Progression Recommendations

- L01-L02 should stay concrete: counting, number paths, and clear object totals. Keep language short.
- L03 should feel more game-like: matching should vary object sets and number-card order.
- L04-L06 addition should progress from direct joining to short story contexts, not repeat the same addition stems.
- L07 comparison should use explicit mathematical language: more than, fewer than, greater than, less than, and equal when relevant.
- L08 review should remix prior skills with new objects and contexts. It should not simply repeat L01-L07 wording.
- L09 challenge should include slightly more reasoning prompts while staying within numbers 1-10.
- L10 boss should use Forest Guardian language and mixed-skill confidence checks; avoid Easy-only tone.
- Replace `Curriculum Alignment = Both` with explicit controlled curriculum mapping.

## Recommended Editing Workflow

1. Fix all Priority 1 explanation and LearnBot-tip duplicates first.
2. Fix repeated L04-L06 addition wording and L07 comparison wording.
3. Add row-specific voice scripts for high-frequency duplicate scripts.
4. Vary visual descriptions by level and skill type.
5. Review distractor options so later levels do not reuse early-level option sets.
6. Update curriculum mapping after wording changes, then rerun the question asset validation pipeline.

