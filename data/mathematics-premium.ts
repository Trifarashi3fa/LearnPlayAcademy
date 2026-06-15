export type LearningWorld = {
  id: string;
  level: string;
  name: string;
  year: string;
  description: string;
  progress: number;
  stars: number;
  locked: boolean;
  imageSrc: string;
  imageAlt: string;
};

export type PremiumActivity = {
  id: string;
  number: number;
  title: string;
  level: number;
  topic: string;
  rating: number;
  progress: number;
  locked: boolean;
  imageSrc: string;
  imageAlt: string;
};

export const premiumLearningWorlds: LearningWorld[] = [
  {
    id: "forest",
    level: "Level 1",
    name: "Forest World",
    year: "Year 1",
    description: "Counting, numbers, shapes, simple addition.",
    progress: 100,
    stars: 300,
    locked: false,
    imageSrc: "/assets/math-premium/world-forest.png",
    imageAlt: "Forest World mathematics learning card",
  },
  {
    id: "mountain",
    level: "Level 2",
    name: "Mountain World",
    year: "Year 2",
    description: "Addition, subtraction, time, money, patterns.",
    progress: 80,
    stars: 240,
    locked: false,
    imageSrc: "/assets/math-premium/world-mountain.png",
    imageAlt: "Mountain World mathematics learning card",
  },
  {
    id: "ocean",
    level: "Level 3",
    name: "Ocean World",
    year: "Year 3-4",
    description: "Multiplication, division, fractions, measurement.",
    progress: 35,
    stars: 110,
    locked: true,
    imageSrc: "/assets/math-premium/world-ocean.png",
    imageAlt: "Ocean World mathematics learning card",
  },
  {
    id: "space",
    level: "Level 4",
    name: "Space World",
    year: "Year 4-5",
    description: "Decimals, geometry, data handling.",
    progress: 15,
    stars: 45,
    locked: true,
    imageSrc: "/assets/math-premium/world-space.png",
    imageAlt: "Space World mathematics learning card",
  },
  {
    id: "galaxy",
    level: "Level 5",
    name: "Galaxy World",
    year: "Year 5-6",
    description: "Problem solving, reasoning, exam readiness.",
    progress: 0,
    stars: 0,
    locked: true,
    imageSrc: "/assets/math-premium/world-galaxy.png",
    imageAlt: "Galaxy World mathematics learning card",
  },
];

export const premiumActivities: PremiumActivity[] = [
  { id: "number-ninja", number: 1, title: "Number Ninja", level: 1, topic: "Numbers", rating: 4, progress: 100, locked: false, imageSrc: "/assets/math-premium/activity-number-ninja.png", imageAlt: "Number Ninja activity image" },
  { id: "addition-quest", number: 2, title: "Addition Quest", level: 1, topic: "Addition", rating: 4, progress: 80, locked: false, imageSrc: "/assets/math-premium/activity-addition-quest.png", imageAlt: "Addition Quest activity image" },
  { id: "subtraction-hero", number: 3, title: "Subtraction Hero", level: 1, topic: "Subtraction", rating: 4, progress: 70, locked: false, imageSrc: "/assets/math-premium/activity-subtraction-hero.png", imageAlt: "Subtraction Hero activity image" },
  { id: "multiplication-kingdom", number: 4, title: "Multiplication Kingdom", level: 2, topic: "Multiplication", rating: 4, progress: 45, locked: false, imageSrc: "/assets/math-premium/activity-multiplication-kingdom.png", imageAlt: "Multiplication Kingdom activity image" },
  { id: "division-dash", number: 5, title: "Division Dash", level: 2, topic: "Division", rating: 4, progress: 35, locked: false, imageSrc: "/assets/math-premium/activity-division-dash.png", imageAlt: "Division Dash activity image" },
  { id: "fraction-builder", number: 6, title: "Fraction Builder", level: 3, topic: "Fractions", rating: 4, progress: 25, locked: false, imageSrc: "/assets/math-premium/activity-fraction-builder.png", imageAlt: "Fraction Builder activity image" },
  { id: "decimal-detective", number: 7, title: "Decimal Detective", level: 3, topic: "Decimals", rating: 4, progress: 20, locked: false, imageSrc: "/assets/math-premium/activity-decimal-detective.png", imageAlt: "Decimal Detective activity image" },
  { id: "geometry-lab", number: 8, title: "Geometry Lab", level: 3, topic: "Geometry", rating: 4, progress: 15, locked: false, imageSrc: "/assets/math-premium/activity-geometry-lab.png", imageAlt: "Geometry Lab activity image" },
  { id: "data-wizard", number: 9, title: "Data Wizard", level: 4, topic: "Data", rating: 4, progress: 10, locked: true, imageSrc: "/assets/math-premium/activity-data-wizard.png", imageAlt: "Data Wizard activity image" },
  { id: "math-detective", number: 10, title: "Math Detective", level: 4, topic: "Reasoning", rating: 4, progress: 10, locked: true, imageSrc: "/assets/math-premium/activity-math-detective.png", imageAlt: "Math Detective activity image" },
  { id: "shape-explorer", number: 11, title: "Shape Explorer", level: 1, topic: "Shapes", rating: 4, progress: 60, locked: false, imageSrc: "/assets/math-premium/activity-shape-explorer.png", imageAlt: "Shape Explorer activity image" },
  { id: "pattern-hunter", number: 12, title: "Pattern Hunter", level: 2, topic: "Patterns", rating: 4, progress: 50, locked: false, imageSrc: "/assets/math-premium/activity-pattern-hunter.png", imageAlt: "Pattern Hunter activity image" },
  { id: "logic-challenge", number: 13, title: "Logic Challenge", level: 4, topic: "Logic", rating: 4, progress: 5, locked: true, imageSrc: "/assets/math-premium/activity-logic-challenge.png", imageAlt: "Logic Challenge activity image" },
  { id: "problem-solver", number: 14, title: "Problem Solver", level: 4, topic: "Problem Solving", rating: 4, progress: 5, locked: true, imageSrc: "/assets/math-premium/activity-problem-solver.png", imageAlt: "Problem Solver activity image" },
  { id: "treasure-calculator", number: 15, title: "Treasure Calculator", level: 4, topic: "Money", rating: 4, progress: 5, locked: true, imageSrc: "/assets/math-premium/activity-treasure-calculator.png", imageAlt: "Treasure Calculator activity image" },
  { id: "time-traveller", number: 16, title: "Time Traveller", level: 2, topic: "Time", rating: 4, progress: 40, locked: false, imageSrc: "/assets/math-premium/activity-time-traveller.png", imageAlt: "Time Traveller activity image" },
  { id: "number-patterns", number: 17, title: "Number Patterns", level: 2, topic: "Patterns", rating: 4, progress: 30, locked: false, imageSrc: "/assets/math-premium/activity-number-patterns.png", imageAlt: "Number Patterns activity image" },
  { id: "math-mission", number: 18, title: "Math Mission", level: 5, topic: "Mixed Skills", rating: 4, progress: 0, locked: true, imageSrc: "/assets/math-premium/activity-math-mission.png", imageAlt: "Math Mission activity image" },
  { id: "math-escape-room", number: 19, title: "Math Escape Room", level: 5, topic: "Strategy", rating: 4, progress: 0, locked: true, imageSrc: "/assets/math-premium/activity-math-escape-room.png", imageAlt: "Math Escape Room activity image" },
  { id: "master-challenge", number: 20, title: "Master Challenge", level: 5, topic: "Challenge", rating: 4, progress: 0, locked: true, imageSrc: "/assets/math-premium/activity-master-challenge.png", imageAlt: "Master Challenge activity image" },
];

export const mathDashboardStats = [
  { label: "Stars", value: "1250", tone: "yellow" },
  { label: "Badges", value: "25", tone: "purple" },
  { label: "Day Streak", value: "18", tone: "orange" },
];

export const missionChecklist = [
  { label: "Complete 2 activities", complete: true },
  { label: "Earn 50 stars", complete: false },
  { label: "Learn a new skill", complete: false },
];

export const premiumBenefits = [
  { title: "Fun & Interactive", description: "Game-based learning" },
  { title: "Smart & Adaptive", description: "Personalized for every child" },
  { title: "Step-by-Step Explanations", description: "Understand every step" },
  { title: "Track Progress", description: "See improvement" },
];

export const activityTopics = [
  "All Topics",
  "Numbers",
  "Addition",
  "Subtraction",
  "Fractions",
  "Geometry",
  "Data",
  "Reasoning",
];