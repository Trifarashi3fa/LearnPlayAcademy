import scienceConfigJson from "../content/science/forest-world/forest-world-config.json";
import { scienceWorldIdentity } from "@/data/science-world-identity";
import type { NodeType } from "@/data/curriculum-types";
import type { MvpLevel, MvpQuestion, VisualLearningModel } from "@/data/mvp-forest-world";
import type { VisualObjectName } from "@/data/object-visual-map";

type ScienceLevelConfig = {
  level: number;
  nodeType: NodeType;
  title: string;
  learningObjective: string;
};

type ScienceSeed = {
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  learnBotTip: string;
  voiceScript: string;
  visual: VisualLearningModel;
  hint: string;
  difficulty?: string;
};

const levelConfigs = scienceConfigJson.levels as ScienceLevelConfig[];
const scienceWorldConfig = scienceConfigJson;

const sharedLevelMetadata = {
  subject: scienceWorldIdentity.subject,
  subjectLabel: "Science",
  year: scienceWorldIdentity.year,
  worldId: scienceWorldIdentity.worldId,
  worldName: scienceWorldConfig.worldName,
  bossName: scienceWorldIdentity.bossName,
  completionBadge: scienceWorldIdentity.completionBadge,
  mapHref: "/science/world-map",
  rewardsHref: "/science/world-map",
  dashboardHref: "/mvp/parent-dashboard",
  levelHrefBase: "/science/level",
  questionHrefBase: "/science/question",
  randomizeQuestions: true,
  sessionQuestionCount: 10,
} as const;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function uniqueOptions(correctAnswer: string, options: string[]) {
  const values = [correctAnswer, ...options].map((value) => value.trim()).filter(Boolean);
  return [...new Set(values)].slice(0, 4);
}

function textVisual(prompt: string, answer: string): VisualLearningModel {
  return {
    type: "none",
    object: "object",
    groups: [],
    equation: prompt,
    answerVisual: answer,
    context: "forest",
    accessibleLabel: prompt,
  };
}

function objectVisual(object: VisualObjectName, answer: string, label?: string): VisualLearningModel {
  return {
    type: "matching",
    object,
    objects: [object],
    groups: [1],
    answerVisual: answer,
    context: "forest",
    accessibleLabel: label ?? `A science picture clue for ${answer}`,
  };
}

function makeQuestion(level: ScienceLevelConfig, index: number, seed: ScienceSeed): MvpQuestion {
  const id = `science-forest-l${pad(level.level)}-q${pad(index)}`;
  return {
    id,
    level: level.level,
    nodeType: level.nodeType,
    topic: level.title,
    difficulty: seed.difficulty ?? (level.level <= 3 ? "easy" : level.level <= 7 ? "medium" : "challenge"),
    subject: scienceWorldIdentity.subject,
    subjectLabel: "Science",
    question: seed.question,
    options: seed.options,
    correctAnswer: seed.correctAnswer,
    explanation: seed.explanation,
    xpReward: 10,
    levelId: `science-forest-level-${level.level}`,
    worldId: scienceWorldIdentity.worldId,
    visual: seed.visual,
    steps: [
      "Look at the science clue.",
      seed.hint,
      `Choose the answer that matches: ${seed.correctAnswer}.`,
    ],
    visualExplanation: seed.explanation,
    voiceScript: seed.voiceScript,
    learnBotTip: seed.learnBotTip,
  };
}

function buildLevel(levelNumber: number, description: string, seeds: ScienceSeed[]): MvpLevel {
  const config = levelConfigs.find((item) => item.level === levelNumber);
  if (!config) throw new Error(`Science level ${levelNumber} is missing from the world config.`);

  return {
    ...sharedLevelMetadata,
    level: config.level,
    nodeType: config.nodeType,
    title: config.title,
    description,
    learningObjective: config.learningObjective,
    curriculumAlignment: "KSSR Science Year 1: observing, grouping, naming, and explaining familiar science ideas.",
    cambridgeAlignment: "Cambridge Primary Science Stage 1: living things, materials, Earth, senses, and simple enquiry.",
    questions: seeds.map((seed, index) => makeQuestion(config, index + 1, seed)),
  };
}

function scienceQuestion(
  question: string,
  correctAnswer: string,
  distractors: string[],
  explanation: string,
  tip: string,
  visual: VisualLearningModel,
  hint = "Use the picture and the clue before choosing.",
): ScienceSeed {
  return {
    question,
    correctAnswer,
    options: uniqueOptions(correctAnswer, distractors),
    explanation,
    learnBotTip: tip,
    voiceScript: `${question} ${explanation}`,
    visual,
    hint,
  };
}

const livingSeeds: ScienceSeed[] = [
  scienceQuestion("Is a tree living or non-living?", "living", ["non-living", "weather", "material"], "A tree is living because it grows and needs water.", "Living things grow and need care.", objectVisual("tree", "living"), "Ask: does it grow?"),
  scienceQuestion("Is a stone living or non-living?", "non-living", ["living", "plant", "animal"], "A stone is non-living because it does not grow or need food.", "Non-living things do not grow by themselves.", objectVisual("stone", "non-living"), "Ask: does it need food or water?"),
  scienceQuestion("Which thing is living?", "bird", ["coin", "pencil", "ball"], "A bird is living because it moves, eats, and grows.", "Animals are living things.", objectVisual("bird", "bird"), "Look for the thing that eats and grows."),
  scienceQuestion("Which thing is non-living?", "pencil", ["flower", "duck", "fish"], "A pencil is non-living. It does not grow by itself.", "Tools and toys are usually non-living.", objectVisual("pencil", "pencil"), "Find the thing that does not need care."),
  scienceQuestion("Which living thing can swim?", "fish", ["tree", "stone", "coin"], "A fish is a living thing that swims in water.", "Some animals live in water.", objectVisual("fish", "fish"), "Think about where it moves."),
  scienceQuestion("Which living thing has petals?", "flower", ["ball", "shell", "pencil"], "A flower is a living plant part with petals.", "Plants are living things too.", objectVisual("flower", "flower"), "Look for the plant clue."),
  scienceQuestion("Which group is living?", "birds and trees", ["coins and balls", "stones and pencils", "shells and crayons"], "Birds and trees are living things.", "Living groups can include animals and plants.", textVisual("Group clue: birds and trees", "birds and trees"), "Choose the group that grows or eats."),
  scienceQuestion("Which group is non-living?", "coins and balls", ["ducks and fish", "flowers and trees", "bees and birds"], "Coins and balls are non-living objects.", "Non-living things do not need food.", textVisual("Group clue: coins and balls", "coins and balls"), "Choose the objects."),
  scienceQuestion("What do many living things need?", "water", ["plastic", "metal", "glass"], "Many living things need water to stay alive.", "Water helps living things grow.", textVisual("Need clue: living things", "water"), "Think about what plants and animals need."),
  scienceQuestion("Which thing can grow?", "mushroom", ["coin", "box", "crayon"], "A mushroom can grow, so it is living.", "Growing is a living thing clue.", objectVisual("mushroom", "mushroom"), "Find the thing that can grow."),
  scienceQuestion("Which thing is made by people?", "box", ["tree", "bee", "rabbit"], "A box is made by people and is non-living.", "Made objects are usually non-living.", objectVisual("box", "box"), "Look for the made object."),
  scienceQuestion("Which sentence is true?", "A duck is living.", ["A pencil is living.", "A stone needs food.", "A coin can grow."], "A duck is living because it eats, grows, and moves.", "Check if the sentence matches living thing clues.", objectVisual("duck", "A duck is living."), "Read each sentence slowly."),
];

const plantSeeds: ScienceSeed[] = [
  scienceQuestion("Which part of a plant is usually green?", "leaf", ["root", "seed", "stone"], "Leaves are often green and help plants make food.", "Leaves are like plant food helpers.", objectVisual("leaf", "leaf"), "Look for the green plant part."),
  scienceQuestion("Which plant part can become a new plant?", "seed", ["coin", "ball", "shell"], "A seed can grow into a new plant.", "Seeds are tiny plant starters.", objectVisual("nut", "seed"), "Find the plant starter."),
  scienceQuestion("What do plants need to grow?", "water", ["plastic", "crayon", "coin"], "Plants need water to grow well.", "Water helps plants stay healthy.", textVisual("Plant need: grow", "water"), "Think about watering a plant."),
  scienceQuestion("Which part holds a plant in the soil?", "roots", ["petals", "fruit", "stone"], "Roots hold the plant in the soil and take in water.", "Roots work under the soil.", textVisual("Plant part clue: under soil", "roots"), "Think about the hidden plant part."),
  scienceQuestion("Which part can be colourful on a flower?", "petals", ["roots", "soil", "stem"], "Petals can be colourful and help us notice the flower.", "Petals are the colourful flower parts.", objectVisual("flower", "petals"), "Look at the flower clue."),
  scienceQuestion("Which part carries water up the plant?", "stem", ["seed", "coin", "leaf"], "The stem helps hold the plant and carries water.", "The stem is the plant's support.", textVisual("Plant part clue: holds plant up", "stem"), "Think about the tall middle part."),
  scienceQuestion("Which is a plant?", "tree", ["coin", "duck", "ball"], "A tree is a plant. It has roots, a trunk, and leaves.", "Trees are big plants.", objectVisual("tree", "tree"), "Find the plant."),
  scienceQuestion("Which is a fruit from a plant?", "apple", ["pencil", "shell", "stone"], "An apple grows on a plant.", "Some plants give us fruits.", objectVisual("apple", "apple"), "Find the food that grows on a plant."),
  scienceQuestion("What helps a plant stand tall?", "stem", ["petal", "seed", "fruit"], "The stem helps a plant stand tall.", "The stem is a support part.", textVisual("Plant support clue", "stem"), "Think about what holds the flower up."),
  scienceQuestion("What should we do for a dry plant?", "give it water", ["paint it", "hide it", "throw stones"], "A dry plant needs water.", "Plants need gentle care.", textVisual("Dry plant clue", "give it water"), "Choose the caring action."),
  scienceQuestion("Which plant part is under the ground?", "roots", ["petals", "leaves", "fruit"], "Roots are usually under the ground.", "Roots take in water from soil.", textVisual("Under the ground", "roots"), "Think about soil."),
  scienceQuestion("Which sentence is true?", "Plants need light.", ["Plants eat coins.", "Plants are toys.", "Plants do not grow."], "Plants need light and water to grow.", "Light is a plant need.", objectVisual("leaf", "Plants need light."), "Choose the true plant fact."),
];

const animalSeeds: ScienceSeed[] = [
  scienceQuestion("Which animal has feathers?", "bird", ["fish", "rabbit", "bee"], "A bird has feathers.", "Feathers are a bird clue.", objectVisual("bird", "bird"), "Look for the feather animal."),
  scienceQuestion("Which animal lives in water?", "fish", ["rabbit", "bee", "bird"], "A fish lives in water.", "Fish need water homes.", objectVisual("fish", "fish"), "Think about the animal's home."),
  scienceQuestion("Which animal can hop?", "rabbit", ["fish", "shell", "coin"], "A rabbit can hop.", "Animals move in different ways.", objectVisual("rabbit", "rabbit"), "Think about how it moves."),
  scienceQuestion("Which animal can fly?", "bee", ["fish", "duck", "rabbit"], "A bee can fly with its wings.", "Wings help some animals fly.", objectVisual("bee", "bee"), "Find the animal with wings."),
  scienceQuestion("Which animal has a shell?", "shell animal", ["bird", "rabbit", "bee"], "Some small animals have shells for protection.", "A shell can protect an animal.", objectVisual("shell", "shell animal"), "Look for the hard covering."),
  scienceQuestion("What do animals need?", "food", ["glass", "plastic", "pencil"], "Animals need food to live and grow.", "Living animals need food.", textVisual("Animal need", "food"), "Think about what animals eat."),
  scienceQuestion("Which animal can swim and walk?", "duck", ["coin", "tree", "pencil"], "A duck can swim and walk.", "Some animals move in more than one way.", objectVisual("duck", "duck"), "Think about pond animals."),
  scienceQuestion("Which animal has fins?", "fish", ["rabbit", "bee", "bird"], "Fish have fins to help them swim.", "Fins help water animals move.", objectVisual("fish", "fish"), "Look for the swimming body part."),
  scienceQuestion("Which animal is an insect?", "bee", ["rabbit", "duck", "fish"], "A bee is an insect.", "Many insects are small and have wings.", objectVisual("bee", "bee"), "Find the small insect."),
  scienceQuestion("Which group is animals?", "duck and fish", ["tree and leaf", "coin and ball", "pencil and crayon"], "Duck and fish are animals.", "Animals are living things.", textVisual("Group clue: duck and fish", "duck and fish"), "Choose the living animal group."),
  scienceQuestion("Which animal has four legs?", "rabbit", ["fish", "shell", "coin"], "A rabbit has four legs.", "Count the legs in your mind.", objectVisual("rabbit", "rabbit"), "Think about the animal's body."),
  scienceQuestion("Which sentence is true?", "Birds can have feathers.", ["Fish have petals.", "Rabbits are plants.", "Bees are stones."], "Birds can have feathers.", "Match the animal to its feature.", objectVisual("bird", "Birds can have feathers."), "Choose the true animal fact."),
];

const bodySeeds: ScienceSeed[] = [
  scienceQuestion("Which body part helps us see?", "eyes", ["ears", "feet", "hands"], "Eyes help us see.", "Use your eyes for looking.", textVisual("Body clue: see", "eyes"), "Think about looking."),
  scienceQuestion("Which body part helps us hear?", "ears", ["nose", "hands", "knees"], "Ears help us hear sounds.", "Use your ears for listening.", textVisual("Body clue: hear", "ears"), "Think about listening."),
  scienceQuestion("Which body part helps us smell?", "nose", ["eyes", "feet", "elbows"], "The nose helps us smell.", "Your nose notices smells.", textVisual("Body clue: smell", "nose"), "Think about smelling flowers."),
  scienceQuestion("Which body part helps us taste?", "tongue", ["ears", "hands", "hair"], "The tongue helps us taste.", "Your tongue notices sweet, sour, salty, and bitter.", textVisual("Body clue: taste", "tongue"), "Think about tasting food."),
  scienceQuestion("Which body part helps us touch?", "hands", ["eyes", "ears", "teeth"], "Hands help us touch and hold things.", "Use hands gently when touching.", textVisual("Body clue: touch", "hands"), "Think about holding a pencil."),
  scienceQuestion("Which body part helps us walk?", "feet", ["eyes", "nose", "hair"], "Feet help us walk and run.", "Feet help your body move.", textVisual("Body clue: walk", "feet"), "Think about walking."),
  scienceQuestion("Which body part protects the brain?", "skull", ["finger", "toe", "ear"], "The skull helps protect the brain.", "Some body parts protect us.", textVisual("Body clue: protects brain", "skull"), "Think about the head."),
  scienceQuestion("Which body part helps us chew?", "teeth", ["ears", "feet", "elbows"], "Teeth help us bite and chew food.", "Teeth need gentle care.", textVisual("Body clue: chew", "teeth"), "Think about eating."),
  scienceQuestion("Which body part bends in the middle of your arm?", "elbow", ["knee", "nose", "eye"], "The elbow bends your arm.", "Joints help us bend.", textVisual("Body clue: bend arm", "elbow"), "Think about bending your arm."),
  scienceQuestion("Which body part bends in the middle of your leg?", "knee", ["ear", "hand", "mouth"], "The knee bends your leg.", "Knees help you sit and move.", textVisual("Body clue: bend leg", "knee"), "Think about bending your leg."),
  scienceQuestion("What helps keep our body healthy?", "clean hands", ["dirty food", "no sleep", "sharp toys"], "Clean hands help keep germs away.", "Healthy habits protect your body.", textVisual("Healthy body clue", "clean hands"), "Choose the healthy action."),
  scienceQuestion("Which sentence is true?", "Eyes help us see.", ["Ears help us taste.", "Feet help us smell.", "Hands help us hear."], "Eyes help us see.", "Match the body part to its job.", textVisual("Body fact check", "Eyes help us see."), "Choose the true body fact."),
];

const sensesSeeds: ScienceSeed[] = [
  scienceQuestion("Which sense uses your eyes?", "sight", ["hearing", "smell", "taste"], "Sight is the sense we use with our eyes.", "Sight means seeing.", textVisual("Sense clue: eyes", "sight"), "Match eyes to the sense."),
  scienceQuestion("Which sense uses your ears?", "hearing", ["touch", "taste", "sight"], "Hearing is the sense we use with our ears.", "Hearing means listening.", textVisual("Sense clue: ears", "hearing"), "Match ears to the sense."),
  scienceQuestion("Which sense uses your nose?", "smell", ["taste", "touch", "sight"], "Smell is the sense we use with our nose.", "Smell helps us notice scents.", textVisual("Sense clue: nose", "smell"), "Match nose to the sense."),
  scienceQuestion("Which sense uses your tongue?", "taste", ["hearing", "touch", "sight"], "Taste is the sense we use with our tongue.", "Taste helps us notice flavours.", textVisual("Sense clue: tongue", "taste"), "Match tongue to the sense."),
  scienceQuestion("Which sense uses your skin and hands?", "touch", ["smell", "taste", "hearing"], "Touch helps us feel hot, cold, soft, or rough.", "Touch helps us learn safely.", textVisual("Sense clue: hands", "touch"), "Match hands to the sense."),
  scienceQuestion("Which sense helps you hear a bell?", "hearing", ["sight", "taste", "smell"], "You use hearing to notice a bell sound.", "Sounds go with hearing.", textVisual("Sound clue: bell", "hearing"), "Think about sounds."),
  scienceQuestion("Which sense helps you see a star?", "sight", ["touch", "smell", "taste"], "You use sight to see a star.", "Looking uses sight.", objectVisual("star", "sight"), "Think about looking at it."),
  scienceQuestion("Which sense helps you smell a flower?", "smell", ["hearing", "touch", "taste"], "You use smell to notice a flower scent.", "Nose goes with smell.", objectVisual("flower", "smell"), "Think about smelling flowers."),
  scienceQuestion("Which sense helps you taste an orange?", "taste", ["sight", "hearing", "touch"], "You use taste to notice an orange flavour.", "Tongue goes with taste.", objectVisual("orange", "taste"), "Think about eating."),
  scienceQuestion("Which sense helps you feel a soft ball?", "touch", ["smell", "hearing", "taste"], "You use touch to feel if something is soft.", "Hands and skin help you touch.", objectVisual("ball", "touch"), "Think about feeling it."),
  scienceQuestion("Which pair is correct?", "eyes and sight", ["ears and taste", "nose and touch", "tongue and hearing"], "Eyes and sight go together.", "Match the body part to the sense.", textVisual("Sense pair check", "eyes and sight"), "Choose the matching pair."),
  scienceQuestion("Which sentence is true?", "We use five senses to learn.", ["We smell with our feet.", "We hear with our eyes.", "We taste with our hands."], "We use five senses to learn about the world.", "Your senses are learning helpers.", textVisual("Five senses fact", "We use five senses to learn."), "Choose the true sense fact."),
];

const weatherSeeds: ScienceSeed[] = [
  scienceQuestion("Which weather is bright and warm?", "sunny", ["rainy", "windy", "stormy"], "Sunny weather is bright and often warm.", "Look at the sky clue.", textVisual("Weather clue: bright and warm", "sunny"), "Think about sunshine."),
  scienceQuestion("Which weather has falling water drops?", "rainy", ["sunny", "cloudy", "hot"], "Rainy weather has water drops falling from clouds.", "Rain comes from clouds.", textVisual("Weather clue: water drops", "rainy"), "Think about rain."),
  scienceQuestion("Which weather moves leaves around?", "windy", ["rainy", "snowy", "sunny"], "Windy weather can move leaves around.", "Wind is moving air.", objectVisual("leaf", "windy"), "Think about moving leaves."),
  scienceQuestion("Which weather has many clouds?", "cloudy", ["sunny", "hot", "dry"], "Cloudy weather has many clouds in the sky.", "Clouds can cover the sun.", textVisual("Weather clue: many clouds", "cloudy"), "Look at the sky clue."),
  scienceQuestion("What should you use in rain?", "umbrella", ["sunglasses", "sandals", "crayon"], "An umbrella helps keep us dry in rain.", "Choose safe weather gear.", textVisual("Rain gear clue", "umbrella"), "Think about staying dry."),
  scienceQuestion("What should you drink on a hot day?", "water", ["glue", "paint", "sand"], "Water helps your body on a hot day.", "Drink water when it is hot.", textVisual("Hot day clue", "water"), "Choose the healthy choice."),
  scienceQuestion("Which weather can make puddles?", "rainy", ["sunny", "dry", "windy"], "Rainy weather can make puddles.", "Rain adds water to the ground.", textVisual("Puddle clue", "rainy"), "Think about wet ground."),
  scienceQuestion("Which weather can make a kite fly?", "windy", ["rainy", "cloudy", "hot"], "Wind can help a kite fly.", "Moving air pushes a kite.", textVisual("Kite clue", "windy"), "Think about moving air."),
  scienceQuestion("Which weather word means not cold?", "hot", ["cold", "wet", "dark"], "Hot means warm or very warm.", "Hot and cold describe temperature.", textVisual("Temperature clue", "hot"), "Choose the warm word."),
  scienceQuestion("Which weather word means low temperature?", "cold", ["hot", "sunny", "dry"], "Cold means low temperature.", "Cold and hot are opposites.", textVisual("Temperature clue", "cold"), "Choose the cool word."),
  scienceQuestion("Which is safest during a storm?", "stay indoors", ["stand under a tree", "fly a kite", "play in puddles"], "Staying indoors is safer during a storm.", "Storms need careful choices.", textVisual("Storm safety clue", "stay indoors"), "Choose the safe action."),
  scienceQuestion("Which sentence is true?", "Rain comes from clouds.", ["Wind is a toy.", "Sunny means dark.", "Clouds are animals."], "Rain can fall from clouds.", "Weather clues are in the sky.", textVisual("Weather fact check", "Rain comes from clouds."), "Choose the true weather fact."),
];

const waterSeeds: ScienceSeed[] = [
  scienceQuestion("What do we drink to stay healthy?", "water", ["sand", "plastic", "glue"], "We drink water to stay healthy.", "Water is important for our body.", textVisual("Water use clue: drink", "water"), "Think about healthy drinking."),
  scienceQuestion("Which activity uses water?", "washing hands", ["reading a book", "drawing a star", "counting coins"], "Washing hands uses water.", "Water helps us clean.", textVisual("Water use clue: clean hands", "washing hands"), "Think about cleaning."),
  scienceQuestion("Which is water from the sky?", "rain", ["stone", "coin", "leaf"], "Rain is water that falls from clouds.", "Rain is part of weather.", textVisual("Water clue: sky", "rain"), "Think about rainy weather."),
  scienceQuestion("Which form of water is hard and cold?", "ice", ["steam", "rain", "juice"], "Ice is frozen water.", "Water can freeze into ice.", textVisual("Water form clue: hard and cold", "ice"), "Think about frozen water."),
  scienceQuestion("Which form of water looks like vapour?", "steam", ["ice", "stone", "shell"], "Steam is water vapour.", "Water can change form.", textVisual("Water form clue: vapour", "steam"), "Think about hot water."),
  scienceQuestion("Which animal needs water to swim?", "fish", ["rabbit", "tree", "pencil"], "A fish swims in water.", "Water is a home for some animals.", objectVisual("fish", "fish"), "Think about water animals."),
  scienceQuestion("Which thing can hold water?", "cup", ["leaf", "coin", "pencil"], "A cup can hold water for drinking.", "Containers can hold water.", textVisual("Water container clue", "cup"), "Think about what holds a drink."),
  scienceQuestion("Which is safe to do with clean water?", "drink it", ["spill it on wires", "throw it away", "mix it with dirt"], "Clean water can be safe to drink.", "Use clean water carefully.", textVisual("Clean water clue", "drink it"), "Choose the safe use."),
  scienceQuestion("Which is a place with lots of water?", "river", ["desk", "pencil case", "book"], "A river has lots of moving water.", "Rivers are water places.", textVisual("Water place clue", "river"), "Think about water in nature."),
  scienceQuestion("What should we do with water?", "save it", ["waste it", "hide it", "paint it"], "We should save water and use it carefully.", "Saving water helps everyone.", textVisual("Water care clue", "save it"), "Choose the caring action."),
  scienceQuestion("Which sentence is true?", "Plants need water.", ["Coins drink water.", "Ice is hot.", "Fish live in sand."], "Plants need water to grow.", "Water helps living things.", objectVisual("leaf", "Plants need water."), "Choose the true water fact."),
  scienceQuestion("What can rain help?", "plants grow", ["pencils fly", "coins eat", "balls read"], "Rain gives water that can help plants grow.", "Rain can help living things.", objectVisual("flower", "plants grow"), "Think about rain and plants."),
];

const materialSeeds: ScienceSeed[] = [
  scienceQuestion("What material can a pencil be made from?", "wood", ["water", "cloud", "rain"], "Many pencils are made from wood.", "Materials are what things are made from.", objectVisual("pencil", "wood"), "Think about the object material."),
  scienceQuestion("What material is a coin usually made from?", "metal", ["paper", "cloth", "rubber"], "Coins are usually made from metal.", "Metal can be hard and shiny.", objectVisual("coin", "metal"), "Look at the shiny object."),
  scienceQuestion("What material can a ball be made from?", "rubber", ["glass", "water", "soil"], "Some balls are made from rubber.", "Rubber can bounce.", objectVisual("ball", "rubber"), "Think about bouncing."),
  scienceQuestion("What material can a book page be made from?", "paper", ["metal", "water", "stone"], "Book pages are made from paper.", "Paper is a common classroom material.", textVisual("Material clue: book page", "paper"), "Think about pages."),
  scienceQuestion("Which material can be see-through?", "glass", ["wood", "stone", "soil"], "Glass can be see-through.", "See-through means light can pass through.", textVisual("Material clue: window", "glass"), "Think about windows."),
  scienceQuestion("Which material is soft for clothes?", "fabric", ["metal", "glass", "stone"], "Fabric can be soft and used for clothes.", "Fabric is a clothing material.", textVisual("Material clue: clothes", "fabric"), "Think about your shirt."),
  scienceQuestion("Which object is made from paper?", "sticker", ["fish", "duck", "tree"], "A sticker can be made from paper.", "Paper can be thin and light.", objectVisual("sticker", "sticker"), "Find the paper-like object."),
  scienceQuestion("Which material is hard?", "stone", ["fabric", "water", "air"], "Stone is hard.", "Materials can feel hard or soft.", objectVisual("stone", "stone"), "Think about how it feels."),
  scienceQuestion("Which material can float easily?", "wood", ["metal coin", "glass bottle", "stone"], "Many pieces of wood can float.", "Some materials float better than others.", objectVisual("tree", "wood"), "Think about wood in water."),
  scienceQuestion("Which object is made to carry things?", "box", ["leaf", "bee", "fish"], "A box is a made object that can carry things.", "Objects have jobs and materials.", objectVisual("box", "box"), "Find the container."),
  scienceQuestion("Which sentence is true?", "A coin is metal.", ["A fish is glass.", "A leaf is plastic.", "A pencil is rain."], "A coin is usually metal.", "Match objects to materials.", objectVisual("coin", "A coin is metal."), "Choose the true material fact."),
  scienceQuestion("Which material should be handled carefully because it can break?", "glass", ["rubber", "fabric", "paper"], "Glass can break, so we handle it carefully.", "Some materials need extra care.", textVisual("Breakable material clue", "glass"), "Think about safety."),
];

const environmentSeeds: ScienceSeed[] = [
  scienceQuestion("What should we do with rubbish?", "put it in a bin", ["throw it in a river", "hide it under leaves", "drop it on a path"], "Putting rubbish in a bin keeps places clean.", "Clean places help living things.", textVisual("Environment care clue", "put it in a bin"), "Choose the caring action."),
  scienceQuestion("Which action helps plants?", "water them", ["step on them", "pull them out", "cover them with plastic"], "Watering plants helps them grow.", "Care for plants gently.", objectVisual("flower", "water them"), "Think about helping plants."),
  scienceQuestion("Which place should be kept clean?", "river", ["rubbish pile", "dirty puddle", "broken bottle"], "A river should be kept clean for living things.", "Water places need care.", textVisual("Clean place clue", "river"), "Think about water homes."),
  scienceQuestion("Which animal needs a clean home?", "fish", ["coin", "pencil", "crayon"], "Fish need clean water homes.", "Animals need safe places.", objectVisual("fish", "fish"), "Think about an animal home."),
  scienceQuestion("Which item can grow into a plant?", "seed", ["coin", "ball", "stone"], "A seed can grow into a plant.", "Seeds help new plants begin.", objectVisual("nut", "seed"), "Find the plant starter."),
  scienceQuestion("Which action saves water?", "turn off the tap", ["leave tap running", "spill water", "wash one hand all day"], "Turning off the tap saves water.", "Small actions can protect water.", textVisual("Save water clue", "turn off the tap"), "Choose the water-saving action."),
  scienceQuestion("Which is part of the Earth?", "soil", ["pencil", "sticker", "crayon"], "Soil is part of the Earth and helps plants grow.", "Soil is important for plants.", textVisual("Earth clue: plants grow in it", "soil"), "Think about the ground."),
  scienceQuestion("Which thing should stay on a tree?", "leaves", ["rubbish", "plastic bag", "broken glass"], "Leaves belong on trees and help plants.", "Do not put rubbish on plants.", objectVisual("leaf", "leaves"), "Choose the natural thing."),
  scienceQuestion("Which action helps animals?", "keep homes clean", ["throw rubbish", "make loud danger", "spill oil"], "Clean homes help animals stay safe.", "Animals need safe habitats.", textVisual("Animal care clue", "keep homes clean"), "Choose the helpful action."),
  scienceQuestion("Which is a natural thing?", "pinecone", ["coin", "box", "sticker"], "A pinecone comes from a tree, so it is natural.", "Natural things come from nature.", objectVisual("pinecone", "pinecone"), "Find the nature clue."),
  scienceQuestion("Which sentence is true?", "Trees help living things.", ["Rubbish helps rivers.", "Fish live in pencils.", "Soil is a toy."], "Trees can give shade, homes, and air for living things.", "Trees are important in the environment.", objectVisual("tree", "Trees help living things."), "Choose the true environment fact."),
  scienceQuestion("What should we do on a forest path?", "walk carefully", ["break plants", "throw stones at animals", "drop rubbish"], "Walking carefully protects plants and animals.", "Forest explorers care for nature.", textVisual("Forest path care", "walk carefully"), "Choose the safe forest action."),
];

const challengeSeeds: ScienceSeed[] = [
  scienceQuestion("Which thing is living?", "tree", ["coin", "stone", "box"], "A tree is living because it grows and needs water.", "Use living thing clues.", objectVisual("tree", "tree"), "Ask if it grows."),
  scienceQuestion("Which plant part is often green?", "leaf", ["root", "coin", "shell"], "A leaf is often green.", "Leaves are plant parts.", objectVisual("leaf", "leaf"), "Look for the plant part."),
  scienceQuestion("Which animal lives in water?", "fish", ["rabbit", "bee", "bird"], "A fish lives in water.", "Think about animal homes.", objectVisual("fish", "fish"), "Match animal to home."),
  scienceQuestion("Which body part helps us hear?", "ears", ["eyes", "feet", "hands"], "Ears help us hear.", "Body parts have jobs.", textVisual("Body review: hear", "ears"), "Think about listening."),
  scienceQuestion("Which sense uses the nose?", "smell", ["taste", "sight", "touch"], "The nose helps us smell.", "Match body part to sense.", textVisual("Sense review: nose", "smell"), "Think about scents."),
  scienceQuestion("Which weather has water drops?", "rainy", ["sunny", "windy", "hot"], "Rainy weather has falling water drops.", "Look for weather clues.", textVisual("Weather review: water drops", "rainy"), "Think about clouds."),
  scienceQuestion("Which form of water is frozen?", "ice", ["steam", "rain", "river"], "Ice is frozen water.", "Water can change form.", textVisual("Water review: frozen", "ice"), "Think about cold water."),
  scienceQuestion("Which material is a coin usually made from?", "metal", ["paper", "fabric", "rubber"], "A coin is usually metal.", "Match object and material.", objectVisual("coin", "metal"), "Look at the shiny object."),
  scienceQuestion("Which action helps the environment?", "put rubbish in a bin", ["drop rubbish", "waste water", "break plants"], "Putting rubbish in a bin helps keep places clean.", "Choose the caring action.", textVisual("Environment review", "put rubbish in a bin"), "Think like a Forest Guardian."),
  scienceQuestion("Which sentence is true?", "Plants need water.", ["Fish live in trees.", "Glass is soft fabric.", "Eyes help us hear."], "Plants need water to grow.", "Choose the science fact.", objectVisual("flower", "Plants need water."), "Check each fact."),
  scienceQuestion("Which item is non-living?", "pencil", ["duck", "tree", "bee"], "A pencil is non-living because it does not grow.", "Made objects are often non-living.", objectVisual("pencil", "pencil"), "Find the made object."),
  scienceQuestion("Which choice keeps water safe?", "keep rivers clean", ["throw rubbish in water", "spill paint in drains", "waste clean water"], "Keeping rivers clean protects water and living things.", "Clean water helps life.", textVisual("Guardian water clue", "keep rivers clean"), "Choose the safe water action."),
];

export const scienceLevels: MvpLevel[] = [
  buildLevel(1, "Find living and non-living things around the Forest World.", livingSeeds),
  buildLevel(2, "Name plant parts and learn simple plant needs.", plantSeeds),
  buildLevel(3, "Explore animal features, homes, and movements.", animalSeeds),
  buildLevel(4, "Learn simple body parts and what they help us do.", bodySeeds),
  buildLevel(5, "Match the five senses to eyes, ears, nose, tongue, hands, and skin.", sensesSeeds),
  buildLevel(6, "Read weather clues and choose safe weather actions.", weatherSeeds),
  buildLevel(7, "Learn how we use water and how water changes.", waterSeeds),
  buildLevel(8, "Match everyday objects to simple materials and properties.", materialSeeds),
  buildLevel(9, "Make caring choices for plants, animals, water, and the forest.", environmentSeeds),
  buildLevel(10, "Show the Forest Guardian what you learned in Science Year 1.", challengeSeeds),
];

export function getScienceLevel(level: number) {
  return scienceLevels.find((item) => item.level === level);
}
