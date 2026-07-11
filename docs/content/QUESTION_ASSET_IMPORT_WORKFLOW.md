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

## 3. Run the importer

CSV:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\forest-l01.csv" --sheet "Forest L01"
```

XLSX:

```powershell
cd E:\Codex\learnplay-academy
E:\Codex\npm.cmd run import:questions -- --file "E:\Codex\learnplay-academy\content\question-assets\imports\mathematics\year-1\year-1-master.xlsx" --sheet "Forest L01"
```

## 4. Generated files

- `content/question-assets/mathematics/year-1/forest-world/forest-l01-imported.json`
- `generated/question-assets/year-1-forest-l01-import-report.json`

The report shows source rows, imported rows, rejected rows, errors, warnings, duplicate IDs, detected level, and question type distribution.

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
3. Select `Imported Year 1 Forest L01`.
4. Review source mismatch, detected level, row counts, errors, warnings, and random pool status.

Fix Google Sheet content when rows are wrong. Fix code only when a valid sheet cannot be read correctly.