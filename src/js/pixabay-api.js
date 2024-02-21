import iziToast from "izitoast";
import Error from '../img/octagone-x-mark.svg';
import { markupGallery } from "./render-functions";


export const fetchImages = (question) => {
  const SOURCE_URL = 'https://pixabay.com/api/';
  const KEY = '10296847-2cb755935dd8ca79d5cc29426';
  const KEY_STRING = `?key=${KEY}`;
  const QUESTION = question;
  const FETCH_URL = `${SOURCE_URL}${KEY_STRING}&q=${QUESTION}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(FETCH_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then((data) => {
      markupGallery(data);
    })
    .catch((error) => iziToast.error({
      class: 'popup-message',
      theme: 'dark',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      iconUrl: Error,
      position: 'topRight',
      pauseOnHover: true,
      timeout: 3000,
      message: `${error}`,
    }));

}