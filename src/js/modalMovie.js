import { fetchJsonResponse } from './responseJsonFetch';
import { API_KEY } from './apiKey';
import { moviesStorage } from './localStorage';

const overlay = document.querySelector('.overlay');
const modalWindow = document.querySelector('.modal__window');
const closeButton = document.querySelector('.modal__button-close');
const modalDescription = document.querySelector('.modal__movie');
let btn = {
  watched: null,
  queue: null,
};

export const modalMovie = async e => {
  if (e.target === e.currentTarget) {
    return;
  }
  const liElement = findLi(e.target);
  if (!liElement) {
    return;
  }
  const id = liElement.dataset.id;
  const movie = await fetchJsonResponse(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
      api_key: API_KEY,
      language: 'en-US',
    }
  );
  if (movie.success === false) {
    return;
  }
  const watchedList = moviesStorage.getItem('watched');
  const queueList = moviesStorage.getItem('queue');
  let watchedClass = '';
  let queueClass = '';
  let watchedText = 'Add to watched';
  let queueText = 'Add to queue';
  if (watchedList) {
    if (watchedList.includes(id)) {
      watchedClass = 'modal-movie__watched';
      watchedText = 'Remove from watched';
    }
  }
  if (queueList) {
    if (queueList.includes(id)) {
      queueClass = 'modal-movie__queue';
      queueText = 'Remove from queue';
    }
  }

  const markup = `
            <div class="modal-movie__container">
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="Image of movie" class="modal-movie__picture" />
                <div class="modal-movie__information">
                    <h3 class="modal-movie__title">${movie.title}</h3>
                    <table>
                        <tbody class="modal-movie__table modal-table">
                            <tr class="modal-table__row">
                                <td class="modal-table__data modal-table__title">
                                    Vote/Votes
                                </td>
                                <td class="modal-table__data modal-table__information">
                                    <span class="modal-table__number modal-table--orange">${
                                      Math.round(movie.vote_average * 10) / 10
                                    }</span> / 
                                    <span class="modal-table__number modal-table--grey">${
                                      movie.vote_count
                                    }</span>
                                </td>
                            </tr>
                            <tr class="modal-table__row">
                                <td class="modal-table__data modal-table__title">
                                    Popularity
                                </td>
                                <td class="modal-table__data modal-table__information">
                                    ${Math.round(movie.popularity * 10) / 10}
                                </td>
                            </tr>
                            <tr class="modal-table__row">
                                <td class="modal-table__data modal-table__title">
                                    Original Title
                                </td>
                                <td class="modal-table__data modal-table__information modal-table--uppercase">
                                    ${movie.original_title}
                                </td>
                            </tr>
                            <tr class="modal-table__row">
                                <td class="modal-table__data modal-table__title">Genre</td>
                                <td class="modal-table__data modal-table__information">
                                    ${movie.genres
                                      .map(genre => genre.name)
                                      .join(', ')}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal-movie__overview">
                        <h4 class="modal-movie__about">About</h4>
                        <p class="modal-movie__description">${
                          movie.overview
                        }</p>
                    </div>
                    <div class="modal-movie__buttons movie-button">
                        <button
                            type="button"
                            class="modal-movie__btn ${watchedClass}"
                            data-idfilm=""
                            data-btn="watched"
                        >
                            ${watchedText}
                        </button>
                        <button
                            type="button"
                            class="modal-movie__btn ${queueClass}"
                            data-idfilm=""
                            data-btn="queue"
                        >
                            ${queueText}
                        </button>
                    </div>
                </div>
            </div>`;
  modalDescription.innerHTML = markup;
  viewModal(true);
  window.addEventListener('keyup', escapeClose);
  overlay.addEventListener('click', clickClose);
  btn.watched = document.querySelector('[data-btn="watched"]');
  btn.queue = document.querySelector('[data-btn="queue"]');
  btn.watched.addEventListener('click', e => addToLocalStorage(id, 'watched'));
  btn.queue.addEventListener('click', e => addToLocalStorage(id, 'queue'));
};

const findLi = target => {
  if (target.tagName === 'UL') {
    return false;
  }
  if (target.tagName !== 'LI') {
    return findLi(target.parentElement);
  }
  return target;
};

export const closeModal = () => {
  closeButton.addEventListener('click', e => viewModal(false));
};

const escapeClose = e => {
  if (e.key === 'Escape' || e.keyCode === 27) {
    viewModal(false);
  }
};

const clickClose = e => {
  if (e.currentTarget === e.target) {
    viewModal(false);
  }
};

export const viewModal = isShow => {
  if (isShow) {
    overlay.classList.remove('overlay--is-hidden');
    return;
  }
  overlay.classList.add('overlay--is-hidden');
  btn.watched.removeEventListener('click', addToLocalStorage);
  btn.queue.removeEventListener('click', addToLocalStorage);
  window.removeEventListener('keyup', escapeClose);
  overlay.removeEventListener('click', clickClose);
};

const addToLocalStorage = (id, type) => {
  const idList = moviesStorage.getItem(type);
  let newList = [];
  if (idList) {
    newList = [...idList];
  }

  if (newList.includes(id)) {
    moviesStorage.removeItem(id, type);
    btn[type].classList.remove(`modal-movie__${type}`);
    btn[type].innerText = `Add to ${type}`;
    return;
  }
  newList.push(id);
  moviesStorage.setItem(newList, type);
  let anotherType;
  if (type === 'watched') {
    anotherType = 'queue';
  }
  if (type === 'queue') {
    anotherType = 'watched';
  }
  moviesStorage.removeItem(id, anotherType);
  btn[type].classList.add(`modal-movie__${type}`);
  btn[type].innerText = `Remove from ${type}`;
  btn[anotherType].classList.remove(`modal-movie__${anotherType}`);
  btn[anotherType].innerText = `Add to ${anotherType}`;
};
