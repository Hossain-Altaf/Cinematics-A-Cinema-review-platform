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

    // How many items to show by default
    const VISIBLE_COUNT = 5;
    const showAll = ul.dataset.showAll === 'true';
    const count = showAll ? items.length : Math.min(items.length, VISIBLE_COUNT);

    items.slice(0, count).forEach((item, idx) => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = item;
        li.appendChild(span);
        const delBtn = document.createElement('button');
        delBtn.innerHTML = '&times;'; // X icon
        delBtn.className = 'remove-btn';
        delBtn.title = 'Remove';
        delBtn.onclick = () => {
            // Remove the correct item from storage (calculate real index)
            const realIndex = ul.dataset.showAll === 'true' ? idx : idx;
            items.splice(realIndex, 1);
            saveList(key, items);
            renderList(key, ul);
        };
        li.appendChild(delBtn);
        ul.appendChild(li);
    });

    // Manage the View more / View less button
    const container = ul.parentNode;
    // Remove existing view-more button if present
    const existingBtn = container.querySelector('.view-more-btn');
    if (existingBtn) existingBtn.remove();

    if (items.length > VISIBLE_COUNT) {
        const btn = document.createElement('button');
        btn.className = 'view-more-btn';
        btn.type = 'button';
        btn.textContent = showAll ? 'View less' : `View more (${items.length - VISIBLE_COUNT})`;
        btn.addEventListener('click', () => {
            ul.dataset.showAll = (!showAll).toString();
            renderList(key, ul);
        });
        container.appendChild(btn);
    }
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

// Auth related code
let authChangeTimeout;

function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const authSection = document.getElementById('authSection');
    
    // Clear any pending updates
    if (authChangeTimeout) {
        clearTimeout(authChangeTimeout);
    }
    
    if (token && user) {
        // User is logged in
        const userData = JSON.parse(user);
        if (!document.getElementById('logoutLink')) {
            const newContent = document.createElement('div');
            newContent.className = 'auth-links';
            newContent.innerHTML = `
                <span class="user-name">Welcome, ${userData.username}</span>
                <a href="#" id="logoutLink">Logout</a>
            `;
            
            // Fade out current content
            authSection.style.opacity = '0';
            
            // Update content after fade
            authChangeTimeout = setTimeout(() => {
                authSection.innerHTML = '';
                authSection.appendChild(newContent);
                authSection.style.opacity = '1';
                
                // Add logout handler
                document.getElementById('logoutLink').addEventListener('click', (e) => {
                    e.preventDefault();
                    handleLogout();
                });
            }, 200);
        }
    } else {
        // User is not logged in
        if (!document.getElementById('loginLink')) {
            const newContent = document.createElement('div');
            newContent.className = 'auth-links';
            newContent.innerHTML = `
                <a href="login.html" id="loginLink">Login</a>
                <a href="login.html" id="registerLink">Register</a>
            `;
            
            // Fade out current content
            authSection.style.opacity = '0';
            
            // Update content after fade
            authChangeTimeout = setTimeout(() => {
                authSection.innerHTML = '';
                authSection.appendChild(newContent);
                authSection.style.opacity = '1';
                
                // Add register handler
                const registerLink = document.getElementById('registerLink');
                if (registerLink) {
                    registerLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        handleRegisterClick();
                    });
                }
            }, 200);
        }
    }
}

function handleLogout() {
    // Fade out current content
    const authSection = document.getElementById('authSection');
    authSection.style.opacity = '0';
    
    // Clear auth data after fade
    setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        checkAuthStatus();
    }, 200);
}

function handleRegisterClick() {
    localStorage.setItem('showRegisterForm', 'true');
    window.location.href = 'login.html';
}

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', checkAuthStatus);

// ======================================
// To-Watch Section - Tab Switching Logic
// ======================================
const towatchTabs = document.querySelectorAll('.towatch-tab');

towatchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        towatchTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.tab === 'towatch-movies') {
            document.getElementById('towatch-movies').style.display = 'flex';
            document.getElementById('towatch-series').style.display = 'none';
        } else {
            document.getElementById('towatch-movies').style.display = 'none';
            document.getElementById('towatch-series').style.display = 'flex';
        }
    });
});

// To-Watch Movies add
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

// To-Watch Series add
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

// Initial render for To-Watch lists
if (towatchMoviesList) renderList('towatch-movies', towatchMoviesList);
if (towatchSeriesList) renderList('towatch-series', towatchSeriesList);

// ======================================
// Hot News Section
// ======================================
const newsData = [
    {
        id: 1,
        title: "Deadpool 3 Release",
        date: "November 10, 2025",
        description: "The latest installment of Deadpool is breaking box office records with its hilarious action-packed sequences and Marvel universe integration.",
        trailerUrl: "https://www.youtube.com/embed/https://youtu.be/otOjB0Ias8o?si=uOaTwa04RxG2mdlJ",
        link: "#"
    },
    {
        id: 2,
        title: "Dune: Part Three Announcement",
        date: "November 8, 2025",
        description: "Denis Villeneuve confirms the third installment of Dune is in development. Epic scale cinematography awaits fans of the series.",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        link: "#"
    },
    {
        id: 3,
        title: "Avatar 4 Coming Soon",
        date: "November 5, 2025",
        description: "James Cameron teases new underwater scenes and groundbreaking visual effects for Avatar 4. Fan excitement reaches an all-time high.",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        link: "#"
    },
    {
        id: 4,
        title: "Spider-Man: New Horizons",
        date: "November 1, 2025",
        description: "Marvel Studios unveils the next Spider-Man adventure featuring new villains and a fresh take on the beloved superhero's story.",
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        link: "#"
    }
];

function renderNews() {
    const newsContainer = document.getElementById('newsContainer');
    if (!newsContainer) return;

    newsContainer.innerHTML = '';
    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-trailer">
                <iframe src="${news.trailerUrl}?autoplay=0" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="news-content">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-date">${news.date}</p>
                <p class="news-description">${news.description}</p>
                <a href="${news.link}" class="news-link">Read More</a>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
}

// Render news on page load
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
});