const levelEl = document.getElementById("level");
const textEl = document.getElementById("text");
const inputTextEl = document.getElementById("inputText");
const timeEl = document.getElementById("time");
const countEl = document.getElementById("count");
const popupEl = document.getElementById("popup");
const timeLeftEl = document.getElementById("timeLeft");

const highScoreEl = document.getElementById("highScore");

let count = 0;

let time = 5;

let level = "easy";

let valueLocal = count;

let correct = true;
let timeStart = false;
let speed = 1000;

levelEl.addEventListener("input", (e) => {
  level = levelEl.value;

  renderQuote();
  count = 0;
  time = 6;
});

const easy = [
  "accessible",
  "easy",
  "royal",
  "light",
  "little",
  "more",
  "Plain",
  "slight",
  "smooth",
  "most",
  "wire",
  "stuff",
];
const medium = [
  "agreement",
  "analysis",
  "american",
  "behviour",
  "between",
  "character",
  "challenge",
  "conference",
  "community",
];
const hard = [
  "ironic",
  "nonplussed",
  "enormity",
  "disinterested",
  "misspell",
  "pharaoh",
  "wierd",
  "pronunciation",
  "handkerchief",
  "logorhea",
  "chiaroscurist",
];

const win = ["hurry", "good to go", "That's good", "preety awesome"];

const random = [...easy, ...medium, ...hard];

function getRandomWord(array) {
  return array[Math.floor(Math.random() * (array.length - 1))];
}

function renderQuote() {
  let value = eval(level);
  const quote = getRandomWord(value);
  textEl.innerHTML = "";
  let quoteArray = quote.split("");

  quoteArray.forEach((letter) => {
    const span = document.createElement("span");
    span.innerHTML = letter;
    textEl.appendChild(span);
  });
}

renderQuote();

inputTextEl.addEventListener("input", (e) => {
  e.preventDefault();
  timeStart = true;
  const spanText = textEl.querySelectorAll("span");
  const inputValue = inputTextEl.value.split("");

  spanText.forEach((span, index) => {
    const character = inputValue[index];
    if (character == null) {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
      correct = false;
    } else if (character == span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correct = true;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) {
    renderQuote();
    inputTextEl.value = "";
    count++;
    countEl.innerText = count;
    popup(getRandomWord(win), "correctAnswer");
    time = 6;
    valueLocal = count;
    let loc = parseInt(getLocal());

    if (loc < valueLocal) {
      localStorage.setItem("HighScore", valueLocal);
    } else {
      localStorage.setItem("HighScore", loc);
      highScoreEl.innerText = loc;
    }
  }
});

function popup(value, action) {
  const popupPara = document.createElement("p");
  popupPara.classList.add("popup");
  popupPara.innerText = value;
  popupPara.classList.add(action);
  popupEl.appendChild(popupPara);

  setTimeout(() => {
    popupPara.remove();
  }, 500);
}

let countVar = "";
let running = false;

function countDown() {
  if (time > 0) {
    time--;
    timeEl.innerHTML = time;
    timeLeftEl.innerHTML = time;
  } else {
    clearInterval(countVar);
    running = false;
  }
  if (time < 3) {
    timeEl.style.color = "red";
  }
  if (time > 3) {
    timeEl.style.color = "#fff";
  }
  if (time <= 0) {
    popup("time Gone", "wrong");

    count = 0;
    countEl.innerText = count;
    let loc = parseInt(getLocal());
    highScoreEl.innerText = loc;
  }
}

window.addEventListener("keydown", (e) => {
  if (running) {
    return;
  }
  time = 5;
  running = true;
  countVar = setInterval(countDown, 1000);
});

function getLocal() {
  return localStorage.getItem("HighScore")
    ? localStorage.getItem("HighScore")
    : 0;
}

let loc = parseInt(getLocal());
highScoreEl.innerText = loc;
