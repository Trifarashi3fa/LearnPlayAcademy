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
  "Version Notes",
] as const;

export type ForestL01AssetColumn = (typeof forestL01AssetColumns)[number];

export const supportedForestL01QuestionTypes = [
  "Multiple Choice",
  "Count & Type",
  "Tap Correct Group",
  "Fill Missing Number",
  "Match Pairs",
  "True or False",
] as const;

export type ForestL01QuestionType = (typeof supportedForestL01QuestionTypes)[number];

export type ForestL01QuestionAssetRow = Record<ForestL01AssetColumn, string>;

export type QuestionAssetValidationSeverity = "warning" | "error";

export type QuestionAssetValidationIssue = {
  questionId: string;
  rowNumber: number;
  field: ForestL01AssetColumn;
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
  versionNotes: string;
};