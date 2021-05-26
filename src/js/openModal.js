import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'spin.js/spin.css';
import { Spinner } from 'spin.js';
import { opts } from './spinner';

function onContainerClick(event) {
  event.preventDefault();
  // const spinner = new Spinner().spin();
  const target = document.querySelector('.basicLightbox');
  console.log(target);
  const spinner = new Spinner(opts).spin(target);

  event.target.appendChild(spinner.el);
  console.log(spinner);

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const changeImg = `<img src=${event.target.dataset.source} alt="${event.target.alt}" />`;

  const instance = basicLightbox.create(changeImg);

  instance.show();
}

export { onContainerClick };
