import assert from "node:assert/strict";
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

const englishWorld = loadModule(path.join(root, "data/mvp-english-world.ts"));
const prototypeModule = loadModule(path.join(root, "lib/english/level-one-prototype.ts"));

const { englishLevels } = englishWorld;
const {
  shouldUseEnglishLevelOnePrototype,
  getEnglishLevelOnePrototype,
  getEnglishLevelOneActivityState,
  buildEnglishLevelOneExplanationSections,
  summarizeEnglishLevelOneQuestionTypes,
} = prototypeModule;

const levelOne = englishLevels.find((level) => level.level === 1);
const levelTwo = englishLevels.find((level) => level.level === 2);
assert.ok(levelOne, "English Level 1 must exist.");
assert.ok(levelTwo, "English Level 2 must exist.");

assert.equal(shouldUseEnglishLevelOnePrototype(levelOne), true, "English Level 1 should use the prototype renderer.");
assert.equal(shouldUseEnglishLevelOnePrototype(levelTwo), false, "English Level 2 must remain on the compatibility renderer.");
assert.equal(shouldUseEnglishLevelOnePrototype({ subject: "mathematics", level: 1 }), false, "Mathematics must not use the English prototype renderer.");
assert.equal(shouldUseEnglishLevelOnePrototype({ subject: "science", level: 1 }), false, "Science must not use the English prototype renderer.");

const distribution = summarizeEnglishLevelOneQuestionTypes(levelOne.questions);
assert.equal(distribution.matching, 4);
assert.equal(distribution["fill-in-the-blank"], 5);
assert.equal(distribution["picture-choice"], 3);

const expectedRenderers = new Map([
  ["english-forest-l01-q01", "EnglishMatchingActivity"],
  ["english-forest-l01-q03", "EnglishFillBlankActivity"],
  ["english-forest-l01-q05", "EnglishPictureChoiceActivity"],
]);

for (const question of levelOne.questions) {
  const prototype = getEnglishLevelOnePrototype(question);
  assert.equal(prototype.questionId, question.id);
  assert.equal(prototype.correctAnswer, question.correctAnswer);
  assert.equal(prototype.initialState.hintCollapsed, true, `${question.id} hint should start collapsed.`);
  assert.equal(prototype.initialState.revealAnswerBeforeSubmission, false, `${question.id} should not reveal the answer before submission.`);
  assert.equal(prototype.responsiveContract.overflowX, "hidden", `${question.id} should guard against horizontal overflow.`);
  assert.equal(prototype.responsiveContract.mobileExplanationPlacement, "below-activity");
  assert.equal(prototype.responsiveContract.desktopExplanationPlacement, "beside-activity");
  assert.ok(prototype.keyboardInstructions.includes("Enter") && prototype.keyboardInstructions.includes("Space"), `${question.id} must document keyboard activation.`);
  assert.equal(prototype.choices.length, question.options.length);
  assert.ok(prototype.choices.every((choice) => choice.accessibilityLabel.length > 0), `${question.id} choices need accessibility labels.`);

  const lowerHint = prototype.hint.toLowerCase();
  assert.equal(lowerHint.includes(`choose ${question.correctAnswer.toLowerCase()}`), false, `${question.id} hint should not say choose the answer.`);
  assert.equal(lowerHint.includes(`answer is ${question.correctAnswer.toLowerCase()}`), false, `${question.id} hint should not reveal the answer phrase.`);

  const sections = buildEnglishLevelOneExplanationSections(prototype);
  assert.equal(sections.length, 4, `${question.id} explanation should use exactly four primary sections.`);
  assert.equal(sections.map((section) => section.id).join("|"), "correct-answer|why-correct|example-or-visual|learnbot-tip");
  assert.equal(sections.some((section) => section.title.toLowerCase().includes("word meaning")), false, `${question.id} should not show word meaning for isolated alphabet answers.`);

  if (expectedRenderers.has(question.id)) {
    assert.equal(prototype.rendererName, expectedRenderers.get(question.id));
  }
}

const beforeSubmitState = getEnglishLevelOneActivityState({ submitted: false });
assert.equal(beforeSubmitState.showCorrectAnswer, false);
assert.equal(beforeSubmitState.showExplanation, false);
const afterSubmitState = getEnglishLevelOneActivityState({ submitted: true });
assert.equal(afterSubmitState.showCorrectAnswer, true);
assert.equal(afterSubmitState.showExplanation, true);

console.log(`English Level 1 prototype tests passed: ${levelOne.questions.length} questions, distribution ${JSON.stringify(distribution)}.`);
