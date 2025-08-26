// State
let questions = [];
let current = 0;
let answers = []; // { chosen, correct, isCorrect, explanation }

const $ = sel => document.querySelector(sel);
const quizEl = $("#quiz");
const resultsEl = $("#results");
const scoreEl = $("#score");
const reviewEl = $("#review");
const startBtn = $("#startBtn");
const fileInput = $("#fileInput");

fileInput.addEventListener("change", () => {
  startBtn.disabled = !fileInput.files?.length;
});

startBtn.addEventListener("click", async () => {
  clearError();
  const file = fileInput.files[0];
  if (!file) return;
  try {
    const parsed = await parseCsv(file);
    questions = normalizeQuestions(parsed.data);
    if (!questions.length) {
      throw new Error("No questions found. Make sure your CSV has a header row: type,prompt,options,answer,explanation");
    }
    current = 0; answers = [];
    $("#uploader").classList.add("hidden");
    quizEl.classList.remove("hidden");
    renderQuestion();
  } catch (err) {
    showError(err?.message || String(err));
  }
});

function showError(msg) {
  const box = document.querySelector("#error");
  if (!box) return alert(msg);
  box.textContent = msg;
  box.classList.remove("hidden");
}
function clearError() {
  const box = document.querySelector("#error");
  if (!box) return;
  box.textContent = "";
  box.classList.add("hidden");
}


$("#restartBtn")?.addEventListener("click", () => {
  resultsEl.classList.add("hidden");
  $("#uploader").classList.remove("hidden");
  fileInput.value = "";
  startBtn.disabled = true;
});

// CSV parsing using PapaParse (header row, ignore empties)
function parseCsv(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true, // avoids blank row issues
      complete: resolve,
      error: reject
    });
  });
}

// Normalize rows -> internal model
function normalizeQuestions(rows) {
  return rows.map((r, idx) => {
    const type = (r.type || "").trim().toUpperCase();
    const prompt = (r.prompt || "").trim();
    const expl = (r.explanation || "").trim();
    let options = [];
    let answer = (r.answer || "").trim();

    if (type === "MC") {
      options = (r.options || "")
        .split("|")
        .map(s => s.trim())
        .filter(Boolean);
      // Allow letter keys (A/B/C/...) OR full text
      if (/^[A-Z]$/.test(answer)) {
        const i = answer.charCodeAt(0) - 65;
        answer = options[i] ?? "";
      }
    } else if (type === "TF") {
      options = ["TRUE", "FALSE"];
      answer = answer.toUpperCase();
      if (answer !== "TRUE" && answer !== "FALSE") {
        throw new Error(`Row ${idx + 1}: TF answer must be TRUE or FALSE`);
      }
    } else if (type === "SHORT") {
      options = [];
      answer = (answer || "")
        .split("|")
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
    } else {
      throw new Error(`Row ${idx + 1}: Unsupported type "${type}"`);
    }

    if (!prompt) throw new Error(`Row ${idx + 1}: Missing prompt`);
    if (type !== "SHORT" && (!options.length || !answer)) {
      throw new Error(`Row ${idx + 1}: Missing options/answer`);
    }

    return { type, prompt, options, answer, explanation: expl };
  });
}

function renderQuestion() {
  const q = questions[current];
  quizEl.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card";

  const h = document.createElement("h2");
  h.textContent = `Question ${current + 1} of ${questions.length}`;
  card.appendChild(h);

  const p = document.createElement("p");
  p.textContent = q.prompt;
  card.appendChild(p);

  let chosen = null;

  if (q.type === "MC" || q.type === "TF") {
    const wrap = document.createElement("div");
    wrap.className = "options";
    q.options.forEach((opt) => {
      const label = document.createElement("label");
      label.className = "option";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "opt";
      input.value = opt;
      input.addEventListener("change", () => { chosen = opt; });
      label.appendChild(input);
      const span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(span);
      wrap.appendChild(label);
    });
    card.appendChild(wrap);
  } else if (q.type === "SHORT") {
    const inp = document.createElement("input");
    inp.type = "text";
    inp.placeholder = "Type your answer…";
    inp.style.width = "100%";
    inp.addEventListener("input", (e) => { chosen = e.target.value; });
    card.appendChild(inp);
  }

  const controls = document.createElement("div");
  controls.className = "controls";

  const submit = document.createElement("button");
  submit.textContent = current === questions.length - 1 ? "Finish" : "Submit";
  submit.addEventListener("click", () => {
    if (chosen == null || (typeof chosen === "string" && chosen.trim() === "")) {
      alert("Please choose or type an answer.");
      return;
    }
    gradeAndNext(q, chosen, card);
  });
  controls.appendChild(submit);

  if (current > 0) {
    const back = document.createElement("button");
    back.textContent = "Back";
    back.addEventListener("click", () => {
      current = Math.max(0, current - 1);
      answers.pop(); // re-answer previous
      renderQuestion();
    });
    controls.appendChild(back);
  }

  card.appendChild(controls);
  quizEl.appendChild(card);
}

function gradeAndNext(q, chosen, card) {
  let isCorrect = false;
  if (q.type === "SHORT") {
    const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
    const c = norm(chosen);
    isCorrect = q.answer.some(a => norm(a) === c);
  } else {
    isCorrect = chosen === q.answer;
  }

  const expl = document.createElement("div");
  expl.className = "expl";
  expl.innerHTML = isCorrect
    ? "✅ Correct!"
    : `❌ Incorrect. <strong>Answer:</strong> ${Array.isArray(q.answer) ? q.answer.join(", ") : q.answer}`;
  if (q.explanation) {
    const br = document.createElement("div");
    br.textContent = q.explanation;
    expl.appendChild(br);
  }
  card.appendChild(expl);

  answers.push({ chosen, correct: q.answer, isCorrect, explanation: q.explanation });

  setTimeout(() => {
    if (current === questions.length - 1) {
      showResults();
    } else {
      current += 1;
      renderQuestion();
    }
  }, 600);
}

function showResults() {
  quizEl.classList.add("hidden");
  resultsEl.classList.remove("hidden");

  const correct = answers.filter(a => a.isCorrect).length;
  scoreEl.textContent = `You scored ${correct} / ${answers.length}`;

  reviewEl.innerHTML = "";
  questions.forEach((q, i) => {
    const row = document.createElement("div");
    row.className = "card " + (answers[i].isCorrect ? "correct" : "wrong");
    row.innerHTML = `<strong>Q${i + 1}.</strong> ${q.prompt}<br>
      <em>Your answer:</em> ${answers[i].chosen}<br>
      <em>Correct:</em> ${Array.isArray(q.answer) ? q.answer.join(", ") : q.answer}
      ${q.explanation ? `<div class="expl">${q.explanation}</div>` : ""}`;
    reviewEl.appendChild(row);
  });
}
