export type MathDemoQuestion = {
  id: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  difficulty: string;
};

export type MathDemoGame = {
  id: string;
  title: string;
  topic: string;
  description: string;
  yearLabel: string;
  howToPlay: string[];
  accentClass: string;
  questions: MathDemoQuestion[];
};

export const mathDemoGames: MathDemoGame[] = [
  {
    id: "number-hunt",
    title: "Number Hunt",
    topic: "Number recognition",
    description: "Find missing numbers, compare values, and spot number patterns.",
    yearLabel: "Year 1 - 3",
    accentClass: "bg-[#0B63F6]",
    howToPlay: [
      "Look carefully at the number clue.",
      "Choose one answer from four choices.",
      "Use the hint if you need a little help.",
      "Check the explanation after each answer.",
    ],
    questions: [
      {
        id: "number-hunt-1",
        question: "What number comes after 14?",
        choices: ["12", "13", "15", "17"],
        correctAnswer: "15",
        hint: "Count one step forward from 14.",
        explanation: "When we count forward, 14 is followed by 15.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "number-hunt-2",
        question: "Which number is bigger?",
        choices: ["23", "32", "13", "20"],
        correctAnswer: "32",
        hint: "Compare the tens first.",
        explanation: "32 has 3 tens. The others have 2 tens or 1 ten, so 32 is bigger.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "number-hunt-3",
        question: "What number is missing? 5, 6, __, 8",
        choices: ["4", "7", "9", "10"],
        correctAnswer: "7",
        hint: "The numbers go up by 1 each time.",
        explanation: "The sequence counts 5, 6, 7, 8, so the missing number is 7.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "number-hunt-4",
        question: "There are 4 apples and 3 bananas. How many fruits are there?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: "7",
        hint: "Count all the fruits together.",
        explanation: "4 apples plus 3 bananas makes 7 fruits altogether.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "number-hunt-5",
        question: "Which number is smaller than 18?",
        choices: ["20", "19", "17", "21"],
        correctAnswer: "17",
        hint: "A smaller number comes before 18.",
        explanation: "17 comes before 18, so it is smaller than 18.",
        difficulty: "Level 2: Easy",
      },
    ],
  },
  {
    id: "add-it-up",
    title: "Add It Up",
    topic: "Addition",
    description: "Practice simple addition, counting on, and story sums.",
    yearLabel: "Year 1 - 3",
    accentClass: "bg-[#22C55E]",
    howToPlay: [
      "Read the addition problem.",
      "Count on or combine the groups.",
      "Pick the correct total.",
      "Read the explanation to learn the strategy.",
    ],
    questions: [
      {
        id: "add-it-up-1",
        question: "4 + 3 = ?",
        choices: ["5", "6", "7", "8"],
        correctAnswer: "7",
        hint: "Start at 4 and count 3 more.",
        explanation: "Count 5, 6, 7. So 4 + 3 = 7.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "add-it-up-2",
        question: "Lina has 6 stickers. She gets 2 more. How many stickers now?",
        choices: ["7", "8", "9", "10"],
        correctAnswer: "8",
        hint: "Add 2 to 6.",
        explanation: "6 stickers plus 2 more stickers makes 8 stickers.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "add-it-up-3",
        question: "9 + 5 = ?",
        choices: ["12", "13", "14", "15"],
        correctAnswer: "14",
        hint: "Count on 5 from 9.",
        explanation: "10, 11, 12, 13, 14. So 9 + 5 = 14.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "add-it-up-4",
        question: "There are 10 birds in a tree. 4 more land. How many birds are there?",
        choices: ["12", "13", "14", "15"],
        correctAnswer: "14",
        hint: "Combine 10 and 4.",
        explanation: "10 birds plus 4 birds equals 14 birds.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "add-it-up-5",
        question: "15 + 3 = ?",
        choices: ["16", "17", "18", "19"],
        correctAnswer: "18",
        hint: "Count 3 steps after 15.",
        explanation: "After 15 comes 16, 17, 18. So 15 + 3 = 18.",
        difficulty: "Level 3: Medium",
      },
    ],
  },
  {
    id: "subtraction-splash",
    title: "Subtraction Splash",
    topic: "Subtraction",
    description: "Take away, count backwards, and solve subtraction stories.",
    yearLabel: "Year 1 - 3",
    accentClass: "bg-[#14B8A6]",
    howToPlay: [
      "Read the take-away clue.",
      "Count backwards or remove a group.",
      "Choose the answer left behind.",
      "Use explanations to check your thinking.",
    ],
    questions: [
      {
        id: "subtraction-splash-1",
        question: "8 - 3 = ?",
        choices: ["4", "5", "6", "7"],
        correctAnswer: "5",
        hint: "Start at 8 and count back 3.",
        explanation: "Count back 7, 6, 5. So 8 - 3 = 5.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "subtraction-splash-2",
        question: "There are 10 fish. 4 swim away. How many are left?",
        choices: ["4", "5", "6", "7"],
        correctAnswer: "6",
        hint: "Take 4 away from 10.",
        explanation: "10 fish minus 4 fish leaves 6 fish.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "subtraction-splash-3",
        question: "What is 15 - 5?",
        choices: ["8", "9", "10", "11"],
        correctAnswer: "10",
        hint: "Take away 5 from 15.",
        explanation: "15 minus 5 equals 10.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "subtraction-splash-4",
        question: "Count backwards: 20, 19, 18, __",
        choices: ["16", "17", "18", "21"],
        correctAnswer: "17",
        hint: "The numbers go down by 1.",
        explanation: "20, 19, 18, 17. The missing number is 17.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "subtraction-splash-5",
        question: "Sara has 18 shells. She gives away 6. How many shells remain?",
        choices: ["10", "11", "12", "13"],
        correctAnswer: "12",
        hint: "Subtract 6 from 18.",
        explanation: "18 shells minus 6 shells leaves 12 shells.",
        difficulty: "Level 3: Medium",
      },
    ],
  },
  {
    id: "shape-match",
    title: "Shape Match",
    topic: "Shapes",
    description: "Recognize shapes, sides, corners, and simple shape patterns.",
    yearLabel: "Year 1 - 3",
    accentClass: "bg-[#8B5CF6]",
    howToPlay: [
      "Look at the shape clue.",
      "Think about sides and corners.",
      "Choose the best matching answer.",
      "Read the explanation to learn the shape rule.",
    ],
    questions: [
      {
        id: "shape-match-1",
        question: "Which shape has 3 sides?",
        choices: ["Circle", "Square", "Triangle", "Rectangle"],
        correctAnswer: "Triangle",
        hint: "Tri means three.",
        explanation: "A triangle has 3 straight sides and 3 corners.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "shape-match-2",
        question: "How many corners does a square have?",
        choices: ["2", "3", "4", "5"],
        correctAnswer: "4",
        hint: "A square has four equal sides.",
        explanation: "A square has 4 corners and 4 equal sides.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "shape-match-3",
        question: "Which shape has no corners?",
        choices: ["Triangle", "Circle", "Square", "Rectangle"],
        correctAnswer: "Circle",
        hint: "Look for the round shape.",
        explanation: "A circle is round and has no corners.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "shape-match-4",
        question: "What comes next? Circle, Square, Circle, Square, __",
        choices: ["Circle", "Triangle", "Rectangle", "Star"],
        correctAnswer: "Circle",
        hint: "The pattern repeats circle then square.",
        explanation: "The pattern is Circle, Square, then repeats. The next shape is Circle.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "shape-match-5",
        question: "Which shape usually has 2 long sides and 2 short sides?",
        choices: ["Circle", "Triangle", "Rectangle", "Oval"],
        correctAnswer: "Rectangle",
        hint: "It has 4 corners like a square, but not all sides are equal.",
        explanation: "A rectangle has 4 corners, with opposite sides the same length.",
        difficulty: "Level 3: Medium",
      },
    ],
  },
  {
    id: "count-and-collect",
    title: "Count & Collect",
    topic: "Counting",
    description: "Count objects, compare groups, skip count, and find simple totals.",
    yearLabel: "Year 1 - 3",
    accentClass: "bg-[#FF9F1C]",
    howToPlay: [
      "Count the objects or groups.",
      "Compare which group has more or less.",
      "Try skip counting for faster totals.",
      "Check the explanation after answering.",
    ],
    questions: [
      {
        id: "count-and-collect-1",
        question: "A basket has 6 red balls and 2 blue balls. How many balls are there?",
        choices: ["6", "7", "8", "9"],
        correctAnswer: "8",
        hint: "Count both colors together.",
        explanation: "6 red balls plus 2 blue balls makes 8 balls altogether.",
        difficulty: "Level 1: Very Easy",
      },
      {
        id: "count-and-collect-2",
        question: "Which group has more: 9 coins or 12 coins?",
        choices: ["9 coins", "12 coins", "They are equal", "None"],
        correctAnswer: "12 coins",
        hint: "The bigger number means more objects.",
        explanation: "12 is bigger than 9, so 12 coins is more.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "count-and-collect-3",
        question: "Skip count by 2: 2, 4, 6, __",
        choices: ["7", "8", "9", "10"],
        correctAnswer: "8",
        hint: "Add 2 each time.",
        explanation: "2, 4, 6, 8. The next number is 8.",
        difficulty: "Level 2: Easy",
      },
      {
        id: "count-and-collect-4",
        question: "There are 3 boxes with 5 pencils in each box. How many pencils?",
        choices: ["10", "12", "15", "20"],
        correctAnswer: "15",
        hint: "Count 5 three times.",
        explanation: "5 + 5 + 5 = 15 pencils.",
        difficulty: "Level 3: Medium",
      },
      {
        id: "count-and-collect-5",
        question: "Which is less: 14 stars or 11 stars?",
        choices: ["14 stars", "11 stars", "Both", "Neither"],
        correctAnswer: "11 stars",
        hint: "Less means the smaller group.",
        explanation: "11 is smaller than 14, so 11 stars is less.",
        difficulty: "Level 2: Easy",
      },
    ],
  },
];

export function getMathDemoGame(gameId: string) {
  return mathDemoGames.find((game) => game.id === gameId);
}