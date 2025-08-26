# Massage Therapy Quiz App

An interactive quiz platform built for **Massage Therapy students and educators**.
Supports **Multiple Choice (MC)**, **True/False (TF)**, and **Short Answer (SHORT)** questions.

---

## Features

*  **Two modes of use**:

  1. **Java Console App** — classic CSV-based quizzes.
  2. **Browser-Based UI** — modern web app where students just pick a quiz (no CSV uploads).
* **Quiz Picker** — choose from pre-loaded quizzes.
*  **Instant Feedback** — shows correct/incorrect with explanations.
* **Results Summary** — review answers after finishing.
* **Export Results** — download as CSV.
* **Email Submission** — send scores directly to the instructor.

---

##  Repository Structure

```
massagetherapyquizapp/
├── src/               # Java console app (CSV-driven)
│   └── ...            # Java source files
├── docs/              # Browser UI (served by GitHub Pages)
│   ├── index.html
│   ├── styles.css
│   ├── quizzes.js     # Define quizzes here
│   └── script.js
└── README.md
```

---

##  Take the Quiz Online

 **Students click here to start:**
 [Massage Therapy Quiz App](https://alq5630.github.io/massagetherapyquizapp/)

### Student Instructions

1. Enter your **name** (and email if required).
2. Select a quiz from the dropdown.
3. Answer the questions.
4. At the end, you can:

   * View your score
   * Export results to CSV
   * Email your instructor (if enabled)

---

##  Instructor Guide

### Editing Quizzes

* All quizzes are stored in [`docs/quizzes.js`](docs/quizzes.js).
* Add or edit quizzes inside the `window.QUIZ_CATALOG` array:

```js
{
  id: "ethics-01",
  title: "Ethics: Professional Boundaries (Set 1)",
  questions: [
    {
      type: "TF",
      prompt: "A dual relationship is always ethical.",
      answer: "FALSE"
    },
    {
      type: "MC",
      prompt: "Which action best maintains client autonomy?",
      options: ["A. Making decisions", "B. Providing choices", "C. Withholding info"],
      answer: "B"
    },
    {
      type: "SHORT",
      prompt: "Name one element of informed consent.",
      answer: "risks|benefits|alternatives|scope|privacy"
    }
  ]
}
```

* **MC** → use `options` and specify the correct letter in `answer`.
* **TF** → `answer` must be `"TRUE"` or `"FALSE"`.
* **SHORT** → list acceptable answers separated by `|` (case-insensitive).

---

## 📧 Instructor Email Setup

This feature uses [**Formspree**](https://formspree.io/) (free, no server needed).

1. Create a Formspree project → copy the **endpoint URL** (e.g., `https://formspree.io/f/xxxxxx`).
2. In [`docs/quizzes.js`](docs/quizzes.js), update:

```js
window.EMAIL_CONFIG = {
  ENABLE_EMAIL: true,
  ENDPOINT: "https://formspree.io/f/your_form_id_here",
  TO_ADDRESS: "your_email@example.com"
};
```

3. Students will see an **“Email My Instructor”** button on the results screen.

---

## 🖥 Java Console Version (Optional)

Still included for command-line users.

### Compile & Run

```bash
javac src/QuizApp.java
cp examples/questions.csv .
java -cp src QuizApp
```

### CSV Format

```
type,prompt,options,answer,explanation
MC,Which nerve innervates the diaphragm?,"A. Vagus|B. Phrenic|C. Ulnar|D. Median",B,"C3–C5 keeps the diaphragm alive."
TF,Massage increases local circulation.,,TRUE,"Vasodilation contributes to increased blood flow."
SHORT,Name one hormone of the sympathetic response.,,epinephrine|adrenaline|norepinephrine,"Any of these is acceptable."
```

---

##  Deployment

This repo is already set up for **GitHub Pages**:

* All browser quiz files live in `/docs`.
* Pages Settings → Source: `main` branch, `/docs` folder.
* Live site: `https://alq5630.github.io/massagetherapyquizapp/`

---

##  License

MIT License — free to use, modify, and share.

---

##  About

Created to support **Massage Therapy education** — practice ethics, anatomy, physiology, and more by customizing quizzes.

---

✨ That gives you a README that looks **student-ready** while keeping all the technical details for you.

Do you want me to also make you a **badges section** (build status, license, GitHub Pages link) at the top for a polished look?
