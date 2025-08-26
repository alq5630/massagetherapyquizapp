// ========== CONFIG / HELPERS ==========
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function csvEscape(s) {
  const t = String(s ?? "");
  if (/[,"\n]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
}

// ========== ELEMENTS ==========
const els = {
  picker: document.getElementById('picker'),
  quiz: document.getElementById('quiz'),
  results: document.getElementById('results'),

  quizSelect: document.getElementById('quizSelect'),
  studentName: document.getElementById('studentName'),
  studentEmail: document.getElementById('studentEmail'),
  startBtn: document.getElementById('startBtn'),
  shuffleBox: document.getElementById('shuffleBox'),
  pickerError: document.getElementById('pickerError'),

  qCounter: document.getElementById('qCounter'),
  scoreBox: document.getElementById('scoreBox'),
  qPrompt: document.getElementById('qPrompt'),
  qOptions: document.getElementById('qOptions'),
  qShort: document.getElementById('qShort'),
  shortInput: document.getElementById('shortInput'),
  feedback: document.getElementById('feedback'),
  submitBtn: document.getElementById('submitBtn'),
  nextBtn: document.getElementById('nextBtn'),

  finalScore: document.getElementById('finalScore'),
  reviewTableBody: document.querySelector('#reviewTable tbody'),
  restartBtn: document.getElementById('restartBtn'),
  exportBtn: document.getElementById('exportBtn'),
  emailBtn: document.getElementById('emailBtn'),
  emailStatus: document.getElementById('emailStatus'),
};

// ========== STATE ==========
let state = {
  quizId: null,
  quizTitle: null,
  studentName: "",
  studentEmail: "",
  questions: [],
  idx: 0,
  correct: 0,
  responses: [],
};

// ========== INIT QUIZ PICKER ==========
function loadQuizPicker() {
  const catalog = (window.QUIZ_CATALOG || []);
  els.quizSelect.innerHTML = "";
  catalog.forEach(q => {
    const opt = document.createElement('option');
    opt.value = q.id;
    opt.textContent = q.title;
    els.quizSelect.appendChild(opt);
  });
  // Default to Chapter 3 if present
  if (catalog.some(q => q.id === "chapter-3-tools-of-the-trade")) {
    els.quizSelect.value = "chapter-3-tools-of-the-trade";
  }
}
loadQuizPicker();

// ========== QUIZ FLOW ==========
function startQuiz() {
  els.pickerError.textContent = "";
  const selectedId = els.quizSelect.value;
  const catalog = (window.QUIZ_CATALOG || []);
  const picked = catalog.find(q => q.id === selectedId);
  const name = els.studentName.value.trim();

  if (!picked) { els.pickerError.textContent = "Please select a quiz."; return; }
  if (!name) { els.pickerError.textContent = "Please enter your name."; return; }

  state.quizId = picked.id;
  state.quizTitle = picked.title;
  state.studentName = name;
  state.studentEmail = els.studentEmail.value.trim();
  state.questions = els.shuffleBox.checked ? shuffle(picked.questions) : picked.questions.slice();
  state.idx = 0;
  state.correct = 0;
  state.responses = [];

  els.picker.classList.add('hidden');
  els.results.classList.add('hidden');
  els.quiz.classList.remove('hidden');

  renderQuestion();
}

function renderQuestion() {
  const q = state.questions[state.idx];
  els.qCounter.textContent = `Question ${state.idx + 1} of ${state.questions.length}`;
  els.scoreBox.textContent = `Score: ${state.correct}/${state.idx}`;

  els.qPrompt.textContent = q.prompt;
  els.feedback.textContent = '';
  els.feedback.className = 'feedback';
  els.nextBtn.classList.add('hidden');
  els.submitBtn.classList.remove('hidden');

  els.qOptions.innerHTML = '';
  els.qShort.classList.add('hidden');

  if (q.type === 'MC') {
    (q.options || []).forEach((opt, i) => {
      const id = `opt_${i}`;
      const div = document.createElement('label');
      div.className = 'option';
      div.innerHTML = `<input type="radio" name="opt" id="${id}" value="${String.fromCharCode(65 + i)}"> ${opt}`;
      els.qOptions.appendChild(div);
    });
  } else if (q.type === 'TF') {
    ['TRUE','FALSE'].forEach((val, i) => {
      const id = `tf_${i}`;
      const div = document.createElement('label');
      div.className = 'option';
      div.innerHTML = `<input type="radio" name="opt" id="${id}" value="${val}"> ${val}`;
      els.qOptions.appendChild(div);
    });
  } else if (q.type === 'SHORT') {
    els.qShort.classList.remove('hidden');
    els.shortInput.value = '';
    els.shortInput.focus();
  }
}

function checkAnswer() {
  const q = state.questions[state.idx];
  let userAns = '';
  if (q.type === 'MC' || q.type === 'TF') {
    const checked = document.querySelector('input[name="opt"]:checked');
    if (!checked) return { ok: false, message: 'Please select an option.' };
    userAns = checked.value.trim();
  } else {
    userAns = els.shortInput.value.trim();
    if (!userAns) return { ok: false, message: 'Please type an answer.' };
  }

  let isCorrect = false;
  const correct = (q.answer || '').trim();
  if (q.type === 'MC' || q.type === 'TF') {
    isCorrect = userAns.toUpperCase() === correct.toUpperCase();
  } else {
    // Keyword-based matching for SHORT answers (supports "two"/"three" prompts)
    const acceptable = correct.split('|').map(s => s.trim().toLowerCase()).filter(Boolean);
    const normalized = userAns.toLowerCase();
    const need = (/\bthree\b|\b3\b/i.test(q.prompt) ? 3 : (/\btwo\b|\b2\b/i.test(q.prompt) ? 2 : 1));
    const matches = acceptable.filter(tok => tok && normalized.includes(tok)).length;
    isCorrect = matches >= need;
  }

  if (isCorrect) {
    state.correct += 1;
    els.feedback.textContent = 'Correct! ' + (q.explanation ? q.explanation : '');
    els.feedback.className = 'feedback ok';
  } else {
    els.feedback.textContent = 'Incorrect. ' + (q.explanation ? q.explanation : '');
    els.feedback.className = 'feedback err';
  }

  state.responses.push({
    idx: state.idx + 1,
    type: q.type,
    prompt: q.prompt,
    user: userAns,
    correct: correct,
    result: isCorrect ? 'Correct' : 'Incorrect',
    explanation: q.explanation || ''
  });

  els.submitBtn.classList.add('hidden');
  els.nextBtn.classList.remove('hidden');
  return { ok: true };
}

function nextQuestion() {
  if (state.idx + 1 < state.questions.length) {
    state.idx += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  els.quiz.classList.add('hidden');
  els.results.classList.remove('hidden');
  els.finalScore.textContent = `${state.studentName}, your score for “${state.quizTitle}” is ${state.correct} / ${state.questions.length}`;

  els.reviewTableBody.innerHTML = '';
  state.responses.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.idx}</td>
      <td>${r.type}</td>
      <td>${r.prompt}</td>
      <td>${r.user}</td>
      <td>${r.correct}</td>
      <td>${r.result}</td>
      <td>${r.explanation}</td>
    `;
    els.reviewTableBody.appendChild(tr);
  });
}

function exportResults() {
  const header = ['#','type','prompt','your_answer','correct_answer','result','explanation'];
  const lines = [header.join(',')];
  state.responses.forEach(r => {
    lines.push([r.idx, r.type, csvEscape(r.prompt), csvEscape(r.user), csvEscape(r.correct), r.result, csvEscape(r.explanation)].join(','));
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${state.quizId}_${state.studentName.replace(/\s+/g,'_')}_results.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ========== EMAIL RESULTS ==========
async function emailResults() {
  const cfg = window.EMAIL_CONFIG || {};
  if (!cfg.ENABLE_EMAIL || !cfg.ENDPOINT) {
    els.emailStatus.textContent = "Email is not configured. Ask your instructor.";
    return;
  }
  els.emailStatus.textContent = "Sending email...";
  const summary = {
    quizId: state.quizId,
    quizTitle: state.quizTitle,
    studentName: state.studentName,
    studentEmail: state.studentEmail,
    total: state.questions.length,
    correct: state.correct,
    percent: Math.round((state.correct / state.questions.length) * 100),
    timestamp: new Date().toISOString(),
    responses: state.responses
  };
  try {
    const resp = await fetch(cfg.ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary)
    });
    els.emailStatus.textContent = resp.ok
      ? "Sent! Your instructor has received your results."
      : "Email service returned an error. Try again or contact your instructor.";
  } catch {
    els.emailStatus.textContent = "Failed to send results (network error).";
  }
}

// ========== EVENTS ==========
els.startBtn.addEventListener('click', startQuiz);
els.submitBtn.addEventListener('click', () => {
  const res = checkAnswer();
  if (!res.ok) {
    els.feedback.textContent = res.message;
    els.feedback.className = 'feedback err';
  }
});
els.nextBtn.addEventListener('click', nextQuestion);
els.restartBtn.addEventListener('click', () => {
  els.results.classList.add('hidden');
  els.picker.classList.remove('hidden');
});
els.exportBtn.addEventListener('click', exportResults);
els.emailBtn.addEventListener('click', emailResults);
