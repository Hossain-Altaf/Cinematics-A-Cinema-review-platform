const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function setActiveOnScroll() {
    let scrollPos = window.scrollY + window.innerHeight / 2; 

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveOnScroll);
window.addEventListener('load', setActiveOnScroll);



// =====================================
// WATCHLIST — Tab Switching & Storage
// =====================================

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

function getList(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function saveList(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}

function renderList(key, ul) {
    const items = getList(key);
    ul.innerHTML = '';

    if (items.length === 0) {
    ul.innerHTML = '<li style="color:#ccc;">No items yet</li>';
    return;
}


    const VISIBLE_COUNT = 5;
    const showAll = ul.dataset.showAll === 'true';
    const count = showAll ? items.length : Math.min(items.length, VISIBLE_COUNT);

    items.slice(0, count).forEach((item, idx) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);

        const delBtn = document.createElement('button');
        delBtn.innerHTML = '&times;';
        delBtn.className = 'remove-btn';
        delBtn.onclick = () => {
            items.splice(idx, 1);
            saveList(key, items);
            renderList(key, ul);
        };

        li.appendChild(delBtn);
        ul.appendChild(li);
    });

    const container = ul.parentNode;
    const existingBtn = container.querySelector('.view-more-btn');
    if (existingBtn) existingBtn.remove();

    if (items.length > VISIBLE_COUNT) {
        const btn = document.createElement('button');
        btn.className = 'view-more-btn';
        btn.textContent = showAll ? 'View less' : `View more (${items.length - VISIBLE_COUNT})`;
        btn.addEventListener('click', () => {
            ul.dataset.showAll = (!showAll).toString();
            renderList(key, ul);
        });
        container.appendChild(btn);
    }
}

// Add movie
const addMovieForm = document.getElementById('add-movie-form');
const movieInput = document.getElementById('movie-input');
const moviesList = document.getElementById('movies-list');

if (addMovieForm) {
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
}

// Add series
const addSeriesForm = document.getElementById('add-series-form');
const seriesInput = document.getElementById('series-input');
const seriesList = document.getElementById('series-list');

if (addSeriesForm) {
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
}

// Initial renders
if (moviesList) renderList('watched-movies', moviesList);
if (seriesList) renderList('watched-series', seriesList);


// =====================================
// AUTH SYSTEM — Profile, Login, Logout
// =====================================

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');
    const authSection = document.getElementById('authSection');

    if (!authSection) return;

    if (token && userJson) {
        try {
            const user = JSON.parse(userJson);

            authSection.innerHTML = `
                <a href="profile.html" id="profileLink" style="color: #ffcb3b; font-weight: 600;">👤 ${user.username}</a>
                <a href="#" id="logoutLink" style="color: #ff4444;">Logout</a>
            `;

            // Logout handler
            const logoutLink = document.getElementById('logoutLink');
            if (logoutLink) {
                logoutLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to logout?')) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.reload();
                    }
                });
            }

            console.log('✅ User logged in:', user.username);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        }

    } else {
        authSection.innerHTML = `
            <a href="login.html" id="loginLink">Login</a>
            <a href="login.html" id="registerLink">Register</a>
        `;

        // Register link handler - show register tab
        const registerLink = document.getElementById('registerLink');
        if (registerLink) {
            registerLink.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.setItem('showRegisterForm', 'true');
                window.location.href = 'login.html';
            });
        }

        console.log('ℹ️ User not logged in');
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// =====================================
// TO-WATCH SECTION
// =====================================

const towatchTabs = document.querySelectorAll('.towatch-tab');

towatchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        towatchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.getElementById('towatch-movies').style.display =
            tab.dataset.tab === 'towatch-movies' ? 'flex' : 'none';

        document.getElementById('towatch-series').style.display =
            tab.dataset.tab === 'towatch-series' ? 'flex' : 'none';
    });
});

// Add To-Watch movies
const addTowatchMovieForm = document.getElementById('add-towatch-movie-form');
const towatchMovieInput = document.getElementById('towatch-movie-input');
const towatchMoviesList = document.getElementById('towatch-movies-list');

if (addTowatchMovieForm) {
    addTowatchMovieForm.addEventListener('submit', e => {
        e.preventDefault();
        const val = towatchMovieInput.value.trim();
        if (val) {
            const arr = getList('towatch-movies');
            arr.push(val);
            saveList('towatch-movies', arr);
            renderList('towatch-movies', towatchMoviesList);
            towatchMovieInput.value = '';
        }
    });
}

// Add To-Watch series
const addTowatchSeriesForm = document.getElementById('add-towatch-series-form');
const towatchSeriesInput = document.getElementById('towatch-series-input');
const towatchSeriesList = document.getElementById('towatch-series-list');

if (addTowatchSeriesForm) {
    addTowatchSeriesForm.addEventListener('submit', e => {
        e.preventDefault();
        const val = towatchSeriesInput.value.trim();
        if (val) {
            const arr = getList('towatch-series');
            arr.push(val);
            saveList('towatch-series', arr);
            renderList('towatch-series', towatchSeriesList);
            towatchSeriesInput.value = '';
        }
    });
}

// Initial Renders
if (towatchMoviesList) renderList('towatch-movies', towatchMoviesList);
if (towatchSeriesList) renderList('towatch-series', towatchSeriesList);


// =====================================
// HOT NEWS SECTION
// =====================================

const newsData = [
    {
        id: 1,
        title: "Deadpool 3 Release",
        date: "November 10, 2025",
        description: "Deadpool is breaking records again...",
        trailerUrl: "https://www.youtube.com/watch?v=otOjB0Ias8o"
    },
    {
        id: 2,
        title: "Dune: Part Three",
        date: "November 08, 2025",
        description: "Villeneuve confirms part three...",
        trailerUrl: "https://variety.com/2025/film/news/dune-3-title-imax-cameras-1236448953/"
    },
    {
        id: 3,
        title: "Stranger Things: Season 5",
        date: "November 27, 2025",
        description: "Netfilx's most awaited series now finally...",
        trailerUrl: "https://www.youtube.com/watch?v=vhFPHYgILN0"
    },
    {
        id: 4,
        title: "Avatar:Fire and Ash",
        date: " December 19, 2025",
        description: "James Cameron's Avatar sequel is set to release...",
        trailerUrl: "https://www.youtube.com/watch?v=nb_fFj_0rq8"
    },
    {
        id: 5,
        title: "Fallout:Season 2",
        date: "December 17, 2025",
        description: "Amazon prime's post-apocyptic series is now...",
        trailerUrl: "https://www.youtube.com/watch?v=ECI3eCAxRGw"
    },
    {
        id: 6,
        title: "Family Man:Season 3",
        date: "November 21, 2025",
        description: "Amazon prime's one of the most awaited series is upto finally release...",
        trailerUrl: "https://www.youtube.com/watch?v=jsauQx_Fwrg"
    },
    {
        id: 7,
        title: "Tom Cruise finally won OSCAR",
        date: "November 17, 2025",
        description: "After 40 years of career, Tom Cruise finally won his first ever honorary Oscar...",
        trailerUrl: "https://variety.com/2025/awards/news/tom-cruise-honorary-oscar-speech-1236583348/"
    },
    {
        id: 8,
        title: "Cristopher Nolan's upcoming movie",
        date: "November 18, 2025",
        description: "The maestro Cristopher Nolan is set to release his new movie ",
        trailerUrl: "https://www.theguardian.com/film/2025/nov/14/christopher-nolan-the-odyssey-2-million-ft-imax-matt-damon"
    }
];

function convertToEmbed(url) {
    if (url.includes("watch?v=")) {
        return url.replace("watch?v=", "embed/");
    }
    return url;
}

function isYouTube(url) {
    return url.includes("youtube.com") || url.includes("youtu.be");
}

function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;

    newsContainer.innerHTML = '';

    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';

        let media;

        if (isYouTube(news.trailerUrl)) {
            // Convert to correct embed URL
            const embedUrl = convertToEmbed(news.trailerUrl);

            media = `
                <div class="news-trailer">
                    <iframe 
                        src="${embedUrl}" 
                        allowfullscreen 
                        loading="lazy">
                    </iframe>
                </div>`;
        } else {
            // External news link
            media = `
                <div class="news-trailer">
                    <a href="${news.trailerUrl}" target="_blank" class="news-link">
                        🔗 Open Full Article
                    </a>
                </div>`;
        }

        card.innerHTML = `
            ${media}
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.date}</p>
                <p>${news.description}</p>
            </div>
        `;

        newsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderNews);



// Add this to your script.js file

// =====================================
// SEARCH FUNCTIONALITY
// =====================================

// Search data - all your content organized
const searchData = {
    movies: [
        { id: 1, name: "Inception", img: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg", link: "movie-detail.html?id=1" },
        { id: 2, name: "The Dark Knight", img: "https://ew.com/thmb/B0w9qzmQqCZ1tumxv8cBx0aPTrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mcddakn_ec005-2000-a3d30c1958fb442486fb1e10ba92dd17.jpg", link: "movie-detail.html?id=2" },
        { id: 3, name: "Interstellar", img: "https://www.thequeenshall.net/sites/default/files/styles/qh_banner/public/images/interstellar_web.jpg?itok=AJbFps_U", link: "movie-detail.html?id=3" },
        { id: 4, name: "Parasite", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS58BazbrUOyYOl-mKlpr5LudwKvxurjZO-_A&s", link: "movie-detail.html?id=4" },
        { id: 5, name: "Forrest Gump", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXi1Z7W5BJpe34nlRrnQ_ItCSGdUoy8s8aBQ&s", link: "movie-detail.html?id=5" },
        { id: 6, name: "Avengers: Endgame", img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg", link: "movie-detail.html?id=6" },
        { id: 7, name: "Joker", img: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg", link: "movie-detail.html?id=7" },
        { id: 8, name: "Spider-Man", img: "https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", link: "movie-detail.html?id=8" },
        { id: 9, name: "Iron Man", img: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg", link: "movie-detail.html?id=9" },
        { id: 10, name: "Nobody", img: "https://m.media-amazon.com/images/M/MV5BYmIzOWViNDEtOWRiZS00ZWM4LWFiMmEtNGJjMmQ3NTIxN2U0XkEyXkFqcGc@._V1_.jpg", link: "movie-detail.html?id=10" },
        { id: 11, name: "Thor", img: "https://m.media-amazon.com/images/M/MV5BNjRhNGZjZjEtYTQzYS00OWUxLThjNGEtMTIwMTE2ZDFlZTZkXkEyXkFqcGc@._V1_.jpg", link: "movie-detail.html?id=11" },
        { id: 12, name: "Captain America", img: "https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", link: "movie-detail.html?id=12" },
        { id: 13, name: "The Shawshank Redemption", img: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg", link: "movie-detail.html?id=13" },
        { id: 14, name: "The Godfather", img: "https://www.lab111.nl/wp-content/uploads/2024/04/s-l1600.png", link: "movie-detail.html?id=14" },
        { id: 15, name: "The Dark Knight", img: "https://ew.com/thmb/B0w9qzmQqCZ1tumxv8cBx0aPTrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mcddakn_ec005-2000-a3d30c1958fb442486fb1e10ba92dd17.jpg", link: "movie-detail.html?id=15" },
        { id: 16, name: "12 Angry Men", img: "https://storage.googleapis.com/pod_public/750/262454.jpg", link: "movie-detail.html?id=16" },
        { id: 17, name: "Schindler's List", img: "https://m.media-amazon.com/images/I/817R7RXH9PL._UF1000,1000_QL80_.jpg", link: "movie-detail.html?id=17" },
        { id: 18, name: "The Lord of the Rings: The Return of the King", img: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_SY679_.jpg", link: "movie-detail.html?id=18" },
        { id: 19, name: "Pulp Fiction", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdX5gfR5CmXENJbuimiUvElI7YhLxOXPzmtA&s", link: "movie-detail.html?id=19" },
        { id: 20, name: "Gladiator", img: "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg", link: "movie-detail.html?id=20" },
        { id: 21, name: "Jurassic World", img: "https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_.jpg", link: "movie-detail.html?id=21" },
        { id: 22, name: "Avatar", img: "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg", link: "movie-detail.html?id=22" },
        { id: 23, name: "Deadpool", img: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Deadpool_%282016_poster%29.png/250px-Deadpool_%282016_poster%29.png", link: "movie-detail.html?id=23" },
        { id: 24, name: "Fight Club", img: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", link: "movie-detail.html?id=24" },
        { id: 25, name: "Spider-Man: Into the Spider-Verse", img: "https://ae01.alicdn.com/kf/U8131aae12dae43888c7d6a79c140fa88v.jpg", link: "movie-detail.html?id=25" },
        { id: 26, name: "The Matrix Reloaded", img: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg", link: "movie-detail.html?id=26" },
        { id: 27, name: "The Lion King", img: "https://imgc.allpostersimages.com/img/posters/trends-international-disney-the-lion-king-mufasa-and-simba_u-L-FAAQL30.jpg", link: "movie-detail.html?id=27" },
        { id: 28, name: "Back to the Future", img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Back_to_the_Future.jpg/250px-Back_to_the_Future.jpg", link: "movie-detail.html?id=28" },
        { id: 29, name: "Guardians of the Galaxy", img: "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_.jpg", link: "movie-detail.html?id=29" }
    ],
    series: [
        { id: 1, name: "Breaking Bad", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nCOQtpFRGcXpsWYwO4IfljyFMyuFTocncA&s", link: "series_detail.html?id=1" },
        { id: 2, name: "Game of Thrones", img: "https://m.media-amazon.com/images/I/61W-KI4mR6L._UF1000,1000_QL80_.jpg", link: "series_detail.html?id=2" },
        { id: 3, name: "Stranger Things", img: "https://media.newyorker.com/photos/5d237f1779745c0008681f21/16:9/w_2264,h_1273,c_limit/Phillips-StrangerThingsKidsS3.jpg", link: "series_detail.html?id=3" },
        { id: 4, name: "The Crown", img: "images/the_crown.jpg", link: "series_detail.html?id=4" },
        { id: 5, name: "The Mandalorian", img: "images/mandalorian.jpg", link: "series_detail.html?id=5" },
        { id: 6, name: "Money Heist", img: "https://www.tallengestore.com/cdn/shop/products/MoneyHeist-NetflixTVShowPosterFanArt_2fbbb757-22e3-43da-9e44-604ca8e397d6.jpg?v=1589268524", link: "series_detail.html?id=6" },
        { id: 7, name: "The Witcher", img: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p17580215_b_v13_ab.jpg", link: "series_detail.html?id=7" },
        { id: 9, name: "Dark", img: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p18367226_b_v13_aa.jpg", link: "series_detail.html?id=9" },
        { id: 10, name: "Fallout", img: "images/fallout.webp", link: "series_detail.html?id=10" },
        { id: 11, name: "Attack on Titan", img: "images/aot.jpg", link: "series_detail.html?id=11" },
        { id: 12, name: "Better Call Saul", img: "images/bcs.jpg", link: "series_detail.html?id=12" },
        { id: 13, name: "Dexter", img: "images/dexter.jpg", link: "series_detail.html?id=13" },
        { id: 14, name: "Death Note", img: "images/dn.webp", link: "series_detail.html?id=14" },
        { id: 15, name: "Panchayet", img: "images/panchayet.jpg", link: "series_detail.html?id=15" },
        { id: 16, name: "Narcos", img: "images/narcos.jpg", link: "series_detail.html?id=16" },
        { id: 17, name: "Kota Factory", img: "images/kf.jpg", link: "series_detail.html?id=17" },
        { id: 18, name: "Black Mirror", img: "images/bm.webp", link: "series_detail.html?id=18" },
        { id: 19, name: "Invincible", img: "images/invinvible.jfif", link: "series_detail.html?id=19" },
        { id: 20, name: "The Boys", img: "images/the_boys.jpg", link: "series_detail.html?id=20" },
        { id: 21, name: "The Last Kingdom", img: "https://www.themoviedb.org/t/p/w1280/8eJf0hxgIhE6QSxbtuNCekTddy1.jpg", link: "series_detail.html?id=21" },
        { id: 22, name: "Watchmen", img: "https://www.themoviedb.org/t/p/w1280/aVURelN3pM56lFM7Dgfs5TixcIf.jpg", link: "series_detail.html?id=22" },
        { id: 23, name: "Sacred Games", img: "https://media.themoviedb.org/t/p/w500/mVQ6JFJCAMRLKvsMZdiEeYXC6cp.jpg", link: "series_detail.html?id=23" },
        { id: 24, name: "Paatal Lok", img: "https://image.tmdb.org/t/p/original/bVKoX1AiN1jjUcvC7BkXypJPF2X.jpg", link: "series_detail.html?id=24" },
        { id: 25, name: "Dept. Q", img: "https://media.themoviedb.org/t/p/w116_and_h174_face/h60alybJNgGGfPUbGGUXMXOoFvB.jpg", link: "series_detail.html?id=25" },
        { id: 26, name: "Vikings", img: "https://image.tmdb.org/t/p/original/uU7F9eUQ2YvIR0CBKzSWgNWeFN1.jpg", link: "series_detail.html?id=26" },
        { id: 28, name: "Squid Game", img: "https://media.themoviedb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg", link: "series_detail.html?id=28" },
        { id: 29, name: "All of Us Are Dead", img: "https://image.tmdb.org/t/p/original/o9cRxGdB0Q9zizgllUiMIbPDB6W.jpg", link: "series_detail.html?id=29" },
        { id: 30, name: "Gen V", img: "https://image.tmdb.org/t/p/original/ongpFhUYuCwwRfOQgUKv5FXcGpO.jpg", link: "series_detail.html?id=30" },
        { id: 32, name: "Ozark", img: "https://image.tmdb.org/t/p/original/db8V3MnfG6OZIUzFPTdfdZEMUt1.jpg", link: "series_detail.html?id=32" },
        { id: 34, name: "Loki", img: "https://image.tmdb.org/t/p/original/6FWzffD2YgygUayuFf32QGBoAUZ.jpg", link: "series_detail.html?id=34" }
    ],
    actors: [
        { id: 1, name: "Leonardo DiCaprio", img: "https://cdn.britannica.com/68/154868-050-7589A071/Titanic-Leonardo-DiCaprio.jpg", link: "actor_director.html?type=actor&id=1" },
        { id: 2, name: "Robert Downey Jr.", img: "https://californiamuseum.org/wp-content/uploads/robertdowneyjr_cahalloffameinductee.png", link: "actor_director.html?type=actor&id=2" },
        { id: 3, name: "Scarlett Johansson", img: "https://resizing.flixster.com/_WMBACkzcg4y17_9aiGUawoF-ew=/218x280/v2/https://resizing.flixster.com/KLxcE36ZNENLC_23WoChmpOkvMA=/ems.ZW1zLXByZC1hc3NldHMvY2VsZWJyaXRpZXMvMzkzZTdmN2UtNDlhYi00NzllLWJlOTktZDVkYWU2ZWFmYzgwLmpwZw==", link: "actor_director.html?type=actor&id=3" },
        { id: 4, name: "Tom Hanks", img: "https://hips.hearstapps.com/hmg-prod/images/actor-tom-hanks-poses-for-a-portrait-on-the-set-of-splash-news-photo-1688766444.jpg?crop=1xw:1xh;center,top&resize=980:*", link: "actor_director.html?type=actor&id=4" },
        { id: 5, name: "Christian Bale", img: "https://i.pinimg.com/736x/7a/ed/b7/7aedb79aea4adc38af275a35556f596e.jpg", link: "actor_director.html?type=actor&id=5" },
        { id: 6, name: "Emma Stone", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQEmZhPlRh1cqXIzmWllScYrd0R27RaPF5Hg&s", link: "actor_director.html?type=actor&id=6" },
        { id: 7, name: "Benedict Cumberbatch", img: "https://cdn.prod.website-files.com/65b300512ced7cf5a4ad20ab/65c9820160ead11705caed85_650ce2776a70a63a41f9861e_64f840a5ac4cc9c8d69c77b6_Benedict-Cumberbatch.jpeg", link: "actor_director.html?type=actor&id=7" },
        { id: 8, name: "Chris Evans", img: "https://upload.wikimedia.org/wikipedia/commons/2/25/Chris_Evans_SDCC_2014.jpg", link: "actor_director.html?type=actor&id=8" },
        { id: 9, name: "Chris Hemsworth", img: "images/cris_hemswarth.jpg", link: "actor_director.html?type=actor&id=9" }
    ],
    directors: [
        { id: 1, name: "Christopher Nolan", img: "https://static01.nyt.com/images/2014/11/02/magazine/02nolan1/mag-02Nolan-t_CA1-articleLarge.jpg?quality=75&auto=webp&disable=upscale", link: "actor_director.html?type=director&id=1" },
        { id: 2, name: "Steven Spielberg", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7qiJR6rHPHaYKKIdcV--suyIVk85h8m_9g&s", link: "actor_director.html?type=director&id=2" },
        { id: 3, name: "Bong Joon-ho", img: "https://ca-times.brightspotcdn.com/dims4/default/0155ecc/2147483647/strip/true/crop/5160x3440+0+0/resize/2400x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F3a%2F58%2F6287a26f4a17ba40283c7b86fa36%2Fc8d-intl-ss-00418rv2-copy.jpg", link: "actor_director.html?type=director&id=1" },
        { id: 4, name: "Quentin Tarantino", img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg", link: "actor_director.html?type=director&id=4" },
        { id: 5, name: "Martin Scorsese", img: "https://static01.nyt.com/images/2020/01/05/arts/05martin-scorsese3/merlin_166494351_bd751ae1-3353-4343-bbd4-a20129ae3f1b-superJumbo.jpg", link: "actor_director.html?type=director&id=5" },
        { id: 6, name: "Denis Villeneuve", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfXajMtfRMXlcOfsl99MDzXcmyKYteEiWdng&s", link: "actor_director.html?type=director&id=6" },
        { id: 7, name: "Greta Gerwig", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVgo2Afs6djwZvZZK6IXXx77LOY-k7bAwwHw&s", link: "actor_director.html?type=director&id=7" }
    ]
};

// Search function
function performSearch(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        return { movies: [], series: [], actors: [], directors: [] };
    }

    const results = {
        movies: searchData.movies.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        ),
        series: searchData.series.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        ),
        actors: searchData.actors.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        ),
        directors: searchData.directors.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        )
    };

    return results;
}

// Render search results
function renderSearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    const totalResults = results.movies.length + results.series.length + 
                         results.actors.length + results.directors.length;

    if (totalResults === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No results found. Try searching for something else!</div>';
        resultsContainer.classList.add('active');
        return;
    }

    let html = '';

    // Movies
    if (results.movies.length > 0) {
        html += `
            <div class="search-category">
                <h3>🎬 Movies <span class="result-count">(${results.movies.length})</span></h3>
                <div class="search-items">
                    ${results.movies.map(movie => `
                        <a href="${movie.link}" class="search-item">
                            <img src="${movie.img}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Image'">
                            <span>${movie.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Series
    if (results.series.length > 0) {
        html += `
            <div class="search-category">
                <h3>📺 Web Series <span class="result-count">(${results.series.length})</span></h3>
                <div class="search-items">
                    ${results.series.map(series => `
                        <a href="${series.link}" class="search-item">
                            <img src="${series.img}" alt="${series.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Image'">
                            <span>${series.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Actors
    if (results.actors.length > 0) {
        html += `
            <div class="search-category">
                <h3>🎭 Actors <span class="result-count">(${results.actors.length})</span></h3>
                <div class="search-items">
                    ${results.actors.map(actor => `
                        <a href="${actor.link}" class="search-item">
                            <img src="${actor.img}" alt="${actor.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Image'">
                            <span>${actor.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Directors
    if (results.directors.length > 0) {
        html += `
            <div class="search-category">
                <h3>🎥 Directors <span class="result-count">(${results.directors.length})</span></h3>
                <div class="search-items">
                    ${results.directors.map(director => `
                        <a href="${director.link}" class="search-item">
                            <img src="${director.img}" alt="${director.name}" onerror="this.src='https://via.placeholder.com/150x180?text=No+Image'">
                            <span>${director.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
    resultsContainer.classList.add('active');
}


// Search event handlers
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const searchNavIcon = document.getElementById('search-nav-icon');

// Smooth scroll to search section when nav icon is clicked
if (searchNavIcon) {
    searchNavIcon.addEventListener('click', (e) => {
        e.preventDefault();
        const searchSection = document.getElementById('search-section');
        if (searchSection) {
            // Get the position of the search section
            const searchPosition = searchSection.offsetTop;
            // Scroll with offset to account for fixed navbar
            window.scrollTo({
                top: searchPosition - 100, // Adjust this number if needed
                behavior: 'smooth'
            });
            // Focus on search input after scrolling
            setTimeout(() => {
                searchInput.focus();
            }, 500);
        }
    });
}

if (searchBtn && searchInput) {
    // Search button click
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        const results = performSearch(query);
        renderSearchResults(results);
    });

    // Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value;
            const results = performSearch(query);
            renderSearchResults(results);
        }
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchBtn.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}



// // Search event handlers
// const searchInput = document.getElementById('search-input');
// const searchBtn = document.getElementById('search-btn');
// const searchResults = document.getElementById('search-results');

// if (searchBtn && searchInput) {
//     // Search button click
//     searchBtn.addEventListener('click', () => {
//         const query = searchInput.value;
//         const results = performSearch(query);
//         renderSearchResults(results);
//     });

//     // Enter key press
//     searchInput.addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             const query = searchInput.value;
//             const results = performSearch(query);
//             renderSearchResults(results);
//         }
//     });

    // Live search as you type (optional - uncomment if you want)
    // searchInput.addEventListener('input', () => {
    //     const query = searchInput.value;
    //     if (query.length >= 2) {
    //         const results = performSearch(query);
    //         renderSearchResults(results);
    //     } else if (query.length === 0) {
    //         searchResults.classList.remove('active');
    //     }
    // });

    // Close results when clicking outside
//     document.addEventListener('click', (e) => {
//         if (!searchInput.contains(e.target) && !searchResults.contains(e.target) && !searchBtn.contains(e.target)) {
//             searchResults.classList.remove('active');
//         }
//     });
// }



// function renderNews() {
//     const newsContainer = document.getElementById('newsContainer');
//     if (!newsContainer) return;

//     newsContainer.innerHTML = '';

//     newsData.forEach(news => {
//         const card = document.createElement('div');
//         card.className = 'news-card';

//         card.innerHTML = `
//             <div class="news-trailer">
//                 <iframe src="${news.trailerUrl}" allowfullscreen loading="lazy"></iframe>
//             </div>
//             <div class="news-content">
//                 <h3>${news.title}</h3>
//                 <p>${news.date}</p>
//                 <p>${news.description}</p>
//             </div>
//         `;

//         newsContainer.appendChild(card);
//     });
// }

// document.addEventListener('DOMContentLoaded', renderNews);
