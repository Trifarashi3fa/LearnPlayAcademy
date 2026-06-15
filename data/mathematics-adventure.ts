export type MathGame = {
  id: string;
  title: string;
  description: string;
  yearLabel: string;
  badge: string;
  accentClass: string;
  thumbnailClass: string;
  symbols: string[];
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
    description: "Find hidden numbers, compare values, and build early number confidence.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    accentClass: "bg-[#0B63F6]",
    thumbnailClass: "from-[#EAF6FF] via-[#D7F0FF] to-[#FFF3C4]",
    symbols: ["1", "2", "3", "+"],
    href: "/games/demo/number-hunt",
  },
  {
    id: "add-it-up",
    title: "Add It Up",
    description: "Solve bright addition rounds and collect stars for quick thinking.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    accentClass: "bg-[#22C55E]",
    thumbnailClass: "from-[#ECFDF5] via-[#D9F99D] to-[#EAF6FF]",
    symbols: ["+", "5", "8", "="],
    href: "/games/demo/add-it-up",
  },
  {
    id: "subtraction-splash",
    title: "Subtraction Splash",
    description: "Splash away numbers and practice taking away with friendly feedback.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    accentClass: "bg-[#14B8A6]",
    thumbnailClass: "from-[#CCFBF1] via-[#EAF6FF] to-[#DBEAFE]",
    symbols: ["-", "9", "4", "="],
    href: "/games/demo/subtraction-splash",
  },
  {
    id: "shape-match",
    title: "Shape Match",
    description: "Match shapes, names, and patterns through a colourful visual challenge.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    accentClass: "bg-[#8B5CF6]",
    thumbnailClass: "from-[#F3E8FF] via-[#EDE9FE] to-[#EAF6FF]",
    symbols: ["Ã¢â€“Â³", "Ã¢â€“Â¡", "Ã¢â€”â€¹", "="],
    href: "/games/demo/shape-match",
  },
  {
    id: "count-collect",
    title: "Count & Collect",
    description: "Count coins, stars, and objects while moving through playful math scenes.",
    yearLabel: "Year 1 - 3",
    badge: "DEMO",
    accentClass: "bg-[#FF9F1C]",
    thumbnailClass: "from-[#FFF7ED] via-[#FFE8B5] to-[#EAF6FF]",
    symbols: ["10", "Ã¢Ëœâ€¦", "=", "+"],
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