export type SubjectId = "mathematics" | "english" | "science" | "bahasa-melayu" | "life-skills" | "general-knowledge";
export type CurriculumSource = "learnplay" | "malaysian-kssr" | "cambridge-primary" | "international-best-practices";
export type PackageType = "mvp-free" | "free" | "premium";
export type MvpStatus = "active-pilot" | "future-mvp" | "post-mvp" | "not-applicable";
export type ApprovalStatus = "draft" | "in-review" | "active" | "rejected" | "archived";
export type NodeType = "Learn" | "Practice" | "Mini Game" | "Review" | "Challenge" | "Boss";
export type WorldId = string;

export type VisualMetadata = {
  visualType: "counting" | "addition" | "subtraction" | "comparison" | "matching" | "number-sequence" | "number-matching" | "none";
  object: string;
  objects: string[];
  groups: number[];
  total: number | null;
  operation: "count" | "add" | "subtract" | "compare" | "match" | "sequence" | "identify";
  equation: string | null;
  startingAmount: number | null;
  removedAmount: number | null;
  context: string;
  assetHint: string;
  reviewStatus: "ready" | "needs-review";
};

export type CurriculumTopic = {
  curriculumTopicId: string;
  subject: SubjectId;
  year: number;
  title: string;
  subtopics: string[];
  curriculumSources: CurriculumSource[];
  learningObjectives: string[];
  status: ApprovalStatus;
  version: string;
  effectiveDate: string | null;
};

/**
 * Future active-content rule:
 * status = active; approvedBy = Fara; approvalDate is filled; question is not
 * placeholder text; explanation is complete; worldId, level, and nodeType are
 * filled; and packageType plus mvpStatus match the approved release scope.
 * Phase 4 creates governed copies only. Runtime loading and validation come later.
 */
export type QuestionBankItem = {
  questionId: string;
  legacyId: string;
  curriculumTopicId: string;
  subject: SubjectId;
  year: number;
  curriculumSource: CurriculumSource[];
  topic: string;
  subtopic: string;
  worldId: WorldId;
  level: number;
  nodeType: NodeType;
  packageType: PackageType;
  mvpStatus: MvpStatus;
  status: ApprovalStatus;
  approvedBy: string | null;
  approvalDate: string | null;
  version: string;
  effectiveDate: string | null;
  difficulty: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
  visualMetadata: VisualMetadata;
};

export type WorldLevelMapping = { level: number; title: string; nodeType: NodeType; curriculumTopicIds: string[]; questionCount: number; miniGameIds: string[]; unlocksAfterLevel: number | null };
export type WorldMapping = { mappingId: string; subject: SubjectId; year: number; worldId: WorldId; worldName: string; bossName: string; completionBadge: string; levels: WorldLevelMapping[]; packageType: PackageType; mvpStatus: MvpStatus; status: ApprovalStatus; version: string; effectiveDate: string | null };
export type MiniGameDefinition = { miniGameId: string; title: string; subject: SubjectId; year: number; worldId: WorldId; level: number; curriculumTopicIds: string[]; instructions: string[]; xpReward: number; packageType: PackageType; mvpStatus: MvpStatus; status: ApprovalStatus; approvedBy: string | null; approvalDate: string | null; version: string };
export type CurriculumVersionRecord = { versionId: string; packageName: string; version: string; subject: SubjectId; years: number[]; status: ApprovalStatus; approvedBy: string | null; approvalDate: string | null; effectiveDate: string | null; changeSummary: string; changedRecordIds: string[]; supersedesVersionId: string | null };