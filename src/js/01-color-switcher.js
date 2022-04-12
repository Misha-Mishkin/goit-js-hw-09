const PROMPT_DELAY = 1000;
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

let timerId = null;
let stopBtnClicked = false;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function changeBodyBackgroundColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener("click", () => {
    if (stopBtnClicked) {
        return;
    }

    timerId = setInterval(changeBodyBackgroundColor, PROMPT_DELAY);
    stopBtnClicked = true;
});

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    stopBtnClicked = false;
});
