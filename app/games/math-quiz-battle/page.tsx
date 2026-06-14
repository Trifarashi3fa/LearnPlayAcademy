import { QuizGame, type QuizQuestion } from "@/components/QuizGame";

const questions: QuizQuestion[] = [
  {
    question: "5 + 3 = ?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8",
  },
  {
    question: "12 - 4 = ?",
    options: ["6", "7", "8", "10"],
    correctAnswer: "8",
  },
  {
    question: "3 x 4 = ?",
    options: ["7", "10", "12", "14"],
    correctAnswer: "12",
  },
  {
    question: "20 / 5 = ?",
    options: ["2", "4", "5", "10"],
    correctAnswer: "4",
  },
  {
    question: "9 + 6 = ?",
    options: ["13", "14", "15", "16"],
    correctAnswer: "15",
  },
  {
    question: "18 - 9 = ?",
    options: ["8", "9", "10", "11"],
    correctAnswer: "9",
  },
  {
    question: "7 x 2 = ?",
    options: ["12", "14", "16", "18"],
    correctAnswer: "14",
  },
  {
    question: "30 / 3 = ?",
    options: ["7", "9", "10", "12"],
    correctAnswer: "10",
  },
  {
    question: "11 + 8 = ?",
    options: ["17", "18", "19", "20"],
    correctAnswer: "19",
  },
  {
    question: "6 x 6 = ?",
    options: ["30", "32", "36", "42"],
    correctAnswer: "36",
  },
];

export default function MathQuizBattlePage() {
  return (
    <main className="bg-[#fffdf8]">
      <QuizGame
        title="Math Quiz Battle"
        description="Answer quick math questions, collect XP, and see if you can earn a perfect score bonus."
        questions={questions}
        xpRules={{
          correctAnswer: 10,
          completionBonus: 20,
          perfectScoreBonus: 30,
        }}
      />
    </main>
  );
}
