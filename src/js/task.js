import { onFetchError } from './pnotifity';
import renderFormTempl from '../templates/render-form.hbs';
import NewsApiService from './apiService';
import galleryTempl from '../templates/gallery.hbs';

import { onContainerClick } from './openModal';

const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', renderFormTempl());

const refs = {
  searchForm: document.querySelector('.search-form'),

  createGalery: document.querySelector('.gallery'),

  sentinel: document.querySelector('.sentinel'),
};

const newApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);

refs.createGalery.addEventListener('click', onContainerClick);

function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  newApiService.query = e.currentTarget.elements.query.value;
  if (newApiService.query.trim() === '') {
    return onFetchError();
  }
  newApiService.resetPage();
  newApiService.fetchArticles().then(onMakeGallery).catch(onFetchError);
}

function onMakeGallery(hits) {
  const template = galleryTempl(hits);
  refs.createGalery.insertAdjacentHTML('beforeend', template);
}

function clearGalleryContainer() {
  refs.createGalery.innerHTML = ' ';
}

const onEntry = entries => {
  entries.forEach(entry => {
    const hasQuery = newApiService.query !== '';
    const isNextRequest = newApiService.page > 1;
    if (entry.isIntersecting && hasQuery && isNextRequest) {
      newApiService.fetchArticles().then(onMakeGallery).catch(onFetchError);
    }
  });
};

const options = {
  rootMargin: '300px',
};

let observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);

const heightDocumentElement = document.documentElement.clientHeight;

const arrowTop = document.createElement(`div`);
arrowTop.className = 'arrow-top';
arrowTop.dataset.hidden = true;
body.appendChild(arrowTop);

arrowTop.addEventListener('click', onArrowTopClick);

window.addEventListener('scroll', showHideArrowTop);

function onArrowTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function showHideArrowTop() {
  arrowTop.dataset.hidden = pageYOffset < document.documentElement.clientHeight;
}
