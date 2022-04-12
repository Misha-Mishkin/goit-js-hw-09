import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
let endTime = null;
startBtn.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkDate(selectedDates[0]);
  },
};

flatpickr(refs.input, options);

function checkDate(value) {
    startBtn.disabled = true;

    const currentTime = new Date();
    if (value < currentTime) {
        Notify.failure("Please choose a date in the future");
        return;
    }
    startBtn.disabled = false;
    endDate = value.getTime();
}

refs.startBtn.addEventListener('click', startTime);

function startTime () {
    if (deltaTime < 0) {
        clearInterval(timerId);
        return;
        }        

    timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        const deltaTime = endTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        console.log(`${days}:${hours}:${minutes}:${seconds}`);
    }, 1000);
    startBtn.disabled = true;
    input.disabled = true;
}

function addLeadingZero(num) {
    return String(num).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};


