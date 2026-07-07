export type ParentProfile = {
  id: string;
  email: string | null;
  displayName: string | null;
};

export type ChildAvatar = "learnbot" | "explorer" | "star";

export type ChildProfile = {
  id: string;
  parentId: string;
  nickname: string;
  yearLevel: number;
  avatar: ChildAvatar;
  selected: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChildProgressSummary = {
  currentWorld: string;
  currentLevel: number;
  completedLevels: number[];
  totalXp: number;
  totalStars: number;
  badges: string[];
  lastPlayedAt: string | null;
  progressPercent: number;
};

export const childAvatarOptions: Array<{ value: ChildAvatar; label: string; description: string }> = [
  { value: "learnbot", label: "LearnBot", description: "Friendly robot helper" },
  { value: "explorer", label: "Explorer", description: "Adventure learner" },
  { value: "star", label: "Star", description: "Bright learner" },
];

export const yearLevelOptions = [1, 2, 3, 4, 5, 6];