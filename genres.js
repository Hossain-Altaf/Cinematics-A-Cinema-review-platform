// genres.js - reads ?genre=... and renders sample movies and series for the selected genre

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const samples = {
  Action: {
    movies: [
      { title: 'Fast Strike', img: 'https://placehold.co/240x320.png?text=Fast+Strike' },
      { title: 'Rogue Dawn', img: 'https://placehold.co/240x320.png?text=Rogue+Dawn' },
      { title: 'Iron Mercy', img: 'https://placehold.co/240x320.png?text=Iron+Mercy' },
      { title: 'Terminal Edge', img: 'https://placehold.co/240x320.png?text=Terminal+Edge' }
    ],
    series: [
      { title: 'Agent 47: Files', img: 'https://placehold.co/240x320.png?text=Agent+47' },
      { title: 'Urban Warfare', img: 'https://placehold.co/240x320.png?text=Urban+Warfare' },
      { title: 'Extraction Unit', img: 'https://placehold.co/240x320.png?text=Extraction+Unit' }
    ]
  },
  Comedy: {
    movies: [
      { title: 'The Misfits', img: 'https://placehold.co/240x320.png?text=The+Misfits' },
      { title: 'A Spoonful', img: 'https://placehold.co/240x320.png?text=A+Spoonful' },
      { title: 'Roommates', img: 'https://placehold.co/240x320.png?text=Roommates' }
    ],
    series: [
      { title: 'Laugh Track', img: 'https://placehold.co/240x320.png?text=Laugh+Track' },
      { title: 'Odd Couple 2.0', img: 'https://placehold.co/240x320.png?text=Odd+Couple+2.0' }
    ]
  },
  Drama: {
    movies: [
      { title: 'Beneath the Sky', img: 'https://placehold.co/240x320.png?text=Beneath+the+Sky' },
      { title: 'Crossroads', img: 'https://placehold.co/240x320.png?text=Crossroads' },
      { title: 'Silent Rivers', img: 'https://placehold.co/240x320.png?text=Silent+Rivers' }
    ],
    series: [
      { title: 'Shades of Truth', img: 'https://placehold.co/240x320.png?text=Shades+of+Truth' }
    ]
  },
  Romance: {
    movies: [
      { title: 'Autumn Letters', img: 'https://placehold.co/240x320.png?text=Autumn+Letters' },
      { title: 'Two Cups', img: 'https://placehold.co/240x320.png?text=Two+Cups' }
    ],
    series: [
      { title: 'Heartlines', img: 'https://placehold.co/240x320.png?text=Heartlines' }
    ]
  }
}

function renderList(listEl, items){
  listEl.innerHTML = '';
  items.forEach(it => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.className = 'movie-link';
    a.href = 'movie-detail.html';

    const img = document.createElement('img');
    img.src = it.img;
    img.alt = it.title;

    const span = document.createElement('span');
    span.className = 'card-title';
    span.textContent = it.title;

    a.appendChild(img);
    a.appendChild(span);
    li.appendChild(a);
    listEl.appendChild(li);
  })
}

function init(){
  const genre = getQueryParam('genre') || 'Action';
  const title = document.getElementById('genreTitle');
  title.textContent = genre;

  const data = samples[genre] || samples['Action'];

  const moviesEl = document.getElementById('genre-movies');
  const seriesEl = document.getElementById('genre-series');

  renderList(moviesEl, data.movies);
  renderList(seriesEl, data.series);
}

window.addEventListener('DOMContentLoaded', init);
