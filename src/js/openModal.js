import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'spin.js/spin.css';

import { ligtboxSpinn } from './spinner';

function onContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const changeImg = `<img class = "basiclightbox-img" src=${event.target.dataset.source} alt="${event.target.alt}" />`;
  const instance = basicLightbox.create(changeImg);

  instance.show();
  const lightboxEl = instance.element();
  const modalSpinner = ligtboxSpinn.spin(lightboxEl);
  const basiclightboxImg = document.querySelector('.basiclightbox-img');

  basiclightboxImg.addEventListener('load', event => {
    modalSpinner.stop();
  });
}

export { onContainerClick };
