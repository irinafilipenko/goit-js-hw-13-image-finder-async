const API_KEY = '21672899-2a5ee6aa4aab0c8363895dd3b';
const BASE_URL = 'https://pixabay.com/api';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
    const searchParams = new URLSearchParams({
      q: this.searchQuery,
      image_type: 'photo',
      per_page: 15,
      page: this.page,
    });

    const url = `${BASE_URL}/?key=${API_KEY}&${searchParams}`;
    // const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=15&page=${this.page}`;

    const responseUrl = await fetch(url);
    const { hits } = await responseUrl.json();
    this.incrementPage();
    return hits;

    // return fetch(url)
    //   .then(response => response.json())
    //   .then(({ hits }) => {
    //     if (hits.length === 0) {
    //       onFetchError();
    //     }
    //     this.incrementPage();
    //     return hits;
    //   });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
