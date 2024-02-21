'use strict';

import flatpickr from "flatpickr";
import iziToast from "izitoast";
import Error from '../img/octagone-x-mark.svg';

const stopTimer = (selectedDate, intervalID) => {
  if (selectedDate < Date.now() + 400) {
    clearInterval(intervalID);
    intervalID = null;
  }
}

const convertMs = (ms) => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return initTimer(days, hours, minutes, seconds);
}

const initTimer = (days, hours, minutes, seconds) => {
  const daysTarget = document.querySelector('[data-days]');
  const hoursTarget = document.querySelector('[data-hours]');
  const minutesTarget = document.querySelector('[data-minutes]');
  const secondsTarget = document.querySelector('[data-seconds]');

  daysTarget.textContent = days.toString().padStart(2, '0');
  hoursTarget.textContent = hours.toString().padStart(2, '0');
  minutesTarget.textContent = minutes.toString().padStart(2, '0');
  secondsTarget.textContent = seconds.toString().padStart(2, '0');
}

const errorMessage = () => {
  iziToast.error({
    class: 'popup-message',
    theme: 'dark',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    iconUrl: Error,
    position: 'topRight',
    pauseOnHover: true,
    timeout: 3000,
    message: 'Please choose a date in the future'
  });
}

const mobileInputAttrs = (state) => {
  const input = document.querySelector('.flatpickr-input.flatpickr-mobile');

  if (!input) {
    return;
  }

  state ? input.setAttribute('disabled', '') : input.removeAttribute('disabled');
}

const timerHandler = (selectedDate, input, trigger) => {
  trigger.removeAttribute('disabled');
  input.removeAttribute('disabled');
  mobileInputAttrs(false);
  let intervalID;

  trigger.addEventListener('click', () => {
    trigger.setAttribute('disabled', '');
    input.setAttribute('disabled', '');
    mobileInputAttrs(true);

    intervalID = setInterval(() => {
      convertMs(selectedDate - Date.now());
      stopTimer(selectedDate, intervalID);
    }, 200)
  });
}

const initInputTimer = () => {
  const input = document.querySelector('#datetime-picker');
  const trigger = document.querySelector('[data-start]');
  let userSelectedDate;

  if (!input || !trigger) {
    return;
  }

  trigger.setAttribute('disabled', '');

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: 'Y-m-d h:m',
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate <= Date.now() || isNaN(userSelectedDate)) {
        trigger.setAttribute('disabled', '');
        errorMessage();
      } else {
        timerHandler(userSelectedDate, input, trigger);
      }
    }
  };

  flatpickr(input, options);
}

initInputTimer();