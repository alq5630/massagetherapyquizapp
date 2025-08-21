# Contributing

Thanks for helping! You can contribute in two ways:
1) Add questions (CSV)
2) Improve code/features

## Add questions
- Edit `examples/questions.csv` or create a new CSV in `examples/`.
- CSV columns: `type,prompt,options,answer,explanation`
  - MC: options separated by `|`, answer is the letter (A/B/C/D…)
  - TF: answer `TRUE` or `FALSE` (options blank)
  - SHORT: multiple acceptable answers separated by `|`
- Keep explanations brief (1–2 sentences).
- Test locally by copying your CSV to the project root as `questions.csv` and running the app.

## Code improvements
- Fork & branch: `feature/my-feature`
- Keep changes small with clear commit messages.
- If adding features, update `README.md` and include a short example.

## Running locally
```bash
javac src/QuizApp.java
cp examples/questions.csv .
java -cp src QuizApp
