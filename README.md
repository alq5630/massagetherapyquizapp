# Massage Therapy Quiz App (Java, Console)

A simple **quiz application** designed for massage therapy students and educators. The app loads questions from a CSV file and supports multiple question types with instant feedback and end-of-quiz review. Perfect for studying anatomy, ethics, or clinical practice.

---

##  Features
-  **CSV-driven**: add/edit questions easily in a spreadsheet  
-  **Question types**: Multiple Choice (MC), True/False (TF), Short Answer (SHORT)  
-  **Shuffling**: randomizes questions each run  
-  **Instant feedback**: shows correctness + explanation  
-  **Results summary**: final score and per-question review  

---

## CSV Format and Examples

-  **You can also try the full 10-question worksheet:
examples/questions_salvo_ch3.csv**


##  Getting Started

### Prerequisites
- Java 17+ installed (`java -version`)

### Compile & Run
```bash
# compile
javac src/QuizApp.java

# copy the example question bank to the root folder
cp examples/questions.csv .

# run
java -cp src QuizApp

## Web Version (no install)
Use the browser app hosted on GitHub Pages:

1. Go to **https://alq5630.github.io/massagetherapyquizapp/**
2. Click **Choose questions.csv** and upload any CSV with headers: `type,prompt,options,answer,explanation`.
3. Click **Start Quiz** to begin.

CSV quick reference:
- MC: options split by `|`, answer can be the letter (A/B/C/...) or full text
- TF: answer must be `TRUE` or `FALSE`
- SHORT: put one or more acceptable answers separated by `|`

