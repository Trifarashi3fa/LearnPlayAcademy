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

const schemaTypes = loadModule(path.join(root, "data/english-question-types.ts"));
const fixtures = loadModule(path.join(root, "data/english-question-fixtures.ts"));
const adapter = loadModule(path.join(root, "lib/english/structured-question-adapter.ts"));
const englishWorld = loadModule(path.join(root, "data/mvp-english-world.ts"));

const {
  englishQuestionTypes,
  englishQuestionTypeCodes,
} = schemaTypes;
const {
  validEnglishQuestionFixtures,
  invalidEnglishQuestionFixtures,
  duplicateEnglishQuestionFixtures,
} = fixtures;
const {
  adaptLegacyEnglishQuestion,
  tryAdaptLegacyEnglishQuestion,
  validateEnglishQuestion,
  validateEnglishQuestionCollection,
} = adapter;
const { englishLevels } = englishWorld;

assert.deepEqual(Array.from(englishQuestionTypes), [
  "word-spelling",
  "fill-in-the-blank",
  "sentence-meaning",
  "matching",
  "sentence-builder",
  "picture-choice",
]);
assert.equal(englishQuestionTypeCodes["word-spelling"], "A");
assert.equal(englishQuestionTypeCodes["picture-choice"], "F");

{
  const seenTypes = new Set();
  for (const question of validEnglishQuestionFixtures) {
    const result = validateEnglishQuestion(question);
    assert.equal(result.valid, true, `${question.id} should be valid: ${JSON.stringify(result.errors)}`);
    seenTypes.add(question.questionType);
  }
  assert.equal(seenTypes.size, 6, "Expected one valid fixture for every approved English question type.");
}

{
  for (const question of invalidEnglishQuestionFixtures) {
    const result = validateEnglishQuestion(question);
    assert.equal(result.valid, false, `Invalid fixture should fail: ${JSON.stringify(question)}`);
    assert.ok(result.errors.length > 0);
  }
}

{
  const result = validateEnglishQuestionCollection(duplicateEnglishQuestionFixtures);
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((error) => error.code === "duplicate-question-id"));
}

{
  const revealHint = {
    ...validEnglishQuestionFixtures[0],
    id: "english-schema-warning-hint-reveal",
    hint: "Choose receive.",
  };
  const result = validateEnglishQuestion(revealHint);
  assert.equal(result.valid, true);
  assert.ok(result.warnings.some((warning) => warning.code === "hint-may-reveal-answer"));
}

const allLegacyQuestions = englishLevels.flatMap((level) => level.questions);
assert.equal(englishLevels.length, 10);
assert.equal(allLegacyQuestions.length, 120);

{
  const ids = new Set();
  for (const question of allLegacyQuestions) {
    const structured = adaptLegacyEnglishQuestion(question);
    const result = validateEnglishQuestion(structured);
    assert.equal(result.valid, true, `${question.id} did not adapt cleanly: ${JSON.stringify(result.errors)}`);
    assert.equal(structured.id, question.id);
    assert.equal(structured.legacyId, question.id);
    assert.equal(structured.subject, "english");
    assert.equal(structured.xpReward, question.xpReward);
    assert.equal(structured.explanation.correctAnswerText, question.correctAnswer);
    assert.equal(structured.explanation.voiceScript, question.voiceScript);
    assert.equal(structured.hint, question.learnBotTip);
    assert.ok(!ids.has(structured.id), `Duplicate adapted ID ${structured.id}`);
    ids.add(structured.id);
  }
}

{
  for (const level of englishLevels) {
    assert.equal(level.sessionQuestionCount, 10, `Level ${level.level} should request 10 session questions.`);
    assert.ok(level.randomizeQuestions, `Level ${level.level} should keep randomized sessions enabled.`);
    assert.ok(level.questions.length >= 10, `Level ${level.level} must have at least 10 source questions.`);
    assert.equal(level.questions.slice(0, level.sessionQuestionCount).length, 10, `Level ${level.level} can provide a 10-question session.`);
  }
}

{
  const first = allLegacyQuestions[0];
  const notEnglish = { ...first, id: "math-protection-smoke", subject: "mathematics" };
  assert.throws(() => adaptLegacyEnglishQuestion(notEnglish), /only accepts subject=english/);
  const result = tryAdaptLegacyEnglishQuestion(notEnglish);
  assert.equal(result.ok, false);
}

console.log(`English structured question schema QA passed: ${validEnglishQuestionFixtures.length} valid fixtures, ${invalidEnglishQuestionFixtures.length} invalid fixtures, ${allLegacyQuestions.length} legacy English questions adapted.`);