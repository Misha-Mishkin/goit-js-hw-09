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
refs.startBtn.disabled = true;

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
let endDate;
let deltaTime;
function checkDate(value) {
    refs.startBtn.disabled = true;

    const currentTime = Date.now();
    if (value < currentTime) {
        Notify.failure("Please choose a date in the future");
        return;
    }
    refs.startBtn.disabled = false;
    endDate = value;
}

refs.startBtn.addEventListener('click', startTime);

function startTime () {
    if (deltaTime < 0) {
        clearInterval(timerId);
        return;
        }        

    timerId = setInterval(() => {
        const time = convertMs(endDate - Date.now());
        updateClockFace(time);
        console.log(updateClockFace(time));
    }, 1000);

    refs.startBtn.disabled = true;
    refs.input.disabled = true;
}

function addLeadingZero(num) {
    return String(num).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}


