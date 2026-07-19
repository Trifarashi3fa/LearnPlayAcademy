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

function readPngDimensions(buffer) {
  if (buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readWebpDimensions(buffer) {
  if (buffer.toString("ascii", 0, 4) !== "RIFF" || buffer.toString("ascii", 8, 12) !== "WEBP") return null;
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunk = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    if (chunk === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(dataOffset + 4, 3),
        height: 1 + buffer.readUIntLE(dataOffset + 7, 3),
      };
    }
    if (chunk === "VP8 ") {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }
    if (chunk === "VP8L") {
      const byte0 = buffer[dataOffset + 1];
      const byte1 = buffer[dataOffset + 2];
      const byte2 = buffer[dataOffset + 3];
      const byte3 = buffer[dataOffset + 4];
      return {
        width: 1 + (((byte1 & 0x3f) << 8) | byte0),
        height: 1 + (((byte3 & 0x0f) << 10) | (byte2 << 2) | ((byte1 & 0xc0) >> 6)),
      };
    }
    offset = dataOffset + size + (size % 2);
  }
  return null;
}

function buildAssetInfo(prototypes) {
  const assetInfo = {};
  for (const prototype of prototypes) {
    const assetSrc = prototype.picture?.assetSrc;
    if (!assetSrc || /^https?:\/\//i.test(assetSrc) || !assetSrc.startsWith("/")) continue;
    const filePath = path.join(root, "public", assetSrc.slice(1));
    if (!fs.existsSync(filePath)) {
      assetInfo[assetSrc] = { exists: false };
      continue;
    }
    const buffer = fs.readFileSync(filePath);
    const dimensions = filePath.endsWith(".png") ? readPngDimensions(buffer) : readWebpDimensions(buffer);
    assetInfo[assetSrc] = { exists: true, ...(dimensions ?? {}) };
  }
  return assetInfo;
}

const englishWorld = loadModule(path.join(root, "data/mvp-english-world.ts"));
const prototypeModule = loadModule(path.join(root, "lib/english/level-one-prototype.ts"));

const { englishLevels } = englishWorld;
const {
  buildEnglishLevelOneExplanationSections,
  canSubmitEnglishLevelOneAnswer,
  getEnglishLevelOneActivityState,
  getEnglishLevelOneBlankDisplay,
  getEnglishLevelOneCorrectChoiceId,
  getEnglishLevelOneInitialInteractionState,
  getEnglishLevelOneMatchingModel,
  getEnglishLevelOnePrototype,
  getEnglishLevelOneSelectedAnswer,
  isEnglishLevelOneChoiceCorrect,
  shouldUseEnglishLevelOnePrototype,
  summarizeEnglishLevelOneQuestionTypes,
  validateEnglishLevelOnePrototypeAssets,
} = prototypeModule;

const levelOne = englishLevels.find((level) => level.level === 1);
assert.ok(levelOne, "English Level 1 must exist.");
assert.equal(levelOne.sessionQuestionCount, 10, "English Level 1 should keep randomized 10-question sessions.");
assert.ok(levelOne.questions.length >= 10, "English Level 1 source pool must support a 10-question session.");

assert.equal(shouldUseEnglishLevelOnePrototype(levelOne), true, "English Level 1 should use the prototype renderer.");
for (const level of englishLevels.filter((item) => item.level >= 2)) {
  assert.equal(shouldUseEnglishLevelOnePrototype(level), false, `English Level ${level.level} must remain on the compatibility renderer.`);
}
assert.equal(shouldUseEnglishLevelOnePrototype({ subject: "mathematics", level: 1 }), false, "Mathematics must not use the English prototype renderer.");
assert.equal(shouldUseEnglishLevelOnePrototype({ subject: "science", level: 1 }), false, "Science must not use the English prototype renderer.");

const distribution = summarizeEnglishLevelOneQuestionTypes(levelOne.questions);
assert.equal(distribution.matching, 4);
assert.equal(distribution["fill-in-the-blank"], 5);
assert.equal(distribution["picture-choice"], 3);

const prototypes = levelOne.questions.map((question) => getEnglishLevelOnePrototype(question));
const assetInfo = buildAssetInfo(prototypes);
const assetIssues = validateEnglishLevelOnePrototypeAssets(prototypes, assetInfo);
assert.equal(assetIssues.filter((issue) => issue.severity === "error").length, 0, `Level 1 Type F assets should not have blocking errors: ${JSON.stringify(assetIssues)}`);

const initialState = getEnglishLevelOneInitialInteractionState();
assert.equal(initialState.selectedChoiceId, null);
assert.equal(initialState.submittedChoiceId, null);
assert.equal(initialState.hintOpen, false);
assert.equal(initialState.voiceOpen, false);

const expectedRenderers = new Map([
  ["english-forest-l01-q01", "EnglishMatchingActivity"],
  ["english-forest-l01-q03", "EnglishFillBlankActivity"],
  ["english-forest-l01-q05", "EnglishPictureChoiceActivity"],
]);

for (const question of levelOne.questions) {
  const prototype = getEnglishLevelOnePrototype(question);
  const correctChoiceId = getEnglishLevelOneCorrectChoiceId(prototype);
  assert.ok(correctChoiceId, `${question.id} correct answer must map to a stable choice ID.`);
  assert.equal(prototype.questionId, question.id);
  assert.equal(prototype.correctAnswer, question.correctAnswer);
  assert.equal(getEnglishLevelOneSelectedAnswer(prototype, correctChoiceId), question.correctAnswer);
  assert.equal(isEnglishLevelOneChoiceCorrect(prototype, correctChoiceId), true);
  assert.equal(prototype.initialState.hintCollapsed, true, `${question.id} hint should start collapsed.`);
  assert.equal(prototype.initialState.revealAnswerBeforeSubmission, false, `${question.id} should not reveal the answer before submission.`);
  assert.equal(prototype.responsiveContract.overflowX, "hidden", `${question.id} should guard against horizontal overflow.`);
  assert.equal(prototype.responsiveContract.mobileExplanationPlacement, "below-activity");
  assert.equal(prototype.responsiveContract.desktopExplanationPlacement, "beside-activity");
  assert.ok(prototype.keyboardInstructions.includes("Enter") && prototype.keyboardInstructions.includes("Space"), `${question.id} must document keyboard activation.`);
  assert.equal(prototype.choices.length, question.options.length);
  assert.ok(prototype.choices.every((choice) => choice.accessibilityLabel.length > 0), `${question.id} choices need accessibility labels.`);
  assert.equal(canSubmitEnglishLevelOneAnswer({ selectedChoiceId: null, submitted: false }), false, `${question.id} cannot submit without a valid interaction.`);
  assert.equal(canSubmitEnglishLevelOneAnswer({ selectedChoiceId: correctChoiceId, submitted: false }), true, `${question.id} can submit after a valid interaction.`);
  assert.equal(canSubmitEnglishLevelOneAnswer({ selectedChoiceId: correctChoiceId, submitted: true }), false, `${question.id} cannot submit twice after submission.`);

  const lowerHint = prototype.hint.toLowerCase();
  assert.equal(lowerHint.includes(`choose ${question.correctAnswer.toLowerCase()}`), false, `${question.id} hint should not say choose the answer.`);
  assert.equal(lowerHint.includes(`answer is ${question.correctAnswer.toLowerCase()}`), false, `${question.id} hint should not reveal the answer phrase.`);

  const visibleText = [
    prototype.activityLabel,
    prototype.instruction,
    prototype.selectionPrompt,
    prototype.prompt,
    prototype.visualLabel,
    prototype.hint,
    prototype.voiceScript,
    prototype.explanation.whyCorrect,
    prototype.explanation.exampleOrVisual,
    prototype.explanation.learnBotTip,
  ].join(" ").toLowerCase();
  assert.equal(visibleText.includes("math"), false, `${question.id} English prototype text should not mention math.`);

  const sections = buildEnglishLevelOneExplanationSections(prototype);
  assert.equal(sections.length, 4, `${question.id} explanation should use exactly four primary sections.`);
  assert.equal(sections.map((section) => section.id).join("|"), "correct-answer|why-correct|example-or-visual|learnbot-tip");
  assert.equal(sections.some((section) => section.title.toLowerCase().includes("word meaning")), false, `${question.id} should not show word meaning for isolated alphabet answers.`);

  if (expectedRenderers.has(question.id)) {
    assert.equal(prototype.rendererName, expectedRenderers.get(question.id));
  }
}

const q03 = getEnglishLevelOnePrototype(levelOne.questions.find((question) => question.id === "english-forest-l01-q03"));
const q03CorrectChoiceId = getEnglishLevelOneCorrectChoiceId(q03);
const q03WrongChoiceId = q03.choices.find((choice) => choice.id !== q03CorrectChoiceId).id;
assert.equal(getEnglishLevelOneBlankDisplay(q03, null).includes("___"), true, "Type B blank should be empty before selection.");
assert.equal(getEnglishLevelOneBlankDisplay(q03, q03CorrectChoiceId).includes("___"), false, "Type B selected answer should fill the blank before submission.");
assert.ok(getEnglishLevelOneBlankDisplay(q03, q03CorrectChoiceId).includes(q03.correctAnswer), "Type B blank should show the selected answer.");
assert.notEqual(getEnglishLevelOneBlankDisplay(q03, q03WrongChoiceId), getEnglishLevelOneBlankDisplay(q03, q03CorrectChoiceId), "Type B selection can change before submission.");

const q07 = getEnglishLevelOnePrototype(levelOne.questions.find((question) => question.id === "english-forest-l01-q07"));
assert.equal(q07.variant, "odd-one-out");
assert.equal(q07.activityLabel.toLowerCase().includes("fill in the blank"), false, "Odd-one-out questions must not be visibly labelled as Fill in the Blank.");

const q01 = getEnglishLevelOnePrototype(levelOne.questions.find((question) => question.id === "english-forest-l01-q01"));
const q01Model = getEnglishLevelOneMatchingModel(q01);
const q01WrongChoice = q01Model.partners.find((choice) => choice.id !== q01Model.correctChoiceId);
assert.ok(q01Model.clue.id.includes(q01.questionId), "Type D clue must use a stable ID.");
assert.ok(q01Model.partners.every((choice) => choice.id.startsWith("choice-")), "Type D partner choices must use stable choice IDs.");
assert.equal(q01Model.partners.filter((choice) => choice.correct).length, 1, "Type D must identify exactly one correct pair.");
assert.notEqual(q01WrongChoice.id, q01Model.correctChoiceId, "Type D selected match can change before submission.");
assert.equal(getEnglishLevelOneSelectedAnswer(q01, q01WrongChoice.id), q01WrongChoice.label);
assert.equal(getEnglishLevelOneSelectedAnswer(q01, q01Model.correctChoiceId), q01.correctAnswer);

const q05 = getEnglishLevelOnePrototype(levelOne.questions.find((question) => question.id === "english-forest-l01-q05"));
assert.equal(q05.type, "picture-choice");
assert.ok(q05.picture?.altText.length > 0, "Type F image alt text is required.");
assert.ok(q05.picture?.assetSrc?.startsWith("/"), "Type F image source must use a public local path.");

const invalidExternalPicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: "https://example.com/apple.png" },
};
const externalIssues = validateEnglishLevelOnePrototypeAssets([invalidExternalPicture], {});
assert.ok(externalIssues.some((issue) => issue.code === "unsupported-external-image" && issue.severity === "error"), "Type F should reject unsupported external image sources.");

const missingAltPicture = {
  ...q05,
  picture: { ...q05.picture, altText: "" },
};
const missingAltIssues = validateEnglishLevelOnePrototypeAssets([missingAltPicture], { [q05.picture.assetSrc]: { exists: true, width: 120, height: 120 } });
assert.ok(missingAltIssues.some((issue) => issue.code === "missing-alt-text" && issue.severity === "error"), "Type F should require alt text.");

const suspiciousPicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: "/world-map/apple-sprite.png" },
};
const suspiciousIssues = validateEnglishLevelOnePrototypeAssets([suspiciousPicture], { "/world-map/apple-sprite.png": { exists: true, width: 120, height: 120 } });
assert.ok(suspiciousIssues.some((issue) => issue.code === "suspicious-image-source" && issue.severity === "warning"), "Type F should warn on map/world/sprite image sources.");

const beforeSubmitState = getEnglishLevelOneActivityState({ submitted: false });
assert.equal(beforeSubmitState.showCorrectAnswer, false);
assert.equal(beforeSubmitState.showExplanation, false);
const afterSubmitState = getEnglishLevelOneActivityState({ submitted: true });
assert.equal(afterSubmitState.showCorrectAnswer, true);
assert.equal(afterSubmitState.showExplanation, true);

console.log(`English Level 1 prototype tests passed: ${levelOne.questions.length} questions, distribution ${JSON.stringify(distribution)}, asset warnings ${assetIssues.length}.`);
