export type SubjectTone = "blue" | "yellow" | "green" | "pink" | "purple";
export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type SubjectTopic = {
  name: string;
  level: DifficultyLevel;
  games: number;
  quizzes: number;
  assessments: number;
  gameTitle: string;
  quizTitle: string;
  assessmentTitle: string;
  gameHref?: string;
};

export type SubjectPathway = {
  slug: string;
  title: string;
  description: string;
  icon: string;
  tone: SubjectTone;
  topics: SubjectTopic[];
};

function topic(
  name: string,
  level: DifficultyLevel,
  gameTitle: string,
  quizTitle: string,
  assessmentTitle: string,
  gameHref?: string,
): SubjectTopic {
  return {
    name,
    level,
    games: 1,
    quizzes: 1,
    assessments: 1,
    gameTitle,
    quizTitle,
    assessmentTitle,
    gameHref,
  };
}

export const subjectPathways: SubjectPathway[] = [
  {
    slug: "mathematics",
    title: "Mathematics",
    description:
      "Develop number sense, problem-solving skills, patterns, measurement, and logical reasoning through interactive activities.",
    icon: "123",
    tone: "yellow",
    topics: [
      topic("Number Skills", "Beginner", "Math Quiz Battle", "Number Skills Quiz", "Number Skills Assessment", "/games/math-quiz-battle"),
      topic("Addition", "Beginner", "Addition Adventure", "Addition Quiz", "Addition Assessment"),
      topic("Subtraction", "Beginner", "Subtraction Sprint", "Subtraction Quiz", "Subtraction Assessment"),
      topic("Shapes", "Beginner", "Shape Finder", "Shapes Quiz", "Shapes Assessment"),
      topic("Multiplication", "Intermediate", "Times Table Quest", "Multiplication Quiz", "Multiplication Assessment"),
      topic("Division", "Intermediate", "Division Dash", "Division Quiz", "Division Assessment"),
      topic("Fractions", "Intermediate", "Fraction Builder", "Fractions Quiz", "Fractions Assessment"),
      topic("Measurement", "Intermediate", "Measure Mission", "Measurement Quiz", "Measurement Assessment"),
      topic("Decimals", "Advanced", "Decimal Detective", "Decimals Quiz", "Decimals Assessment"),
      topic("Word Problems", "Advanced", "Problem Solver", "Word Problems Quiz", "Word Problems Assessment"),
      topic("Geometry", "Advanced", "Geometry Lab", "Geometry Quiz", "Geometry Assessment"),
      topic("Data Handling", "Advanced", "Data Explorer", "Data Handling Quiz", "Data Handling Assessment"),
    ],
  },
  {
    slug: "english",
    title: "English",
    description:
      "Build reading comprehension, vocabulary, grammar, spelling, and communication skills through engaging exercises.",
    icon: "ABC",
    tone: "green",
    topics: [
      topic("Vocabulary", "Beginner", "Word Match", "Vocabulary Quiz", "Vocabulary Assessment"),
      topic("Spelling", "Beginner", "English Word Builder", "Spelling Quiz", "Spelling Assessment", "/games/word-builder"),
      topic("Simple Sentences", "Beginner", "Sentence Builder", "Simple Sentences Quiz", "Simple Sentences Assessment"),
      topic("Grammar", "Intermediate", "Grammar Garden", "Grammar Quiz", "Grammar Assessment"),
      topic("Reading Comprehension", "Intermediate", "Reading Quest", "Reading Comprehension Quiz", "Reading Comprehension Assessment"),
      topic("Word Builder", "Intermediate", "English Word Builder", "Word Builder Quiz", "Word Builder Assessment", "/games/word-builder"),
      topic("Creative Writing", "Advanced", "Story Studio", "Creative Writing Quiz", "Creative Writing Assessment"),
      topic("Story Understanding", "Advanced", "Story Detective", "Story Understanding Quiz", "Story Understanding Assessment"),
      topic("Communication Skills", "Advanced", "Communication Quest", "Communication Skills Quiz", "Communication Skills Assessment"),
    ],
  },
  {
    slug: "science",
    title: "Science",
    description:
      "Explore living things, Earth science, experiments, space, and scientific thinking through discovery-based learning.",
    icon: "SCI",
    tone: "blue",
    topics: [
      topic("Animals", "Beginner", "Science Explorer", "Animals Quiz", "Animals Assessment", "/games/science-explorer"),
      topic("Plants", "Beginner", "Plant Growth Challenge", "Plants Quiz", "Plants Assessment", "/science"),
      topic("Human Body", "Beginner", "Body Systems Explorer", "Human Body Quiz", "Human Body Assessment", "/science"),
      topic("Weather", "Intermediate", "Weather Watch", "Weather Quiz", "Weather Assessment", "/science"),
      topic("Materials", "Intermediate", "Materials Lab", "Materials Quiz", "Materials Assessment", "/science"),
      topic("Forces", "Intermediate", "Force Finder", "Forces Quiz", "Forces Assessment", "/science"),
      topic("Space", "Advanced", "Space Explorer", "Space Quiz", "Space Assessment", "/science"),
      topic("Energy", "Advanced", "Energy Lab", "Energy Quiz", "Energy Assessment", "/science"),
      topic("Experiments", "Advanced", "Experiment Builder", "Experiments Quiz", "Experiments Assessment", "/science"),
    ],
  },
  {
    slug: "bahasa-melayu",
    title: "Bahasa Melayu",
    description:
      "Improve vocabulary, reading, comprehension, grammar, and communication skills aligned with primary learning needs.",
    icon: "BM",
    tone: "purple",
    topics: [
      topic("Perkataan", "Beginner", "Perkataan Padanan", "Perkataan Quiz", "Perkataan Assessment"),
      topic("Ejaan", "Beginner", "Ejaan Builder", "Ejaan Quiz", "Ejaan Assessment"),
      topic("Ayat Mudah", "Beginner", "Ayat Mudah Builder", "Ayat Mudah Quiz", "Ayat Mudah Assessment"),
      topic("Tatabahasa", "Intermediate", "Tatabahasa Quest", "Tatabahasa Quiz", "Tatabahasa Assessment"),
      topic("Kefahaman", "Intermediate", "Kefahaman Explorer", "Kefahaman Quiz", "Kefahaman Assessment"),
      topic("Perbendaharaan Kata", "Intermediate", "Kata Builder", "Perbendaharaan Kata Quiz", "Perbendaharaan Kata Assessment"),
      topic("Penulisan Kreatif", "Advanced", "Studio Penulisan", "Penulisan Kreatif Quiz", "Penulisan Kreatif Assessment"),
      topic("Pemahaman Cerita", "Advanced", "Detektif Cerita", "Pemahaman Cerita Quiz", "Pemahaman Cerita Assessment"),
      topic("Komunikasi", "Advanced", "Misi Komunikasi", "Komunikasi Quiz", "Komunikasi Assessment"),
    ],
  },
  {
    slug: "critical-thinking",
    title: "Critical Thinking",
    description:
      "Strengthen logic, memory, reasoning, creativity, and problem-solving skills through puzzles and challenges.",
    icon: "WHY",
    tone: "pink",
    topics: [
      topic("Patterns", "Beginner", "Pattern Finder", "Patterns Quiz", "Patterns Assessment"),
      topic("Memory", "Beginner", "Memory Match", "Memory Quiz", "Memory Assessment"),
      topic("Sorting", "Beginner", "Sorting Sprint", "Sorting Quiz", "Sorting Assessment"),
      topic("Logic Puzzles", "Intermediate", "Logic Lab", "Logic Puzzles Quiz", "Logic Puzzles Assessment"),
      topic("Cause and Effect", "Intermediate", "Cause and Effect Quest", "Cause and Effect Quiz", "Cause and Effect Assessment"),
      topic("Problem Solving", "Intermediate", "Problem Solver", "Problem Solving Quiz", "Problem Solving Assessment"),
      topic("Strategy", "Advanced", "Strategy Quest", "Strategy Quiz", "Strategy Assessment"),
      topic("Reasoning", "Advanced", "Reasoning Lab", "Reasoning Quiz", "Reasoning Assessment"),
      topic("Brain Challenges", "Advanced", "Brain Challenge Arena", "Brain Challenges Quiz", "Brain Challenges Assessment"),
    ],
  },
  {
    slug: "life-skills",
    title: "Life Skills",
    description:
      "Develop confidence, responsibility, communication, emotional awareness, safety knowledge, and financial literacy.",
    icon: "LIFE",
    tone: "purple",
    topics: [
      topic("Healthy Habits", "Beginner", "Healthy Hero", "Healthy Habits Quiz", "Healthy Habits Assessment", "/life-skills/healthy-habits"),
      topic("Feelings", "Beginner", "Emotion Explorer", "Feelings Quiz", "Feelings Assessment", "/life-skills/emotional-intelligence"),
      topic("Safety Basics", "Beginner", "Safety Starter", "Safety Basics Quiz", "Safety Basics Assessment", "/life-skills/digital-safety"),
      topic("Digital Safety", "Intermediate", "Internet Detective", "Digital Safety Quiz", "Digital Safety Assessment", "/life-skills/digital-safety"),
      topic("Money Basics", "Intermediate", "Smart Shopper", "Money Basics Quiz", "Money Basics Assessment", "/life-skills/financial-literacy"),
      topic("Communication", "Intermediate", "Friendship Challenge", "Communication Quiz", "Communication Assessment", "/life-skills/emotional-intelligence"),
      topic("AI Literacy", "Advanced", "Prompt Wizard", "AI Literacy Quiz", "AI Literacy Assessment", "/life-skills/ai-literacy"),
      topic("Decision Making", "Advanced", "Mission Planner", "Decision Making Quiz", "Decision Making Assessment", "/life-skills/problem-solving"),
      topic("Responsibility", "Advanced", "Responsibility Quest", "Responsibility Quiz", "Responsibility Assessment", "/life-skills"),
    ],
  },
];

export const difficultyLevels: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];

export function getSubjectPathway(slug: string) {
  return subjectPathways.find((subject) => subject.slug === slug);
}

export function getSubjectHref(slug: string) {
  return `/subjects/${slug}`;
}