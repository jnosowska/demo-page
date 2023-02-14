import { fetchJsonResponse } from './responseJsonFetch';
import { API_KEY } from './apiKey';

export function moviesListRender(movies) {
  const moviesList = document.querySelector('.movies__list');
  moviesList.innerHTML = '';

  // get genres list from api
  fetchJsonResponse('https://api.themoviedb.org/3/genre/movie/list', {
    api_key: API_KEY,
    language: 'en-US',
  }).then(response => {
    const genresList = response.genres;

    // get genres for each movie
    movies.forEach(movie => {
      const movieGenres = [];
      movie.genre_ids.forEach(genre_id => {
        for (const genre of genresList) {
          if (genre_id === genre.id) {
            movieGenres.push(genre.name);
          }
        }
      });

      // render movie html
      moviesList.insertAdjacentHTML(
        'beforeend',
        `<li class="movie" data-id="${movie.id}">
            <img class="movie__img"
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title} poster." loading="lazy" />
            <h2 class="movie__title">${movie.title}</h2>
            <div class="movie__info">
                <p class="movie__detail">
                ${movieGenres.slice(1, 5).join(', ')}
                </p>
                <p class="movie__detail">|</p>
                <p class="movie__detail">${movie.release_date.slice(0, 4)}</>
            </div>
        </li>`
      );
    });
  });
}
