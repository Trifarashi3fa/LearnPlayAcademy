export type AnalyticsSubject = "mathematics" | "english" | "science" | "unknown";
export type AnalyticsWorld = "forest-world" | "unknown";
export type AnalyticsResult = "success" | "failure" | "cancelled" | "blocked";

export type LearningAnalyticsEventMap = {
  auth_register_started: { method: "email" };
  auth_register_completed: { method: "email"; result: AnalyticsResult; reason?: string };
  auth_login_started: { method: "email" };
  auth_login_completed: { method: "email"; result: AnalyticsResult; reason?: string };
  auth_logout_clicked: { location: string };
  auth_password_reset_requested: { method: "email"; result?: AnalyticsResult };

  parent_account_viewed: { hasChildProfile: boolean };
  parent_dashboard_viewed: { subject: AnalyticsSubject; worldId: AnalyticsWorld; completedLevels: number; totalXp: number };
  parent_dashboard_cta_clicked: { cta: string; destination: string };

  child_profile_create_started: { source: string };
  child_profile_update_started: { source: string };
  child_profile_delete_requested: { source: string };
  child_profile_year_unavailable_seen: { year: number };

  subject_selection_viewed: { activeSubjectCount: number; comingSoonSubjectCount: number };
  subject_card_clicked: { subject: AnalyticsSubject; active: boolean; destination?: string };
  subject_unavailable_viewed: { subject: AnalyticsSubject; reason: string };

  world_map_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; completedLevels: number; currentLevel: number | null };
  world_node_clicked: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; state: "completed" | "current" | "unlocked" | "locked" };
  world_locked_level_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; requiredLevel: number | null };

  level_intro_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; nodeType: string; title: string };
  level_started: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionCount: number };
  level_completed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; correctAnswers: number; totalQuestions: number; starsEarned: number; xpEarned: number };

  question_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId: string; questionIndex: number; questionType: string };
  question_answered: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId: string; questionIndex: number; correct: boolean; xpReward: number };
  question_next_clicked: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId: string; questionIndex: number; lastQuestion: boolean };
  explanation_opened: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId: string; source: "answer" | "toggle" };
  explanation_closed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId: string; source: "toggle" | "drawer" };

  learnbot_hint_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId?: string; hintType: string };
  learnbot_tip_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionId?: string; state: string };

  rewards_viewed: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; totalXp: number; totalStars: number };
  badge_awarded: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; badgeName: string };

  learning_session_started: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; questionCount: number };
  learning_session_ended: { subject: AnalyticsSubject; year: number; worldId: AnalyticsWorld; level: number; reason: "completed" | "exit" | "abandoned" };

  app_error: { area: string; message: string; recoverable: boolean };
  analytics_event_validation_failed: { eventName: string; reason: string };
};

export type LearningAnalyticsEventName = keyof LearningAnalyticsEventMap;
export type LearningAnalyticsPayload<TName extends LearningAnalyticsEventName> = LearningAnalyticsEventMap[TName];

export type LearningAnalyticsContext = {
  route?: string;
  sessionId?: string;
  userId?: string;
  childProfileId?: string;
  source?: string;
};

export type LearningAnalyticsEvent<TName extends LearningAnalyticsEventName = LearningAnalyticsEventName> = {
  name: TName;
  payload: LearningAnalyticsPayload<TName>;
  context?: LearningAnalyticsContext;
  timestamp: string;
};

export type LearningAnalyticsCatalogEntry = {
  category: "Authentication" | "Parent" | "Child Profile" | "Subject" | "World" | "Level" | "Question" | "LearnBot" | "Rewards" | "Session" | "Error";
  description: string;
  requiredPayloadKeys: string[];
};

export const learningAnalyticsEventCatalog = {
  auth_register_started: { category: "Authentication", description: "Parent begins email registration.", requiredPayloadKeys: ["method"] },
  auth_register_completed: { category: "Authentication", description: "Parent registration succeeds or fails.", requiredPayloadKeys: ["method", "result"] },
  auth_login_started: { category: "Authentication", description: "Parent begins email login.", requiredPayloadKeys: ["method"] },
  auth_login_completed: { category: "Authentication", description: "Parent login succeeds or fails.", requiredPayloadKeys: ["method", "result"] },
  auth_logout_clicked: { category: "Authentication", description: "Parent clicks logout.", requiredPayloadKeys: ["location"] },
  auth_password_reset_requested: { category: "Authentication", description: "Parent requests password reset email.", requiredPayloadKeys: ["method"] },
  parent_account_viewed: { category: "Parent", description: "Parent account page is viewed.", requiredPayloadKeys: ["hasChildProfile"] },
  parent_dashboard_viewed: { category: "Parent", description: "Parent dashboard is viewed.", requiredPayloadKeys: ["subject", "worldId", "completedLevels", "totalXp"] },
  parent_dashboard_cta_clicked: { category: "Parent", description: "Parent clicks a dashboard CTA.", requiredPayloadKeys: ["cta", "destination"] },
  child_profile_create_started: { category: "Child Profile", description: "Parent submits child setup form.", requiredPayloadKeys: ["source"] },
  child_profile_update_started: { category: "Child Profile", description: "Parent submits child edit form.", requiredPayloadKeys: ["source"] },
  child_profile_delete_requested: { category: "Child Profile", description: "Parent requests child profile deletion.", requiredPayloadKeys: ["source"] },
  child_profile_year_unavailable_seen: { category: "Child Profile", description: "Parent sees unsupported saved year message.", requiredPayloadKeys: ["year"] },
  subject_selection_viewed: { category: "Subject", description: "Subject selection screen is viewed.", requiredPayloadKeys: ["activeSubjectCount", "comingSoonSubjectCount"] },
  subject_card_clicked: { category: "Subject", description: "Subject card is selected.", requiredPayloadKeys: ["subject", "active"] },
  subject_unavailable_viewed: { category: "Subject", description: "Unavailable subject state is shown.", requiredPayloadKeys: ["subject", "reason"] },
  world_map_viewed: { category: "World", description: "Forest World map is viewed.", requiredPayloadKeys: ["subject", "year", "worldId", "completedLevels", "currentLevel"] },
  world_node_clicked: { category: "World", description: "Learner clicks a world-map node.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "state"] },
  world_locked_level_viewed: { category: "World", description: "Learner attempts to view a locked level.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "requiredLevel"] },
  level_intro_viewed: { category: "Level", description: "Level intro card is viewed.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "nodeType", "title"] },
  level_started: { category: "Level", description: "Learner clicks Start Mission.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionCount"] },
  level_completed: { category: "Level", description: "Level completion screen is reached.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "correctAnswers", "totalQuestions", "starsEarned", "xpEarned"] },
  question_viewed: { category: "Question", description: "Question is displayed.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionId", "questionIndex", "questionType"] },
  question_answered: { category: "Question", description: "Learner selects or submits an answer.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionId", "questionIndex", "correct", "xpReward"] },
  question_next_clicked: { category: "Question", description: "Learner moves to next question or completion.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionId", "questionIndex", "lastQuestion"] },
  explanation_opened: { category: "Question", description: "Explanation notes open.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionId", "source"] },
  explanation_closed: { category: "Question", description: "Explanation notes close.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionId", "source"] },
  learnbot_hint_viewed: { category: "LearnBot", description: "LearnBot hint panel is viewed.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "hintType"] },
  learnbot_tip_viewed: { category: "LearnBot", description: "LearnBot tip/coaching state is viewed.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "state"] },
  rewards_viewed: { category: "Rewards", description: "Rewards page or reward summary is viewed.", requiredPayloadKeys: ["subject", "year", "worldId", "totalXp", "totalStars"] },
  badge_awarded: { category: "Rewards", description: "Completion badge is awarded.", requiredPayloadKeys: ["subject", "year", "worldId", "badgeName"] },
  learning_session_started: { category: "Session", description: "Question session starts.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "questionCount"] },
  learning_session_ended: { category: "Session", description: "Question session ends.", requiredPayloadKeys: ["subject", "year", "worldId", "level", "reason"] },
  app_error: { category: "Error", description: "Recoverable or fatal app error occurs.", requiredPayloadKeys: ["area", "message", "recoverable"] },
  analytics_event_validation_failed: { category: "Error", description: "Analytics event validation fails.", requiredPayloadKeys: ["eventName", "reason"] },
} as const satisfies Record<LearningAnalyticsEventName, LearningAnalyticsCatalogEntry>;

export function isLearningAnalyticsEventName(name: string): name is LearningAnalyticsEventName {
  return Object.prototype.hasOwnProperty.call(learningAnalyticsEventCatalog, name);
}

export function validateLearningAnalyticsEvent<TName extends LearningAnalyticsEventName>(event: LearningAnalyticsEvent<TName>) {
  const errors: string[] = [];
  if (!isLearningAnalyticsEventName(event.name)) errors.push(`Unsupported event name: ${event.name}`);
  if (!event.timestamp || Number.isNaN(Date.parse(event.timestamp))) errors.push("timestamp must be a valid ISO date string");
  const catalogEntry = learningAnalyticsEventCatalog[event.name];
  if (catalogEntry) {
    const payload = event.payload as Record<string, unknown>;
    for (const key of catalogEntry.requiredPayloadKeys) {
      if (!(key in payload) || payload[key] === undefined || payload[key] === null || payload[key] === "") {
        errors.push(`Missing required payload field: ${key}`);
      }
    }
  }
  return { valid: errors.length === 0, errors };
}
