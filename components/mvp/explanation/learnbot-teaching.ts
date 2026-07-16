export type LearnBotState =
  | "idle"
  | "thinking"
  | "correct"
  | "incorrect"
  | "hint"
  | "celebration"
  | "boss"
  | "complete"
  | "perfect"
  | "loading";

type LearnBotMessageOptions = {
  state: LearnBotState;
  seed?: string;
  tip?: string;
  selectedAnswer?: string | null;
  correctAnswer?: string;
  focus?: "steps" | "visual" | "voice" | "tip" | "completion";
};

type LearnBotMessage = {
  eyebrow: string;
  heading: string;
  body: string;
  followUp: string;
};

const stateImages: Record<LearnBotState, string> = {
  idle: "/mascots/learnbot-front.webp",
  thinking: "/mascots/learnbot-thinking.webp",
  correct: "/mascots/learnbot-celebrate.webp",
  incorrect: "/mascots/learnbot-explaining.webp",
  hint: "/mascots/learnbot-happy.webp",
  celebration: "/mascots/learnbot-trophy.webp",
  boss: "/mascots/learnbot-trophy.webp",
  complete: "/mascots/learnbot-celebrate.webp",
  perfect: "/mascots/learnbot-trophy.webp",
  loading: "/mascots/learnbot-happy.webp",
};

const baseMessages: Record<LearnBotState, LearnBotMessage[]> = {
  idle: [
    {
      eyebrow: "LearnBot is ready",
      heading: "Look first",
      body: "Check the picture. Then choose your answer.",
      followUp: "Small steps make strong math thinking.",
    },
    {
      eyebrow: "Learning helper",
      heading: "Take your time",
      body: "The picture gives you a clue.",
      followUp: "Try one careful count.",
    },
  ],
  thinking: [
    {
      eyebrow: "Think mode",
      heading: "Look. Count. Choose.",
      body: "Use the visual first. Match it to the answers.",
      followUp: "You can solve this one step at a time.",
    },
    {
      eyebrow: "Ready to help",
      heading: "Start with the clue",
      body: "Find what the question asks.",
      followUp: "Careful looking is part of math.",
    },
    {
      eyebrow: "Mission tip",
      heading: "Use the picture",
      body: "Point to each object or group.",
      followUp: "Your brain is doing the important work.",
    },
  ],
  correct: [
    {
      eyebrow: "Great counting",
      heading: "You did it",
      body: "Your answer matches the visual.",
      followUp: "Read the steps to make the idea stick.",
    },
    {
      eyebrow: "Correct",
      heading: "Nice math move",
      body: "The picture and number agree.",
      followUp: "Now check why it works.",
    },
    {
      eyebrow: "Fantastic",
      heading: "Strong focus",
      body: "You used the clue well.",
      followUp: "Keep building that skill.",
    },
  ],
  incorrect: [
    {
      eyebrow: "Learning moment",
      heading: "Let us check",
      body: "Your answer was close. Count again slowly.",
      followUp: "Mistakes help us find the next step.",
    },
    {
      eyebrow: "Try this way",
      heading: "Back to the picture",
      body: "Look at the groups first.",
      followUp: "You are still learning.",
    },
    {
      eyebrow: "Good effort",
      heading: "One more check",
      body: "The notes show where the answer comes from.",
      followUp: "Stay curious and keep going.",
    },
  ],
  hint: [
    {
      eyebrow: "Helpful hint",
      heading: "Use a strategy",
      body: "Break the problem into small parts.",
      followUp: "The visual is your best clue.",
    },
    {
      eyebrow: "Hint mode",
      heading: "Slow it down",
      body: "Say each number in order.",
      followUp: "One object, one count.",
    },
  ],
  celebration: [
    {
      eyebrow: "Mission complete",
      heading: "You earned it",
      body: "You finished the level and grew your math power.",
      followUp: "Celebrate, then choose your next mission.",
    },
    {
      eyebrow: "Reward time",
      heading: "Fantastic effort",
      body: "Every question helped you practice.",
      followUp: "Your next adventure is ready.",
    },
  ],
  boss: [
    {
      eyebrow: "Boss challenge",
      heading: "Forest Guardian time",
      body: "Use every skill you have practiced.",
      followUp: "Stay calm. Check the visual.",
    },
  ],
  complete: [
    {
      eyebrow: "Level complete",
      heading: "Mission cleared",
      body: "You kept going and finished the lesson.",
      followUp: "Your progress is growing.",
    },
  ],
  perfect: [
    {
      eyebrow: "Perfect score",
      heading: "Trophy moment",
      body: "Every answer was correct.",
      followUp: "That is careful learning.",
    },
  ],
  loading: [
    {
      eyebrow: "Loading",
      heading: "LearnBot is waving",
      body: "Your next learning mission is getting ready.",
      followUp: "See you in a second.",
    },
  ],
};

const focusLines: Record<NonNullable<LearnBotMessageOptions["focus"]>, string> = {
  steps: "Follow Step 1, Step 2, and Step 3.",
  visual: "The visual shows the math idea.",
  voice: "Listen once, then say the strategy.",
  tip: "Remember this shortcut for next time.",
  completion: "Look at your stars, XP, and next mission.",
};

function pickVariant(seed: string | undefined, length: number) {
  if (length <= 1) return 0;
  const value = Array.from(seed ?? "learnbot").reduce((total, character) => total + character.charCodeAt(0), 0);
  return value % length;
}

export function getLearnBotImage(state: LearnBotState) {
  return stateImages[state];
}

export function getLearnBotMessage({
  state,
  seed,
  tip,
  selectedAnswer,
  correctAnswer,
  focus,
}: LearnBotMessageOptions): LearnBotMessage {
  const variants = baseMessages[state];
  const message = variants[pickVariant(seed, variants.length)];
  const focusLine = focus ? focusLines[focus] : "";
  const answerLine = state === "incorrect" && selectedAnswer && correctAnswer
    ? ` You chose ${selectedAnswer}. The answer is ${correctAnswer}.`
    : "";
  const tipLine = tip ? ` ${tip}` : "";

  return {
    ...message,
    body: `${message.body}${answerLine}`,
    followUp: `${focusLine || message.followUp}${tipLine && focus === "tip" ? tipLine : ""}`,
  };
}
