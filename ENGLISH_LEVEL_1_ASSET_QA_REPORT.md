# English Level 1 Asset QA Report

Date: 2026-07-19
Project: LearnPlay Academy
Scope: English Year 1 Forest World Level 1 only.

## Summary

Live browser testing found that English Level 1 Type F picture questions reused generic Mathematics object assets. The bird question visibly showed unrelated Mountain World/UI artwork, and apple/bird/star picture clues had inconsistent style, sizing, and cropping. The Level 1 prototype now uses English-specific local SVG object assets and stronger automated validation.

Mathematics and Science were not modified.

## Asset Inventory

| Question ID | Type | Vocabulary word | Previous source path | New source path | File type | Dimensions | Alt text | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| english-forest-l01-q05 | Type F Picture Choice | apple | /assets/math-icons/apple.png | /english/year1/level1/apple.svg | SVG | 512 x 512 | A clear red apple picture clue. | Replaced | Previous asset was a reused Mathematics icon and visually inconsistent for English production. |
| english-forest-l01-q06 | Type F Picture Choice | bird | /assets/math-icons/bird.png | /english/year1/level1/bird.svg | SVG | 512 x 512 | A clear blue bird picture clue. | Replaced | Previous live render showed unrelated Mountain World/UI artwork, so validation now rejects non-English and map/sprite-like sources. |
| english-forest-l01-q12 | Type F Picture Choice | star | /assets/math-icons/star.webp | /english/year1/level1/star.svg | SVG | 512 x 512 | A clear golden star picture clue. | Replaced | Previous asset came from the Mathematics icon folder and did not share the new English Level 1 asset path. |

## Invalid Assets Found

| Old path | Reason invalid | Replacement |
| --- | --- | --- |
| /assets/math-icons/apple.png | Reused Mathematics learning asset; inconsistent English Type F style. | /english/year1/level1/apple.svg |
| /assets/math-icons/bird.png | Reused Mathematics learning asset; live browser render showed unrelated Mountain World/UI artwork. | /english/year1/level1/bird.svg |
| /assets/math-icons/star.webp | Reused Mathematics reward/math-style asset folder; inconsistent source ownership. | /english/year1/level1/star.svg |

## Type F Content Corrections

- Type F activity labels now use the approved label: `Picture Choice`.
- Picture vocabulary labels remain lowercase: `apple`, `bird`, and `star`.
- Each Type F question now has structured picture metadata: `kind`, `label`, `expectedFirstLetter`, `altText`, `assetStatus`, and `replacementFor`.
- Each `expectedFirstLetter` is validated against the question correct answer.
- The renderer uses one consistent image frame with `object-contain`, fixed responsive frame height, and no unexpected cropping.
- If a required picture ever lacks an asset source, the renderer shows a safe neutral placeholder card instead of a wrong image.

## Validation Changes

`validateEnglishLevelOnePrototypeAssets` now checks:

- missing picture metadata
- missing alt text
- unsupported external URLs
- invalid non-public paths
- forbidden source paths, including map, world-map, mountain, screenshot, sprite, dashboard, badge, reward, thumbnail, Mathematics icon, Science, subject-card, or UI-like paths
- missing local files
- tiny detectable image dimensions under 128 x 128
- duplicated picture assets
- invalid picture kind
- picture label mismatches
- expected first-letter mismatches
- placeholder picture assets

## Automated Coverage Added

`npm.cmd run test:english-level1-prototype` now verifies:

- English Level 1 uses the English prototype renderer.
- Mathematics and Science do not use the English prototype renderer.
- English Levels 2-10 remain on the compatibility renderer.
- Type F uses `/english/year1/level1/` assets.
- Type F rejects external URLs.
- Type F rejects world/map/sprite paths.
- Type F rejects Mathematics icon paths.
- Type F rejects missing local files.
- Type F warns on tiny images.
- Type F warns on duplicate picture assets.
- Type F validates picture kind, lowercase label, and expected first letter.
- Type F has a safe fallback presentation path for explicit placeholder metadata.

## Remaining Placeholders

None in active English Level 1 Type F metadata.

## Remaining Asset Risks

- The new assets are simple SVG production placeholders created for consistency and safety. A future art pass may replace them with final LearnPlay-branded WebP/PNG illustrations using the same paths or metadata contract.
- Manual viewport QA is still recommended at 1920 x 1080, 1366 x 768, tablet, and mobile portrait.

## Readiness

English Level 1 Type F assets are now safe for prototype review and no longer depend on Mathematics, Science, world-map, screenshot, sprite, or unrelated UI assets.
