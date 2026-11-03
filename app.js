// ===== STATE =====
const store = {
  get done() { return JSON.parse(localStorage.getItem('wha_done') || '[]'); },
  set done(v) { localStorage.setItem('wha_done', JSON.stringify(v)); },
  get scores() { return JSON.parse(localStorage.getItem('wha_scores') || '{}'); },
  set scores(v) { localStorage.setItem('wha_scores', JSON.stringify(v)); }
};
const totalLessons = MODULES.reduce((n, m) => n + m.lessons.length, 0);

function updateProgress() {
  const pct = Math.round(store.done.length / totalLessons * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressText').textContent = pct + '%';
}

// ===== NAVIGASI VIEW =====
document.querySelectorAll('[data-view]').forEach(el => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const v = el.dataset.view;
    document.querySelectorAll('.view').forEach(s => s.classList.remove('active'));
    document.getElementById('view-' + v).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (v === 'roadmap') renderRoadmap();
    if (v === 'modules') renderModules();
    if (v === 'quiz') renderQuizList();
  });
});

// ===== ROADMAP =====
function renderRoadmap() {
  const tl = document.getElementById('timeline');
  tl.innerHTML = MODULES.map((m, i) => {
    const doneCount = m.lessons.filter(l => store.done.includes(l.id)).length;
    const done = doneCount === m.lessons.length;
    return `<div class="tl-item ${done ? 'done' : ''}">
      <div class="tl-num">${done ? '✓' : i + 1}</div>
      <div class="tl-body">
        <h3>${m.icon} ${m.title}</h3>
        <p>${m.desc}</p>
        <span class="tl-progress">${doneCount}/${m.lessons.length} selesai</span>
      </div>
    </div>`;
  }).join('');
}

// ===== MODULES =====
let currentLesson = null;
function renderModules() {
  document.getElementById('lessonView').hidden = true;
  const list = document.getElementById('moduleList');
  list.innerHTML = MODULES.map(m => {
    const doneCount = m.lessons.filter(l => store.done.includes(l.id)).length;
    return `<div class="module-card">
      <div class="module-head"><span class="module-icon">${m.icon}</span>
        <div><h3>${m.title}</h3><p>${m.desc}</p></div>
        <span class="module-pct">${doneCount}/${m.lessons.length}</span>
      </div>
      <div class="module-quiz"><button class="btn btn-primary btn-sm" data-module-quiz="${m.quiz}">📝 Ikuti Kuis ${m.title}</button></div>
      <div class="lesson-links">${m.lessons.map(l =>
        `<button class="lesson-link ${store.done.includes(l.id) ? 'done' : ''}" data-lesson="${l.id}">${store.done.includes(l.id) ? '✓ ' : ''}${l.title}</button>`
      ).join('')}</div>
    </div>`;
  }).join('');
  list.querySelectorAll('[data-lesson]').forEach(b =>
    b.addEventListener('click', () => openLesson(b.dataset.lesson)));
  list.querySelectorAll('[data-module-quiz]').forEach(b =>
    b.addEventListener('click', () => {
      document.querySelectorAll('.view').forEach(s => s.classList.remove('active'));
      document.getElementById('view-quiz').classList.add('active');
      window.scrollTo({ top: 0 });
      startQuiz(b.dataset.moduleQuiz);
    }));
}

function openLesson(id) {
  for (const m of MODULES) {
    const l = m.lessons.find(x => x.id === id);
    if (l) {
      currentLesson = l;
      document.getElementById('lessonContent').innerHTML = `<h2>${l.title}</h2>${l.body}`;
      document.getElementById('lessonView').hidden = false;
      document.getElementById('moduleList').innerHTML = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const btn = document.getElementById('completeLesson');
      btn.textContent = store.done.includes(id) ? '✓ Selesai' : 'Tandai Selesai ✓';
      return;
    }
  }
}
document.getElementById('backToModules').addEventListener('click', renderModules);

function allLessons() {
  const arr = [];
  MODULES.forEach(m => m.lessons.forEach(l => arr.push({ ...l, module: m.title })));
  return arr;
}
function navLesson(dir) {
  const arr = allLessons();
  const idx = arr.findIndex(l => l.id === (currentLesson && currentLesson.id));
  const n = idx + dir;
  if (n >= 0 && n < arr.length) openLesson(arr[n].id);
}
document.getElementById('prevLesson').addEventListener('click', () => navLesson(-1));
document.getElementById('nextLesson').addEventListener('click', () => {
  const d = store.done;
  if (currentLesson && !d.includes(currentLesson.id)) { d.push(currentLesson.id); store.done = d; updateProgress(); }
  navLesson(1);
});
document.getElementById('completeLesson').addEventListener('click', () => {
  if (!currentLesson) return;
  const d = store.done;
  if (!d.includes(currentLesson.id)) { d.push(currentLesson.id); store.done = d; }
  document.getElementById('completeLesson').textContent = '✓ Selesai';
  updateProgress();
});

// ===== QUIZ =====
let quizState = null;
let quizGen = 0;
function renderQuizList() {
  quizGen++;
  quizState = null;
  document.getElementById('quizPlay').hidden = true;
  const el = document.getElementById('quizList');
  el.innerHTML = QUIZZES.map(q => {
    const s = store.scores[q.id];
    return `<button class="quiz-item" data-quiz="${q.id}">
      <strong>${q.title}</strong>
      <span>${s != null ? 'Skor: ' + s + '%' : q.questions.length + ' soal'}</span>
    </button>`;
  }).join('');
  el.querySelectorAll('[data-quiz]').forEach(b =>
    b.addEventListener('click', () => startQuiz(b.dataset.quiz)));
}
function startQuiz(id) {
  const q = QUIZZES.find(x => x.id === id);
  if (!q) return;
  quizGen++;
  quizState = { q, i: 0, correct: 0, gen: quizGen };
  document.getElementById('quizList').innerHTML = '';
  document.getElementById('quizPlay').hidden = false;
  showQuestion();
}
function showQuestion() {
  const { q, i } = quizState;
  const item = q.questions[i];
  document.getElementById('quizProgress').textContent = `Soal ${i + 1}/${q.questions.length}`;
  document.getElementById('quizQuestion').textContent = item.q;
  document.getElementById('quizFeedback').textContent = '';
  const box = document.getElementById('quizOptions');
  box.innerHTML = '';
  item.opts.forEach((opt, idx) => {
    const b = document.createElement('button');
    b.className = 'quiz-opt';
    b.textContent = opt;
    b.addEventListener('click', () => answer(idx, b));
    box.appendChild(b);
  });
}
function answer(idx, btn) {
  const { q, i } = quizState;
  const item = q.questions[i];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(b => b.disabled = true);
  const fb = document.getElementById('quizFeedback');
  if (idx === item.a) {
    btn.classList.add('correct');
    fb.textContent = '✅ Benar!';
    fb.className = 'ok';
    quizState.correct++;
  } else {
    btn.classList.add('wrong');
    opts[item.a].classList.add('correct');
    fb.textContent = '❌ Kurang tepat.';
    fb.className = 'bad';
  }
  const gen = quizState.gen;
  setTimeout(() => {
    if (!quizState || quizState.gen !== gen) return;
    quizState.i++;
    if (quizState.i < q.questions.length) showQuestion();
    else finishQuiz();
  }, 1200);
}
function finishQuiz() {
  const { q, correct } = quizState;
  const pct = Math.round(correct / q.questions.length * 100);
  const s = store.scores; s[q.id] = pct; store.scores = s;
  document.getElementById('quizQuestion').textContent = 'Selesai!';
  document.getElementById('quizProgress').textContent = '';
  document.getElementById('quizOptions').innerHTML = '';
  const fb = document.getElementById('quizFeedback');
  fb.textContent = `Skor: ${pct}% (${correct}/${q.questions.length} benar)`;
  fb.className = pct >= 70 ? 'ok' : 'bad';
}
document.getElementById('backToQuiz').addEventListener('click', renderQuizList);

// ===== INIT =====
updateProgress();
renderRoadmap();
