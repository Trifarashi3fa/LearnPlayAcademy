export const forestL01LegacyColumns = [
  "Question ID",
  "Question Pool Version",
  "Status",
  "Subject",
  "Year",
  "World",
  "Level",
  "Topic",
  "Subtopic",
  "Learning Objective",
  "Difficulty",
  "Question Type",
  "Question",
  "Visual Object",
  "Visual Description",
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Correct Answer",
  "Step 1",
  "Step 2",
  "Step 3",
  "Final Explanation",
  "LearnBot Tip",
  "Assessment Eligible",
  "Curriculum Alignment",
  "Estimated Time (Seconds)",
  "Visual Asset Required",
  "Voice Script",
  "Reviewer",
  "Review Status",
  "Review Date",
  "Version Notes",
] as const;

export const forestL01OptionalEnrichmentColumns = [
  "Teaching Notes",
  "Required Assets",
  "Asset Source",
  "Content Owner",
  "QA Notes",
] as const;

export const forestL01AssetColumns = [
  "Question ID",
  "Status",
  "Review Status",
  "Subject",
  "Year",
  "World",
  "Level",
  "Topic",
  "Subtopic",
  "Learning Objective",
  "Difficulty",
  "Question Type",
  "Question",
  "Visual Object",
  "Visual Description",
  "Options",
  "Correct Answer",
  "Step 1",
  "Step 2",
  "Step 3",
  "Final Explanation",
  "LearnBot Tip",
  "Assessment Eligible",
  "Curriculum Alignment",
  "Estimated Time",
  "Voice Script",
  "Teaching Notes",
  "Required Assets",
  "Version Notes",
] as const;

export const englishQuestionTemplateColumns = [
  "Question ID",
  "Subject",
  "Year",
  "World",
  "Level",
  "Topic",
  "Learning Objective",
  "Curriculum Alignment",
  "Cambridge Alignment",
  "Question Type",
  "Question",
  "Instructions",
  "Option A",
  "Option B",
  "Option C",
  "Option D",
  "Correct Answer",
  "Explanation",
  "LearnBot Tip",
  "Voice Script",
  "Visual Type",
  "Visual Description",
  "Difficulty",
  "XP",
  "Status",
  "Version",
  "QA Notes",
] as const;

export type ForestL01LegacyColumn = (typeof forestL01LegacyColumns)[number];
export type ForestL01AssetColumn = (typeof forestL01AssetColumns)[number];
export type EnglishQuestionTemplateColumn = (typeof englishQuestionTemplateColumns)[number];

export const supportedForestL01QuestionTypes = [
  "Multiple Choice",
  "Count & Type",
  "Tap Correct Group",
  "Tap Correct",
  "Fill Missing Number",
  "Fill Missing Letter",
  "Fill Missing Word",
  "Text Input",
  "Match Pairs",
  "True or False",
] as const;

export type ForestL01QuestionType = (typeof supportedForestL01QuestionTypes)[number];

export type ForestL01QuestionAssetRow = Record<ForestL01AssetColumn, string>;

export type QuestionAssetValidationSeverity = "warning" | "error";

export type QuestionAssetValidationIssue = {
  questionId: string;
  rowNumber: number;
  field: ForestL01AssetColumn | ForestL01LegacyColumn | EnglishQuestionTemplateColumn | "Options" | "Source" | "Import";
  severity: QuestionAssetValidationSeverity;
  message: string;
};

export type QuestionAssetRowValidationResult = {
  questionId: string;
  rowNumber: number;
  isValid: boolean;
  isPublishable: boolean;
  errors: QuestionAssetValidationIssue[];
  warnings: QuestionAssetValidationIssue[];
};

export type QuestionAssetValidationSummary = {
  sourceName: string;
  totalRows: number;
  supportedRows: number;
  validRows: number;
  publishableRows: number;
  nonPublishableRows: number;
  warningCount: number;
  errorCount: number;
  issues: QuestionAssetValidationIssue[];
  rowResults: QuestionAssetRowValidationResult[];
};

export type ParsedForestL01QuestionAsset = {
  questionId: string;
  status: string;
  reviewStatus: string;
  subject: string;
  year: number;
  world: string;
  level: number;
  topic: string;
  subtopic: string;
  learningObjective: string;
  difficulty: string;
  questionType: string;
  question: string;
  visualObject: string;
  visualDescription: string;
  options: string[];
  correctAnswer: string;
  steps: [string, string, string];
  finalExplanation: string;
  learnBotTip: string;
  assessmentEligible: boolean;
  curriculumAlignment: string;
  estimatedTime: string;
  voiceScript: string;
  teachingNotes: string;
  requiredAssets: string;
  versionNotes: string;
};
