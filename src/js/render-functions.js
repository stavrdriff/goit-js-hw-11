'use strict';

import iziToast from "izitoast";
import Success from '../img/checked-circle.svg';
import Error from '../img/octagone-x-mark.svg';

const popupHandler = (delay, state) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then((value) => {
      iziToast.success({
        class: 'popup-message',
        theme: 'dark',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
        iconUrl: Success,
        position: 'topRight',
        pauseOnHover: true,
        timeout: 3000,
        message: value,
      })
    })
    .catch((value) => {
        iziToast.error({
        class: 'popup-message',
        theme: 'dark',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        iconUrl: Error,
        position: 'topRight',
        pauseOnHover: true,
        timeout: 3000,
        message: value,
      })
    })
}

const initForm = () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    popupHandler(form.delay.value, form.state.value);
  });
}

initForm();