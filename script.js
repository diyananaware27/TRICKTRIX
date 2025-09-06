// ---------------- Login Validation ----------------
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let name = document.getElementById("name").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let role = document.getElementById("role").value;

      if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
        alert("Invalid Email!");
        return;
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone must be 10 digits!");
        return;
      }
      if (name === "") {
        alert("Name is required!");
        return;
      }

      if (role === "student") window.location.href = "quiz.html";
      if (role === "teacher") window.location.href = "teacher.html";
      if (role === "kids") window.location.href = "kids.html";
    });
  }
});

// ---------------- Student Quiz ----------------
const questions = [
  {
    q: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
    ans: "Delhi"
  },
  {
    q: "5 + 3 = ?",
    options: ["5", "7", "8", "9"],
    ans: "8"
  }
];

let index = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

function loadQuestion() {
  if (document.getElementById("quiz")) {
    if (index < questions.length) {
      document.getElementById("quiz").innerHTML = `
        <h3>${questions[index].q}</h3>
        ${questions[index].options.map(opt => 
          `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("<br>")}
      `;
      startTimer();
    } else {
      localStorage.setItem("studentScore", score);
      window.location.href = "result.html";
    }
  }
}

function checkAnswer(ans) {
  if (ans === questions[index].ans) score++;
  index++;
  loadQuestion();
}

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 30;
  timerInterval = setInterval(() => {
    document.getElementById("timer").innerText = "Time Left: " + timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      index++;
      loadQuestion();
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", loadQuestion);

// ---------------- Kids Quiz ----------------
const kidsQuestions = [
  {
    img: "images/apple.png",
    answers: { en: "Apple", hi: "सेब", mr: "सफरचंद" },
    correct: "apple"
  },
  {
    img: "images/ball.png",
    answers: { en: "Ball", hi: "गेंद", mr: "चेंडू" },
    correct: "ball"
  }
];

let kidIndex = 0;
let kidScore = 0;
let selectedLang = "en";

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("language");
  if (langSelect) {
    langSelect.addEventListener("change", () => {
      selectedLang = langSelect.value;
      loadKidQuestion();
    });
    loadKidQuestion();
  }
});

function loadKidQuestion() {
  const q = kidsQuestions[kidIndex];
  document.getElementById("quizImage").src = q.img;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  const btn = document.createElement("button");
  btn.innerText = q.answers[selectedLang];
  btn.onclick = () => checkKidAnswer(q.correct);
  optionsDiv.appendChild(btn);
}

function speakQuestion() {
  let text = selectedLang === "en" ? "What is this?" :
             selectedLang === "hi" ? "यह क्या है?" : "हे काय आहे?";
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = selectedLang === "hi" ? "hi-IN" : (selectedLang === "mr" ? "mr-IN" : "en-US");
  speechSynthesis.speak(utter);
}

function checkKidAnswer(correct) {
  kidScore++;
  kidIndex++;
  if (kidIndex < kidsQuestions.length) {
    loadKidQuestion();
    speakQuestion();
  } else {
    localStorage.setItem("kidsScore", kidScore);
    window.location.href = "result.html";
  }
}

// ---------------- Teacher Add Question ----------------
document.addEventListener("DOMContentLoaded", () => {
  const qForm = document.getElementById("questionForm");
  if (qForm) {
    qForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let qText = document.getElementById("qText").value;
      let opt1 = document.getElementById("opt1").value;
      let opt2 = document.getElementById("opt2").value;
      let opt3 = document.getElementById("opt3").value;
      let opt4 = document.getElementById("opt4").value;
      let ans = document.getElementById("answer").value;

      let newQ = { q: qText, options: [opt1, opt2, opt3, opt4], ans: ans };
      let saved = JSON.parse(localStorage.getItem("teacherQuestions")) || [];
      saved.push(newQ);
      localStorage.setItem("teacherQuestions", JSON.stringify(saved));
      alert("Question Added!");
      qForm.reset();
    });
  }
});
