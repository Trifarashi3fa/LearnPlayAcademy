# Forest World v1.0 Release QA Report

Audit date: 2026-07-12  
Project: `E:\Codex\learnplay-academy`  
Scope: Forest World Year 1, levels L01-L10, imported question assets, active MVP manifest, route structure, static accessibility and responsive layout review.

## Audit Summary

Forest World v1.0 is not ready to release as a fully imported 30-question-per-level content package yet.

The active production MVP manifest is internally consistent: it contains 100 active Forest questions, 10 per level, and all checked active questions use the expected 10 XP reward. The imported Year 1 Forest asset pipeline also passes structurally with 0 rejected rows and 0 blocking import errors.

However, the imported Forest v1.0 content still has release-quality issues:

- L03 imports only 23 approved rows, not 30.
- 47 L03 source rows are skipped because they are Review/Future content.
- All imported rows use ambiguous curriculum alignment value `Both`.
- There are large duplicate groups in question text, explanations, and LearnBot tips.
- Required asset fields are mostly visual hints, not verifiable image filenames.
- Imported asset rows do not contain explicit XP reward fields.

## Evidence Snapshot

Batch import report:

| Metric | Count |
|---|---:|
| Levels discovered | 10 |
| Levels passed | 10 |
| Levels failed | 0 |
| Source rows | 340 |
| Imported rows | 293 |
| Skipped rows | 47 |
| Rejected rows | 0 |
| Errors | 0 |
| Warnings | 0 |
| Duplicate IDs | 0 |
| Publishable rows | 290 |

Active production manifest:

| Metric | Count |
|---|---:|
| Active questions | 100 |
| Levels | 10 |
| Questions per level | 10 |
| XP reward issues found | 0 |

Imported rows by level:

| Level | Source | Approved/Imported | Skipped | Rejected | Errors | Main Types |
|---|---:|---:|---:|---:|---:|---|
| L01 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Fill Missing Number, Match Pairs |
| L02 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Fill Missing Number, Tap Correct Group, True or False |
| L03 | 70 | 23 | 47 | 0 | 0 | Match Pairs, Multiple Choice, Count and Type, Tap Correct Group, Fill Missing Number, True or False |
| L04 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Count and Type, Fill Missing Number, Tap Correct Group |
| L05 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Count and Type, Fill Missing Number, Tap Correct Group |
| L06 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Count and Type, Fill Missing Number, Tap Correct Group |
| L07 | 30 | 30 | 0 | 0 | 0 | Tap Correct Group, True or False, Multiple Choice, Fill Missing Number |
| L08 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Fill Missing Number, Tap Correct Group |
| L09 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Tap Correct Group, True or False, Fill Missing Number, Match Pairs |
| L10 | 30 | 30 | 0 | 0 | 0 | Multiple Choice, Tap Correct Group, Fill Missing Number, Match Pairs |

## Critical Issues

No critical production-blocking issue was found in the active 100-question MVP manifest during static audit.

The active production route set exists for:

- `/`
- `/subjects`
- `/subjects/mathematics`
- `/mvp/world-map`
- `/mvp/level/[level]`
- `/mvp/question/[level]`
- `/mvp/rewards`
- `/mvp/parent-dashboard`

Important limitation: this audit did not run browser/device automation because the task was audit-only and no project files other than this report should be changed. Responsive and accessibility findings below are based on static inspection.

## High Issues

### H1. L03 is not a complete approved 30-row imported pool

L03 has 70 source rows but only 23 approved/imported rows. The remaining 47 rows are skipped as non-approved Review/Future content.

Impact:

- Forest L03 is not yet a clean 30-approved-question release pool.
- Random sessions can still select 10 questions, but content variety and distribution are weaker than the other levels.
- If Forest World v1.0 expects 30 approved imported rows per level, L03 fails that release standard.

Files:

- `content/question-assets/mathematics/year-1/forest-world/forest-l03-imported.json`
- `generated/question-assets/year-1-forest-l03-import-report.json`

Recommendation:

Approve and import at least 7 more L03 rows using currently supported renderer types, or explicitly define L03 v1.0 as a 23-row approved pool.

### H2. Curriculum alignment is ambiguous for all imported rows

All 293 imported rows use:

```text
Curriculum Alignment = Both
```

Impact:

- This does not clearly identify KSSR, Cambridge Primary, or another curriculum source.
- It is difficult to audit whether a question is correctly aligned to the intended standard.
- This weakens future reporting and parent-facing curriculum claims.

Recommendation:

Replace `Both` with a controlled value or list, such as:

- `KSSR Mathematics Year 1`
- `Cambridge Primary Mathematics Stage 1`
- `KSSR + Cambridge`
- curriculum topic IDs from the future Curriculum Master.

### H3. High duplicate question wording

The audit found 61 duplicate question-text groups across imported rows.

Examples:

- `Match each group to the correct number.` appears in 32 rows.
- `Tap the group with more apples.` appears in 6 rows.
- `Tap the group with fewer stars.` appears in 6 rows.
- Addition stems such as `1 apple plus 1 more apples...` repeat across L04, L05, L06, L08, L09, and L10.

Impact:

- Replay can feel repetitive.
- Advanced or boss levels may not feel meaningfully different from earlier practice levels.
- Learners may memorize wording instead of mastering the skill.

Recommendation:

Keep some repeated structure for young learners, but vary object sets, wording, context, and challenge framing by level.

### H4. Duplicate explanations are too common

The audit found 19 duplicate final-explanation groups.

Examples:

- `The correct answer is Group B.` appears in 46 rows.
- `The correct answer is 6.` appears in 38 rows.
- `The correct answer is 4.` appears in 25 rows.
- `The correct answer is 5.` appears in 24 rows.

Impact:

- Explanations confirm answers but often do not teach.
- This conflicts with the LearnPlay goal of visual, child-friendly teaching notes.

Recommendation:

Rewrite explanation fields to include a short reason, such as:

- `Group B has fewer objects because 3 is less than 5.`
- `Start at 4, count two more, and land on 6.`
- `The missing number is 5 because the sequence goes 3, 4, 5, 6.`

### H5. LearnBot tips are heavily duplicated

The audit found 18 duplicate LearnBot-tip groups.

Examples:

- `Addition means putting groups together.` appears in 114 rows.
- `Compare by counting both groups first.` appears in 52 rows.
- `A blank is like an empty step on the path.` appears in 39 rows.
- `Finish one match before starting the next.` appears in 32 rows.

Impact:

- LearnBot may feel repetitive instead of responsive.
- It weakens the teaching assistant experience created in the UI polish phases.

Recommendation:

Add a variation bank per topic and question type, then rotate tips while keeping the asset row's learning objective intact.

## Medium Issues

### M1. Imported assets are not production-active yet

The active MVP manifest still contains 100 approved production questions. The imported Forest L01-L10 pool contains 293 imported rows but remains separate from production gameplay.

Impact:

- A release of the current production MVP is different from a release of the imported Forest v1.0 content pool.
- QA sign-off should specify which content source is being released.

Recommendation:

Before launch, decide whether Forest v1.0 means:

- current production manifest: 100 questions, 10 per level, or
- imported asset pool: 293 questions, random 10 sessions, dev-preview validated but not production active.

### M2. Required assets are mostly asset hints, not verifiable image paths

Examples:

- `visual:number path|type:Fill Missing Number` appears 39 times.
- `visual:apple|type:Multiple Choice` appears 14 times.
- `visual:star|type:Multiple Choice` appears 13 times.

Impact:

- The audit cannot verify actual image file existence for these rows.
- Missing visual rendering would only be caught by component/runtime tests.

Recommendation:

Add a controlled asset registry that maps each visual object to:

- renderer type
- fallback emoji/icon
- optional file path
- accessibility label.

### M3. Imported rows do not include explicit XP reward values

The active 100-question manifest has correct XP rewards: all checked active questions use 10 XP.

However, imported question asset rows do not currently expose a per-row XP reward field.

Impact:

- Imported content cannot be independently audited for XP correctness.
- XP remains runtime-policy driven rather than content-governed.

Recommendation:

If imported assets will become production content, either add `XP Reward` to the asset schema or document that Forest Year 1 all questions inherit `10 XP`.

### M4. Publishable count does not equal imported count

Batch report shows:

- Imported rows: 293
- Publishable rows: 290

Impact:

- Three imported rows are not considered publishable by the current report totals.
- This may be intentional, but should be explained before release.

Recommendation:

Inspect publishability rules and per-row report output to identify which three rows are excluded and why.

### M5. Future question types are present in L03 source content

L03 source includes Review/Future rows for:

- Drag and Drop (Future)
- Sorting (Future)
- Puzzle (Future)

These are skipped correctly and do not block import.

Impact:

- Not a production blocker now.
- The source sheet can confuse release counts if stakeholders expect all source rows to ship.

Recommendation:

Keep future rows in the source sheet, but add a release note that only Approved supported rows are imported into v1.0.

### M6. Static accessibility coverage is incomplete

Static inspection found ARIA/focus work in key lesson components, but no automated accessibility run was performed.

Observed:

- `LearningSessionShell`, `ExplanationDrawer`, `StickyActionBar`, `QuestionCard`, `ExplanationTabs`, and `WorldMapClient` include some ARIA or focus styling.
- `QuestionPlayer` itself has limited direct ARIA markers, likely delegating interaction to child renderers.

Impact:

- Keyboard and screen-reader behavior may still have gaps.

Recommendation:

Run a browser-based accessibility pass with keyboard-only navigation and an axe-style audit before final release.

### M7. Responsive and mobile compatibility need device verification

Static inspection found responsive Tailwind classes and `100dvh` lesson-shell handling, but no live viewport test was run in this audit.

Risk areas:

- lesson shell fixed viewport behavior
- explanation panel overflow
- Match Pairs on mobile
- Tap Correct Group on narrow screens
- Level 10 boss completion screen

Recommendation:

Manually test:

- 360x640 portrait
- 640x360 landscape
- Redmi A3 portrait and landscape
- iPad/tablet width
- 1366x768 desktop at 100 percent zoom.

## Low Issues

### L1. Working tree contains many uncommitted changes

`git status --short` shows modified and added files from earlier phases, including importer scripts, imported CSVs, generated reports, question engine components, and dev preview work.

Impact:

- Release QA is being performed on a dirty working tree.
- Results may not match the deployed branch unless changes are committed and deployed later.

Recommendation:

Before release, commit or stash unrelated work and rerun the audit on the exact release branch.

### L2. Non-MVP routes still exist in the repository

Static route/link scan shows non-MVP routes still exist, including:

- `/games`
- `/games/demo/[gameId]`
- `/life-skills`
- `/science`

This may be expected because Phase 1 feature-gated non-MVP areas.

Impact:

- If feature gating regresses, users could reach non-MVP content.

Recommendation:

Browser-test non-MVP routes and confirm they show unavailable or coming-soon states.

### L3. Some source content uses repetitive visual objects

Common visual objects are repeated heavily:

- `number path`: 41 rows
- `fish`: 24 rows
- `apple`: 23 rows
- `flower`: 23 rows
- `star`: 23 rows

Impact:

- This is not inherently wrong for Year 1, but asset variety may feel limited.

Recommendation:

For v1.1, add more object variety while keeping cognitive load low.

### L4. Browser navigation was checked statically, not interactively

Route files and major links exist for the MVP flow, but the audit did not click through the application in a browser.

Recommendation:

Run a final smoke test:

1. `/`
2. `/subjects`
3. `/subjects/mathematics`
4. `/mvp/world-map`
5. `/mvp/level/1`
6. `/mvp/question/1`
7. complete a level
8. `/mvp/rewards`
9. `/mvp/parent-dashboard`
10. non-MVP route gating.

## Question Type Audit

Imported approved rows use supported question types only.

| Question Type | Status |
|---|---|
| Multiple Choice | Supported |
| Count and Type | Supported |
| Tap Correct Group | Supported |
| Fill Missing Number | Supported |
| Match Pairs | Supported |
| True or False | Supported |
| Drag and Drop (Future) | Skipped when Review/Future |
| Sorting (Future) | Skipped when Review/Future |
| Puzzle (Future) | Skipped when Review/Future |

No imported Approved row was found using an unsupported question type.

## Duplicate Audit

| Duplicate Area | Result |
|---|---:|
| Duplicate question-text groups | 61 |
| Duplicate final-explanation groups | 19 |
| Duplicate LearnBot-tip groups | 18 |
| Duplicate question IDs | 0 |

Release recommendation: duplicates should be reduced before calling the imported pool release-ready.

## XP Reward Audit

Active production manifest:

- 100 questions found.
- 0 XP reward issues found.
- Expected value: 10 XP per question.

Imported asset pool:

- No explicit XP field found in the asset rows.
- XP appears to be inherited from runtime rules, not governed per imported row.

## Missing Asset Audit

No broken file paths were found because imported rows do not provide real file paths. They provide visual hints such as:

- `visual:number path|type:Fill Missing Number`
- `visual:apple|type:Multiple Choice`
- `visual:star|type:Multiple Choice`

Result:

- No concrete missing asset file can be confirmed from the imported asset rows.
- Asset mapping should be governed before production activation of imported content.

## Navigation Audit

Static route/link inspection found the MVP flow connected through:

- Home Start Learning to `/subjects`
- Mathematics and Forest World links to `/mvp/world-map`
- World Map levels to `/mvp/level/[level]`
- Level intro to `/mvp/question/[level]`
- Lesson exit to `/mvp/world-map`
- Reward and parent dashboard links present

No missing route file was found for the active MVP flow.

## Accessibility Audit

Static accessibility indicators found:

- Focus ring classes appear in navigation and MVP components.
- Lesson shell and drawer include some ARIA attributes.
- Buttons in dev preview include focus states.
- World map includes ARIA markers.

Not verified:

- screen-reader reading order
- keyboard-only completion of every renderer
- focus return after drawer close
- color contrast with automated tooling
- axe or Lighthouse accessibility score.

## Responsive Layout Audit

Static responsive indicators found:

- MVP lesson shell uses `100dvh`.
- Lesson shell uses responsive grid classes.
- Explanation drawer has mobile bottom-sheet and desktop panel behavior.
- Question and world-map components include responsive classes.

Risk areas still needing real-device QA:

- small Android portrait
- small Android landscape
- Match Pairs with multiple pairs
- comparison visuals at narrow widths
- explanation panel overflow.

## Release Verdict

Verdict: **PROCEED WITH CHANGES**

The current active MVP manifest appears stable enough for the existing 100-question Forest pilot. The imported Forest World v1.0 pool is not release-ready as the canonical production content source until the high issues are resolved.

Minimum required before releasing imported Forest World v1.0:

1. Decide whether L03 can ship with 23 approved rows or approve 7 more rows.
2. Replace ambiguous `Curriculum Alignment = Both`.
3. Reduce duplicate explanation and LearnBot-tip content.
4. Add or document XP governance for imported assets.
5. Add an asset registry or verify visual asset mappings.
6. Run browser/device QA for navigation, accessibility, and responsive layout.

## Recommended Next QA Steps

1. Content cleanup pass:
   - reduce repeated stems where possible
   - rewrite generic explanations
   - vary LearnBot tips.

2. Curriculum governance pass:
   - replace `Both` with explicit curriculum mapping.

3. Asset governance pass:
   - create visual object registry
   - map required assets to renderer-safe icons/images.

4. Release smoke test:
   - run app locally
   - click active MVP routes
   - complete Level 1 and Level 10
   - test mobile portrait and landscape.

5. Automated quality pass:
   - run `npm run test:question-assets`
   - run `npm run validate:curriculum`
   - run `npm run lint`
   - run `npx tsc --noEmit --incremental false`
   - run `npm run build`
   - run browser accessibility checks.

