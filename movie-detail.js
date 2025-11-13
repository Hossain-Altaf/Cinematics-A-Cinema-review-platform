// ---------------------------
// TAB SWITCHING LOGIC
// ---------------------------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const tabId = button.dataset.tab;
        tabContents.forEach(content => {
            content.classList.add('hidden');
            if (content.id === `${tabId}Tab`) content.classList.remove('hidden');
        });
    });
});

// ---------------------------
// MOVIE DATA (mock database)
// ---------------------------
const movies = [
    {
        id: 1,
        title: "Inception",
        year: "2010",
        duration: "2h 28min",
        rating: "8.8/10",
        poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
        cast: [{ name: "Leonardo DiCaprio", role: "Cobb", image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Leonardo_DiCaprio_2014.jpg" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Christopher_Nolan_Cannes_2018.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "MovieBuff123", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
                rating: 5,
                date: "2023-10-15",
                content: "A masterpiece of modern cinema — every detail is brilliant!"
            }
        ],
        discussions: [
            {
                id: 1,
                title: "The ending — what really happened?",
                author: "CinemaFan",
                date: "2023-10-20",
                preview: "Let's discuss that ambiguous spinning top...",
                replies: 45,
                likes: 123
            }
        ]
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: "2008",
        duration: "2h 32min",
        rating: "9.0/10",
        poster: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_.jpg",
        genres: ["Action", "Crime", "Drama"],
        plot: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
        cast: [{ name: "Christian Bale", role: "Bruce Wayne", image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Christian_Bale-7839.jpg" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Christopher_Nolan_Cannes_2018.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "HeroFan", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
                rating: 5,
                date: "2023-09-20",
                content: "Heath Ledger’s Joker is legendary!"
            }
        ],
        discussions: [
            {
                id: 1,
                title: "Was Joker right?",
                author: "ComicNerd",
                date: "2023-09-25",
                preview: "Let's debate Joker’s moral chaos theory...",
                replies: 30,
                likes: 210
            }
        ]
    },

    {
        id: 3,
        title: "Interstellar",
        year: "2014",
        duration: "2h 49min",
        rating: "8.6/10",
        poster: "https://www.thequeenshall.net/sites/default/files/styles/qh_banner/public/images/interstellar_web.jpg?itok=AJbFps_U",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        plot: "A team of explorers travels through a wormhole to ensure humanity’s survival.",
        cast: [{ name: "Matthew McConaughey", role: "Cooper", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Matthew_McConaughey_2019.jpg" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Christopher_Nolan_Cannes_2018.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "ScienceLover", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
                rating: 5,
                date: "2023-10-01",
                content: "Mind-blowing visuals and emotional storytelling!"
            }
        ],
        discussions: [
            {
                id: 1,
                title: "The 5D library scene explained",
                author: "AstroGeek",
                date: "2023-10-05",
                preview: "What’s really happening inside the tesseract?",
                replies: 18,
                likes: 98
            }
        ]
    },

    {
        id: 4,
        title: "Parasite",
        year: "2019",
        duration: "2h 49min",
        rating: "8.6/10",
        poster: "https://www.thequeenshall.net/sites/default/files/styles/qh_banner/public/images/interstellar_web.jpg?itok=AJbFps_U",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        plot: "A team of explorers travels through a wormhole to ensure humanity’s survival.",
        cast: [{ name: "Matthew McConaughey", role: "Cooper", image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Matthew_McConaughey_2019.jpg" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Christopher_Nolan_Cannes_2018.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "ScienceLover", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
                rating: 5,
                date: "2023-10-01",
                content: "Mind-blowing visuals and emotional storytelling!"
            }
        ],
        discussions: [
            {
                id: 1,
                title: "The 5D library scene explained",
                author: "AstroGeek",
                date: "2023-10-05",
                preview: "What’s really happening inside the tesseract?",
                replies: 18,
                likes: 98
            }
        ]
    }
];

// ---------------------------
// READ MOVIE ID FROM URL
// ---------------------------
const params = new URLSearchParams(window.location.search);
const movieId = parseInt(params.get("id"));
const movieData = movies.find(m => m.id === movieId);

// ---------------------------
// POPULATE MOVIE DETAILS
// ---------------------------
function populateMovieDetails(data) {
    if (!data) {
        document.querySelector(".movie-detail").innerHTML = `<h2>Movie not found!</h2>`;
        return;
    }

    document.getElementById("movieTitle").textContent = data.title;
    document.getElementById("movieYear").textContent = data.year;
    document.getElementById("movieDuration").textContent = data.duration;
    document.getElementById("movieRating").textContent = data.rating;
    document.getElementById("moviePoster").src = data.poster;
    document.getElementById("moviePlot").textContent = data.plot;

    const genresContainer = document.getElementById("movieGenres");
    genresContainer.innerHTML = data.genres.map(g => `<span class="genre-tag">${g}</span>`).join("");

    const castList = document.getElementById("castList");
    castList.innerHTML = data.cast
        .map(
            person => `
        <div class="cast-card">
            <img src="${person.image}" alt="${person.name}" class="person-image">
            <div class="person-info">
                <h4 class="person-name">${person.name}</h4>
                <span class="person-role">${person.role}</span>
            </div>
        </div>`
        )
        .join("");

    const crewList = document.getElementById("crewList");
    crewList.innerHTML = data.crew
        .map(
            person => `
        <div class="crew-card">
            <img src="${person.image}" alt="${person.name}" class="person-image">
            <div class="person-info">
                <h4 class="person-name">${person.name}</h4>
                <span class="person-role">${person.role}</span>
            </div>
        </div>`
        )
        .join("");

    const reviewsList = document.getElementById("reviewsList");
    reviewsList.innerHTML = data.reviews
        .map(
            review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="${review.user.avatar}" alt="${review.user.name}" class="reviewer-avatar">
                    <span class="reviewer-name">${review.user.name}</span>
                </div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
            <p class="review-content">${review.content}</p>
        </div>`
        )
        .join("");

    const discussionsList = document.getElementById("discussionsList");
    discussionsList.innerHTML = data.discussions
        .map(
            discussion => `
        <div class="discussion-card">
            <div class="discussion-header">
                <h3 class="discussion-title">${discussion.title}</h3>
                <div class="discussion-meta">Started by ${discussion.author} • ${discussion.date}</div>
            </div>
            <p class="discussion-preview">${discussion.preview}</p>
            <div class="discussion-stats">
                <span>${discussion.replies} replies</span>
                <span>${discussion.likes} likes</span>
            </div>
        </div>`
        )
        .join("");
}

// ---------------------------
// INITIALIZE PAGE
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    populateMovieDetails(movieData);

    // Watchlist toggle
    const watchlistBtn = document.querySelector(".watchlist-btn");
    watchlistBtn.addEventListener("click", () => {
        const isInWatchlist = watchlistBtn.classList.contains("in-watchlist");
        if (isInWatchlist) {
            watchlistBtn.innerHTML = '<span class="icon">+</span> Add to Watchlist';
            watchlistBtn.classList.remove("in-watchlist");
        } else {
            watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
            watchlistBtn.classList.add("in-watchlist");
        }
    });

    // Trailer button
    const watchBtn = document.querySelector(".watch-btn");
    watchBtn.addEventListener("click", () => {
        alert("Opening trailer...");
    });
});
