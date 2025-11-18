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
