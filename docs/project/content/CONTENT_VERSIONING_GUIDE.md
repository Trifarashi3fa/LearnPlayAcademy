# LearnPlay Content Versioning Guide

Version: 1.0  
Audience: content leads, reviewers, import operators, developers, and release managers.

## Purpose

This guide defines how LearnPlay curriculum and question content should be versioned, tracked, changed, released, and rolled back.

Content must be treated like product code: every release needs a version, approval trail, import report, and rollback path.

## Version Types

LearnPlay uses four levels of versioning.

| Version Type | Example | Purpose |
|---|---|---|
| Row Version | `1.0.0` | Tracks changes to one question row. |
| Level Version | `math-y1-forest-l01@1.0.0` | Tracks a level package. |
| World Version | `math-y1-forest@1.0.0` | Tracks all levels in a world. |
| Release Version | `learnplay-mvp@2026.07.12` | Tracks what went live. |

## Semantic Versioning

Use:

```text
MAJOR.MINOR.PATCH
```

### Patch

Use when:

- typo fixed
- explanation improved
- voice script improved
- visual description clarified
- distractor corrected without changing skill.

Example:

```text
1.0.1
```

### Minor

Use when:

- new question variation added
- question type changed
- difficulty changed
- curriculum mapping improved
- assessment eligibility changed.

Example:

```text
1.1.0
```

### Major

Use when:

- level structure changes
- world structure changes
- content package changes scope
- old rows are replaced in bulk
- release is no longer backwards compatible.

Example:

```text
2.0.0
```

## Required Version Fields

Every production-ready row should include:

- Version
- Effective Date
- Version Notes
- Approved By
- Approval Date
- Previous Version ID if applicable
- Change Type
- Change Reason.

## Change Types

| Change Type | Meaning |
|---|---|
| New | New content row. |
| Correction | Fixes wrong or unclear content. |
| Improvement | Improves quality without changing answer. |
| Curriculum Update | Changes curriculum mapping. |
| Renderer Update | Adapts content to a new interaction type. |
| Retirement | Removes or archives content. |
| Replacement | Replaces old content with a new row. |

## Version Control Tab

The Google Sheet `Version_Control` tab should include:

- Version Record ID
- Date
- Subject
- Year
- World
- Level
- Affected Question IDs
- Change Type
- Old Version
- New Version
- Change Summary
- Reason
- Reviewer
- Approved By
- Approval Date
- Import Batch ID
- Release Version
- Rollback Notes.

## Release Log Tab

The Google Sheet `Release_Log` tab should include:

- Release ID
- Release Date
- Release Owner
- Subject
- Year
- World
- Levels Included
- Question Count
- Source Export Filename
- Import Report Filename
- Manifest Filename
- Validation Result
- Known Issues
- Rollback Version
- Final Sign-Off.

## File Naming Standard

Use predictable filenames.

### CSV Exports

```text
forest-l01.csv
forest-l02.csv
```

### Imported JSON

```text
forest-l01-imported.json
forest-l02-imported.json
```

### Import Reports

```text
year-1-forest-l01-import-report.json
year-1-forest-batch-import-report.json
```

### Release Reports

```text
FOREST_WORLD_V1_RELEASE_REPORT.md
PRODUCTION_ASSET_CHECKLIST.md
FOREST_WORLD_CONTENT_IMPROVEMENT_REPORT.md
```

## Content Package Naming

Recommended format:

```text
<subject>-y<year>-<world>-v<version>
```

Examples:

```text
mathematics-y1-forest-world-v1.0.0
english-y1-vocabulary-v1.0.0
science-y1-plants-v1.0.0
life-skills-y1-digital-safety-v1.0.0
```

## Row Version Workflow

1. Author creates row as Version `0.1.0`.
2. Reviewer requests changes.
3. Author updates row to `0.2.0`.
4. Reviewer approves.
5. Approver sets production version `1.0.0`.
6. Import operator exports approved rows.
7. Release manager records release version.

## Editing Approved Rows

Do not silently edit an Approved row.

Instead:

1. Change status to Revision Needed or create a replacement row.
2. Update Version.
3. Fill Version Notes.
4. Send to review.
5. Re-approve.
6. Re-import.

## Hotfix Workflow

Use hotfix when:

- answer is wrong
- explanation is misleading
- unsafe content is present
- broken visual instruction affects learning.

Steps:

1. Mark issue severity.
2. Patch row immediately.
3. Increment patch version.
4. Reviewer checks only affected rows.
5. Approver signs off.
6. Import affected level.
7. Validate.
8. Release.
9. Record rollback note.

## Rollback Workflow

Every release should have a rollback point.

Rollback record should include:

- previous release version
- previous JSON files
- previous manifest
- reason for rollback
- owner
- date.

Rollback should happen if:

- wrong answers reach production
- import produces corrupted content
- renderer cannot handle released content
- child safety issue is found.

## Versioning And Approval

Approval is version-specific.

If a row changes after approval, the approval does not automatically apply to the new version.

Required:

- new review
- new approval date
- updated version notes.

## Versioning And Imports

Every import report should be tied to:

- source file
- imported JSON file
- question count
- skipped row count
- rejected row count
- duplicate IDs
- validation result
- import timestamp.

Do not overwrite import reports without recording a new version or timestamped release note.

## Versioning And Future Subjects

Before activating a new subject, create:

- subject package version
- curriculum map version
- question bank version
- renderer compatibility note
- first release version.

## Minimum Versioning Checklist

Before release:

- all rows have Version
- all rows have Version Notes
- approved rows have Approval Date
- release has Release ID
- import report exists
- validation passed
- rollback version known
- changelog written.

