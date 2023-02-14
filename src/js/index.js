import { API_KEY } from './apiKey';
import { fetchJsonResponse } from './responseJsonFetch';
import { moviesListRender } from './moviesListRender';
import { paginationRender, paginationDestroy } from './pagination';

const searchBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const pagination = document.querySelector('.pagination');
const movies = document.querySelector('.movies');

let actualPage = 1;

window.onload = () => {
  fetchJsonResponse('https://api.themoviedb.org/3/trending/movie/day', {
    api_key: API_KEY,
    page: actualPage,
  }).then(response => {
    paginationDestroy();
    actualPage = response.page;
    moviesListRender(response.results);
    paginationRender(response.page, response.total_pages);
  });
};

searchBtn.addEventListener('click', event => {
  event.preventDefault();
  movies.dataset.searchquery = searchInput.value;
  fetchJsonResponse('https://api.themoviedb.org/3/search/movie', {
    api_key: API_KEY,
    language: 'en-US',
    query: searchInput.value,
    include_adult: false,
    page: actualPage,
  }).then(response => {
    if (response.total_results === 0) {
      document
        .querySelector('.header__error')
        .classList.remove('header__error--hidden');
    }
    if (response.total_results > 0) {
      document
        .querySelector('.header__error')
        .classList.add('header__error--hidden');
    }
    paginationDestroy();
    actualPage = response.page;
    moviesListRender(response.results);
    paginationRender(response.page, response.total_pages);
  });
  if (searchInput.value != '') {
    searchInput.value = '';
  }
});
pagination.addEventListener('click', evt => {
  evt.preventDefault;
  window.scrollTo(0, 0);
  if (evt.target.classList.contains('pagination__button')) {
    if (
      evt.target.classList.contains('pagination__button--next') ||
      evt.target.classList.contains('pagination__button--previous')
    ) {
      actualPage = evt.target.dataset.page;
    }
    if (evt.target.textContent !== '') {
      actualPage = evt.target.textContent;
    }
  }
  if (movies.dataset.searchquery === undefined)
    fetchJsonResponse('https://api.themoviedb.org/3/trending/movie/day', {
      api_key: API_KEY,
      page: actualPage,
    }).then(response => {
      paginationDestroy();
      actualPage = response.page;
      moviesListRender(response.results);
      paginationRender(response.page, response.total_pages);
    });
  if (movies.dataset.searchquery !== undefined) {
    fetchJsonResponse('https://api.themoviedb.org/3/search/movie', {
      api_key: API_KEY,
      language: 'en-US',
      query: movies.dataset.searchquery,
      include_adult: false,
      page: actualPage,
    }).then(response => {
      if (response.total_results === 0) {
        document
          .querySelector('.header__error')
          .classList.remove('header__error--hidden');
      }
      if (response.total_results > 0) {
        document
          .querySelector('.header__error')
          .classList.add('header__error--hidden');
      }
      paginationDestroy();
      actualPage = response.page;
      moviesListRender(response.results);
      paginationRender(response.page, response.total_pages);
    });
    if (searchInput.value != '') {
      searchInput.value = '';
    }
  }
});
