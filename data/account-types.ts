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

export type YearLevelAvailability = "active" | "coming-soon";

export type YearLevelOption = {
  value: number;
  label: string;
  availability: YearLevelAvailability;
  description: string;
};

export const activeMvpYearLevel = 1;

export const yearLevelOptions: YearLevelOption[] = [
  {
    value: 1,
    label: "Year 1",
    availability: "active",
    description: "Available now: Mathematics Forest World.",
  },
  {
    value: 2,
    label: "Year 2",
    availability: "coming-soon",
    description: "Coming soon. Year 2 curriculum is not active in the MVP.",
  },
  {
    value: 3,
    label: "Year 3",
    availability: "coming-soon",
    description: "Coming soon. Year 3 curriculum is not active in the MVP.",
  },
  {
    value: 4,
    label: "Year 4",
    availability: "coming-soon",
    description: "Coming soon. Year 4 curriculum is not active in the MVP.",
  },
  {
    value: 5,
    label: "Year 5",
    availability: "coming-soon",
    description: "Coming soon. Year 5 curriculum is not active in the MVP.",
  },
  {
    value: 6,
    label: "Year 6",
    availability: "coming-soon",
    description: "Coming soon. Year 6 curriculum is not active in the MVP.",
  },
];

export function isSupportedMvpYearLevel(year: number) {
  return year === activeMvpYearLevel;
}

export function parseSupportedMvpYearLevel(value: unknown) {
  const year = Number(String(value ?? "").trim());
  if (!Number.isInteger(year)) return null;
  if (!isSupportedMvpYearLevel(year)) return null;
  return year;
}

export function getYearLevelOption(year: number) {
  return yearLevelOptions.find((option) => option.value === year) ?? null;
}

export function getYearLevelAvailabilityMessage(year: number) {
  const option = getYearLevelOption(year);
  if (!option) return "This year level is not available in LearnPlay yet.";
  return option.description;
}
