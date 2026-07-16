# LearnPlay Content Factory Standard

Version: 1.0  
Owner: LearnPlay Academy  
Applies to: Mathematics, English, Science, Life Skills, Bahasa Melayu, General Knowledge, and future subjects.

## Purpose

The LearnPlay Content Factory is the production workflow for creating trusted, child-friendly learning content that can move safely from curriculum planning to Google Sheets, local JSON import, QA, approval, and website release.

The goal is to make every question feel:

- aligned to a real curriculum objective
- age-appropriate
- playable
- visually teachable
- reviewable
- versioned
- safe to release.

## Source Of Truth

Content should move through this order:

1. Curriculum roadmap
2. Curriculum mapping
3. Google Sheet authoring
4. Review and approval
5. Local CSV/XLSX export
6. JSON import
7. Validation report
8. Developer preview
9. Release manifest
10. Production release

Google Sheets are the authoring source of truth. Repository JSON files are the application content source. Production gameplay should not connect directly to Google Sheets.

## Supported Subjects

| Subject | MVP Status | Notes |
|---|---|---|
| Mathematics | Active pilot | Year 1 Forest World first. |
| English | Future | Must use the same governance fields before activation. |
| Science | Future | Must include age-safe factual review. |
| Life Skills | Future | Must include safety, privacy, and parent review where needed. |
| Bahasa Melayu | Future | Must include language and cultural review. |
| General Knowledge | Future | Must include fact-checking and source review. |
| Future Subjects | Future | Must follow this factory before production activation. |

## Factory Roles

| Role | Responsibility |
|---|---|
| Product Owner | Decides MVP scope, release scope, and package type. |
| Curriculum Lead | Maps learning objectives, standards, levels, and progression. |
| Question Author | Writes questions, explanations, tips, visuals, and voice scripts. |
| Reviewer | Checks accuracy, age appropriateness, duplicates, and quality. |
| Approver | Final approval. Current approval owner: Fara. |
| Import Operator | Exports Sheets to CSV/XLSX and runs local import scripts. |
| QA Reviewer | Checks validation reports, preview rendering, and release readiness. |
| Developer | Maintains importers, renderers, manifests, and release tooling. |

## Content Status Model

| Status | Meaning | Can Import? | Can Release? |
|---|---|---:|---:|
| Draft | Author is still writing. | No | No |
| Review | Ready for reviewer feedback. | No for production | No |
| Revision Needed | Needs correction. | No | No |
| Approved | Approved for import and production QA. | Yes | Only if all approval fields pass |
| Imported | Converted into local JSON. | Yes | Not automatically |
| Released | Included in production release. | Yes | Yes |
| Archived | Retired content. | No | No |

Only rows with content status exactly `Approved` should pass production import validation.

## Required Google Sheet Tabs

Every subject workbook should use these tabs or equivalent exports.

| Tab | Purpose |
|---|---|
| Curriculum_Master | Subjects, years, topics, subtopics, objectives, standards. |
| Question_Asset_Master | Playable question rows and teaching assets. |
| World_Mapping | Maps subject, year, world, level, node type, and unlock order. |
| Mini_Games | Mini-game definitions and content status. |
| Assessment_Bank | Assessment questions and scoring metadata. |
| Version_Control | Change history, approvals, and effective dates. |
| Release_Log | What was released, when, by whom, and from which export. |

## Standard Question Asset Fields

Required for all production-ready question rows:

- Question ID
- Status
- Review Status
- Subject
- Year
- World
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
- Assessment Eligible
- Curriculum Alignment
- Estimated Time
- Voice Script
- Version Notes
- Approved By
- Approval Date

Optional fields may be added for advanced renderers, accessibility, locale, image filenames, audio filenames, or parent notes.

## Question ID Standard

Use stable, readable IDs.

Recommended format:

```text
<SUBJECT>-Y<YEAR>-<WORLD>-L<LEVEL>-Q<NUMBER>
```

Examples:

```text
MATH-Y1-FOREST-L01-Q001
ENG-Y1-FOREST-L01-Q001
SCI-Y1-FOREST-L01-Q001
LIFE-Y1-FOREST-L01-Q001
```

Existing Forest IDs such as `FW-Y1-L01-Q001` may remain for the pilot, but future content should move toward subject-explicit IDs.

## Curriculum Mapping Workflow

1. Define subject and year.
2. Define world or module.
3. Define level objective.
4. Map each level to topics and subtopics.
5. Add KSSR alignment where applicable.
6. Add Cambridge alignment where applicable.
7. Add international best-practice note if needed.
8. Confirm age band.
9. Confirm question types allowed for that level.
10. Confirm assessment eligibility.

## KSSR Alignment

For Malaysian curriculum alignment, each content row should identify:

- subject
- year
- topic
- learning standard or learning objective
- skill focus
- mastery expectation.

Do not use broad labels such as `Both` as the only alignment value. Use controlled alignment text that can be reviewed later.

Example:

```text
KSSR Mathematics Year 1 - Numbers up to 10 - Count objects and match numerals
```

## Cambridge Alignment

For Cambridge Primary alignment, each content row should identify:

- subject
- stage
- strand
- objective
- skill focus.

Example:

```text
Cambridge Primary Mathematics Stage 1 - Number - Count and compare small sets
```

## Difficulty Progression

Difficulty should increase through:

1. smaller to larger numbers
2. direct recognition to reasoning
3. single-step to multi-step thinking
4. concrete visuals to abstract symbols
5. familiar objects to mixed contexts
6. practice to review to challenge to boss.

Difficulty labels:

- Easy
- Medium
- Hard
- Challenge

For early primary learners, difficulty should not come from confusing language. It should come from meaningful thinking.

## Content Production Pipeline

### Stage 1: Curriculum Planning

Output:

- subject scope
- year scope
- world/module map
- topic list
- level objectives
- allowed question types.

Gate:

- Product Owner and Curriculum Lead agree the scope is correct.

### Stage 2: Question Writing

Output:

- complete Google Sheet rows
- question text
- options
- correct answer
- teaching explanation
- LearnBot tip
- voice script
- visual prompt.

Gate:

- no placeholder rows
- all required fields filled
- no unsupported question type unless status is Review/Future.

### Stage 3: Variation Pass

Output:

- repeated stems varied
- explanations made row-specific
- tips varied
- visual descriptions varied
- distractors checked.

Gate:

- no high-impact duplicate group remains without a reason.

### Stage 4: Curriculum Review

Output:

- KSSR alignment checked
- Cambridge alignment checked
- age appropriateness checked
- difficulty progression checked.

Gate:

- reviewer marks row as Review Passed or Revision Needed.

### Stage 5: Approval

Output:

- Status = Approved
- Review Status = Approved
- Approved By = Fara
- Approval Date filled
- Version Notes filled.

Gate:

- row can now be imported for production QA.

### Stage 6: Import

Output:

- local JSON
- import report
- skipped rows report
- rejected rows report.

Gate:

- errors = 0
- duplicate IDs = 0
- rejected rows = 0 for Approved rows.

### Stage 7: Developer Preview

Output:

- render check
- interaction check
- answer check
- explanation check
- mobile check.

Gate:

- all supported question types render correctly.

### Stage 8: Release QA

Output:

- release checklist
- content improvement report
- asset checklist
- QA sign-off.

Gate:

- no critical issue
- no high issue without documented approval.

### Stage 9: Production Release

Output:

- release manifest
- changelog
- rollback point.

Gate:

- production build passes
- release owner signs off.

## Subject-Specific Rules

### Mathematics

- Use concrete visuals first.
- Explanations must show mathematical reasoning.
- Use correct symbols: `+`, `-`, `=`, `>`, `<`.
- Avoid repeated option sets across many levels.
- Keep Year 1 numbers age-safe.

### English

- Use clear language objectives.
- Avoid ambiguous grammar examples.
- Include reading level notes.
- Use child-friendly sentence length.
- Provide pronunciation guidance when needed.

### Science

- Fact-check every explanation.
- Avoid unsafe experiments.
- Include observation prompts.
- Keep language concrete.
- Mark any sensitive topic for parent review.

### Life Skills

- Use safe, age-appropriate scenarios.
- Avoid fear-based wording.
- Include parent-friendly review for safety, privacy, money, health, and online topics.
- Do not collect personal information in question text.

### Future Subjects

- Must add a subject-specific review checklist before production activation.

## Google Sheet Workflow

1. Product Owner creates the content package brief.
2. Curriculum Lead fills `Curriculum_Master`.
3. Author writes rows in `Question_Asset_Master`.
4. Author keeps `Status = Draft` until the row is ready.
5. Reviewer checks row quality and sets `Review Status`.
6. Approver sets `Status = Approved` only after review passes.
7. Import Operator exports the approved tab as CSV or XLSX.
8. Import Operator saves the export under `content/question-assets/imports/`.
9. Import Operator runs the local import command.
10. QA Reviewer checks generated import reports and dev preview.

Sheet rules:

- Do not delete historical rows without adding a Version Control note.
- Do not mark future renderer rows as Approved.
- Do not leave placeholder text in Approved rows.
- Do not use color alone to communicate approval state.
- Use filters for Status, Review Status, Subject, Year, World, Level, and Question Type.

## Review Workflow

1. Reviewer filters rows with `Status = Review`.
2. Reviewer checks identity, curriculum, question quality, answer correctness, explanation, LearnBot tip, voice script, and visual prompt.
3. Reviewer writes comments using the review comment format.
4. Author updates rows and increments version if content changed.
5. Reviewer re-checks changed rows.
6. Reviewer sets `Review Status = Approved` or `Revision Needed`.
7. Approver gives final approval only after review is complete.

Review output:

- approved rows
- revision list
- rejected rows
- future rows
- duplicate/content quality notes.

## Import Workflow

1. Export the approved sheet tab as CSV or XLSX.
2. Save it in the expected import folder.
3. Run the local importer.
4. Confirm approved rows imported.
5. Confirm non-approved rows were skipped, not rejected.
6. Confirm rejected Approved rows = 0.
7. Confirm errors = 0.
8. Confirm duplicate IDs = 0.
9. Open generated import report.
10. Test imported questions in dev preview.

Import output:

- imported JSON file
- import report
- skipped row list
- rejected row list
- renderer classification summary.

## Release Workflow

1. Freeze the release candidate content export.
2. Run import and validation.
3. Run duplicate/content improvement audit.
4. Run production asset checklist.
5. Run dev preview smoke test.
6. Confirm approval checklist is complete.
7. Create release version record.
8. Build release manifest.
9. Run production build.
10. Record release notes and rollback version.

Release should stop if:

- any Approved row fails import
- any correct answer is wrong
- any unsupported Approved question type is included
- any P0 asset is missing
- any required approval field is missing
- any critical QA issue is open.

## Release Rule

No content can be released unless:

- Status = Approved
- Review Status = Approved
- Approved By = Fara
- Approval Date filled
- Question is not a placeholder
- Explanation is complete
- LearnBot tip is complete
- Voice script is complete
- Visual description is complete
- World, Level, and Node Type are filled where applicable
- Package Type is correct
- MVP Status is correct
- Import validation passes
- Preview rendering passes

## Definition Of Done

A content package is done when:

1. curriculum map is complete
2. all rows are approved
3. import report has no blocking errors
4. duplicate audit has no unresolved high issues
5. asset checklist has no missing P0 assets
6. developer preview passes
7. release checklist is signed
8. version record is created
9. release note is written.
