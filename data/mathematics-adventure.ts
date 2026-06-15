export type MathGame = {
  id: string;
  title: string;
  description: string;
  yearLabel: string;
  badge: string;
  difficulty: string;
  rating: number;
  accentClass: string;
  thumbnailClass: string;
  coverLabel: string;
  coverTitle: string;
  href: string;
};

export type MathLevel = {
  level: number;
  label: string;
  description: string;
  stars: number;
  progress: number;
  reached: boolean;
  colorClass: string;
};

export type RegisteredGameProgress = {
  gameId: string;
  currentLevel: string;
  progressStatus: string;
  progress: number;
};

export const mathGames: MathGame[] = [
  {
    id: "number-hunt",
    title: "Number Hunt",
    description: "Find hidden numbers and complete number missions.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    difficulty: "Very Easy",
    rating: 4,
    accentClass: "bg-[#0B63F6]",
    thumbnailClass: "from-[#BEE8FF] via-[#EAF6FF] to-[#FFF3C4]",
    coverLabel: "STAR",
    coverTitle: "Treasure Number Hunt",
    href: "/games/demo/number-hunt",
  },
  {
    id: "add-it-up",
    title: "Add It Up",
    description: "Solve fun additions and earn stars.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    difficulty: "Easy",
    rating: 5,
    accentClass: "bg-[#22C55E]",
    thumbnailClass: "from-[#DCFCE7] via-[#EAF6FF] to-[#FFE7B8]",
    coverLabel: "APPLE",
    coverTitle: "Fruit Addition",
    href: "/games/demo/add-it-up",
  },
  {
    id: "subtraction-splash",
    title: "Subtraction Splash",
    description: "Splash away numbers and practice subtraction.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    difficulty: "Easy",
    rating: 4,
    accentClass: "bg-[#14B8A6]",
    thumbnailClass: "from-[#A7F3D0] via-[#BAE6FD] to-[#EAF6FF]",
    coverLabel: "FISH",
    coverTitle: "Ocean Splash",
    href: "/games/demo/subtraction-splash",
  },
  {
    id: "shape-match",
    title: "Shape Match",
    description: "Match shapes and discover patterns.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    difficulty: "Very Easy",
    rating: 4,
    accentClass: "bg-[#8B5CF6]",
    thumbnailClass: "from-[#EDE9FE] via-[#FCE7F3] to-[#EAF6FF]",
    coverLabel: "SHAPE",
    coverTitle: "Shape Explorer",
    href: "/games/demo/shape-match",
  },
  {
    id: "count-collect",
    title: "Count & Collect",
    description: "Count objects and collect rewards.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    difficulty: "Medium",
    rating: 5,
    accentClass: "bg-[#FF9F1C]",
    thumbnailClass: "from-[#FFE8B5] via-[#FFF3C4] to-[#EAF6FF]",
    coverLabel: "COINS",
    coverTitle: "Reward Collector",
    href: "/games/demo/count-and-collect",
  },
];

export const mathLevels: MathLevel[] = [
  {
    level: 1,
    label: "Very Easy",
    description: "Counting, number names, simple shapes, and first math wins.",
    stars: 3,
    progress: 100,
    reached: true,
    colorClass: "bg-[#22C55E]",
  },
  {
    level: 2,
    label: "Easy",
    description: "Addition, subtraction, number patterns, and friendly word problems.",
    stars: 3,
    progress: 65,
    reached: true,
    colorClass: "bg-[#0B63F6]",
  },
  {
    level: 3,
    label: "Medium",
    description: "Multiplication, division, measurement, and shape reasoning.",
    stars: 2,
    progress: 35,
    reached: true,
    colorClass: "bg-[#8B5CF6]",
  },
  {
    level: 4,
    label: "Hard",
    description: "Fractions, decimals, data, and multi-step thinking.",
    stars: 0,
    progress: 0,
    reached: false,
    colorClass: "bg-[#EF4444]",
  },
  {
    level: 5,
    label: "Challenge",
    description: "Brain-boosting puzzles for confident problem solvers.",
    stars: 0,
    progress: 0,
    reached: false,
    colorClass: "bg-[#FF4FB8]",
  },
];

export const registeredGameProgress: RegisteredGameProgress[] = [
  {
    gameId: "number-hunt",
    currentLevel: "Level 2",
    progressStatus: "65% complete",
    progress: 65,
  },
  {
    gameId: "add-it-up",
    currentLevel: "Level 3",
    progressStatus: "Ready for the next round",
    progress: 72,
  },
  {
    gameId: "subtraction-splash",
    currentLevel: "Level 2",
    progressStatus: "4 lessons completed",
    progress: 58,
  },
  {
    gameId: "shape-match",
    currentLevel: "Level 1",
    progressStatus: "New challenge available",
    progress: 30,
  },
  {
    gameId: "count-collect",
    currentLevel: "Level 1",
    progressStatus: "Practice started",
    progress: 22,
  },
];

export const guestHowItWorks = [
  {
    title: "Choose a game",
    description: "Start with a short Year 1 to Year 3 demo activity.",
  },
  {
    title: "Answer and learn",
    description: "Children see simple choices, friendly feedback, and confidence-building practice.",
  },
  {
    title: "Grow with levels",
    description: "Registered learners unlock more levels, rewards, progress, and explanations.",
  },
];

export const recentAchievements = [
  "Addition Master",
  "Streak 5 Days",
  "Shape Explorer",
];

export const mathBadges = [
  "Number Star",
  "Addition Master",
  "Shape Explorer",
  "Goal Getter",
];

export const registeredQuestionPreview = {
  question: "Alex has 7 stars and earns 5 more. How many stars does Alex have now?",
  answers: ["10", "11", "12", "13"],
  correctAnswer: "12",
  difficulty: "Level 2: Easy",
  starsEarned: 3,
  progressUpdate: "Daily goal progress: 70%",
  explanation:
    "Start with 7 stars, then count 5 more: 8, 9, 10, 11, 12. So 7 + 5 = 12.",
};