# LearnPlay Question Asset Import Workflow

This workflow converts a local Google Sheets export into LearnPlay question-asset JSON for developer preview.

The app does not connect directly to Google Sheets. Google Sheets remains the authoring source of truth. The exported JSON is only a local review source until content is approved.

## 1. Export the correct tab

CSV exports contain only the tab currently open in Google Sheets.

1. Open the Year 1 master workbook.
2. Click the exact tab, for example `Forest L01`.
3. Choose `File -> Download -> Comma Separated Values (.csv)`.

If you export `Forest L02` while running the `Forest L01` import command, the importer will stop and show a Source mismatch warning. This prevents L02 rows from being saved into the L01 JSON file.

For an XLSX workbook, download the full workbook and pass the exact sheet name. The importer reads only that worksheet.

## 2. Save the exported file

Recommended location:

```powershell
E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\forest-l01.csv
```

For a full Forest World batch, save each exported tab with this exact naming pattern:

```text
content/question-assets/imports/mathematics/year-1/forest-l01.csv
content/question-assets/imports/mathematics/year-1/forest-l02.csv
content/question-assets/imports/mathematics/year-1/forest-l03.csv
content/question-assets/imports/mathematics/year-1/forest-l04.csv
content/question-assets/imports/mathematics/year-1/forest-l05.csv
content/question-assets/imports/mathematics/year-1/forest-l06.csv
content/question-assets/imports/mathematics/year-1/forest-l07.csv
content/question-assets/imports/mathematics/year-1/forest-l08.csv
content/question-assets/imports/mathematics/year-1/forest-l09.csv
content/question-assets/imports/mathematics/year-1/forest-l10.csv
```

## 3. Run the importer

CSV:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\forest-l01.csv" --sheet "Forest L01"
```

Full Forest World batch:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions:year1-forest
```

The batch command automatically discovers `forest-l??.csv`, sorts the files from L01 to L10, and imports one level at a time.

XLSX:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\year-1-master.xlsx" --sheet "Forest L01"
```

## 4. Generated files

- `content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json`
- `generated/question-assets/year-1-forest-l01-import-report.json`

The report shows source rows, imported rows, rejected rows, errors, warnings, duplicate IDs, detected level, and question type distribution.

The batch command creates one imported JSON and one report per level:

```text
content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json
...
content/question-assets/mathematics/year-1/forest-world/forest-l10-imported.json

generated/question-assets/year-1-forest-l01-import-report.json
...
generated/question-assets/year-1-forest-l10-import-report.json
```

It also creates:

```text
generated/question-assets/year-1-forest-batch-import-report.json
```

## 5. Errors vs warnings

Errors block a row from import. Examples:

- missing Question ID
- duplicate Question ID
- missing Question
- unsupported Question Type
- missing Correct Answer
- Multiple Choice has fewer than 2 options
- Correct Answer does not match an option
- Forest L02 rows are imported while requesting Forest L01

Warnings do not block preview. Examples:

- Status is Review
- Review Status is Pending
- Teaching Notes were inferred
- Required Assets were inferred
- Match Pairs is preview-only
- Reviewer or Review Date is blank

## Batch PASS and FAIL rules

`PASS` means the level had:

- matching filename, requested sheet, and Question ID level
- imported rows greater than 0
- zero blocking errors
- zero duplicate IDs

`FAIL` stops the batch immediately. The failing level output JSON is not overwritten with empty or partial content.

The batch stops for:

- source mismatch, such as `forest-l03.csv` containing `FW-Y1-L04-*`
- duplicate Question IDs
- blocking schema errors
- zero imported rows
- malformed CSV
- missing expected L01-L10 files

Warnings are allowed when they are non-blocking:

- Status is Review
- Review Status is Pending
- Teaching Notes were inferred
- Required Assets were inferred
- Match Pairs preview fallback
- repeated visual object warnings

## Rerun one fixed level

When only one tab is fixed, rerun the single-level importer:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\forest-l04.csv" --sheet "Forest L04"
```

Then rerun the full batch before review:

```powershell
E:\Codex\npm.cmd run import:questions:year1-forest
```

## 6. Valid/imported vs publishable

A row can be valid and imported even when it is not publishable.

To be publishable later, content must be Approved, reviewed, complete, and ready for the production manifest. The importer never marks content Approved automatically.

## 7. Teaching Notes and Required Assets

Older sheets do not include Teaching Notes or Required Assets.

The importer creates draft fallback metadata:

- Teaching Notes from Learning Objective, Step 1, Step 2, Step 3, and LearnBot Tip.
- Required Assets from Visual Asset Required, Visual Object, Visual Description, and Question Type.

These fallbacks are warnings. They help preview content but still need human review before approval.

## 8. Upgraded template

Use `docs/content/templates/QUESTION_ASSET_MASTER_TEMPLATE.csv` for future Year 2-Year 6 sheets. It keeps the original 34 columns and adds optional enrichment columns at the end:

- Teaching Notes
- Required Assets
- Asset Source
- Content Owner
- QA Notes

## 9. Test the preview

1. Start the app locally.
2. Open `/dev/question-engine-preview`.
3. Select the imported level, for example `Imported Year 1 Forest L01` through `Imported Year 1 Forest L10`.
4. Review source mismatch, detected level, row counts, errors, warnings, renderer classifications, and random pool status.
5. Use `Generate New Random Session` to verify the selected level can create a 10-question preview session without duplicates.

Fix Google Sheet content when rows are wrong. Fix code only when a valid sheet cannot be read correctly.
