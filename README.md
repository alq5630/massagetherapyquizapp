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
