import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const moduleCache = new Map();

function resolveRequest(request, parentFile) {
  const basePath = request.startsWith("@/")
    ? path.join(root, request.slice(2))
    : request.startsWith(".")
      ? path.resolve(path.dirname(parentFile), request)
      : request;

  if (!path.isAbsolute(basePath)) return basePath;
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;

  for (const extension of [".ts", ".tsx", ".js", ".json"]) {
    const candidate = `${basePath}${extension}`;
    if (fs.existsSync(candidate)) return candidate;
  }

  return basePath;
}

function loadModule(filename) {
  const resolved = path.normalize(filename);
  if (moduleCache.has(resolved)) return moduleCache.get(resolved).exports;

  if (resolved.endsWith(".json")) {
    const jsonModule = { exports: JSON.parse(fs.readFileSync(resolved, "utf8")) };
    moduleCache.set(resolved, jsonModule);
    return jsonModule.exports;
  }

  if (!resolved.endsWith(".ts") && !resolved.endsWith(".tsx") && !resolved.endsWith(".js")) {
    throw new Error(`Unsupported test module import: ${resolved}`);
  }

  const loadedModule = { exports: {} };
  moduleCache.set(resolved, loadedModule);

  const source = fs.readFileSync(resolved, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      resolveJsonModule: true,
    },
    fileName: resolved,
  }).outputText;

  const localRequire = (request) => loadModule(resolveRequest(request, resolved));
  const context = vm.createContext({
    console,
    exports: loadedModule.exports,
    module: loadedModule,
    require: localRequire,
    __dirname: path.dirname(resolved),
    __filename: resolved,
    process,
  });

  vm.runInContext(output, context, { filename: resolved });
  return loadedModule.exports;
}

const englishWorldModule = loadModule(path.join(root, "data/mvp-english-world.ts"));
const { englishLevels } = englishWorldModule;

const bannedMathPhrases = [
  "math rule",
  "number pattern",
  "count the amount",
  "find the number clue",
  "use the number clue",
  "nice counting",
  "count both groups",
];

const unsuitablePhrases = [
  "i before e",
  "subordinate clause",
  "adverbial",
  "phoneme-grapheme correspondence",
  "morpheme",
];

const problems = [];
const ids = new Set();
const allQuestions = [];

function addProblem(message) {
  problems.push(message);
}

function includesBannedPhrase(value, phrases) {
  const lower = String(value ?? "").toLowerCase();
  return phrases.find((phrase) => lower.includes(phrase));
}

function visibleVisualText(question) {
  return [question.visual?.equation, question.visual?.accessibleLabel].filter(Boolean).join(" ");
}

function isReadingQuestion(question) {
  return question.topic === "Reading Practice";
}

for (const level of englishLevels) {
  if (level.questions.length < 12) addProblem(`Level ${level.level} has fewer than 12 source questions.`);
  if (level.sessionQuestionCount !== 10) addProblem(`Level ${level.level} does not select exactly 10 session questions.`);
  if (!level.randomizeQuestions) addProblem(`Level ${level.level} does not enable randomized sessions.`);

  const exactQuestionTexts = new Set();
  for (const question of level.questions) {
    allQuestions.push(question);
    exactQuestionTexts.add(question.question);

    if (ids.has(question.id)) addProblem(`Duplicate English question ID: ${question.id}`);
    ids.add(question.id);

    if (!question.options.includes(question.correctAnswer)) addProblem(`${question.id} correct answer is missing from options.`);
    if (new Set(question.options).size !== question.options.length) addProblem(`${question.id} has duplicate options.`);
    if (!question.explanation || !question.learnBotTip || !question.voiceScript || !question.visualExplanation) {
      addProblem(`${question.id} is missing explanation, LearnBot, voice, or visual teaching content.`);
    }
    if (!Array.isArray(question.steps) || question.steps.length < 3) addProblem(`${question.id} does not have three teaching steps.`);

    const joinedText = [question.question, question.explanation, question.learnBotTip, question.voiceScript, question.visualExplanation, ...(question.steps ?? [])].join(" \n ");
    const bannedMath = includesBannedPhrase(joinedText, bannedMathPhrases);
    if (bannedMath) addProblem(`${question.id} contains Math-specific phrase: ${bannedMath}`);

    const unsuitable = includesBannedPhrase(joinedText, unsuitablePhrases);
    if (unsuitable) addProblem(`${question.id} contains unsuitable advanced phrase: ${unsuitable}`);

    const preAnswerVisual = visibleVisualText(question).toLowerCase();
    if (/answer\s*:/.test(preAnswerVisual) || /the answer is/.test(preAnswerVisual) || /correct answer/.test(preAnswerVisual)) {
      addProblem(`${question.id} has answer-revealing text in pre-answer visual fields.`);
    }

    if (!isReadingQuestion(question) && question.visual?.equation && /matches/i.test(question.visual.equation)) {
      addProblem(`${question.id} uses answer-revealing match wording in the visual prompt.`);
    }
  }

  if (exactQuestionTexts.size < 8) {
    addProblem(`Level ${level.level} has low question variety: ${exactQuestionTexts.size} unique visible prompts.`);
  }
}

if (englishLevels.length !== 10) addProblem(`Expected 10 English levels, found ${englishLevels.length}.`);
if (ids.size !== allQuestions.length) addProblem("Question ID count does not match question count.");

const routeChecks = [
  "app/english/page.tsx",
  "app/english/world-map/page.tsx",
  "app/english/level/[level]/page.tsx",
  "app/english/question/[level]/page.tsx",
];
for (const route of routeChecks) {
  if (!fs.existsSync(path.join(root, route))) addProblem(`Missing English route file: ${route}`);
}

if (problems.length > 0) {
  console.error("English Year 1 content QA failed:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`English Year 1 content QA passed: ${englishLevels.length} levels, ${allQuestions.length} questions, ${ids.size} unique IDs.`);
