# LearnPlay Academy Beta Test Cases

Use these cases for closed beta QA. Mark each case Pass, Fail, or Needs Follow-up during manual testing.

## Registration

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| REG-01 | Parent can open registration | Go to /auth/register. | Registration form loads without console/server error. |
| REG-02 | Parent can register | Submit valid email and password. | Account is created or confirmation message appears. |
| REG-03 | Duplicate/invalid registration handled | Use invalid email or existing account. | Friendly error message, no crash. |
| REG-04 | Email confirmation redirect | Click confirmation email link. | Redirect uses production-safe URL, not localhost. |

## Login

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| LOG-01 | Parent can log in | Go to /auth/login and submit valid credentials. | User reaches account/parent area. |
| LOG-02 | Invalid login handled | Submit wrong password. | Friendly error, no leaked technical details. |
| LOG-03 | Logout works | Click Logout. | Session ends and protected pages require login again. |

## Parent Dashboard

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| PD-01 | Dashboard with no progress | Log in with new child profile. | Empty state explains how to start learning. |
| PD-02 | Dashboard after progress | Complete at least one Mathematics level. | XP, stars, completed levels, and recommended next level display. |
| PD-03 | Dashboard wording | Inspect insight labels. | No unsupported weak-topic analytics claims. |
| PD-04 | Mobile dashboard | Open dashboard on phone viewport. | Cards stack cleanly and controls remain tappable. |

## Child Profile Creation

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| CP-01 | Create child profile | Enter nickname, Year 1, avatar. | Profile saves and reloads after refresh. |
| CP-02 | Year availability | Try Years 2-6. | Unavailable years cannot be selected for new MVP profile. |
| CP-03 | Edit child profile | Change nickname/avatar. | Updates persist after refresh. |
| CP-04 | Delete child profile | Use delete flow. | Confirmation appears; cancel keeps data; confirm deletes intended profile. |

## Mathematics Progression

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| MATH-01 | Level 1 accessible | Open /mvp/level/1 with no progress. | Level intro opens. |
| MATH-02 | Locked direct URL blocked | Open /mvp/question/10 with incomplete progress. | Locked-level screen appears; no question content renders. |
| MATH-03 | Complete a level | Answer all Level 1 questions. | Level complete screen appears; next level unlocks. |
| MATH-04 | Replay guard | Replay a completed level. | Completion bonus is not duplicated. |
| MATH-05 | Level 10 boss | Complete or simulate prerequisite progress then Level 10. | Forest completion and reward flow works. |

## English Level 1 Progression

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| ENG-01 | English remains inactive | Open Subjects and English route. | English shows Coming Soon or unavailable; no active gameplay. |
| ENG-02 | Level 1 source approved | Inspect source QA reports. | 30 approved Level 1 rows; Levels 2-10 remain Review. |
| ENG-03 | Staging import not run | Check active manifest validation. | Active manifest still validates 100 Mathematics questions only. |
| ENG-04 | Dev preview safety | Open developer preview only in dev/test context. | Imported/preview content does not save production progress. |

## Rewards

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| RW-01 | Level reward | Complete a level. | Stars, XP, skill learned, continue/map/dashboard buttons display. |
| RW-02 | Forest badge | Complete Level 10. | Forest Explorer Badge naming appears; no broken image icon. |
| RW-03 | Rewards route | Open /mvp/rewards. | Rewards page loads with current progress. |

## Progress Persistence

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| PR-01 | Local persistence | Complete a level and refresh. | Progress remains on same browser/device. |
| PR-02 | Synced persistence | Log in, complete progress, refresh/relogin. | Child profile progress reloads when sync is available. |
| PR-03 | Reset local data | Trigger reset local progress. | Confirmation required; synced progress is not silently deleted. |
| PR-04 | Corrupted localStorage | Manually corrupt local key in dev tools. | App resets safely without crashing. |

## Mobile Responsiveness

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| MOB-01 | 360x640 lesson | Complete a question on small portrait viewport. | Next button visible; content readable. |
| MOB-02 | 640x360 lesson | Complete a question on landscape viewport. | No clipped answer buttons; notes usable. |
| MOB-03 | World map mobile | Open world map. | Path, current node, locked/completed states are clear. |
| MOB-04 | Account mobile | Open account page. | Child profile card/form remains usable. |

## Error Handling

| ID | Test Case | Steps | Expected Result |
| --- | --- | --- | --- |
| ERR-01 | Supabase unavailable | Test with network failure or invalid env in staging. | Friendly loading/error state, no blank page. |
| ERR-02 | Missing progress row | New user opens dashboard. | Setup/empty state appears. |
| ERR-03 | Invalid level URL | Open /mvp/question/not-a-number. | Safe not-found or locked-level handling. |
| ERR-04 | Unsupported route | Open gated non-MVP route. | Coming Soon/unavailable page appears. |
