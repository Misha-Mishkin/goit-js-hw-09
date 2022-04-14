const PROMPT_DELAY = 1000;
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBodyBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener("click", () => {
    timerId = setInterval(changeBodyBackgroundColor, PROMPT_DELAY);
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});


