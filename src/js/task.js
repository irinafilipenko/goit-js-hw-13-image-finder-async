import { onFetchError } from './pnotifity';
import renderFormTempl from '../templates/render-form.hbs';
import NewsApiService from './apiService';
import galleryTempl from '../templates/gallery.hbs';

import { onContainerClick } from './openModal';
import { spinner } from './spinner';

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
    if (entry.isIntersecting && newApiService.query !== '') {
      console.log('img');

      newApiService.fetchArticles().then(onMakeGallery).catch(onFetchError);
    }
  });
};

const options = {
  rootMargin: '300px',
};

let observer = new IntersectionObserver(onEntry, options);

observer.observe(refs.sentinel);
