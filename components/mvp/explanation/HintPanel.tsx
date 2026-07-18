import Image from "next/image";
import type { VisualLearningType } from "@/data/mvp-forest-world";

const thinkModeHints: Record<VisualLearningType, string[]> = {
  counting: [
    "Touch each object once as you count.",
    "Move slowly from left to right.",
    "Say each number softly while pointing.",
    "The last number you say is the total.",
    "Check that no object is counted twice.",
  ],
  addition: [
    "Start with the first group, then count on.",
    "Join both groups before choosing.",
    "Keep the first number in your head.",
    "Count the new objects after the plus sign.",
    "Addition means the total gets bigger.",
  ],
  subtraction: [
    "Take away means remove first.",
    "Cross out first, then count what remains.",
    "Start with the bigger group.",
    "Only count the objects that are left.",
    "Subtraction makes the group smaller.",
  ],
  comparison: [
    "Count both groups before choosing.",
    "Look for the group with extra objects.",
    "Line the groups up in your mind.",
    "Bigger means more objects.",
    "Smaller means fewer objects.",
  ],
  matching: [
    "Match the amount, not just the picture.",
    "Count first, then choose the word or number.",
    "A number and a word can mean the same amount.",
    "Check that the answer has the same value.",
    "Look carefully at what the question asks.",
  ],
  none: [
    "Say the numbers in order.",
    "Look for what comes before and after.",
    "Use the number pattern to find the gap.",
    "Try reading the sequence aloud.",
    "The missing number belongs in the empty spot.",
  ],
};

const englishHintsByLevel: Record<number, string[]> = {
  1: [
    "Look carefully at the letter shape.",
    "Find the same letter family.",
    "Say the letter name slowly.",
    "Check if the letter is big or small.",
  ],
  2: [
    "Say the word slowly.",
    "Listen to the first sound.",
    "Start with the sound at the beginning.",
    "Look at the picture, then say the word.",
  ],
  3: [
    "Look at the picture.",
    "Say each word softly.",
    "Choose the word that names the picture.",
    "Match the picture to the word.",
  ],
  4: [
    "Look at the colour or shape clue.",
    "Say each answer word.",
    "Choose the word that matches the picture.",
    "Check the outline before choosing.",
  ],
  5: [
    "Think about home or school.",
    "Say each word and think where it belongs.",
    "Choose the familiar word.",
    "Look for a word you use every day.",
  ],
  6: [
    "Read the whole sentence.",
    "Try each word in the blank.",
    "Choose the word that sounds right.",
    "Read the sentence aloud.",
  ],
  7: [
    "Read the whole sentence.",
    "Look for the word that fits best.",
    "Check the first letter or final mark.",
    "Ask what the word does in the sentence.",
  ],
  8: [
    "Think about what the words mean.",
    "Find the word that belongs in the group.",
    "Look for words that go together.",
    "Choose the best match, not just a familiar word.",
  ],
  9: [
    "Read one sentence at a time.",
    "Look for the answer in the passage.",
    "Find the clue words before choosing.",
    "Read the question, then look back.",
  ],
  10: [
    "Use your best English helper skill.",
    "Read slowly and check the clue.",
    "Think like a Forest Reader.",
    "Look, say, and choose carefully.",
  ],
};

function getEnglishLevelFromSeed(seed: string) {
  const match = seed.match(/english-forest-l(\d{2})-/i);
  return match ? Number(match[1]) : null;
}

function isEnglishSeed(seed: string) {
  return /^english-/i.test(seed);
}

function getHintVisual(type: VisualLearningType, englishLevel: number | null) {
  if (englishLevel) {
    if (englishLevel === 1) return { icon: "Aa", example: "Match the letter shape." };
    if (englishLevel === 2) return { icon: "abc", example: "Say the word slowly." };
    if (englishLevel === 3 || englishLevel === 4) return { icon: "eye", example: "Look, then choose the word." };
    if (englishLevel === 6 || englishLevel === 7 || englishLevel === 9) return { icon: "read", example: "Read the whole sentence." };
    return { icon: "word", example: "Think about the word meaning." };
  }

  return {
    counting: { icon: "1 2 3", example: "Touch each object once." },
    addition: { icon: "+", example: "Group A plus Group B." },
    subtraction: { icon: "-", example: "Cross out what goes away." },
    comparison: { icon: ">", example: "Count both groups first." },
    matching: { icon: "=", example: "Match the amount shown." },
    none: { icon: "?", example: "Find the number clue." },
  }[type];
}

function hashText(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

export function getThinkModeHint(type: VisualLearningType, seed: string, fallback: string) {
  const englishLevel = getEnglishLevelFromSeed(seed);
  if (englishLevel) {
    const hints = englishHintsByLevel[englishLevel] ?? englishHintsByLevel[10];
    return hints[hashText(`${englishLevel}-${seed}`) % hints.length] ?? fallback;
  }

  const hints = thinkModeHints[type] ?? thinkModeHints.none;
  return hints[hashText(`${type}-${seed}`) % hints.length] ?? fallback;
}

function getHintTitle(nodeType?: string, seed = "") {
  if (isEnglishSeed(seed)) {
    if (/boss/i.test(nodeType ?? "")) return "Guardian Reading Tip";
    return "English Helper";
  }

  if (/boss/i.test(nodeType ?? "")) {
    const bossLabels = ["Guardian Hint", "Forest Tip", "Boss Hint"];
    return bossLabels[hashText(seed || nodeType || "boss") % bossLabels.length] ?? "Guardian Hint";
  }
  return "Try this";
}

export function HintPanel({
  hint,
  type,
  nodeType,
  messageSeed = "",
}: {
  hint: string;
  type: VisualLearningType;
  nodeType?: string;
  messageSeed?: string;
}) {
  const englishLevel = getEnglishLevelFromSeed(messageSeed);
  const isEnglish = Boolean(englishLevel);
  const rule = isEnglish
    ? {
        1: "Letters can be big or small.",
        2: "Words begin with sounds.",
        3: "Pictures can help us read words.",
        4: "Colour and shape words describe things.",
        5: "Some words belong at home or school.",
        6: "A sentence should sound complete.",
        7: "Words have jobs in sentences.",
        8: "Words can belong in groups.",
        9: "The passage gives the answer.",
        10: "Read the clue before choosing.",
      }[englishLevel ?? 10]
    : {
        counting: "Point to each object once.",
        addition: "Join the groups together.",
        subtraction: "Take away, then count what is left.",
        comparison: "Count both groups before choosing.",
        matching: "The number must match the amount.",
        none: "Look for the pattern or clue.",
      }[type];
  const visual = getHintVisual(type, englishLevel);
  const thinkHint = getThinkModeHint(type, messageSeed || hint, hint);
  const hintTitle = getHintTitle(nodeType, messageSeed);

  return (
    <aside
      className="relative overflow-hidden rounded-[2rem] border border-[#FFD76A] bg-gradient-to-b from-[#FFF7D6] via-white to-[#EAFBF0] p-4 shadow-playful"
      aria-label="Question hint"
    >
      <span className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-[#66CC00]/20" aria-hidden />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-wide text-[#B66A00]">{/boss/i.test(nodeType ?? "") ? "Forest Guardian" : isEnglish ? "Reading Hint" : "Helpful Hint"}</p>
        <div className="mt-3 flex justify-center">
          <div className="relative h-28 w-28 bg-transparent drop-shadow-lg">
            <Image
              src="/mascots/learnbot-happy.webp"
              alt="LearnBot offering a hint"
              fill
              sizes="112px"
              className="object-contain motion-safe:animate-pulse"
            />
          </div>
        </div>

        <div className="relative mt-3 rounded-[1.35rem] border border-[#FFD76A]/70 bg-white/95 p-4 shadow-sm">
          <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#FFD76A]/70 bg-white/95" aria-hidden />
          <h2 className="text-xl font-black text-[#082B80]">{hintTitle}</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-[#3F527E]">{thinkHint}</p>
        </div>

        <div className="mt-3 grid gap-3 rounded-[1.25rem] bg-white/85 p-3">
          <div className="flex min-h-12 items-center gap-3 rounded-2xl bg-[#EAF6FF] px-3 py-2">
            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-[#0B63F6] text-xs font-black text-white">
              {visual.icon}
            </span>
            <p className="text-sm font-black leading-5 text-[#082B80]">{visual.example}</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[#0B63F6]">{isEnglish ? "English tip" : "Math rule"}</p>
            <p className="mt-1 text-sm font-bold leading-6 text-[#5B6B94]">{rule}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
