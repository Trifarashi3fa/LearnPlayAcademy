import { CompactExplanationVisual } from "@/components/mvp/explanation/CompactExplanationVisual";
import { MathObjectIcon } from "@/components/mvp/explanation/MathObjectIcon";
import type {
  QuestionLearningContent,
  VisualLearningModel,
} from "@/data/mvp-forest-world";

const correctMessages = [
  "Excellent work!",
  "Nice counting!",
  "Great job!",
  "You solved it!",
  "Fantastic thinking!",
];

const englishCorrectMessages = [
  "Great reading!",
  "You found it!",
  "Nice word work!",
  "Brilliant listening!",
  "Great English thinking!",
];

const incorrectMessages = [
  "Almost there! Let us count again.",
  "Nice try! Look carefully at both groups.",
  "You are getting closer.",
  "Try one more time.",
  "Check the visual.",
  "Look slowly, then choose again next time.",
  "Good effort! Follow the steps.",
  "Close one. The picture can help.",
];

const englishIncorrectMessages = [
  "Good try. Let’s read it again.",
  "Almost there. Look at the word shape.",
  "Nice effort. Say it slowly.",
  "You are close. Check the picture clue.",
  "Let’s try the sound again.",
];

type EnglishLearningDetail = {
  meaning?: string;
  example?: string;
};

const englishLearningDetails: Record<string, EnglishLearningDetail> = {
  a: {
    meaning: "A is a letter of the alphabet.",
    example: "Apple begins with A.",
  },
  b: {
    meaning: "B is a letter of the alphabet.",
    example: "Bird begins with B.",
  },
  c: {
    meaning: "C is a letter of the alphabet.",
    example: "Cat begins with C.",
  },
  d: {
    meaning: "D is a letter of the alphabet.",
    example: "Duck begins with D.",
  },
  e: {
    meaning: "E is a letter of the alphabet.",
    example: "Egg begins with E.",
  },
  f: {
    meaning: "F is a letter of the alphabet.",
    example: "Fish begins with F.",
  },
  g: {
    meaning: "G is a letter of the alphabet.",
    example: "Green begins with G.",
  },
  h: {
    meaning: "H is a letter of the alphabet.",
    example: "Hat begins with H.",
  },
  i: {
    meaning: "I is a letter of the alphabet.",
    example: "Ink begins with I.",
  },
  j: {
    meaning: "J is a letter of the alphabet.",
    example: "Jump begins with J.",
  },
  k: {
    meaning: "K is a letter of the alphabet.",
    example: "Kite begins with K.",
  },
  l: {
    meaning: "L is a letter of the alphabet.",
    example: "Leaf begins with L.",
  },
  m: {
    meaning: "M is a letter of the alphabet.",
    example: "Moon begins with M.",
  },
  n: {
    meaning: "N is a letter of the alphabet.",
    example: "Nest begins with N.",
  },
  o: {
    meaning: "O is a letter of the alphabet.",
    example: "Orange begins with O.",
  },
  p: {
    meaning: "P is a letter of the alphabet.",
    example: "Pencil begins with P.",
  },
  q: {
    meaning: "Q is a letter of the alphabet.",
    example: "Queen begins with Q.",
  },
  r: {
    meaning: "R is a letter of the alphabet.",
    example: "Red begins with R.",
  },
  s: {
    meaning: "S is a letter of the alphabet.",
    example: "Star begins with S.",
  },
  t: {
    meaning: "T is a letter of the alphabet.",
    example: "Tree begins with T.",
  },
  u: {
    meaning: "U is a letter of the alphabet.",
    example: "Umbrella begins with U.",
  },
  v: {
    meaning: "V is a letter of the alphabet.",
    example: "Van begins with V.",
  },
  w: {
    meaning: "W is a letter of the alphabet.",
    example: "Water begins with W.",
  },
  x: {
    meaning: "X is a letter of the alphabet.",
    example: "Box ends with X.",
  },
  y: {
    meaning: "Y is a letter of the alphabet.",
    example: "Yellow begins with Y.",
  },
  z: {
    meaning: "Z is a letter of the alphabet.",
    example: "Zoo begins with Z.",
  },

  apple: {
    meaning: "An apple is a fruit.",
    example: "I eat an apple.",
  },
  bird: {
    meaning: "A bird is an animal with feathers.",
    example: "The bird can fly.",
  },
  fish: {
    meaning: "A fish is an animal that lives in water.",
    example: "The fish swims.",
  },
  flower: {
    meaning: "A flower is a colourful part of a plant.",
    example: "The flower is pretty.",
  },
  duck: {
    meaning: "A duck is a bird that can swim.",
    example: "The duck swims in the pond.",
  },
  tree: {
    meaning: "A tree is a tall plant.",
    example: "The tree has green leaves.",
  },
  star: {
    meaning: "A star is a bright object in the night sky.",
    example: "I can see a star.",
  },
  pencil: {
    meaning: "A pencil is used for writing or drawing.",
    example: "I write with a pencil.",
  },
  shell: {
    meaning: "A shell is a hard covering found on some animals.",
    example: "I found a shell near the water.",
  },
  bee: {
    meaning: "A bee is a small flying insect.",
    example: "The bee visits the flower.",
  },
  leaf: {
    meaning: "A leaf is a flat part of a plant.",
    example: "The leaf is green.",
  },
  ball: {
    meaning: "A ball is a round object used for playing.",
    example: "We play with a ball.",
  },
  orange: {
    meaning: "An orange is a round fruit.",
    example: "I eat an orange.",
  },

  mother: {
    meaning: "A mother is a female parent.",
    example: "My mother helps me.",
  },
  father: {
    meaning: "A father is a male parent.",
    example: "My father reads with me.",
  },
  sister: {
    meaning: "A sister is a girl or woman who shares your parents.",
    example: "My sister plays with me.",
  },
  brother: {
    meaning: "A brother is a boy or man who shares your parents.",
    example: "My brother is kind.",
  },
  grandma: {
    meaning: "A grandma is a grandmother.",
    example: "My grandma tells stories.",
  },
  teacher: {
    meaning: "A teacher is a person who helps children learn.",
    example: "The teacher reads a book.",
  },
  friend: {
    meaning: "A friend is someone you like and trust.",
    example: "I play with my friend.",
  },
  class: {
    meaning: "A class is a group of learners.",
    example: "Our class reads together.",
  },
  desk: {
    meaning: "A desk is a table used for schoolwork.",
    example: "My book is on the desk.",
  },
  book: {
    meaning: "A book has pages with words or pictures.",
    example: "I read a book.",
  },
  bag: {
    meaning: "A bag is used to carry things.",
    example: "My book is in my bag.",
  },
  chair: {
    meaning: "A chair is something we sit on.",
    example: "I sit on a chair.",
  },
  school: {
    meaning: "A school is a place where children learn.",
    example: "I go to school.",
  },

  red: {
    meaning: "Red is a colour.",
    example: "The apple is red.",
  },
  blue: {
    meaning: "Blue is a colour.",
    example: "The sky is blue.",
  },
  green: {
    meaning: "Green is a colour.",
    example: "The leaf is green.",
  },
  yellow: {
    meaning: "Yellow is a colour.",
    example: "The star is yellow.",
  },
  orange_colour: {
    meaning: "Orange is a colour.",
    example: "The orange fruit is orange.",
  },
  purple: {
    meaning: "Purple is a colour.",
    example: "The grapes are purple.",
  },
  black: {
    meaning: "Black is a very dark colour.",
    example: "The night sky looks black.",
  },

  circle: {
    meaning: "A circle is a round shape with no corners.",
    example: "The ball looks like a circle.",
  },
  square: {
    meaning: "A square has four equal sides.",
    example: "The tile is a square.",
  },
  triangle: {
    meaning: "A triangle has three sides.",
    example: "The sign is a triangle.",
  },
  rectangle: {
    meaning: "A rectangle has two long sides and two short sides.",
    example: "The door is a rectangle.",
  },
  oval: {
    meaning: "An oval is a rounded shape like an egg.",
    example: "The egg has an oval shape.",
  },

  jump: {
    meaning: "Jump means to push your body up from the ground.",
    example: "I can jump.",
  },
  read: {
    meaning: "Read means to look at and understand words.",
    example: "I read a book.",
  },
  write: {
    meaning: "Write means to make letters or words.",
    example: "I write my name.",
  },
  run: {
    meaning: "Run means to move quickly on your feet.",
    example: "I can run.",
  },
  small: {
    meaning: "Small means not big.",
    example: "The bee is small.",
  },
  happy: {
    meaning: "Happy means feeling pleased or glad.",
    example: "I am happy.",
  },
  hello: {
    meaning: "Hello is a word used to greet someone.",
    example: "I say hello to my friend.",
  },

  am: {
    meaning: "Am is used with the word I.",
    example: "I am happy.",
  },
  is: {
    meaning: "Is can tell us about one person or thing.",
    example: "She is kind.",
  },
  are: {
    meaning: "Are can tell us about more than one person or thing.",
    example: "They are happy.",
  },

  cats: {
    meaning: "Cats means more than one cat.",
    example: "The cats are sleeping.",
  },
  books: {
    meaning: "Books means more than one book.",
    example: "The books are on the desk.",
  },

  "the bee": {
    meaning: "The bee means one specific bee.",
    example: "The bee is small.",
  },
  "a ball": {
    meaning: "A ball is a round object used for playing.",
    example: "We play with a ball.",
  },
  "a book": {
    meaning: "A book has pages with words or pictures.",
    example: "I read a book.",
  },
  "an orange": {
    meaning: "An orange is a round fruit.",
    example: "I eat an orange.",
  },
  "on the desk": {
    meaning: "On the desk tells us where something is.",
    example: "The pencil is on the desk.",
  },
  reads: {
    meaning: "Reads means looks at and understands words.",
    example: "Ben reads a book.",
  },
  "fish and water": {
    meaning: "Fish and water go together because fish live in water.",
    example: "The fish swims in water.",
  },
  "teacher and school": {
    meaning: "A teacher works and helps children at school.",
    example: "The teacher is at school.",
  },
};

function isEnglishContent(content: QuestionLearningContent) {
  return content.levelId.startsWith("english-");
}

function normalizeEnglishAnswer(answer: string) {
  const clean = answer.trim().toLowerCase();

  if (clean === "orange") {
    return "orange";
  }

  return clean;
}

function isSingleLetter(answer: string) {
  return /^[a-z]$/i.test(answer.trim());
}

function isSentenceAnswer(answer: string) {
  const clean = answer.trim();

  return (
    clean.includes(" ") &&
    (clean.endsWith(".") ||
      clean.endsWith("?") ||
      clean.endsWith("!") ||
      clean.split(/\s+/).length >= 4)
  );
}

function getEnglishLearningDetail(
  content: QuestionLearningContent,
  correctAnswer: string,
): EnglishLearningDetail {
  const normalizedAnswer = normalizeEnglishAnswer(correctAnswer);
  const exactDetail = englishLearningDetails[normalizedAnswer];

  if (exactDetail) {
    return exactDetail;
  }

  if (isSingleLetter(correctAnswer)) {
    const letter = correctAnswer.toUpperCase();

    return {
      meaning: `${letter} is a letter of the alphabet.`,
      example: `Can you find another word that begins with ${letter}?`,
    };
  }

  if (isSentenceAnswer(correctAnswer)) {
    return {
      meaning: "This is the sentence that best matches the clue.",
      example: correctAnswer,
    };
  }

  if (content.levelId.includes("level-1")) {
    return {
      meaning: `${correctAnswer} is the letter that matches the clue.`,
      example: `Say the letter: ${correctAnswer}.`,
    };
  }

  if (content.levelId.includes("level-2")) {
    return {
      meaning: `${correctAnswer} is the beginning sound in this word.`,
      example: `Say the word slowly and listen for ${correctAnswer}.`,
    };
  }

  if (content.levelId.includes("level-4")) {
    return {
      meaning: `${correctAnswer} is the colour or shape word that matches.`,
      example: content.visualExplanation,
    };
  }

  if (content.levelId.includes("level-6")) {
    return {
      meaning: `${correctAnswer} completes the sentence.`,
      example: content.visualExplanation,
    };
  }

  if (content.levelId.includes("level-7")) {
    return {
      meaning: `${correctAnswer} makes the sentence correct.`,
      example: content.visualExplanation,
    };
  }

  if (content.levelId.includes("level-8")) {
    return {
      meaning: `${correctAnswer} belongs with the word group.`,
      example: content.visualExplanation,
    };
  }

  if (content.levelId.includes("level-9")) {
    return {
      meaning: `${correctAnswer} is supported by the reading clue.`,
      example: content.visualExplanation,
    };
  }

  return {
    meaning: `${correctAnswer} matches the English clue.`,
    example: content.visualExplanation,
  };
}

function getVisualAction(type: VisualLearningModel["type"]) {
  return {
    counting: "Count each object one time.",
    addition: "Put the groups together.",
    subtraction: "Cross out what goes away.",
    comparison: "Count both groups first.",
    matching: "Match the amount shown.",
    none: "Look for the number clue.",
  }[type];
}

function getTeachingSteps(
  content: QuestionLearningContent,
  correctAnswer: string,
) {
  const fallbackSteps = [
    "Read the question.",
    getVisualAction(content.visual.type),
    `The answer is ${correctAnswer}.`,
  ];

  const source =
    content.steps.length >= 3 ? content.steps : fallbackSteps;

  return [
    {
      label: "Step 1",
      body: shorten(source[0] ?? fallbackSteps[0], 64),
    },
    {
      label: "Step 2",
      body: shorten(source[1] ?? fallbackSteps[1], 64),
    },
    {
      label: "Step 3",
      body: shorten(source[2] ?? fallbackSteps[2], 64),
    },
  ];
}

function shorten(value: string, maxLength = 72) {
  const clean = value.replace(/\s+/g, " ").trim();
  const firstSentence =
    clean.split(/(?<=[.!?])\s+/)[0] ?? clean;

  return firstSentence.length > maxLength
    ? `${firstSentence.slice(0, maxLength - 3).trim()}...`
    : firstSentence;
}

function hashText(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }

  return Math.abs(hash);
}

function pickMessage(messages: string[], seed: string) {
  return messages[hashText(seed) % messages.length] ?? messages[0];
}

function getWrongAnswerBody(
  type: VisualLearningModel["type"],
  selectedAnswer: string | null | undefined,
) {
  const prefix = selectedAnswer
    ? `You chose ${selectedAnswer}. `
    : "";

  return {
    counting: `${prefix}Count each object one more time.`,
    addition: `${prefix}Join both groups, then count the total.`,
    subtraction: `${prefix}Cross out first, then count what remains.`,
    comparison: `${prefix}Look carefully at both groups.`,
    matching: `${prefix}Match the amount to the number or word.`,
    none: `${prefix}Follow the complete number sequence.`,
  }[type];
}

function getEnglishWrongAnswerBody(
  selectedAnswer: string | null | undefined,
) {
  return selectedAnswer
    ? `You chose ${selectedAnswer}. Read the clue again and look carefully.`
    : "Read the clue again and look carefully.";
}

function getStatusCopy(
  content: QuestionLearningContent,
  selectedAnswer: string | null | undefined,
  correctAnswer: string,
) {
  const correct = selectedAnswer === correctAnswer;
  const seed = `${content.levelId}-${content.visual.accessibleLabel}-${correctAnswer}-${selectedAnswer ?? "none"}`;

  if (isEnglishContent(content)) {
    if (correct) {
      return {
        label: "Correct",
        title: pickMessage(englishCorrectMessages, seed),
        body: `${correctAnswer} matches the English clue.`,
        className:
          "border-[#22C55E]/45 bg-[#DCFCE7] text-[#15803D]",
      };
    }

    return {
      label: "Review",
      title: pickMessage(englishIncorrectMessages, seed),
      body: getEnglishWrongAnswerBody(selectedAnswer),
      className:
        "border-[#FF4FA0]/35 bg-[#FFF0F7] text-[#B91C1C]",
    };
  }

  if (correct) {
    return {
      label: "Correct",
      title: pickMessage(correctMessages, seed),
      body: "The visual and answer match.",
      className:
        "border-[#22C55E]/45 bg-[#DCFCE7] text-[#15803D]",
    };
  }

  return {
    label: "Review",
    title: pickMessage(incorrectMessages, seed),
    body: getWrongAnswerBody(
      content.visual.type,
      selectedAnswer,
    ),
    className:
      "border-[#FF4FA0]/35 bg-[#FFF0F7] text-[#B91C1C]",
  };
}

function EnglishVisualRecap({
  content,
  correctAnswer,
}: {
  content: QuestionLearningContent;
  correctAnswer: string;
}) {
  const visual = content.visual;
  const object = visual.objects?.[0] ?? visual.object;

  const hasPicture =
    visual.type === "matching" &&
    object !== "object" &&
    object !== "number";

  return (
    <div className="rounded-[1.15rem] border border-[#DDE8F5] bg-white p-3">
      <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#FF4FA0]">
        Visual
      </p>

      <div className="mt-2 grid min-w-0 gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
        {hasPicture ? (
          <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] bg-[#EAF6FF] shadow-sm">
            <MathObjectIcon
              object={object}
              className="h-14 w-14"
            />
          </div>
        ) : null}

        <div className="min-w-0">
          <p className="break-words text-base font-black leading-6 text-[#082B80]">
            {visual.equation ?? content.visualExplanation}
          </p>

          <p className="mt-1 break-words text-sm font-bold leading-5 text-[#5B6B94]">
            {shorten(content.visualExplanation, 110)}
          </p>

          <p className="mt-2 inline-flex max-w-full rounded-full bg-[#DCFCE7] px-3 py-1.5 text-sm font-black text-[#15803D]">
            Answer: {correctAnswer}
          </p>
        </div>
      </div>
    </div>
  );
}

function EnglishTeachingSection({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <section className="min-w-0 rounded-[1rem] border border-[#DDE8F5] bg-white px-3 py-2 shadow-sm">
      <p className="text-[0.66rem] font-black uppercase tracking-wide text-[#0B63F6]">
        {label}
      </p>

      <h3 className="mt-0.5 text-sm font-black leading-5 text-[#082B80]">
        {title}
      </h3>

      <p className="mt-1 break-words text-xs font-bold leading-5 text-[#3F527E] sm:text-sm">
        {body}
      </p>
    </section>
  );
}

function EnglishExplanation({
  content,
  correctAnswer,
  selectedAnswer,
}: {
  content: QuestionLearningContent;
  correctAnswer: string;
  selectedAnswer?: string | null;
}) {
  const status = getStatusCopy(
    content,
    selectedAnswer,
    correctAnswer,
  );

  const teachingSteps = getTeachingSteps(
    content,
    correctAnswer,
  );

  const isCorrect = selectedAnswer === correctAnswer;
  const voiceLine = shorten(content.voiceScript, 120);

  const learningDetail = getEnglishLearningDetail(
    content,
    correctAnswer,
  );

  return (
    <section
      className="lp-reveal-soft flex h-full min-h-0 max-w-full flex-col overflow-hidden rounded-[1.35rem] border border-[#BDE7D0] bg-gradient-to-br from-[#F8FBFF] via-white to-[#EAFBF0] shadow-sm transition-all duration-200 motion-reduce:transition-none lg:h-auto lg:overflow-visible"
      aria-label="English learning notes"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2.5 sm:p-3 lg:overflow-visible lg:p-2.5">
        <div
          className={`shrink-0 rounded-[1rem] border px-3 py-2 transition-all duration-200 motion-reduce:transition-none ${
            isCorrect ? "lp-correct-glow" : "lp-shake-soft"
          } ${status.className}`}
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full bg-white/70 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide">
              {status.label}
            </p>

            <h2 className="text-base font-black leading-tight text-[#082B80]">
              {status.title}
            </h2>
          </div>

          <p className="mt-1 text-sm font-bold leading-5 text-[#3F527E]">
            {status.body}
          </p>
        </div>

        <EnglishVisualRecap
          content={content}
          correctAnswer={correctAnswer}
        />

        <ol className="grid shrink-0 gap-1.5 sm:grid-cols-3">
          {teachingSteps.map((step, index) => (
            <li
              key={step.label}
              className="grid min-w-0 grid-cols-[1.65rem_1fr] items-start gap-1.5 rounded-[0.95rem] bg-white px-2 py-1.5 shadow-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0B63F6] text-[0.68rem] font-black text-white">
                {index + 1}
              </span>

              <div className="min-w-0">
                <p className="text-[0.66rem] font-black uppercase tracking-wide text-[#0B63F6]">
                  {step.label}
                </p>

                <p className="text-xs font-bold leading-4 text-[#3F527E]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid shrink-0 gap-2 sm:grid-cols-2">
          <EnglishTeachingSection
            label="Voice"
            title="Read aloud"
            body={voiceLine}
          />

          {learningDetail.meaning ? (
            <EnglishTeachingSection
              label="Word meaning"
              title={correctAnswer}
              body={learningDetail.meaning}
            />
          ) : null}

          {learningDetail.example ? (
            <EnglishTeachingSection
              label="Example"
              title="Use it"
              body={learningDetail.example}
            />
          ) : null}

          <EnglishTeachingSection
            label="LearnBot tip"
            title="Try this"
            body={shorten(content.learnBotTip, 92)}
          />
        </div>
      </div>
    </section>
  );
}

function MathExplanation({
  content,
  correctAnswer,
  selectedAnswer,
}: {
  content: QuestionLearningContent;
  correctAnswer: string;
  selectedAnswer?: string | null;
}) {
  const status = getStatusCopy(
    content,
    selectedAnswer,
    correctAnswer,
  );

  const teachingSteps = getTeachingSteps(
    content,
    correctAnswer,
  );

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <section
      className="lp-reveal-soft flex h-full min-h-0 max-w-full flex-col overflow-hidden rounded-[1.35rem] border border-[#BDE7D0] bg-gradient-to-br from-[#F8FBFF] via-white to-[#EAFBF0] shadow-sm transition-all duration-200 motion-reduce:transition-none lg:h-auto lg:overflow-visible"
      aria-label="Answer explanation"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2.5 sm:p-3 lg:gap-1.5 lg:overflow-visible lg:p-2">
        <div
          className={`shrink-0 rounded-[1rem] border px-2.5 py-1.5 transition-all duration-200 motion-reduce:transition-none ${
            isCorrect ? "lp-correct-glow" : "lp-shake-soft"
          } ${status.className}`}
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full bg-white/70 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide">
              {status.label}
            </p>

            <h2 className="text-base font-black leading-tight text-[#082B80]">
              {status.title}
            </h2>
          </div>

          <p className="mt-0.5 text-xs font-bold leading-4 text-[#3F527E] sm:text-sm sm:leading-5">
            {status.body}
          </p>
        </div>

        <div className="lp-reveal-soft min-h-0 shrink-0">
          <CompactExplanationVisual
            visual={content.visual}
            correctAnswer={correctAnswer}
          />
        </div>

        <ol className="grid shrink-0 gap-1.5 sm:grid-cols-3 lg:grid-cols-3">
          {teachingSteps.map((step, index) => (
            <li
              key={step.label}
              className="grid min-w-0 grid-cols-[1.65rem_1fr] items-start gap-1.5 rounded-[0.95rem] bg-white px-2 py-1.5 shadow-sm"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0B63F6] text-[0.68rem] font-black text-white">
                {index + 1}
              </span>

              <div className="min-w-0">
                <p className="text-[0.66rem] font-black uppercase tracking-wide text-[#0B63F6]">
                  {step.label}
                </p>

                <p className="text-xs font-bold leading-4 text-[#3F527E]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid shrink-0 gap-1.5 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div className="rounded-[0.95rem] border border-[#22C55E]/45 bg-[#DCFCE7] px-2.5 py-1.5">
            <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#15803D]">
              {isCorrect ? "Answer" : "Correct answer"}
            </p>

            <p className="mt-0.5 text-sm font-black leading-tight text-[#082B80] sm:text-base">
              {isCorrect
                ? `Answer: ${correctAnswer}`
                : `Correct answer: ${correctAnswer}`}
            </p>
          </div>

          <div className="rounded-[0.95rem] border border-[#FFD76A] bg-[#FFF7D6] px-2.5 py-1.5">
            <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#B66A00]">
              LearnBot tip
            </p>

            <p className="mt-0.5 text-xs font-black leading-4 text-[#082B80] sm:text-sm sm:leading-5">
              {shorten(content.learnBotTip, 78)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExplanationTabs({
  content,
  correctAnswer,
  selectedAnswer,
}: {
  content: QuestionLearningContent;
  correctAnswer: string;
  selectedAnswer?: string | null;
  compact?: boolean;
}) {
  if (isEnglishContent(content)) {
    return (
      <EnglishExplanation
        content={content}
        correctAnswer={correctAnswer}
        selectedAnswer={selectedAnswer}
      />
    );
  }

  return (
    <MathExplanation
      content={content}
      correctAnswer={correctAnswer}
      selectedAnswer={selectedAnswer}
    />
  );
}