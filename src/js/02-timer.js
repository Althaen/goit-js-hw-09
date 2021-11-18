import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const timer = document.getElementById('datetime-picker');
const button = document.querySelector('button');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timeValues = {
  days,
  hours,
  minutes,
  seconds,
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.parse(selectedDates[0]) > Date.now()) {
      button.removeAttribute('disabled');
      const endTime = Date.parse(selectedDates[0]);

      renderCountdownTime(endTime);

      clearInterval(timeInterval);
    } else {
      alert('Please choose a date in the future');
    }
  },
};

const countdownTimer = flatpickr(timer, options);
let timeInterval = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function renderCountdownTime(endTime) {
  const remainingTime = convertMs(endTime - Date.now());
  for (const key in remainingTime) {
    timeValues[key].textContent = `${addLeadingZero(remainingTime[key])}`;
  }
}

function startCountdown() {
  const endTime = Date.parse(countdownTimer.selectedDates[0]);
  button.setAttribute('disabled', true);
  timeInterval = setInterval(() => {
    renderCountdownTime(endTime);
    console.log(endTime - Date.now())
 
    if (Math.round((endTime - Date.now())/1000) <= 0) 
    {
      clearInterval(timeInterval);
      return;
    }
  }, 1000);
}
console.log(document.querySelectorAll('.value'));
button.addEventListener('click', startCountdown);
