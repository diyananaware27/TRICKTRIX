let quizData = [
  { question: "What is 2+2?", options: ["3","4","5"], answer: "4" },
  { question: "Capital of India?", options: ["Delhi","Mumbai","Chennai"], answer: "Delhi" }
];

let quizDiv = document.getElementById("quiz");

quizData.forEach((q, i) => {
  let div = document.createElement("div");
  div.innerHTML = `<p>${q.question}</p>`;
  q.options.forEach(opt => {
    div.innerHTML += `<input type='radio' name='q${i}' value='${opt}'> ${opt} <br>`;
  });
  quizDiv.appendChild(div);
});

function submitQuiz(){
  let score = 0;
  quizData.forEach((q,i)=>{
    let ans = document.querySelector(`input[name=q${i}]:checked`);
    if(ans && ans.value === q.answer) score++;
  });
  document.getElementById("result").innerText = "Your Score: " + score;
}
