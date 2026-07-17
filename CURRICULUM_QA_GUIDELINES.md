# LearnPlay Curriculum QA Guidelines

## Purpose

The Curriculum QA system protects LearnPlay from publishing questions before they are educationally reviewed. It applies to Mathematics, English, Science, Life Skills, Bahasa Melayu, AI Literacy, and future subjects.

The system is a review layer. It does not activate gameplay and it does not replace human curriculum approval.

## Standard QA Statuses

Use only these statuses:

- Draft
- Review
- Needs Revision
- Approved
- Rejected
- Archived

## Status Meanings

**Draft**

The question is being written. It should not be imported into production gameplay.

**Review**

The question is ready for educational review. It can be shown in developer QA tools but must not be production-active.

**Needs Revision**

The reviewer found issues. The author should revise before resubmitting.

**Approved**

The question passed review and may enter an approved import pipeline if all validation checks pass.

**Rejected**

The question should not be used in the current content package.

**Archived**

The question is kept for history but removed from active authoring and release workflows.

## Educational QA Checklist

Every question should be reviewed against:

- Curriculum alignment (KSSR)
- Cambridge alignment, where applicable
- Age appropriateness
- Reading level
- Vocabulary suitability
- Grammar accuracy
- Correct answer accuracy
- Distractor quality
- Explanation quality
- LearnBot tip quality
- Voice script clarity
- Visual description clarity
- Duplicate detection
- Difficulty consistency
- Accessibility considerations

## Reviewer Responsibilities

Reviewers should confirm:

- The question teaches one clear learning objective.
- The prompt is short and child-friendly.
- The correct answer is accurate.
- Distractors are fair and not accidentally correct.
- The explanation teaches, not just confirms.
- LearnBot gives a useful one-sentence strategy.
- Voice narration can be spoken naturally.
- Visual descriptions are clear enough for artwork or renderer output.
- The question type is supported by the current engine.
- The question is suitable for Year 1 learners.

## Automated QA Signals

The automated QA layer detects:

- Unsupported status values
- Duplicate question text
- Duplicate explanations
- Duplicate LearnBot tips
- Repeated distractors
- Missing curriculum alignment
- Missing learning objectives
- Missing explanations
- Missing visual descriptions
- Missing voice scripts
- Invalid question-type combinations

Warnings do not fail builds by default. They are review signals.

## Approval Criteria

A question should only be marked Approved when:

- Status is Approved.
- Review Status is Approved where that field exists.
- Curriculum alignment is filled.
- Learning objective is filled.
- Question is not a placeholder.
- Correct answer is verified.
- Explanation is complete.
- LearnBot tip is useful.
- Voice script is clear.
- Visual description is clear.
- Question type is supported.
- QA notes are resolved.

## Known Limitations

- Automated checks cannot judge all educational quality.
- KSSR and Cambridge alignment still require human review.
- Duplicate detection is text-based and may flag intentional repeated patterns.
- Repeated distractor detection can flag common beginner words.
- The QA dashboard is developer-only and not a full editorial CMS.

## Future Enhancements

- Reviewer names and review dates per row.
- Subject-specific QA rules.
- Exportable reviewer sign-off reports.
- Severity configuration for warnings.
- Content history and version comparison.
- Integration with a future authoring dashboard.
