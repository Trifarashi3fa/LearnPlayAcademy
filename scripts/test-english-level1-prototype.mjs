import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const englishLevelOnePlayerSource = fs.readFileSync(path.join(root, "components/english/EnglishLevelOneQuestionPlayer.tsx"), "utf8");
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


function readSvgDimensions(buffer) {
  const source = buffer.toString("utf8", 0, Math.min(buffer.length, 2048));
  const widthMatch = source.match(/<svg[^>]*\bwidth="(\d+)"/i);
  const heightMatch = source.match(/<svg[^>]*\bheight="(\d+)"/i);
  if (!widthMatch || !heightMatch) return null;
  return { width: Number(widthMatch[1]), height: Number(heightMatch[1]) };
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
    const dimensions = filePath.endsWith(".png")
      ? readPngDimensions(buffer)
      : filePath.endsWith(".svg")
        ? readSvgDimensions(buffer)
        : readWebpDimensions(buffer);
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
  getEnglishLevelOnePicturePresentation,
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
assert.equal(q05.activityLabel, "Picture Choice", "Type F should use the approved Picture Choice label.");
assert.ok(q05.picture?.altText.length > 0, "Type F image alt text is required.");
assert.ok(q05.picture?.assetSrc?.startsWith("/english/year1/level1/"), "Type F image source must use the English Level 1 asset folder.");
assert.equal(q05.picture.assetSrc.includes("/assets/math-icons/"), false, "Type F must not reuse Mathematics icon assets.");
assert.equal(q05.picture.label, "apple", "Type F vocabulary labels should stay lowercase and child-friendly.");
assert.equal(q05.picture.expectedFirstLetter, q05.correctAnswer, "Type F expected first-letter metadata must match the answer.");
assert.equal(getEnglishLevelOnePicturePresentation(q05).usesFallback, false, "Approved local Type F assets should render as images, not placeholders.");

const pictureChoiceFunctionStart = englishLevelOnePlayerSource.indexOf("function EnglishPictureChoiceActivity");
const pictureChoiceFunctionEnd = englishLevelOnePlayerSource.indexOf("function EnglishPictureFallback");
const pictureChoiceSource = englishLevelOnePlayerSource.slice(pictureChoiceFunctionStart, pictureChoiceFunctionEnd);
const fillBlankSource = englishLevelOnePlayerSource.slice(
  englishLevelOnePlayerSource.indexOf("function EnglishFillBlankActivity"),
  englishLevelOnePlayerSource.indexOf("function EnglishMatchingActivity"),
);
const matchingSource = englishLevelOnePlayerSource.slice(
  englishLevelOnePlayerSource.indexOf("function EnglishMatchingActivity"),
  englishLevelOnePlayerSource.indexOf("function EnglishPictureChoiceActivity"),
);
assert.ok(englishLevelOnePlayerSource.includes('data-english-actionbar-safe-area="true"'), "English Level 1 shell must reserve scroll safe area for the bottom action bar.");
assert.ok(englishLevelOnePlayerSource.includes("scrollPaddingBottom"), "English Level 1 shell should use scroll padding instead of clipping content behind the action bar.");
assert.equal(englishLevelOnePlayerSource.includes("lg:overflow-hidden"), false, "English Level 1 shell must not clip desktop activity content.");
assert.ok(pictureChoiceSource.includes('data-english-compact-type-f="true"'), "Type F should declare the compact responsive layout contract.");
assert.ok(pictureChoiceSource.includes('data-english-picture-frame="compact"'), "Type F should use the compact picture frame.");
assert.ok(pictureChoiceSource.includes('data-english-answer-grid="responsive-type-f"'), "Type F should use a responsive answer grid.");
assert.ok(pictureChoiceSource.includes('choiceDensity="picture"'), "Type F choices should use the picture-specific compact density.");
assert.ok(pictureChoiceSource.includes("object-contain"), "Type F images must use object-contain to avoid cropping or stretching.");
assert.ok(pictureChoiceSource.includes("md:grid-cols-[minmax(0,1fr)_minmax(15rem,0.68fr)]"), "Type F should use compact two-column picture/clue layout when width allows.");
assert.ok(pictureChoiceSource.includes("lg:grid-cols-4"), "Type F answers should fit in one row on laptop/desktop widths.");
assert.equal(pictureChoiceSource.includes("h-36"), false, "Type F should not use the old tall h-36 picture frame.");
assert.equal(pictureChoiceSource.includes("sm:h-44"), false, "Type F should not use the old tall sm:h-44 picture frame.");
assert.equal(pictureChoiceSource.includes("lg:h-48"), false, "Type F should not use the old tall lg:h-48 picture frame.");
assert.equal(fillBlankSource.includes('choiceDensity="picture"'), false, "Type B should not inherit the Type F picture-only answer density.");
assert.equal(matchingSource.includes('choiceDensity="picture"'), false, "Type D should not inherit the Type F picture-only answer density.");

for (const prototype of prototypes.filter((item) => item.type === "picture-choice")) {
  assert.equal(prototype.activityLabel, "Picture Choice", `${prototype.questionId} must use the approved Type F label.`);
  assert.ok(prototype.picture.assetSrc.startsWith("/english/year1/level1/"), `${prototype.questionId} must use an English Level 1 asset path.`);
  assert.equal(/math-icons|science|world-map|mountain|screenshot|sprite/i.test(prototype.picture.assetSrc), false, `${prototype.questionId} must not use a forbidden image source.`);
  assert.equal(prototype.picture.label, prototype.picture.label.toLowerCase(), `${prototype.questionId} picture label should be lowercase.`);
  assert.equal(prototype.picture.expectedFirstLetter.toLowerCase(), prototype.correctAnswer.toLowerCase(), `${prototype.questionId} first-letter metadata must match the correct answer.`);
  assert.ok(prototype.picture.assetSrc.toLowerCase().includes(prototype.picture.kind), `${prototype.questionId} asset filename should match the vocabulary word.`);
}

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
const missingAltIssues = validateEnglishLevelOnePrototypeAssets([missingAltPicture], { [q05.picture.assetSrc]: { exists: true, width: 512, height: 512 } });
assert.ok(missingAltIssues.some((issue) => issue.code === "missing-alt-text" && issue.severity === "error"), "Type F should require alt text.");

const forbiddenWorldPicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: "/world-map/apple-sprite.png" },
};
const forbiddenWorldIssues = validateEnglishLevelOnePrototypeAssets([forbiddenWorldPicture], { "/world-map/apple-sprite.png": { exists: true, width: 512, height: 512 } });
assert.ok(forbiddenWorldIssues.some((issue) => issue.code === "forbidden-image-source" && issue.severity === "error"), "Type F should reject world/map/sprite image sources.");

const forbiddenMathPicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: "/assets/math-icons/apple.png" },
};
const forbiddenMathIssues = validateEnglishLevelOnePrototypeAssets([forbiddenMathPicture], { "/assets/math-icons/apple.png": { exists: true, width: 74, height: 78 } });
assert.ok(forbiddenMathIssues.some((issue) => issue.code === "forbidden-image-source" && issue.severity === "error"), "Type F should reject Mathematics icon assets.");

const missingFilePicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: "/english/year1/level1/missing-apple.svg" },
};
const missingFileIssues = validateEnglishLevelOnePrototypeAssets([missingFilePicture], { "/english/year1/level1/missing-apple.svg": { exists: false } });
assert.ok(missingFileIssues.some((issue) => issue.code === "missing-image-file" && issue.severity === "error"), "Type F should reject missing local image files.");

const tinyPictureIssues = validateEnglishLevelOnePrototypeAssets([q05], { [q05.picture.assetSrc]: { exists: true, width: 64, height: 64 } });
assert.ok(tinyPictureIssues.some((issue) => issue.code === "tiny-image" && issue.severity === "warning"), "Type F should warn on tiny images.");

const duplicatePicture = {
  ...getEnglishLevelOnePrototype(levelOne.questions.find((question) => question.id === "english-forest-l01-q06")),
  picture: { ...q05.picture },
};
const duplicateIssues = validateEnglishLevelOnePrototypeAssets([q05, duplicatePicture], { [q05.picture.assetSrc]: { exists: true, width: 512, height: 512 } });
assert.ok(duplicateIssues.some((issue) => issue.code === "duplicate-picture-asset" && issue.severity === "warning"), "Type F should warn on duplicated picture assets.");

const mismatchIssues = validateEnglishLevelOnePrototypeAssets([{ ...q05, picture: { ...q05.picture, expectedFirstLetter: "B" } }], { [q05.picture.assetSrc]: { exists: true, width: 512, height: 512 } });
assert.ok(mismatchIssues.some((issue) => issue.code === "mismatched-first-letter" && issue.severity === "error"), "Type F should reject first-letter metadata that does not match the correct answer.");

const placeholderPicture = {
  ...q05,
  picture: { ...q05.picture, assetSrc: undefined, assetStatus: "placeholder" },
};
const placeholderIssues = validateEnglishLevelOnePrototypeAssets([placeholderPicture], {});
assert.ok(placeholderIssues.some((issue) => issue.code === "placeholder-picture-asset" && issue.severity === "warning"), "Type F should warn on safe placeholder assets.");
assert.equal(getEnglishLevelOnePicturePresentation(placeholderPicture).usesFallback, true, "Invalid or missing assets should have a safe placeholder presentation path.");

const beforeSubmitState = getEnglishLevelOneActivityState({ submitted: false });
assert.equal(beforeSubmitState.showCorrectAnswer, false);
assert.equal(beforeSubmitState.showExplanation, false);
const afterSubmitState = getEnglishLevelOneActivityState({ submitted: true });
assert.equal(afterSubmitState.showCorrectAnswer, true);
assert.equal(afterSubmitState.showExplanation, true);

console.log(`English Level 1 prototype tests passed: ${levelOne.questions.length} questions, distribution ${JSON.stringify(distribution)}, asset warnings ${assetIssues.length}.`);
