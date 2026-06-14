export type ScienceQuizLevel = "level1" | "level2" | "level3";

export type ScienceQuestion = {
  id: string;
  level: ScienceQuizLevel;
  ageRange: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  xpReward: number;
};

export type ScienceFact = {
  title: string;
  fact: string;
  category: "Space" | "Animals" | "Human Body" | "Earth" | "Plants";
  explanation: string;
};

export type ScienceActivity = {
  id: string;
  title: string;
  objective: string;
  materials: string[];
  steps: string[];
  learningOutcome: string;
  estimatedTime: string;
  safetyNote: string;
  xpReward: number;
};

export type ScienceLearningPath = {
  id: string;
  title: string;
  ageRange: string;
  levels: string[];
  topics: string[];
  recommendedOrder: string[];
  completionBadge: string;
  xpReward: number;
};

export const scienceQuizLevels: Record<
  ScienceQuizLevel,
  { title: string; ageRange: string; difficulty: "Easy" | "Medium" | "Hard" }
> = {
  level1: {
    title: "Level 1: Young Explorer",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
  },
  level2: {
    title: "Level 2: Discovery Scientist",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
  },
  level3: {
    title: "Level 3: Future Innovator",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
  },
};

export const scienceQuestions: ScienceQuestion[] = [
  {
    id: "l1-space-sun",
    level: "level1",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
    topic: "Space",
    question: "Which object gives Earth most of its light and heat?",
    options: ["The Moon", "The Sun", "Mars", "A cloud"],
    correctAnswer: "The Sun",
    explanation: "The Sun is a star. It gives Earth light and warmth during the day.",
    xpReward: 10,
  },
  {
    id: "l1-animals-fish",
    level: "level1",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
    topic: "Animals",
    question: "What do fish use to breathe underwater?",
    options: ["Wings", "Gills", "Fur", "Roots"],
    correctAnswer: "Gills",
    explanation: "Fish use gills to take oxygen from water.",
    xpReward: 10,
  },
  {
    id: "l1-body-heart",
    level: "level1",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
    topic: "Human Body",
    question: "Which body part pumps blood around your body?",
    options: ["Heart", "Elbow", "Ear", "Knee"],
    correctAnswer: "Heart",
    explanation: "The heart is a strong muscle that pumps blood through the body.",
    xpReward: 10,
  },
  {
    id: "l1-plants-needs",
    level: "level1",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
    topic: "Plants",
    question: "What do most plants need to grow?",
    options: ["Water and sunlight", "Only rocks", "Candy", "Shoes"],
    correctAnswer: "Water and sunlight",
    explanation: "Most plants need water, sunlight, air, and soil nutrients to grow well.",
    xpReward: 10,
  },
  {
    id: "l1-earth-rain",
    level: "level1",
    ageRange: "Ages 6-8",
    difficulty: "Easy",
    topic: "Earth",
    question: "Rain falls from which part of the sky?",
    options: ["Clouds", "Stars", "Bird nests", "Mountains"],
    correctAnswer: "Clouds",
    explanation: "Clouds hold tiny water drops. When they become heavy, rain can fall.",
    xpReward: 10,
  },
  {
    id: "l2-space-orbit",
    level: "level2",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
    topic: "Space",
    question: "What does Earth do as it travels around the Sun?",
    options: ["Evaporates", "Orbits", "Melts", "Stops moving"],
    correctAnswer: "Orbits",
    explanation: "Earth orbits, or travels around, the Sun once each year.",
    xpReward: 15,
  },
  {
    id: "l2-earth-water-cycle",
    level: "level2",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
    topic: "Earth",
    question: "What is the process called when liquid water turns into water vapor?",
    options: ["Freezing", "Evaporation", "Magnetism", "Condensation"],
    correctAnswer: "Evaporation",
    explanation: "Evaporation happens when heat changes liquid water into water vapor.",
    xpReward: 15,
  },
  {
    id: "l2-body-lungs",
    level: "level2",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
    topic: "Human Body",
    question: "Which organs help people take oxygen from the air?",
    options: ["Lungs", "Teeth", "Hair", "Fingers"],
    correctAnswer: "Lungs",
    explanation: "The lungs help move oxygen into the body when we breathe.",
    xpReward: 15,
  },
  {
    id: "l2-plants-photosynthesis",
    level: "level2",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
    topic: "Plants",
    question: "What do plants make using sunlight, air, and water?",
    options: ["Food", "Plastic", "Metal", "Glass"],
    correctAnswer: "Food",
    explanation: "Plants use photosynthesis to make their own food.",
    xpReward: 15,
  },
  {
    id: "l2-animals-habitat",
    level: "level2",
    ageRange: "Ages 9-11",
    difficulty: "Medium",
    topic: "Animals",
    question: "What is an animal's habitat?",
    options: ["Its home environment", "Its favorite color", "Its sound", "Its shadow"],
    correctAnswer: "Its home environment",
    explanation: "A habitat is the place where an animal gets food, water, shelter, and space.",
    xpReward: 15,
  },
  {
    id: "l3-space-gravity",
    level: "level3",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
    topic: "Space",
    question: "Which force keeps planets moving around the Sun?",
    options: ["Gravity", "Friction", "Sound", "Static electricity"],
    correctAnswer: "Gravity",
    explanation: "Gravity pulls objects with mass toward each other and helps keep planets in orbit.",
    xpReward: 20,
  },
  {
    id: "l3-earth-erosion",
    level: "level3",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
    topic: "Earth",
    question: "What is erosion?",
    options: [
      "The movement of rock and soil by wind, water, or ice",
      "The growth of new leaves",
      "The making of light",
      "The beating of the heart",
    ],
    correctAnswer: "The movement of rock and soil by wind, water, or ice",
    explanation: "Erosion moves small pieces of rock and soil from one place to another.",
    xpReward: 20,
  },
  {
    id: "l3-body-circulation",
    level: "level3",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
    topic: "Human Body",
    question: "What does the circulatory system mainly move around the body?",
    options: ["Blood", "Sunlight", "Soil", "Rain"],
    correctAnswer: "Blood",
    explanation: "The circulatory system uses the heart and blood vessels to move blood around the body.",
    xpReward: 20,
  },
  {
    id: "l3-plants-roots",
    level: "level3",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
    topic: "Plants",
    question: "Why are roots important to most plants?",
    options: [
      "They absorb water and help anchor the plant",
      "They make animal sounds",
      "They orbit the Sun",
      "They create shadows only",
    ],
    correctAnswer: "They absorb water and help anchor the plant",
    explanation: "Roots take in water and minerals while helping hold the plant in place.",
    xpReward: 20,
  },
  {
    id: "l3-animals-adaptation",
    level: "level3",
    ageRange: "Ages 12-14",
    difficulty: "Hard",
    topic: "Animals",
    question: "What is an adaptation?",
    options: [
      "A feature that helps a living thing survive",
      "A type of planet",
      "A weather report",
      "A plant pot",
    ],
    correctAnswer: "A feature that helps a living thing survive",
    explanation: "Adaptations are traits or behaviors that help living things meet their needs.",
    xpReward: 20,
  },
];

export const scienceFacts: ScienceFact[] = [
  {
    title: "The Sun is a star",
    fact: "The Sun is the closest star to Earth.",
    category: "Space",
    explanation: "It looks bigger and brighter than other stars because it is much closer to us.",
  },
  {
    title: "Octopuses have three hearts",
    fact: "An octopus has three hearts that help move blood through its body.",
    category: "Animals",
    explanation: "Two hearts help move blood to the gills, and one helps move blood around the body.",
  },
  {
    title: "Your skeleton supports you",
    fact: "The human skeleton gives the body shape and protects important organs.",
    category: "Human Body",
    explanation: "Bones help you stand, move, and protect parts like the brain, heart, and lungs.",
  },
  {
    title: "Earth is mostly water",
    fact: "About 71% of Earth's surface is covered by water.",
    category: "Earth",
    explanation: "Most of that water is in oceans, with smaller amounts in rivers, lakes, ice, and clouds.",
  },
  {
    title: "Leaves make food",
    fact: "Many plants use leaves to capture sunlight and make food.",
    category: "Plants",
    explanation: "Leaves contain chlorophyll, which helps plants use sunlight in photosynthesis.",
  },
];

export const scienceActivities: ScienceActivity[] = [
  {
    id: "sink-or-float",
    title: "Sink or Float",
    objective: "Investigate why some objects sink while others float.",
    materials: ["Bowl of water", "Spoon", "Leaf", "Small stone", "Plastic cap", "Towel"],
    steps: [
      "Place the bowl on a safe table.",
      "Predict whether each object will sink or float.",
      "Place one object in the water at a time.",
      "Record what happens and compare it with your prediction.",
    ],
    learningOutcome: "Children observe buoyancy and learn that material, shape, and weight can affect floating.",
    estimatedTime: "10 minutes",
    safetyNote: "Use a small amount of water and wipe spills right away. Ask an adult before using glass or sharp objects.",
    xpReward: 25,
  },
  {
    id: "plant-growth-challenge",
    title: "Plant Growth Challenge",
    objective: "Observe how plants change as they grow.",
    materials: ["Bean seed", "Cup", "Cotton or soil", "Water", "Sunny window", "Notebook"],
    steps: [
      "Place cotton or soil in a cup.",
      "Add the bean seed and a small amount of water.",
      "Put the cup near sunlight.",
      "Check it daily and draw what you see.",
    ],
    learningOutcome: "Children learn that plants need water, light, and time to grow.",
    estimatedTime: "5 minutes daily for 7 days",
    safetyNote: "Do not eat the seed or soil. Wash hands after touching plants or soil.",
    xpReward: 35,
  },
  {
    id: "paper-rocket",
    title: "Build a Paper Rocket",
    objective: "Explore forces, motion, and design by building a simple paper rocket.",
    materials: ["Paper", "Tape", "Straw", "Scissors", "Markers"],
    steps: [
      "Roll paper into a small tube and tape it.",
      "Close one end with tape.",
      "Add paper fins and decorate the rocket.",
      "Place it on a straw and blow gently to launch.",
    ],
    learningOutcome: "Children explore how air pushes the rocket and how design affects movement.",
    estimatedTime: "15 minutes",
    safetyNote: "Use scissors with adult help and never aim rockets at faces.",
    xpReward: 40,
  },
  {
    id: "shadow-investigation",
    title: "Shadow Investigation",
    objective: "Notice how light direction changes shadow size and shape.",
    materials: ["Toy or cup", "Torch or sunlight", "Paper", "Pencil"],
    steps: [
      "Place an object on paper.",
      "Shine light from one side and trace the shadow.",
      "Move the light higher, lower, closer, and farther.",
      "Compare the different shadow shapes.",
    ],
    learningOutcome: "Children learn that shadows form when an object blocks light.",
    estimatedTime: "10-15 minutes",
    safetyNote: "Do not shine a torch into anyone's eyes.",
    xpReward: 30,
  },
];

export const scienceLearningPaths: ScienceLearningPath[] = [
  {
    id: "young-explorer",
    title: "Young Explorer",
    ageRange: "Ages 6-8",
    levels: ["Level 1"],
    topics: ["Plants", "Animals", "Space", "Weather", "Human Body"],
    recommendedOrder: ["Science Facts", "Level 1 Quiz", "Sink or Float", "Plant Growth Challenge"],
    completionBadge: "Science Starter",
    xpReward: 60,
  },
  {
    id: "discovery-scientist",
    title: "Discovery Scientist",
    ageRange: "Ages 9-11",
    levels: ["Level 1", "Level 2"],
    topics: ["Habitats", "Water Cycle", "Photosynthesis", "Forces", "Earth Science"],
    recommendedOrder: ["Level 1 Quiz", "Level 2 Quiz", "Shadow Investigation", "Science Facts"],
    completionBadge: "Science Explorer",
    xpReward: 90,
  },
  {
    id: "future-innovator",
    title: "Future Innovator",
    ageRange: "Ages 12-14",
    levels: ["Level 1", "Level 2", "Level 3"],
    topics: ["Gravity", "Erosion", "Body Systems", "Adaptations", "Scientific Reasoning"],
    recommendedOrder: ["Level 2 Quiz", "Level 3 Quiz", "Build a Paper Rocket", "Learning Review"],
    completionBadge: "Future Scientist",
    xpReward: 130,
  },
];

export const scienceBadges = [
  "Science Starter",
  "Science Explorer",
  "Science Master",
  "Young Inventor",
  "Future Scientist",
  "LearnPlay Science Champion",
];