import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.*;
import java.nio.file.*;
import java.util.*;

public class QuizAppFX extends Application {

    // ====== Question base type ======
    interface Question {
        String getPrompt();
        QuestionType getType();
        List<String> getOptions();      // for MC/TF; may be empty for SHORT
        boolean checkAnswer(String userInput);
        String correctAnswerLabel();    // e.g., "B", "True", or "oil | lotion"
        String getExplanation();
    }
    enum QuestionType { MC, TF, SHORT }

    static class MCQuestion implements Question {
        private final String prompt;
        private final List<String> options;
        private final String correct; // "A"/"B"/"C"/...
        private final String explanation;

        MCQuestion(String prompt, List<String> options, String correct, String explanation) {
            this.prompt = prompt;
            this.options = options;
            this.correct = correct.trim().toUpperCase(Locale.ROOT);
            this.explanation = explanation;
        }
        public String getPrompt() { return prompt; }
        public QuestionType getType() { return QuestionType.MC; }
        public List<String> getOptions() { return options; }
        public boolean checkAnswer(String userInput) {
            return userInput != null && userInput.trim().equalsIgnoreCase(correct);
        }
        public String correctAnswerLabel() { return correct; }
        public String getExplanation() { return explanation; }
    }

    static class TFQuestion implements Question {
        private final String prompt;
        private final boolean correct;
        private final String explanation;

        TFQuestion(String prompt, String correct, String explanation) {
            this.prompt = prompt;
            this.correct = correct.trim().equalsIgnoreCase("TRUE");
            this.explanation = explanation;
        }
        public String getPrompt() { return prompt; }
        public QuestionType getType() { return QuestionType.TF; }
        public List<String> getOptions() {
            return Arrays.asList("A. True", "B. False");
        }
        public boolean checkAnswer(String userInput) {
            boolean ua = "A".equalsIgnoreCase(userInput) || "T".equalsIgnoreCase(userInput) || "TRUE".equalsIgnoreCase(userInput);
            return ua == correct;
        }
        public String correctAnswerLabel() { return correct ? "True" : "False"; }
        public String getExplanation() { return explanation; }
    }

    static class ShortQuestion implements Question {
        private final String prompt;
        private final Set<String> acceptable;
        private final String explanation;

        ShortQuestion(String prompt, String answer, String explanation) {
            this.prompt = prompt;
            this.acceptable = new HashSet<>();
            for (String a : answer.split("\\|")) {
                acceptable.add(normalize(a));
            }
            this.explanation = explanation;
        }
        public String getPrompt() { return prompt; }
        public QuestionType getType() { return QuestionType.SHORT; }
        public List<String> getOptions() { return Collections.emptyList(); }
        public boolean checkAnswer(String userInput) {
            return acceptable.contains(normalize(userInput));
        }
        public String correctAnswerLabel() { return String.join(" | ", acceptable); }
        public String getExplanation() { return explanation; }

        private String normalize(String s) {
            if (s == null) return "";
            String t = s.toLowerCase(Locale.ROOT).replaceAll("[^a-z0-9 ]", " ").replaceAll("\\s+", " ").trim();
            return t;
        }
    }

    // ====== CSV Loader (same columns as your console app) ======
    static List<Question> loadQuestions(Path csvPath) throws IOException {
        List<Question> questions = new ArrayList<>();
        List<String> lines = Files.readAllLines(csvPath);
        int lineNum = 0;

        for (String raw : lines) {
            lineNum++;
            String line = raw.trim();
            if (line.isEmpty() || line.startsWith("#")) continue;

            String[] parts = splitCsv(line, 5);
            String type = parts[0].trim().toUpperCase(Locale.ROOT);
            String prompt = parts[1].trim();
            String options = parts[2].trim();
            String answer = parts[3].trim();
            String explanation = parts[4].trim();

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
    static String[] splitCsv(String line, int expectedCols) {
        List<String> cols = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        boolean inQuotes = false;
        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);
            if (ch == '"') inQuotes = !inQuotes;
            else if (ch == ',' && !inQuotes) { cols.add(sb.toString()); sb.setLength(0); }
            else sb.append(ch);
        }
        cols.add(sb.toString());
        while (cols.size() < expectedCols) cols.add("");
        return cols.toArray(new String[0]);
    }

    // ====== UI State ======
    private final List<Question> questions = new ArrayList<>();
    private int index = 0;
    private int correctCount = 0;

    // UI nodes (reused between questions)
    private Label promptLabel = new Label();
    private VBox optionsBox = new VBox(8);
    private ToggleGroup mcGroup = new ToggleGroup();
    private TextField shortField = new TextField();
    private Label feedback = new Label();
    private Button checkBtn = new Button("Check");
    private Button nextBtn = new Button("Next");
    private Button loadBtn = new Button("Open CSV…");

    @Override
    public void start(Stage stage) {
        stage.setTitle("Massage Therapy Quiz");

        // Top bar: load + progress
        HBox topBar = new HBox(10);
        topBar.setAlignment(Pos.CENTER_LEFT);
        topBar.getChildren().add(loadBtn);

        // Center: question + options
        promptLabel.setWrapText(true);
        promptLabel.setStyle("-fx-font-size: 16px; -fx-font-weight: bold;");
        optionsBox.setPadding(new Insets(5,0,0,0));

        VBox centerBox = new VBox(12, promptLabel, optionsBox);
        centerBox.setPadding(new Insets(10));

        // Bottom: feedback + actions
        HBox actions = new HBox(10, checkBtn, nextBtn);
        actions.setAlignment(Pos.CENTER_RIGHT);
        VBox bottom = new VBox(8, feedback, actions);
        bottom.setPadding(new Insets(10));
        feedback.setStyle("-fx-text-fill: #555;");

        BorderPane root = new BorderPane(centerBox, topBar, null, bottom, null);
        root.setPadding(new Insets(10));
        Scene scene = new Scene(root, 700, 450);

        wireEvents(stage);
        stage.setScene(scene);
        stage.show();

        // Try to auto-load "questions.csv" if present
        Path defaultCsv = Paths.get("questions.csv");
        if (Files.exists(defaultCsv)) {
            tryLoad(defaultCsv, stage);
        } else {
            showWelcome();
        }
    }

    private void wireEvents(Stage stage) {
        loadBtn.setOnAction(e -> {
            FileChooser fc = new FileChooser();
            fc.setTitle("Open questions CSV");
            fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("CSV Files", "*.csv"));
            File f = fc.showOpenDialog(stage);
            if (f != null) tryLoad(f.toPath(), stage);
        });

        checkBtn.setOnAction(e -> handleCheck());
        nextBtn.setOnAction(e -> nextQuestion());
    }

    private void tryLoad(Path csv, Stage stage) {
        try {
            List<Question> loaded = loadQuestions(csv);
            if (loaded.isEmpty()) {
                new Alert(Alert.AlertType.WARNING, "No questions found in:\n" + csv).showAndWait();
                return;
            }
            questions.clear();
            questions.addAll(loaded);
            Collections.shuffle(questions, new Random());
            index = 0;
            correctCount = 0;
            feedback.setText("");
            showQuestion(questions.get(index));
            stage.setTitle("Massage Therapy Quiz — " + csv.getFileName());
        } catch (IOException ex) {
            new Alert(Alert.AlertType.ERROR, "Failed to load CSV:\n" + ex.getMessage()).showAndWait();
        }
    }

    private void showWelcome() {
        promptLabel.setText("Open a question bank (CSV) to begin.\nUse the 'Open CSV…' button above.\n" +
                "CSV columns: type,prompt,options,answer,explanation");
        optionsBox.getChildren().setAll();
        feedback.setText("");
        nextBtn.setDisable(true);
        checkBtn.setDisable(true);
    }

    private void showQuestion(Question q) {
        promptLabel.setText("Q" + (index + 1) + "/" + questions.size() + " — " + q.getPrompt());
        optionsBox.getChildren().clear();
        feedback.setText("");
        nextBtn.setDisable(true);
        checkBtn.setDisable(false);

        if (q.getType() == QuestionType.MC || q.getType() == QuestionType.TF) {
            mcGroup = new ToggleGroup();
            for (String opt : q.getOptions()) {
                RadioButton rb = new RadioButton(opt);
                rb.setToggleGroup(mcGroup);
                rb.setWrapText(true);
                optionsBox.getChildren().add(rb);
            }
        } else { // SHORT
            shortField = new TextField();
            shortField.setPromptText("Type your answer here");
            optionsBox.getChildren().add(shortField);
        }
    }

    private void handleCheck() {
        Question q = questions.get(index);
        String user = "";

        if (q.getType() == QuestionType.MC || q.getType() == QuestionType.TF) {
            Toggle selected = mcGroup.getSelectedToggle();
            if (selected == null) {
                feedback.setStyle("-fx-text-fill: #d9534f;");
                feedback.setText("Please select an option.");
                return;
            }
            // map "A. Effleurage" -> "A"
            String text = ((RadioButton) selected).getText().trim();
            int dot = text.indexOf('.');
            if (dot > 0 && dot <= 2) user = text.substring(0, dot).toUpperCase(Locale.ROOT);
            else user = text; // fallback if options don't start with "A. "
        } else {
            user = shortField.getText();
            if (user == null || user.isBlank()) {
                feedback.setStyle("-fx-text-fill: #d9534f;");
                feedback.setText("Please type an answer.");
                return;
            }
        }

        boolean ok = q.checkAnswer(user);
        if (ok) {
            correctCount++;
            feedback.setStyle("-fx-text-fill: #28a745;");
            feedback.setText("✅ Correct!");
        } else {
            feedback.setStyle("-fx-text-fill: #d9534f;");
            feedback.setText("❌ Incorrect. Correct: " + q.correctAnswerLabel());
        }
        if (!q.getExplanation().isBlank()) {
            feedback.setText(feedback.getText() + "   \nℹ " + q.getExplanation());
        }

        checkBtn.setDisable(true);
        nextBtn.setDisable(false);
    }

    private void nextQuestion() {
        index++;
        if (index >= questions.size()) {
            showResults();
        } else {
            showQuestion(questions.get(index));
        }
    }

    private void showResults() {
        double pct = (100.0 * correctCount) / questions.size();
        String msg = String.format("Score: %d/%d (%.1f%%)", correctCount, questions.size(), pct);
        Label done = new Label("All done!\n" + msg + "\n\nOpen another CSV from the top-left to play again.");
        done.setStyle("-fx-font-size: 16px; -fx-font-weight: bold;");
        VBox box = new VBox(12, done);
        box.setAlignment(Pos.CENTER_LEFT);
        box.setPadding(new Insets(10));
        optionsBox.getChildren().setAll(box);
        promptLabel.setText("Results");
        feedback.setText("");
        checkBtn.setDisable(true);
        nextBtn.setDisable(true);
    }

    public static void main(String[] args) {
        launch(args);
    }
}
