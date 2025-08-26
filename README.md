Massage Therapy Quiz App

An open-source quiz application designed for Massage Therapy students and educators.
Supports multiple-choice (MC), true/false (TF), and short answer (SHORT) questions.

🚀 Features

Two ways to run:

Java Console App (original version) — load questions from CSV files.

Browser-Based UI (new) — students simply pick a quiz, no uploads required.

Quiz Picker — students choose from a list of quizzes.

Instant Feedback — correct/incorrect answers shown with explanations.

Results Summary — see all answers and scores at the end.

Export to CSV — students can save their results.

Email Results — optional email submission to the instructor.

📂 Repository Structure
.
├── src/               # Java console app (CSV-based)
│   └── ...            # Java source files
├── docs/              # Browser UI (served by GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── quizzes.js     # Define quizzes here
│   └── script.js
└── README.md

🖥️ Java Console App

The original version loads quizzes from CSV files.

Compile & Run
javac src/QuizApp.java
cp examples/questions.csv .
java -cp src QuizApp

CSV Format
type,prompt,options,answer,explanation
MC,Which nerve innervates the diaphragm?,"A. Vagus|B. Phrenic|C. Ulnar|D. Median",B,"C3–C5 keeps the diaphragm alive."
TF,Massage increases local circulation.,,TRUE,"Vasodilation contributes to increased blood flow."
SHORT,Name one hormone of the sympathetic response.,,epinephrine|adrenaline|norepinephrine,"Any of these is acceptable."

🌐 Browser-Based UI (Recommended for Students)

Hosted directly on GitHub Pages.
👉 Click here to take a quiz

Student Instructions

Open the quiz link above.

Enter your name (and email if required).

Pick the quiz you want to take.

Answer the questions and submit.

At the end, you can:

View your score

Export results as CSV

Email your instructor (if enabled)

Instructor Instructions

All quizzes live in docs/quizzes.js
.

To add/edit quizzes, update the window.QUIZ_CATALOG array:

{
  id: "ethics-01",
  title: "Ethics: Professional Boundaries (Set 1)",
  questions: [
    { type: "TF", prompt: "Dual relationships are always ethical.", answer: "FALSE" },
    { type: "MC", prompt: "Which action maintains client autonomy?",
      options: ["A. Making decisions", "B. Providing choices", "C. Withholding info"],
      answer: "B" }
  ]
}


MC: supply options and answer letter.

TF: answer is TRUE or FALSE.

SHORT: answer is a |-separated list of acceptable responses.

📧 Emailing Scores

This feature uses a simple form backend (e.g., Formspree
).

Setup (Formspree)

Create a new Form → copy your endpoint URL (looks like https://formspree.io/f/xxxxxx).

In docs/quizzes.js
, update:

window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/your_form_id_here",
  TO_ADDRESS: "your_email@example.com"
};


Students can then click “Email My Instructor” at the results screen.

📦 Deployment

This repo is configured for GitHub Pages.

All browser quiz files live in /docs.

Pages settings → Source: main branch, /docs folder.

Live site: https://<your-username>.github.io/massagetherapyquizapp/

📝 License

MIT License. Free to use, modify, and share.

🙋 About

Created for Massage Therapy education.
Use it to practice ethics, anatomy & physiology, clinical practice, or any subject by editing quizzes.
