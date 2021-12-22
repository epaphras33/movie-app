// const api_key = '04c35731a5ee918f014970082a0088b1';
const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const img_url = 'https://image.tmdb.org/t/p/w1280';
const search_api = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

getMovies(api_url);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img
                src="${img_url + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h4>The Overview</h4>
                ${overview}
            </div>
        `;
        main.appendChild(movieElement)
    });
}

function getClassByRate(vote) {

    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(search_api + searchTerm);
        search.value = '';
    }
});