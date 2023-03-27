const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const resultContainer = document.querySelector('.result-container');
const errorContainer = document.querySelector('.error-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchTerm = input.value.trim();

  if (searchTerm === '') {
    errorContainer.innerText = 'Please enter a search term.';
    resultContainer.innerHTML = '';
    return;
  }

  try {
    //const response = await fetch(https:api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&language=en-US&query=${searchTerm}&page=1&include_adult=false);
    const data = await response.json();

    if (data.results.length === 0) {
      errorContainer.innerText = 'No results found.';
      resultContainer.innerHTML = '';
      return;
    }

    const movies = data.results.slice(0, 5);

    errorContainer.innerText = '';
    resultContainer.innerHTML = '';

    movies.forEach((movie) => {
      const movieContainer = document.createElement('div');
      movieContainer.classList.add('movie-container');

      const moviePoster = document.createElement('img');
      //moviePoster.src = https:image.tmdb.org/t/p/w500${movie.poster_path};
      //moviePoster.alt = ${movie.title} poster;

      const movieInfo = document.createElement('div');
      movieInfo.classList.add('movie-info');

      const movieTitle = document.createElement('h3');
      movieTitle.innerText = movie.title;

      const movieOverview = document.createElement('p');
      movieOverview.innerText = movie.overview;

      movieInfo.appendChild(movieTitle);
      movieInfo.appendChild(movieOverview);

      movieContainer.appendChild(moviePoster);
      movieContainer.appendChild(movieInfo);

      resultContainer.appendChild(movieContainer);
    });
  } catch (error) {
    console.error(error);
    errorContainer.innerText = 'An error occurred.';
    resultContainer.innerHTML = '';
  }
});