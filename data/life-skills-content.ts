export type ProgressionLevel = "Beginner" | "Intermediate" | "Advanced";

export type LifeSkillsQuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  level: ProgressionLevel;
  xpReward: number;
};

export type LifeSkillsGame = {
  id: string;
  title: string;
  level: ProgressionLevel;
  scenario: string;
  mission: string;
  choices: string[];
  bestChoice: string;
  feedback: string;
  xpReward: number;
};

export type LifeSkillsCategory = {
  id: string;
  name: string;
  description: string;
  topics: string[];
  games: LifeSkillsGame[];
  quizQuestions: LifeSkillsQuizQuestion[];
  badge: string;
  colorTone: "blue" | "yellow" | "green" | "pink" | "purple";
};

export const lifeSkillsBadges = [
  "Safety Guardian Badge",
  "AI Explorer Badge",
  "Smart Saver Badge",
  "Empathy Hero Badge",
  "Logic Master Badge",
  "Healthy Hero Badge",
  "Life Skills Champion Badge",
];

export const lifeSkillsCategories: LifeSkillsCategory[] = [
  {
    id: "digital-safety",
    name: "Digital Safety",
    description: "Learn how to stay safe, private, and confident while using the internet.",
    topics: [
      "Creating strong passwords",
      "Online privacy",
      "Safe internet browsing",
      "Recognizing scams",
      "What information not to share",
    ],
    badge: "Safety Guardian Badge",
    colorTone: "blue",
    games: [
      {
        id: "internet-detective",
        title: "Internet Detective",
        level: "Beginner",
        scenario: "A website asks for your full name, home address, and school before you can play a game.",
        mission: "Decide what information should stay private.",
        choices: ["Share everything", "Ask a trusted adult first", "Post it on a chat", "Guess a fake address"],
        bestChoice: "Ask a trusted adult first",
        feedback: "Great detective work. Personal details should stay private unless a trusted adult says it is safe.",
        xpReward: 20,
      },
      {
        id: "password-hero",
        title: "Password Hero",
        level: "Intermediate",
        scenario: "You need to create a password for a learning account.",
        mission: "Choose the strongest password habit.",
        choices: ["Use your birthday", "Use password123", "Use a long mix of words and symbols", "Use your pet's name"],
        bestChoice: "Use a long mix of words and symbols",
        feedback: "A strong password is longer and harder to guess.",
        xpReward: 25,
      },
      {
        id: "online-safety-quest",
        title: "Online Safety Quest",
        level: "Advanced",
        scenario: "A pop-up says you won a prize and asks you to click quickly.",
        mission: "Pick the safest action.",
        choices: ["Click immediately", "Close it and tell an adult", "Share it with friends", "Enter an email"],
        bestChoice: "Close it and tell an adult",
        feedback: "Unexpected prizes can be scams. Stop, close, and ask for help.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "digital-q1",
        question: "Which password is safer?",
        options: ["123456", "myname", "BlueTiger!82", "password"],
        correctAnswer: "BlueTiger!82",
        explanation: "Strong passwords use a mix of words, numbers, and symbols.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "digital-q2",
        question: "What should you do before sharing personal information online?",
        options: ["Ask a trusted adult", "Share quickly", "Post it publicly", "Send it to strangers"],
        correctAnswer: "Ask a trusted adult",
        explanation: "A trusted adult can help decide if sharing information is safe.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "digital-q3",
        question: "What is a scam?",
        options: ["A safe school website", "A trick to get information or money", "A science fact", "A strong password"],
        correctAnswer: "A trick to get information or money",
        explanation: "Scams try to trick people. Slow down and check before clicking.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
  {
    id: "ai-literacy",
    name: "AI Literacy",
    description: "Understand what AI is, how it helps people, and how to use it responsibly.",
    topics: [
      "What is AI?",
      "How AI helps people",
      "Asking good questions",
      "Checking AI answers",
      "Using AI responsibly",
    ],
    badge: "AI Explorer Badge",
    colorTone: "purple",
    games: [
      {
        id: "ai-or-human",
        title: "AI or Human?",
        level: "Beginner",
        scenario: "You see a picture online and are not sure if a person made it or AI helped create it.",
        mission: "Choose the best thinking habit.",
        choices: ["Believe it immediately", "Look for clues and ask questions", "Share it as fact", "Ignore all pictures"],
        bestChoice: "Look for clues and ask questions",
        feedback: "AI can create images and text, so it is smart to check carefully.",
        xpReward: 20,
      },
      {
        id: "prompt-wizard",
        title: "Prompt Wizard",
        level: "Intermediate",
        scenario: "You want AI to help explain volcanoes in simple words.",
        mission: "Pick the clearest prompt.",
        choices: ["Volcano", "Tell me everything", "Explain volcanoes for a 9-year-old with 3 examples", "Do my homework"],
        bestChoice: "Explain volcanoes for a 9-year-old with 3 examples",
        feedback: "Good prompts are clear, specific, and responsible.",
        xpReward: 25,
      },
      {
        id: "fact-check-challenge",
        title: "Fact Check Challenge",
        level: "Advanced",
        scenario: "AI gives an answer that sounds surprising.",
        mission: "Choose what to do next.",
        choices: ["Copy it without checking", "Check trusted sources", "Pretend it is true", "Delete your question"],
        bestChoice: "Check trusted sources",
        feedback: "AI can make mistakes. Strong learners check important answers.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "ai-q1",
        question: "What is AI?",
        options: ["A type of food", "Technology that can help with tasks", "A planet", "A pencil"],
        correctAnswer: "Technology that can help with tasks",
        explanation: "AI is technology that can help answer, sort, create, or recommend things.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "ai-q2",
        question: "What makes a good question for AI?",
        options: ["Clear details", "No details", "Only one word always", "A secret password"],
        correctAnswer: "Clear details",
        explanation: "Clear details help AI give a more useful answer.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "ai-q3",
        question: "Why should important AI answers be checked?",
        options: ["AI is always perfect", "AI can make mistakes", "Checking is never useful", "Only adults can read"],
        correctAnswer: "AI can make mistakes",
        explanation: "Responsible AI use means checking important answers with trusted sources.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
  {
    id: "financial-literacy",
    name: "Financial Literacy",
    description: "Practice smart choices about saving, spending, budgeting, and needs vs wants.",
    topics: ["Saving money", "Spending wisely", "Needs vs wants", "Budgeting basics", "Earning money"],
    badge: "Smart Saver Badge",
    colorTone: "yellow",
    games: [
      {
        id: "smart-shopper",
        title: "Smart Shopper",
        level: "Beginner",
        scenario: "You have a small budget and need a school notebook.",
        mission: "Choose the smartest shopping choice.",
        choices: ["Buy only candy", "Buy the notebook first", "Spend all money on toys", "Forget the notebook"],
        bestChoice: "Buy the notebook first",
        feedback: "Needs come before wants when money is limited.",
        xpReward: 20,
      },
      {
        id: "piggy-bank-challenge",
        title: "Piggy Bank Challenge",
        level: "Intermediate",
        scenario: "You receive pocket money and want a book next month.",
        mission: "Choose a good saving habit.",
        choices: ["Save some money each week", "Spend everything today", "Hide money and forget it", "Borrow from a friend"],
        bestChoice: "Save some money each week",
        feedback: "Saving small amounts regularly helps reach a goal.",
        xpReward: 25,
      },
      {
        id: "needs-vs-wants",
        title: "Needs vs Wants",
        level: "Advanced",
        scenario: "You list water, snacks, a school bag, and a new game skin.",
        mission: "Choose the item that is most clearly a want.",
        choices: ["Water", "School bag", "New game skin", "Healthy meal"],
        bestChoice: "New game skin",
        feedback: "Wants can be fun, but needs are more important for daily life.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "money-q1",
        question: "What is saving money?",
        options: ["Keeping money for later", "Spending everything", "Losing coins", "Ignoring prices"],
        correctAnswer: "Keeping money for later",
        explanation: "Saving means setting money aside for a future need or goal.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "money-q2",
        question: "Which is usually a need?",
        options: ["Clean water", "Extra stickers", "A toy robot", "A game costume"],
        correctAnswer: "Clean water",
        explanation: "Needs are things people require for health, safety, or daily life.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "money-q3",
        question: "What is a budget?",
        options: ["A plan for money", "A type of shoe", "A snack", "A password"],
        correctAnswer: "A plan for money",
        explanation: "A budget helps plan how money will be saved or spent.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
  {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    description: "Build confidence with emotions, empathy, communication, and teamwork.",
    topics: ["Understanding emotions", "Empathy", "Managing frustration", "Communication", "Teamwork"],
    badge: "Empathy Hero Badge",
    colorTone: "pink",
    games: [
      {
        id: "emotion-explorer",
        title: "Emotion Explorer",
        level: "Beginner",
        scenario: "A friend looks quiet after losing a game.",
        mission: "Choose a kind response.",
        choices: ["Laugh at them", "Ask if they are okay", "Ignore them forever", "Take their turn"],
        bestChoice: "Ask if they are okay",
        feedback: "Noticing feelings and checking in is a caring choice.",
        xpReward: 20,
      },
      {
        id: "friendship-challenge",
        title: "Friendship Challenge",
        level: "Intermediate",
        scenario: "Two classmates both want the same marker.",
        mission: "Choose a fair communication choice.",
        choices: ["Grab it", "Shout loudly", "Take turns or choose another color", "Hide it"],
        bestChoice: "Take turns or choose another color",
        feedback: "Good communication can help solve small conflicts.",
        xpReward: 25,
      },
      {
        id: "teamwork-mission",
        title: "Teamwork Mission",
        level: "Advanced",
        scenario: "Your group has a project and everyone has different ideas.",
        mission: "Choose the best teamwork habit.",
        choices: ["Listen and plan roles", "Do nothing", "Ignore everyone", "Quit right away"],
        bestChoice: "Listen and plan roles",
        feedback: "Teamwork improves when people listen, plan, and share jobs.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "emotion-q1",
        question: "What is empathy?",
        options: ["Trying to understand someone else's feelings", "Winning every game", "Eating quickly", "Keeping all toys"],
        correctAnswer: "Trying to understand someone else's feelings",
        explanation: "Empathy helps us care about how other people feel.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "emotion-q2",
        question: "What can help when you feel frustrated?",
        options: ["Take a calm breath", "Throw everything", "Shout at everyone", "Give up forever"],
        correctAnswer: "Take a calm breath",
        explanation: "A calm breath can help your brain slow down and choose a better response.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "emotion-q3",
        question: "What helps teamwork?",
        options: ["Listening", "Interrupting", "Blaming", "Refusing to share"],
        correctAnswer: "Listening",
        explanation: "Listening helps a team understand ideas and solve problems together.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Practice logical thinking, planning, decisions, and cause-and-effect reasoning.",
    topics: ["Logical thinking", "Planning", "Decision making", "Cause and effect"],
    badge: "Logic Master Badge",
    colorTone: "purple",
    games: [
      {
        id: "escape-puzzle",
        title: "Escape Puzzle",
        level: "Beginner",
        scenario: "You need to find a key by following three clues in order.",
        mission: "Choose the best first step.",
        choices: ["Read the clues carefully", "Run in circles", "Skip all clues", "Guess without looking"],
        bestChoice: "Read the clues carefully",
        feedback: "Good problem solving begins with understanding the clues.",
        xpReward: 20,
      },
      {
        id: "logic-lab",
        title: "Logic Lab",
        level: "Intermediate",
        scenario: "A pattern goes red, blue, red, blue. What comes next?",
        mission: "Choose the next color.",
        choices: ["Green", "Blue", "Red", "Yellow"],
        bestChoice: "Red",
        feedback: "The pattern repeats red then blue, so red comes next.",
        xpReward: 25,
      },
      {
        id: "mission-planner",
        title: "Mission Planner",
        level: "Advanced",
        scenario: "You have homework, dinner, and a bedtime routine.",
        mission: "Choose the best planning habit.",
        choices: ["Make an order and start early", "Wait until bedtime", "Do only the easiest thing", "Ignore the plan"],
        bestChoice: "Make an order and start early",
        feedback: "Planning helps big tasks feel smaller and easier to finish.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "problem-q1",
        question: "What should you do first when solving a problem?",
        options: ["Understand the problem", "Panic", "Ignore it", "Blame someone"],
        correctAnswer: "Understand the problem",
        explanation: "Understanding the problem helps you choose a useful next step.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "problem-q2",
        question: "What is cause and effect?",
        options: ["How one thing can lead to another", "A type of lunch", "A password rule", "A drawing tool"],
        correctAnswer: "How one thing can lead to another",
        explanation: "Cause and effect helps explain why something happened.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "problem-q3",
        question: "Why is planning useful?",
        options: ["It helps organize steps", "It makes time stop", "It removes all work", "It hides problems"],
        correctAnswer: "It helps organize steps",
        explanation: "A plan can make a challenge easier to start and finish.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
  {
    id: "healthy-habits",
    name: "Healthy Habits",
    description: "Explore exercise, sleep, nutrition, and hygiene habits for daily wellbeing.",
    topics: ["Exercise", "Sleep", "Nutrition", "Hygiene"],
    badge: "Healthy Hero Badge",
    colorTone: "green",
    games: [
      {
        id: "healthy-hero",
        title: "Healthy Hero",
        level: "Beginner",
        scenario: "You have been sitting for a long time after school.",
        mission: "Choose a healthy next step.",
        choices: ["Move and stretch", "Sit all day", "Skip water", "Never rest"],
        bestChoice: "Move and stretch",
        feedback: "Movement helps the body feel stronger and more awake.",
        xpReward: 20,
      },
      {
        id: "sleep-challenge",
        title: "Sleep Challenge",
        level: "Intermediate",
        scenario: "It is almost bedtime and you want to keep watching videos.",
        mission: "Choose the best sleep habit.",
        choices: ["Keep watching all night", "Start a calm bedtime routine", "Drink lots of soda", "Run around loudly"],
        bestChoice: "Start a calm bedtime routine",
        feedback: "A calm routine helps the body prepare for sleep.",
        xpReward: 25,
      },
      {
        id: "food-explorer",
        title: "Food Explorer",
        level: "Advanced",
        scenario: "You are building a balanced snack plate.",
        mission: "Choose the strongest option.",
        choices: ["Fruit, water, and yogurt", "Only candy", "Only chips", "Nothing at all"],
        bestChoice: "Fruit, water, and yogurt",
        feedback: "Balanced snacks can include energy, nutrients, and hydration.",
        xpReward: 30,
      },
    ],
    quizQuestions: [
      {
        id: "health-q1",
        question: "Why is exercise helpful?",
        options: ["It supports a strong body", "It removes sleep forever", "It makes hygiene unnecessary", "It replaces food"],
        correctAnswer: "It supports a strong body",
        explanation: "Exercise helps the heart, muscles, mood, and energy.",
        level: "Beginner",
        xpReward: 10,
      },
      {
        id: "health-q2",
        question: "What helps hygiene?",
        options: ["Washing hands", "Never brushing teeth", "Sharing dirty towels", "Skipping baths forever"],
        correctAnswer: "Washing hands",
        explanation: "Washing hands helps remove germs and protect health.",
        level: "Intermediate",
        xpReward: 15,
      },
      {
        id: "health-q3",
        question: "Why is sleep important?",
        options: ["It helps the body and brain rest", "It stops learning", "It is only for adults", "It replaces water"],
        correctAnswer: "It helps the body and brain rest",
        explanation: "Sleep supports growth, memory, mood, and focus.",
        level: "Advanced",
        xpReward: 20,
      },
    ],
  },
];

export function getLifeSkillsCategory(categoryId: string) {
  return lifeSkillsCategories.find((category) => category.id === categoryId);
}

export function getLifeSkillsGame(categoryId: string, gameId: string) {
  const category = getLifeSkillsCategory(categoryId);
  return category?.games.find((game) => game.id === gameId);
}