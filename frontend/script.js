let questions = [];
let current = 0;
let answers = [];

// 🔁 Fetch questions from backend
fetch("https://online-quiz-ruzd.onrender.com/questions")
  .then(res => res.json())
  .then(data => {

    if (!data || data.length === 0) {
      document.getElementById("question").innerText = "No questions found";
      return;
    }

    questions = shuffle(data);
    loadQ();
  })
  .catch(err => {
    console.error("Fetch Error:", err);
    document.getElementById("question").innerText = "Error loading questions";
  });

// 🔀 Shuffle questions
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 📌 Load Question
function loadQ() {
  if (!questions.length) return;

  let q = questions[current];

  document.getElementById("question").innerText =
    `Q${current + 1}. ${q.question}`;

  let optDiv = document.getElementById("options");
  optDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("div");
    btn.innerText = opt;
    btn.classList.add("option");

    if (answers[current] === opt) {
      btn.classList.add("selected");
    }

    btn.onclick = () => {
      answers[current] = opt;
      loadQ();
    };

    optDiv.appendChild(btn);
  });

  // ✅ FIXED PROGRESS BAR
  let progress = ((current + 1) / questions.length) * 100;
  document.getElementById("progress").style.width = progress + "%";

  // ✅ FIXED BUTTON TEXT
  let nextBtn = document.getElementById("nextBtn");
  if (current === questions.length - 1) {
    nextBtn.innerText = "Submit ✅";
  } else {
    nextBtn.innerText = "Next ➡";
  }
}

// ➡ Next
function nextQ() {
  if (!answers[current]) {
    alert("Please select an option!");
    return;
  }

  // ✅ FIXED CONDITION
  if (current === questions.length - 1) {
    submitQuiz();
    return;
  }

  current++;
  loadQ();
}

// ⬅ Previous
function prevQ() {
  if (current > 0) {
    current--;
    loadQ();
  }
}

// 🧮 Submit
function submitQuiz() {
  let score = 0;

  questions.forEach((q, i) => {
    if (q.answer === answers[i]) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  window.location.href = "result.html";
}
