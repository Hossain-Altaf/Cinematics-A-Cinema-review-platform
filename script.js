// Watchlist tab switching and localStorage logic
const tabMovies = document.getElementById('tab-movies');
const tabSeries = document.getElementById('tab-series');
const panelMovies = document.getElementById('watchlist-movies');
const panelSeries = document.getElementById('watchlist-series');

function switchTab(tab) {
    if (tab === 'movies') {
        tabMovies.classList.add('active');
        tabSeries.classList.remove('active');
        panelMovies.style.display = '';
        panelSeries.style.display = 'none';
    } else {
        tabMovies.classList.remove('active');
        tabSeries.classList.add('active');
        panelMovies.style.display = 'none';
        panelSeries.style.display = '';
    }
}

tabMovies.addEventListener('click', () => switchTab('movies'));
tabSeries.addEventListener('click', () => switchTab('series'));

// LocalStorage helpers
function getList(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}
function saveList(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

// Render functions
function renderList(key, ul) {
    const items = getList(key);
    ul.innerHTML = '';
    items.forEach((item, idx) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '&times;'; // X icon
        delBtn.className = 'remove-btn';
        delBtn.title = 'Remove';
        delBtn.onclick = () => {
            items.splice(idx, 1);
            saveList(key, items);
            renderList(key, ul);
        };
        li.appendChild(delBtn);
        ul.appendChild(li);
    });
}

// Movie add
const addMovieForm = document.getElementById('add-movie-form');
const movieInput = document.getElementById('movie-input');
const moviesList = document.getElementById('movies-list');
addMovieForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = movieInput.value.trim();
    if (val) {
        const arr = getList('watched-movies');
        arr.push(val);
        saveList('watched-movies', arr);
        renderList('watched-movies', moviesList);
        movieInput.value = '';
    }
});

// Series add
const addSeriesForm = document.getElementById('add-series-form');
const seriesInput = document.getElementById('series-input');
const seriesList = document.getElementById('series-list');
addSeriesForm.addEventListener('submit', e => {
    e.preventDefault();
    const val = seriesInput.value.trim();
    if (val) {
        const arr = getList('watched-series');
        arr.push(val);
        saveList('watched-series', arr);
        renderList('watched-series', seriesList);
        seriesInput.value = '';
    }
});

// Initial render
renderList('watched-movies', moviesList);
renderList('watched-series', seriesList);