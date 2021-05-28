import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import 'spin.js/spin.css';
import { Spinner } from 'spin.js';
import { opts } from './spinner';

function onContainerClick(event) {
  // event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const changeImg = `<img src=${event.target.dataset.source} alt="${event.target.alt}" />`;
  const instance = basicLightbox.create(changeImg);
  console.log(instance.element());
  instance.show();
  const lightboxEl = instance.element().firstElementChild;
  const modalSpinner = new Spinner(opts).spin(lightboxEl);
  console.dir(modalSpinner);

  console.dir(event.target.onload);
  // if (event.target.onload) {
  //   modalSpinner.spin();
  // }

  // event.target.onload = () => modalSpinner.stop();
}

export { onContainerClick };
