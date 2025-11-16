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
        
        // If discussions tab is clicked, ensure discussions are rendered
        if (tabId === 'discussions') {
            setTimeout(() => {
                if (typeof renderDiscussions === 'function') {
                    renderDiscussions();
                }
            }, 50);
        }
    });
});

// ---------------------------
// SERIES DATA (mock database)
// ---------------------------
const movies = [
    {
        id: 1,
        title: "Breaking Bad",
        year: "2008-2013",
        duration: "5 Seasons",
        rating: "9.5/10",
        type: "Series",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx6Y7XVWvl0QWz5N6c-Z5p5z0bGFjvj3JvQQ&s",
        genres: ["Crime", "Drama", "Thriller"],
        plot: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's future.",
        cast: [
            { name: "Bryan Cranston", role: "Walter White", image: "https://m.media-amazon.com/images/M/MV5BMTA2NjEyMTY4MTVeQTJeQWpwZ15BbWU3MDQ1NTg1Njg@._V1_.jpg" },
            { name: "Aaron Paul", role: "Jesse Pinkman", image: "https://m.media-amazon.com/images/M/MV5BMTY1OTY5NjI5NV5BMl5BanBnXkFtZTcwODA5NTk2OQ@@._V1_.jpg" }
        ],
        crew: [{ name: "Vince Gilligan", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BNzY1NzY0MjAyMl5BMl5BanBnXkFtZTgwNjYyNzQ3NjE@._V1_.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 2,
        title: "Game of Thrones",
        year: "2011-2019",
        duration: "8 Seasons",
        rating: "9.2/10",
        type: "Series",
        poster: "https://m.media-amazon.com/images/I/91DOs0wrArL._AC_UF894,1000_QL80_.jpg",
        genres: ["Action", "Adventure", "Drama", "Fantasy"],
        plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
        cast: [
            { name: "Emilia Clarke", role: "Daenerys Targaryen", image: "https://m.media-amazon.com/images/M/MV5BNjg3OTg4MDczMl5BMl5BanBnXkFtZTgwODc0NzUwNjE@._V1_.jpg" },
            { name: "Kit Harington", role: "Jon Snow", image: "https://m.media-amazon.com/images/M/MV5BMTA4NzAyNzQwMDReQTJeQWpwZ15BbWU4MDEwNDMxNTYx._V1_.jpg" }
        ],
        crew: [
            { name: "David Benioff", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BMjE5MTQ2Njk4MF5BMl5BanBnXkFtZTcwOTY1ODE3Mg@@._V1_.jpg" },
            { name: "D.B. Weiss", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BNzkyNDA3NTQyOV5BMl5BanBnXkFtZTcwNTE2MDE3Mg@@._V1_.jpg" }
        ],
        reviews: [],
        discussions: []
    },
    {
        id: 3,
        title: "Stranger Things",
        year: "2016-Present",
        duration: "4 Seasons",
        rating: "8.7/10",
        type: "Series",
        poster: "https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg",
        genres: ["Drama", "Fantasy", "Horror", "Mystery"],
        plot: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
        cast: [
            { name: "Millie Bobby Brown", role: "Eleven", image: "https://m.media-amazon.com/images/M/MV5BZWFhZjJhMmEtMTQ2Yy00OTk0LTlhOTgtOTRhZmI5NGZjMWZjXkEyXkFqcGc@._V1_.jpg" },
            { name: "Finn Wolfhard", role: "Mike Wheeler", image: "https://m.media-amazon.com/images/M/MV5BYmZlYWEzNWYtNzA1ZC00OWI1LWI0NjUtNGJjMzRjYjAwZjI4XkEyXkFqcGc@._V1_.jpg" }
        ],
        crew: [
            { name: "The Duffer Brothers", role: "Creators", image: "https://m.media-amazon.com/images/M/MV5BYzU5MWMxNTItMjJkYi00NGM4LThlYTYtMjBlYTNiODJhNmE3XkEyXkFqcGc@._V1_.jpg" }
        ],
        reviews: [],
        discussions: []
    },
    {
        id: 4,
        title: "The Crown",
        year: "2016-2023",
        duration: "6 Seasons",
        rating: "8.6/10",
        type: "Series",
        poster: "https://m.media-amazon.com/images/M/MV5BZmY0MzBlNjctOGYxYS00NmI4LWJiOWQtZjgwMDNhMGRjODI3XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg",
        genres: ["Biography", "Drama", "History"],
        plot: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
        cast: [
            { name: "Claire Foy", role: "Queen Elizabeth II", image: "https://m.media-amazon.com/images/M/MV5BMTc5OTYzNDI3M15BMl5BanBnXkFtZTgwNDE1MzY0MjE@._V1_.jpg" },
            { name: "Olivia Colman", role: "Queen Elizabeth II", image: "https://m.media-amazon.com/images/M/MV5BMTgyNjQxMTA0MV5BMl5BanBnXkFtZTgwMzI5NjUxMzI@._V1_.jpg" }
        ],
        crew: [{ name: "Peter Morgan", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BMTM2NzQxNjkyNl5BMl5BanBnXkFtZTcwMzc1ODgyMw@@._V1_.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 5,
        title: "The Mandalorian",
        year: "2019-Present",
        duration: "3 Seasons",
        rating: "8.7/10",
        type: "Series",
        poster: "https://m.media-amazon.com/images/M/MV5BN2M5YWFjN2YtYzMwZC00ZTI1LWFkYWEtNjE3Mjc4Mjc2OTc4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        plot: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        cast: [
            { name: "Pedro Pascal", role: "The Mandalorian", image: "https://m.media-amazon.com/images/M/MV5BODE5NjNjNDItMzNlYy00NzI5LWEwNTUtNDYzNmRhYTQ1YjI3XkEyXkFqcGc@._V1_.jpg" },
            { name: "Grogu", role: "Grogu (Baby Yoda)", image: "https://static.wikia.nocookie.net/starwars/images/9/9d/Baby_Yoda.jpg" }
        ],
        crew: [{ name: "Jon Favreau", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BNjkwNTg1MzI0Nl5BMl5BanBnXkFtZTcwMzQ2OTA2Mg@@._V1_.jpg" }],
        reviews: [],
        discussions: []
    }
];

// ---------------------------
// READ SERIES ID FROM URL
// ---------------------------
const params = new URLSearchParams(window.location.search);
const movieId = parseInt(params.get("id"));
const movieData = movies.find(m => m.id === movieId);

// ---------------------------
// HELPER FUNCTIONS
// ---------------------------

// Get logged-in user
function getLoggedUser() {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
}

// Load reviews from localStorage
function loadStoredReviews(movieId) {
    const data = localStorage.getItem("series_reviews_" + movieId);
    return data ? JSON.parse(data) : [];
}

// Save reviews to localStorage
function saveReviews(movieId, reviews) {
    localStorage.setItem("series_reviews_" + movieId, JSON.stringify(reviews));
}

// Render all reviews (built-in + user-submitted)
function renderReviews() {
    if (!movieData) return;
    
    const reviewsList = document.getElementById("reviewsList");
    const stored = loadStoredReviews(movieId);
    const allReviews = [...movieData.reviews, ...stored];

    if (allReviews.length === 0) {
        reviewsList.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">No reviews yet. Be the first to review!</p>';
        document.getElementById("averageRating").textContent = "N/A";
        document.getElementById("totalReviews").textContent = "No reviews yet";
        return;
    }

    reviewsList.innerHTML = allReviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="${review.user.avatar}" class="reviewer-avatar" alt="${review.user.name}">
                    <span class="reviewer-name">${review.user.name}</span>
                </div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
            <p class="review-content">${review.content}</p>
        </div>
    `).join("");

    // Update average rating
    const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);
    const fullStars = Math.floor(avgRating);
    const hasHalfStar = (avgRating - fullStars) >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    const starsHTML = "★".repeat(fullStars) + (hasHalfStar ? "½" : "") + "☆".repeat(emptyStars);
    
    document.getElementById("averageRating").textContent = avgRating;
    document.querySelector(".stars").textContent = starsHTML;
    document.getElementById("totalReviews").textContent = `Based on ${allReviews.length} ${allReviews.length === 1 ? 'review' : 'reviews'}`;
}

// ---------------------------
// POPULATE SERIES DETAILS
// ---------------------------
function populateMovieDetails(data) {
    if (!data) {
        document.querySelector(".movie-detail").innerHTML = `<h2 style="text-align: center; padding: 50px;">Series not found!</h2>`;
        return;
    }

    document.title = `${data.title} - Cinematics`;
    document.getElementById("movieTitle").textContent = data.title;
    document.getElementById("movieYear").textContent = data.year;
    document.getElementById("movieDuration").textContent = data.duration;
    document.getElementById("movieRating").textContent = data.rating;
    document.getElementById("moviePoster").src = data.poster;
    document.getElementById("moviePlot").textContent = data.plot;

    document.getElementById("movieGenres").innerHTML = 
        data.genres.map(g => `<span class="genre-tag">${g}</span>`).join("");

    document.getElementById("castList").innerHTML = data.cast
        .map(person => `
            <div class="cast-card">
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <div class="person-info">
                    <h4 class="person-name">${person.name}</h4>
                    <span class="person-role">${person.role}</span>
                </div>
            </div>
        `).join("");

    document.getElementById("crewList").innerHTML = data.crew
        .map(person => `
            <div class="crew-card">
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <div class="person-info">
                    <h4 class="person-name">${person.name}</h4>
                    <span class="person-role">${person.role}</span>
                </div>
            </div>
        `).join("");

    // Render reviews
    renderReviews();
}

// ---------------------------
// REVIEW MODAL HANDLERS
// ---------------------------

// Open review modal
document.querySelector(".review-btn").addEventListener("click", () => {
    const user = getLoggedUser();
    if (!user) {
        alert("You must be logged in to write a review. Please login or register.");
        window.location.href = "login.html";
        return;
    }
    document.getElementById("reviewModal").classList.remove("hidden");
});

// Close review modal
document.getElementById("closeReviewBtn").addEventListener("click", () => {
    document.getElementById("reviewModal").classList.add("hidden");
    document.getElementById("reviewText").value = "";
});

// Submit review
document.getElementById("submitReviewBtn").addEventListener("click", () => {
    const user = getLoggedUser();
    if (!user) {
        alert("Login required.");
        window.location.href = "login.html";
        return;
    }

    const rating = parseInt(document.getElementById("reviewRating").value);
    const content = document.getElementById("reviewText").value.trim();

    if (content === "") {
        alert("Review cannot be empty.");
        return;
    }

    if (content.length < 10) {
        alert("Review must be at least 10 characters long.");
        return;
    }

    // Build new review
    const newReview = {
        id: Date.now(),
        user: {
            name: user.username || user.name || "Anonymous",
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=667eea&color=fff`
        },
        rating,
        date: new Date().toISOString().split("T")[0],
        content
    };

    // Save to localStorage
    const existing = loadStoredReviews(movieId);
    existing.push(newReview);
    saveReviews(movieId, existing);

    // Refresh UI
    renderReviews();

    // Close modal and reset
    document.getElementById("reviewModal").classList.add("hidden");
    document.getElementById("reviewText").value = "";
    
    // Show success message
    alert("✓ Review submitted successfully!");
});

// ---------------------------
// WATCHLIST & TRAILER BUTTONS
// ---------------------------
function initializeButtons() {
    // Watchlist button
    const watchlistBtn = document.querySelector(".watchlist-btn");
    if (watchlistBtn) {
        // Check if already in watchlist
        const watchlist = JSON.parse(localStorage.getItem("series_watchlist") || "[]");
        const isInWatchlist = watchlist.includes(movieId);
        
        if (isInWatchlist) {
            watchlistBtn.classList.add("in-watchlist");
            watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
        }

        watchlistBtn.addEventListener("click", () => {
            const user = getLoggedUser();
            if (!user) {
                alert("Please login to add to watchlist!");
                window.location.href = "login.html";
                return;
            }

            let watchlist = JSON.parse(localStorage.getItem("series_watchlist") || "[]");
            const index = watchlist.indexOf(movieId);
            
            if (index > -1) {
                // Remove from watchlist
                watchlist.splice(index, 1);
                watchlistBtn.classList.remove("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">+</span> Add to Watchlist';
            } else {
                // Add to watchlist
                watchlist.push(movieId);
                watchlistBtn.classList.add("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
            }
            
            localStorage.setItem("series_watchlist", JSON.stringify(watchlist));
        });
    }

    // Trailer button
    const watchBtn = document.querySelector(".watch-btn");
    if (watchBtn) {
        watchBtn.addEventListener("click", () => {
            alert(`Opening trailer for "${movieData.title}"...\n\nTrailer feature coming soon!`);
        });
    }
}

// ---------------------------
// INITIALIZE PAGE
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Series Detail Page Loaded");
    console.log("Series ID:", movieId);
    console.log("Series Data:", movieData);
    
    populateMovieDetails(movieData);
    initializeButtons();
    
    // Initialize discussions after a short delay to ensure everything is loaded
    setTimeout(() => {
        if (typeof renderDiscussions === 'function') {
            renderDiscussions();
            console.log("Discussions rendered for series");
        }
        if (typeof initializeDiscussionButton === 'function') {
            initializeDiscussionButton();
            console.log("Discussion button initialized for series");
        }
    }, 100);
});