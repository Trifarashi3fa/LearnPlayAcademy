# Content Structure

LearnPlay content should be stored in simple JSON files so it is easy to edit, review, and expand.

## Folder Example

```text
content/
  math/
    forest-world/
      forest-world-config.json
      level-1.json
      level-2.json
      level-3.json
      level-4.json
      level-5.json
      level-6.json
      level-7.json
      level-8.json
      level-9.json
      level-10.json
```

## Level File Rule

Each level should have:

- 10 questions
- question id
- level
- type
- topic
- difficulty
- question
- options
- correctAnswer
- explanation
- xpReward

## Question Format

```json
{
  "id": "math-forest-1-001",
  "level": 1,
  "nodeType": "Learn",
  "topic": "Numbers 1-10",
  "difficulty": "easy",
  "question": "What number comes after 3?",
  "options": ["2", "3", "4", "5"],
  "correctAnswer": "4",
  "explanation": "After 3 comes 4.",
  "xpReward": 10
}
```

## Beginner-Friendly Editing

To add more content later:

1. Open the correct level JSON file.
2. Copy one question object.
3. Change the id, question, options, correctAnswer, and explanation.
4. Keep xpReward as 10 unless the reward rules change.
5. Make sure each level has exactly 10 questions.