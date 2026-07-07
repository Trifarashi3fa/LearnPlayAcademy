import { CompactExplanationVisual } from "@/components/mvp/explanation/CompactExplanationVisual";
import type { QuestionLearningContent, VisualLearningModel } from "@/data/mvp-forest-world";

const correctMessages = [
  "Excellent work!",
  "Nice counting!",
  "Great job!",
  "You solved it!",
  "Fantastic thinking!",
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

function getTeachingSteps(content: QuestionLearningContent, correctAnswer: string) {
  const fallbackSteps = [
    "Read the question.",
    getVisualAction(content.visual.type),
    `The answer is ${correctAnswer}.`,
  ];
  const source = content.steps.length >= 3 ? content.steps : fallbackSteps;

  return [
    { label: "Step 1", body: shorten(source[0] ?? fallbackSteps[0], 64) },
    { label: "Step 2", body: shorten(source[1] ?? fallbackSteps[1], 64) },
    { label: "Step 3", body: shorten(source[2] ?? fallbackSteps[2], 64) },
  ];
}

function shorten(value: string, maxLength = 72) {
  const clean = value.replace(/\s+/g, " ").trim();
  const firstSentence = clean.split(/(?<=[.!?])\s+/)[0] ?? clean;
  return firstSentence.length > maxLength ? `${firstSentence.slice(0, maxLength - 3).trim()}...` : firstSentence;
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

function getWrongAnswerBody(type: VisualLearningModel["type"], selectedAnswer: string | null | undefined) {
  const prefix = selectedAnswer ? `You chose ${selectedAnswer}. ` : "";
  return {
    counting: `${prefix}Count each object one more time.`,
    addition: `${prefix}Join both groups, then count the total.`,
    subtraction: `${prefix}Cross out first, then count what remains.`,
    comparison: `${prefix}Look carefully at both groups.`,
    matching: `${prefix}Match the amount to the number or word.`,
    none: `${prefix}Follow the complete number sequence.`,
  }[type];
}

function getStatusCopy(
  content: QuestionLearningContent,
  selectedAnswer: string | null | undefined,
  correctAnswer: string,
) {
  const correct = selectedAnswer === correctAnswer;
  const seed = `${content.levelId}-${content.visual.accessibleLabel}-${correctAnswer}-${selectedAnswer ?? "none"}`;

  if (correct) {
    return {
      label: "Correct",
      title: pickMessage(correctMessages, seed),
      body: "The visual and answer match.",
      className: "border-[#22C55E]/45 bg-[#DCFCE7] text-[#15803D]",
    };
  }

  return {
    label: "Review",
    title: pickMessage(incorrectMessages, seed),
    body: getWrongAnswerBody(content.visual.type, selectedAnswer),
    className: "border-[#FF4FA0]/35 bg-[#FFF0F7] text-[#B91C1C]",
  };
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
  const status = getStatusCopy(content, selectedAnswer, correctAnswer);
  const teachingSteps = getTeachingSteps(content, correctAnswer);
  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <section
      className="flex h-full min-h-0 max-w-full flex-col overflow-hidden rounded-[1.35rem] border border-[#BDE7D0] bg-gradient-to-br from-[#F8FBFF] via-white to-[#EAFBF0] shadow-sm lg:h-auto lg:overflow-visible"
      aria-label="Answer explanation"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-2.5 sm:p-3 lg:gap-1.5 lg:overflow-visible lg:p-2">
        <div className={`shrink-0 rounded-[1rem] border px-2.5 py-1.5 ${status.className}`} aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <p className="rounded-full bg-white/70 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-wide">
              {status.label}
            </p>
            <h2 className="text-base font-black leading-tight text-[#082B80]">{status.title}</h2>
          </div>
          <p className="mt-0.5 text-xs font-bold leading-4 text-[#3F527E] sm:text-sm sm:leading-5">{status.body}</p>
        </div>

        <div className="min-h-0 shrink-0">
          <CompactExplanationVisual visual={content.visual} correctAnswer={correctAnswer} />
        </div>

        <ol className="grid shrink-0 gap-1.5 sm:grid-cols-3 lg:grid-cols-3">
          {teachingSteps.map((step, index) => (
            <li key={step.label} className="grid min-w-0 grid-cols-[1.65rem_1fr] items-start gap-1.5 rounded-[0.95rem] bg-white px-2 py-1.5 shadow-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0B63F6] text-[0.68rem] font-black text-white">
                {index + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[0.66rem] font-black uppercase tracking-wide text-[#0B63F6]">{step.label}</p>
                <p className="text-xs font-bold leading-4 text-[#3F527E]">{step.body}</p>
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
              {isCorrect ? `Answer: ${correctAnswer}` : `Correct answer: ${correctAnswer}`}
            </p>
          </div>
          <div className="rounded-[0.95rem] border border-[#FFD76A] bg-[#FFF7D6] px-2.5 py-1.5">
            <p className="text-[0.68rem] font-black uppercase tracking-wide text-[#B66A00]">LearnBot tip</p>
            <p className="mt-0.5 text-xs font-black leading-4 text-[#082B80] sm:text-sm sm:leading-5">{shorten(content.learnBotTip, 78)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}