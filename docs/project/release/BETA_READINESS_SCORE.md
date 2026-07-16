# LearnPlay MVP Beta Readiness Score

Audit date: 2026-07-12
Project: `E:\Codex\learnplay-academy`

## Overall Score

**72 / 100**

Readiness verdict: **Proceed with changes before parent beta**

This MVP is good enough for internal demo and guided review. It should not be opened to unguided parent beta until the P0 items are fixed.

## Score Breakdown

| Area | Score | Weight | Weighted Result | Notes |
|---|---:|---:|---:|---|
| MVP scope clarity | 9 / 10 | 10 | 9.0 | Mathematics Year 1 Forest World is clearly the active product. |
| Landing and navigation | 7 / 10 | 8 | 5.6 | Flow works, but parent dashboard access and mobile nav need polish. |
| Auth and onboarding | 7 / 10 | 10 | 7.0 | Supabase auth and child setup work; year selector and error wording need beta hardening. |
| Child learning flow | 8 / 10 | 14 | 11.2 | Lesson UI is strong; direct question URL bypass must be fixed. |
| Educational quality | 7 / 10 | 12 | 8.4 | Content is age-appropriate; mini-game/boss labels and repeated explanations need work. |
| Rewards and motivation | 7 / 10 | 8 | 5.6 | Reward flow exists; reset safety and badge variety need improvement. |
| Parent dashboard | 5 / 10 | 12 | 6.0 | Useful summary, but not yet true parent insight. |
| Account and privacy | 6 / 10 | 8 | 4.8 | Account page is good; privacy copy and settings gap need attention. |
| Accessibility | 6 / 10 | 8 | 4.8 | Focus/tap targets are good; skip link, drawer focus, and screen-reader QA remain. |
| Performance | 5 / 10 | 6 | 3.0 | Large PNG assets create mobile risk. |
| Release process | 6 / 10 | 4 | 2.4 | Validation pipeline exists, but current working tree is not clean. |
| Error/loading/empty states | 6 / 10 | 6 | 3.6 | Present but basic, especially for remote progress sync. |
| Total |  | 106 | **71.4** | Rounded to **72 / 100**. |

## Readiness Levels

| Score Range | Meaning | Current Fit |
|---|---|---|
| 90-100 | Public beta ready | No |
| 80-89 | Parent beta ready with minor issues | No |
| 70-79 | Internal beta / guided review ready | Yes |
| 60-69 | Demo only | No |
| Below 60 | Not release-ready | No |

## Go / No-Go Decision

Current decision: **No-go for unguided parent beta**

Allowed:

- Internal demo
- Guided parent walkthrough
- Teacher/content review
- QA testing

Not allowed yet:

- Unguided parent beta
- Paid pilot
- Public school pilot
- Marketing launch

## Must Fix Before Parent Beta

| Priority | Issue | Why It Matters | Estimated Effort |
|---|---|---|---|
| P0 | Guard direct `/mvp/question/[level]` access | Protects learning sequence and prevents boss bypass. | Medium |
| P0 | Add confirmation to progress reset | Prevents accidental loss of child progress. | Small |
| P0 | Clean working tree and create release commit | Makes the deployed release reproducible. | Small |
| P0 | Run validation, lint, type check, and build | Confirms release integrity. | Small |
| P0 | Test Supabase auth/profile/progress in production | Parent beta depends on account persistence. | Medium |

## Should Fix Before Parent Beta

| Priority | Issue | Why It Matters | Estimated Effort |
|---|---|---|---|
| P1 | Limit child year selector to Year 1 or label future years | Avoids parent confusion. | Small |
| P1 | Update privacy copy | Aligns with child-safety and data minimization promises. | Small |
| P1 | Improve Parent Dashboard wording | Avoids overstating weak-topic detection. | Small |
| P1 | Add progress sync loading state | Avoids local/remote data flicker. | Medium |
| P1 | Optimize core images | Improves low-end mobile experience. | Medium |
| P1 | Add mobile nav or compact menu | Improves first-time mobile navigation. | Medium |

## Can Wait Until After Beta

| Priority | Issue | Reason |
|---|---|---|
| P2 | Full Settings route | Account page can cover MVP needs temporarily. |
| P2 | Real mini-game and boss mechanics | Current quiz missions can be relabeled for beta. |
| P2 | Non-MCQ production activation | Requires approved content import and QA. |
| P2 | Weekly progress and streak analytics | Valuable but not required for first beta if dashboard copy is honest. |
| P2 | Custom delete confirmation modal | Native confirmation is acceptable temporarily. |

## Persona Scores

### Parent

Score: **68 / 100**

The parent can register, create a child profile, and view progress. The biggest gaps are dashboard insight quality, privacy/settings clarity, and progress sync/loading communication.

### Year 1 Student

Score: **78 / 100**

The learning flow is colorful, clear, and rewarding. The biggest risk is direct-route progression bypass. The child experience is stronger than the parent analytics experience.

### Teacher

Score: **70 / 100**

The Year 1 foundation scope makes sense. However, teacher confidence will depend on clearer curriculum mapping, less repeated explanation text, and more honest mini-game/boss labels.

## Beta Readiness Criteria

The MVP can move to parent beta when all are true:

- [ ] No critical issues remain.
- [ ] Direct question route lock guard is confirmed.
- [ ] Reset progress requires confirmation.
- [ ] Child onboarding clearly says only Year 1 is active.
- [ ] Parent dashboard labels do not imply analytics that are not implemented.
- [ ] Privacy copy matches actual MVP data collection.
- [ ] Large P0/P1 images are optimized or accepted as a documented risk.
- [ ] Production Supabase auth/profile/progress flow is tested.
- [ ] `npm run validate:curriculum` passes.
- [ ] `npm run lint` passes.
- [ ] `npx tsc --noEmit --incremental false` passes.
- [ ] `npm run build` passes.
- [ ] A clean release commit exists.
- [ ] Manual mobile and desktop smoke tests are recorded.

## Final Recommendation

Do not add new features before fixing P0 release blockers. The fastest beta path is:

1. Protect progression.
2. Protect saved progress from accidental reset/delete.
3. Clean and validate the release branch.
4. Tighten parent-facing language.
5. Run manual device QA.

After that, LearnPlay can move from internal review to a small parent beta.

