import java.io.*;
import java.nio.file.*;
import java.util.*;

/**
 * Simple Quiz App for Massage Therapy classes
 * Supports: MC (multiple choice), TF (true/false), SHORT (short answer)
 * CSV format: type,prompt,options,answer,explanation
 * - For MC: options separated by | (e.g., "A. ...,|B. ...,|C. ...")
 * - For TF: options may be empty; answers should be TRUE or FALSE
 * - For SHORT: answer can include multiple acceptable answers separated by |
 *
 * Example row:
 * MC,Which nerve innervates the diaphragm?,"A. Vagus|B. Phrenic|C. Ulnar|D. Median",B,"The phrenic nerve (C3–C5) keeps the diaphragm alive."
 */
public class QuizApp {

    // ====== Question base type ======
    interface Question {
        String getPrompt();
        boolean ask(Scanner in);
        String getReview();
    }

    // ====== Multiple Choice ======
    static class MCQuestion implements Question {
        private final String prompt;
        private final List<String> options; // already includes letters like A., B. if you want
        private final String correct;       // e.g., "B" or "b"
        private final String explanation;
        private boolean lastWasCorrect = false;
        private String userAnswer = "";

        MCQuestion(String prompt, List<String> options, String correct, String explanation) {
            this.prompt = prompt;
            this.options = options;
            this.correct = correct.trim().toUpperCase(Locale.ROOT);
            this.explanation = explanation;
        }

        @Override
        public String getPrompt() { return prompt; }

        @Override
        public boolean ask(Scanner in) {
            System.out.println("\n" + prompt);
            for (String opt : options) System.out.println("  " + opt);
            System.out.print("Your answer (A/B/C/D...): ");
            userAnswer = in.nextLine().trim().toUpperCase(Locale.ROOT);

            lastWasCorrect = userAnswer.equals(correct);
            if (lastWasCorrect) {
                System.out.println("✅ Correct!");
            } else {
                System.out.println("❌ Incorrect. Correct answer: " + correct);
            }
            if (!explanation.isBlank()) System.out.println("ℹ️ " + explanation);
            return lastWasCorrect;
        }

        @Override
        public String getReview() {
            return (lastWasCorrect ? "✔ " : "✘ ") + prompt +
                   "  [Your: " + (userAnswer.isBlank() ? "—" : userAnswer) +
                   ", Correct: " + correct + "]";
        }
    }

    // ====== True/False ======
    static class TFQuestion implements Question {
        private final String prompt;
        private final boolean correct;
        private final String explanation;
        private boolean lastWasCorrect = false;
        private String userAnswer = "";

        TFQuestion(String prompt, String correct, String explanation) {
            this.prompt = prompt;
            this.correct = correct.trim().equalsIgnoreCase("TRUE");
            this.explanation = explanation;
        }

        @Override
        public String getPrompt() { return prompt; }

        @Override
        public boolean ask(Scanner in) {
            System.out.println("\n" + prompt + " (True/False)");
            System.out.print("Your answer (T/F): ");
            userAnswer = in.nextLine().trim();
            boolean ua = userAnswer.equalsIgnoreCase("T") || userAnswer.equalsIgnoreCase("TRUE");
            lastWasCorrect = (ua == correct);

            if (lastWasCorrect) {
                System.out.println("✅ Correct!");
            } else {
                System.out.println("❌ Incorrect. Correct answer: " + (correct ? "True" : "False"));
            }
            if (!explanation.isBlank()) System.out.println("ℹ️ " + explanation);
            return lastWasCorrect;
        }

        @Override
        public String getReview() {
            return (lastWasCorrect ? "✔ " : "✘ ") + prompt +
                   "  [Your: " + (userAnswer.isBlank() ? "—" : userAnswer) +
                   ", Correct: " + (correct ? "True" : "False") + "]";
        }
    }

    // ====== Short Answer ======
    static class ShortQuestion implements Question {
        private final String prompt;
        private final Set<String> acceptable; // lowercase trimmed answers
        private final String explanation;
        private boolean lastWasCorrect = false;
        private String userAnswer = "";

        ShortQuestion(String prompt, String answer, String explanation) {
            this.prompt = prompt;
            this.acceptable = new HashSet<>();
            for (String a : answer.split("\\|")) {
                acceptable.add(a.trim().toLowerCase(Locale.ROOT));
            }
            this.explanation = explanation;
        }

        @Override
        public String getPrompt() { return prompt; }

        @Override
        public boolean ask(Scanner in) {
            System.out.println("\n" + prompt);
            System.out.print("Your answer: ");
            userAnswer = in.nextLine().trim();
            String norm = userAnswer.toLowerCase(Locale.ROOT);

            lastWasCorrect = acceptable.contains(norm);
            if (!lastWasCorrect) {
                // simple normalization: remove punctuation & extra spaces
                norm = norm.replaceAll("[^a-z0-9 ]", " ").replaceAll("\\s+", " ").trim();
                if (acceptable.contains(norm)) lastWasCorrect = true;
            }

            if (lastWasCorrect) {
                System.out.println("✅ Correct!");
            } else {
                System.out.println("❌ Incorrect. Acceptable answer(s): " + String.join(" | ", acceptable));
            }
            if (!explanation.isBlank()) System.out.println("ℹ️ " + explanation);
            return lastWasCorrect;
        }

        @Override
        public String getReview() {
            return (lastWasCorrect ? "✔ " : "✘ ") + prompt +
                   "  [Your: " + (userAnswer.isBlank() ? "—" : userAnswer) +
                   ", Acceptable: " + String.join(" | ", acceptable) + "]";
        }
    }

    // ====== CSV Loader ======
    static List<Question> loadQuestions(Path csvPath) throws IOException {
        List<Question> questions = new ArrayList<>();
        List<String> lines = Files.readAllLines(csvPath);
        int lineNum = 0;

        for (String raw : lines) {
            lineNum++;
            String line = raw.trim();
            if (line.isEmpty() || line.startsWith("#")) continue;

            // very simple CSV split (assumes no embedded commas inside quotes except options)
            // Format: type,prompt,options,answer,explanation
            // We allow options to contain pipes |
            String[] parts = splitCsv(line, 5);
            if (parts.length < 4) {
                System.err.println("Skipping malformed line " + lineNum + ": " + line);
                continue;
            }

            String type = parts[0].trim().toUpperCase(Locale.ROOT);
            String prompt = parts[1].trim();
            String options = parts.length > 2 ? parts[2].trim() : "";
            String answer = parts.length > 3 ? parts[3].trim() : "";
            String explanation = parts.length > 4 ? parts[4].trim() : "";

            switch (type) {
                case "MC":
                    List<String> opts = new ArrayList<>();
                    for (String o : options.split("\\|")) {
                        String s = o.trim();
                        if (!s.isEmpty()) opts.add(s);
                    }
                    if (opts.isEmpty()) {
                        System.err.println("MC missing options on line " + lineNum);
                        break;
                    }
                    questions.add(new MCQuestion(prompt, opts, answer, explanation));
                    break;

                case "TF":
                    questions.add(new TFQuestion(prompt, answer, explanation));
                    break;

                case "SHORT":
                    questions.add(new ShortQuestion(prompt, answer, explanation));
                    break;

                default:
                    System.err.println("Unknown type '" + type + "' on line " + lineNum);
            }
        }
        return questions;
    }

    // Simple CSV splitter for up to n columns; respects quotes around fields
    static String[] splitCsv(String line, int expectedCols) {
        List<String> cols = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);
            if (ch == '\"') {
                inQuotes = !inQuotes;
            } else if (ch == ',' && !inQuotes) {
                cols.add(sb.toString());
                sb.setLength(0);
            } else {
                sb.append(ch);
            }
        }
        cols.add(sb.toString()); // last col

        // pad if shorter
        while (cols.size() < expectedCols) cols.add("");
        return cols.toArray(new String[0]);
    }

    // ====== Runner ======
    public static void main(String[] args) {
        System.out.println("Massage Therapy Quiz");
        System.out.println("--------------------");

// Use first command-line arg if provided, else default to questions.csv
Path csv = Paths.get(args.length > 0 ? args[0] : "questions.csv");
        if (!Files.exists(csv)) {
            System.err.println("Could not find questions.csv in current directory.");
            System.err.println("Create a CSV using the format described in the source comments.");
            return;
        }

        List<Question> questions;
        try {
            questions = loadQuestions(csv);
        } catch (IOException e) {
            System.err.println("Failed to load questions: " + e.getMessage());
            return;
        }

        if (questions.isEmpty()) {
            System.err.println("No questions loaded. Please check your CSV content.");
            return;
        }

        Collections.shuffle(questions, new Random());

        int correct = 0;
        Scanner in = new Scanner(System.in);

        System.out.println("\nLoaded " + questions.size() + " questions. Good luck!");
        for (int i = 0; i < questions.size(); i++) {
            System.out.println("\nQ" + (i + 1) + "/" + questions.size());
            if (questions.get(i).ask(in)) correct++;
        }

        double pct = (100.0 * correct) / questions.size();
        System.out.printf("%n==== RESULTS ==== %nScore: %d/%d (%.1f%%)%n", correct, questions.size(), pct);

        System.out.println("\nReview:");
        for (Question q : questions) {
            System.out.println("- " + q.getReview());
        }

        System.out.println("\nThanks for playing!");
    }
}
