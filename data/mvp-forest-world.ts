import forestConfigJson from "@/content/math/forest-world/forest-world-config.json";
import level1 from "@/content/math/forest-world/level-1.json";
import level2 from "@/content/math/forest-world/level-2.json";
import level3 from "@/content/math/forest-world/level-3.json";
import level4 from "@/content/math/forest-world/level-4.json";
import level5 from "@/content/math/forest-world/level-5.json";
import level6 from "@/content/math/forest-world/level-6.json";
import level7 from "@/content/math/forest-world/level-7.json";
import level8 from "@/content/math/forest-world/level-8.json";
import level9 from "@/content/math/forest-world/level-9.json";
import level10 from "@/content/math/forest-world/level-10.json";

export type MvpQuestion = {
  id: string;
  level: number;
  nodeType: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
};

export type MvpLevel = {
  level: number;
  nodeType: string;
  title: string;
  description: string;
  questions: MvpQuestion[];
};

export type MvpSubject = {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
  description: string;
};

export const forestWorldConfig = forestConfigJson;

export const mvpSubjects: MvpSubject[] = [
  {
    id: "mathematics",
    title: "Mathematics",
    icon: "123",
    enabled: true,
    description: "Play Forest World and master early math skills.",
  },
  {
    id: "english",
    title: "English",
    icon: "ABC",
    enabled: false,
    description: "Reading, spelling, and word games will join the MVP later.",
  },
  {
    id: "science",
    title: "Science",
    icon: "SCI",
    enabled: false,
    description: "Discovery questions and experiments will join the MVP later.",
  },
  {
    id: "bahasa-melayu",
    title: "Bahasa Melayu",
    icon: "BM",
    enabled: false,
    description: "Vocabulary and sentence practice will join the MVP later.",
  },
  {
    id: "life-skills",
    title: "Life Skills",
    icon: "LIFE",
    enabled: false,
    description: "Safety, emotions, habits, and money skills will join later.",
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    icon: "GK",
    enabled: false,
    description: "Fun mixed knowledge quizzes will join the MVP later.",
  },
];

export const forestLevels: MvpLevel[] = [
  {
    level: 1,
    nodeType: "Learn",
    title: "Numbers 1-10",
    description: "Meet numbers, count forward, and learn first number patterns.",
    questions: level1 as MvpQuestion[],
  },
  {
    level: 2,
    nodeType: "Practice",
    title: "Counting Objects",
    description: "Practice counting everyday objects and comparing groups.",
    questions: level2 as MvpQuestion[],
  },
  {
    level: 3,
    nodeType: "Mini Game",
    title: "Number Matching",
    description: "Match numbers, words, and small groups in a quick game.",
    questions: level3 as MvpQuestion[],
  },
  {
    level: 4,
    nodeType: "Learn",
    title: "Simple Addition",
    description: "Learn how adding puts groups together.",
    questions: level4 as MvpQuestion[],
  },
  {
    level: 5,
    nodeType: "Practice",
    title: "Addition Practice",
    description: "Use addition in small story problems.",
    questions: level5 as MvpQuestion[],
  },
  {
    level: 6,
    nodeType: "Mini Game",
    title: "Addition Mini Game",
    description: "Collect rewards while solving addition missions.",
    questions: level6 as MvpQuestion[],
  },
  {
    level: 7,
    nodeType: "Learn",
    title: "Simple Subtraction",
    description: "Learn how subtraction shows what is left.",
    questions: level7 as MvpQuestion[],
  },
  {
    level: 8,
    nodeType: "Review",
    title: "Review Numbers and Operations",
    description: "Review numbers, addition, and subtraction.",
    questions: level8 as MvpQuestion[],
  },
  {
    level: 9,
    nodeType: "Challenge",
    title: "Mixed Challenge",
    description: "Solve mixed number, addition, and subtraction challenges.",
    questions: level9 as MvpQuestion[],
  },
  {
    level: 10,
    nodeType: "Boss",
    title: "Forest Guardian Boss Quiz",
    description: "Complete the Forest Guardian boss quiz and earn a badge.",
    questions: level10 as MvpQuestion[],
  },
];

export function getForestLevel(level: number) {
  return forestLevels.find((item) => item.level === level);
}

export function getMasteryLabel(accuracy: number) {
  if (accuracy >= 96) return "Master";
  if (accuracy >= 81) return "Advanced";
  if (accuracy >= 61) return "Proficient";
  if (accuracy >= 41) return "Progressing";
  if (accuracy >= 21) return "Developing";
  return "Beginner";
}

export function getLevelBonusXp(level: number) {
  return level === 10 ? 250 : 100;
}