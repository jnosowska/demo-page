import { closeModal, modalMovie } from './modalMovie';
const movies = document.querySelector('.movies');
const moviesGallery = document.querySelector('.movies__list');
const watchedBtn = document.querySelector('.watched-button');
const queueBtn = document.querySelector('.queue-button');
let fetchLibrary = () => {
  moviesGallery.innerHTML = '';
  queueBtn.classList.remove('queue-button--active');
  watchedBtn.classList.add('watched-button--active');
  let parsedLibrary = JSON.parse(localStorage.getItem('movies-watched'));
  parsedLibrary.forEach(async id => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1d9e7558ae558dc94a5fda2c9843c8eb`
    );
    let movie = await response.json();
    let movieGenres = movie.genres;
    genres = [];
    for (let i = 0; i < movieGenres.length; i++) {
      genres.push(movieGenres[i].name);
    }
    moviesGallery.insertAdjacentHTML(
      'beforeend',
      `<li class="movie" data-id="${movie.id}">
            <img class="movie__img"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title} poster." loading="lazy" />
            <h2 class="movie__title">${movie.title}</h2>
            <div class="movie__info">
            <p class="movie__detail">
                ${genres.slice(0, 5).join(', ')}
                </p>
                <p class="movie__detail">|</p>
                <p class="movie__detail">${movie.release_date.slice(0, 4)}</>
            </div>
        </li>`
    );
  });
};

let fetchQueue = () => {
  moviesGallery.innerHTML = '';
  watchedBtn.classList.remove('watched-button--active');
  queueBtn.classList.add('queue-button--active');
  let parsedLibrary = JSON.parse(localStorage.getItem('movies-queue'));
  parsedLibrary.forEach(async id => {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=1d9e7558ae558dc94a5fda2c9843c8eb`
    );
    let movie = await response.json();
    let movieGenres = movie.genres;
    genres = [];
    for (let i = 0; i < movieGenres.length; i++) {
      genres.push(movieGenres[i].name);
    }
    moviesGallery.insertAdjacentHTML(
      'beforeend',
      `<li class="movie" data-id="${movie.id}">
              <img class="movie__img"
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              alt="${movie.title} poster." loading="lazy" />
              <h2 class="movie__title">${movie.title}</h2>
              <div class="movie__info">
              <p class="movie__detail">
                  ${genres.slice(0, 5).join(', ')}
                  </p>
                  <p class="movie__detail">|</p>
                  <p class="movie__detail">${movie.release_date.slice(0, 4)}</>
              </div>
          </li>`
    );
  });
};
queueBtn.addEventListener('click', fetchQueue);
watchedBtn.addEventListener('click', fetchLibrary);
moviesGallery.addEventListener('click', modalMovie);
closeModal();
