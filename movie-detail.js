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
                renderDiscussions();
            }, 50);
        }
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
        trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        genres: ["Action", "Adventure", "Sci-Fi"],
        plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
        cast: [{ name: "Leonardo DiCaprio", role: "Cobb", image: "https://cdn.britannica.com/65/227665-050-D74A477E/American-actor-Leonardo-DiCaprio-2016.jpg" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_FMjpg_UX1000_.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "MovieBuff123", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
                rating: 5,
                date: "2023-10-15",
                content: "A masterpiece of modern cinema — every detail is brilliant!"
            }
        ],
        discussions: []
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: "2008",
        duration: "2h 32min",
        rating: "9.0/10",
        poster: "https://static.wikia.nocookie.net/batman/images/3/38/The_Dark_Knight_poster6.jpg/revision/latest?cb=20160504033320",
        trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
        genres: ["Action", "Crime", "Drama"],
        plot: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
        cast: [{ name: "Christian Bale", role: "Bruce Wayne", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Q0zpeUW2Az4czxe9fycMRv5Zf7Nhd5JZRg&s" }],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_FMjpg_UX1000_.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "HeroFan", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
                rating: 5,
                date: "2023-09-20",
                content: "Heath Ledger's Joker is legendary!"
            }
        ],
        discussions: []
    },
    {
        id: 3,
        title: "Interstellar",
        year: "2014",
        duration: "2h 49min",
        rating: "8.6/10",
        poster: "https://www.thequeenshall.net/sites/default/files/styles/qh_banner/public/images/interstellar_web.jpg?itok=AJbFps_U",
        trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        plot: "A team of explorers travels through a wormhole to ensure humanity's survival.",
        cast: [
            { name: "Matthew McConaughey", role: "Cooper", image: "https://m.media-amazon.com/images/M/MV5BMTg0MDc3ODUwOV5BMl5BanBnXkFtZTcwMTk2NjY4Nw@@._V1_.jpg" },
            { name: "Anne Hathaway", role: "Brand", image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Anne_Hathaway_at_The_Apprentice_in_NYC_03_%28cropped2%29.jpg" },
            { name: "Michael Caine", role: "Professor Brand", image: "https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg" }
        ],
        crew: [{ name: "Christopher Nolan", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_FMjpg_UX1000_.jpg" }],
        reviews: [
            {
                id: 1,
                user: { name: "ScienceLover", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
                rating: 5,
                date: "2023-10-01",
                content: "Mind-blowing visuals and emotional storytelling!"
            }
        ],
        discussions: []
    },
    {
        id: 4,
        title: "Parasite",
        year: "2019",
        duration: "2h 12min",
        rating: "8.6/10",
        poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
        genres: ["Thriller", "Drama"],
        plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        cast: [
            { name: "Kang-ho Song", role: "Kim Ki-taek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxv7LN_UsQsIAg-MMobQ3eBwBzpk8ufwUjw&s" },
            { name: "Sun-kyun Lee", role: "Park Dong-ik", image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-12/231226-Lee-Sun-kyun-obit-se-1156p-99d222.jpg" },
            { name: "So-dam Park", role: "Kim Ki-jung", image: "https://m.media-amazon.com/images/M/MV5BNzE2ZTM1ZGUtOWM5ZC00ZDU5LWExOTUtM2E5ZGVjNDI4OWQ2XkEyXkFqcGc@._V1_.jpg" }
        ],
        crew: [{ name: "Bong Joon Ho", role: "Director", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDOChXKVHVk4T8QjsHkVAgDIl6Xa0c8GXQg&s" }],
        reviews: [
            {
                id: 1,
                user: { name: "MovieFan99", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
                rating: 5,
                date: "2023-11-10",
                content: "A masterpiece of tension, symbolism, and storytelling. A must-watch."
            }
        ],
        discussions: []
    },
    {
        id: 5,
        title: "Forrest Gump",
        year: "1994",
        duration: "2h 22min",
        rating: "8.8/10",
        poster: "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
        genres: ["Drama", "Romance"],
        plot: "The presidencies of Kennedy and Johnson, the Vietnam War, and more through the eyes of an Alabama man with a low IQ.",
        cast: [
            { name: "Tom Hanks", role: "Forrest Gump", image: "https://m.media-amazon.com/images/M/MV5BOWYxMzA4YWMtYWIyYy00NTE5LTljMDAtNzM1NDYyMWYwYzkwXkEyXkFqcGc@._V1_.jpg" },
            { name: "Robin Wright", role: "Jenny Curran", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxV7VzBZaipZ0RRzQgIjugdsUGAHjS0KdGA&s" }
        ],
        crew: [{ name: "Robert Zemeckis", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Robert_Zemeckis_%22The_Walk%22_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_%2821835891403%29_%28cropped%29.jpg/250px-Robert_Zemeckis_%22The_Walk%22_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_%2821835891403%29_%28cropped%29.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 6,
        title: "Avengers: Endgame",
        year: "2019",
        duration: "3h 1min",
        rating: "8.4/10",
        poster: "https://heroichollywood.com/wp-content/uploads/2019/03/Avengers-Endgame-Marvel-Studios-MCU-Captain-Marvel.jpg",
        trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        genres: ["Action", "Adventure", "Sci-Fi"],
        plot: "The surviving Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
        cast: [
            { name: "Robert Downey Jr.", role: "Tony Stark / Iron Man", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmOI_ynNOoaPc00GTVTy8HSk4JNxE3nQb2sA&s" },
            { name: "Chris Evans", role: "Steve Rogers / Captain America", image: "https://m.media-amazon.com/images/M/MV5BNzQ0YWM1ODEtZDFkYy00MGJhLTkwZDUtMzVkZjljODU3ZTRmXkEyXkFqcGc@._V1_.jpg" },
            { name: "Scarlett Johansson", role: "Natasha Romanoff / Black Widow", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Scarlett_Johansson-8588.jpg/960px-Scarlett_Johansson-8588.jpg" },
            { name: "Chris Hemsworth", role: "Thor", image: "https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/w_2560%2Cc_limit/Headshot%2520-%2520credit%2520%25E2%2580%259CNational%2520Geographic%2520for%2520Disney+%25E2%2580%259D.jpg" }
        ],
        crew: [
            { name: "Anthony Russo", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BMTc2NjM5MTM0Ml5BMl5BanBnXkFtZTgwMTY3ODczNjM@._V1_.jpg" },
            { name: "Joe Russo", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BMTc2NzY1NTY5OF5BMl5BanBnXkFtZTgwNjY3ODczNjM@._V1_.jpg" }
        ],
        reviews: [],
        discussions: []
    },
    {
        id: 7,
        title: "Joker",
        year: "2019",
        duration: "2h 2min",
        rating: "8.4/10",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUhpImhE0LQJh-LxF43KGMvfZ2CqKPWnO8rA&s",
        trailerUrl: "https://www.youtube.com/watch?v=zAGVQLHvwOY",
        genres: ["Crime", "Drama", "Thriller"],
        plot: "A mentally troubled comedian embarks on a downward spiral that leads to the creation of the iconic villain, Joker.",
        cast: [
            { name: "Joaquin Phoenix", role: "Arthur Fleck / Joker", image: "https://m.media-amazon.com/images/M/MV5BYjFjNGYzYjEtNGE0Ny00M2IyLTk5ZmYtODE3ZGFkMzVjYmNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
            { name: "Robert De Niro", role: "Murray Franklin", image: "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_FMjpg_UX1000_.jpg" }
        ],
        crew: [{ name: "Todd Phillips", role: "Director", image: "https://goldenglobes.com/wp-content/uploads/2023/10/Todd_Phillips20190919_0.jpg" }],
        reviews: [],
        discussions: []
    }
];

// ---------------------------
// READ MOVIE ID FROM URL
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
    const data = localStorage.getItem("movie_reviews_" + movieId);
    return data ? JSON.parse(data) : [];
}

// Save reviews to localStorage
function saveReviews(movieId, reviews) {
    localStorage.setItem("movie_reviews_" + movieId, JSON.stringify(reviews));
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
// POPULATE MOVIE DETAILS
// ---------------------------
function populateMovieDetails(data) {
    if (!data) {
        document.querySelector(".movie-detail").innerHTML = `<h2 style="text-align: center; padding: 50px;">Movie not found!</h2>`;
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
    // Trailer button - Open YouTube trailer
    const watchBtn = document.querySelector(".watch-btn");
    if (watchBtn && movieData && movieData.trailerUrl) {
        watchBtn.addEventListener("click", () => {
            window.open(movieData.trailerUrl, '_blank');
        });
    }

    // Add to To-Watch button
    const watchlistBtn = document.querySelector(".watchlist-btn");
    if (watchlistBtn) {
        // Check if already in to-watch list
        const toWatchMovies = JSON.parse(localStorage.getItem("towatch_movies") || "[]");
        const isInToWatch = toWatchMovies.some(movie => movie.id === movieId);
        
        if (isInToWatch) {
            watchlistBtn.classList.add("in-watchlist");
            watchlistBtn.innerHTML = '<span class="icon">✓</span> In To-Watch';
        }

        watchlistBtn.addEventListener("click", () => {
            const user = getLoggedUser();
            if (!user) {
                alert("Please login to add to watchlist!");
                window.location.href = "login.html";
                return;
            }

            let toWatchMovies = JSON.parse(localStorage.getItem("towatch_movies") || "[]");
            const index = toWatchMovies.findIndex(movie => movie.id === movieId);
            
            if (index > -1) {
                // Remove from to-watch
                toWatchMovies.splice(index, 1);
                watchlistBtn.classList.remove("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">+</span> Add to Watchlist';
                alert("✓ Removed from To-Watch list!");
            } else {
                // Add to to-watch
                toWatchMovies.push({
                    id: movieId,
                    title: movieData.title,
                    addedDate: new Date().toISOString()
                });
                watchlistBtn.classList.add("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">✓</span> In To-Watch';
                alert("✓ Added to To-Watch list!");
            }
            
            localStorage.setItem("towatch_movies", JSON.stringify(toWatchMovies));
        });
    }

    // Mark as Watched button
    const watchedBtn = document.querySelector(".watched-btn");
    if (watchedBtn) {
        // Check if already marked as watched
        const watchedMovies = JSON.parse(localStorage.getItem("watched_movies") || "[]");
        const isWatched = watchedMovies.some(movie => movie.id === movieId);
        
        if (isWatched) {
            watchedBtn.classList.add("watched");
            watchedBtn.innerHTML = '<span class="icon">✓</span> Watched';
        }

        watchedBtn.addEventListener("click", () => {
            const user = getLoggedUser();
            if (!user) {
                alert("Please login to mark as watched!");
                window.location.href = "login.html";
                return;
            }

            let watchedMovies = JSON.parse(localStorage.getItem("watched_movies") || "[]");
            const index = watchedMovies.findIndex(movie => movie.id === movieId);
            
            if (index > -1) {
                // Unmark as watched
                watchedMovies.splice(index, 1);
                watchedBtn.classList.remove("watched");
                watchedBtn.innerHTML = '<span class="icon">✓</span> Mark as Watched';
                alert("✓ Removed from Watched list!");
            } else {
                // Mark as watched
                watchedMovies.push({
                    id: movieId,
                    title: movieData.title,
                    watchedDate: new Date().toISOString()
                });
                watchedBtn.classList.add("watched");
                watchedBtn.innerHTML = '<span class="icon">✓</span> Watched';
                alert("✓ Marked as Watched!");
            }
            
            localStorage.setItem("watched_movies", JSON.stringify(watchedMovies));
        });
    }
}

// ---------------------------
// INITIALIZE PAGE
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Movie Detail Page Loaded");
    console.log("Movie ID:", movieId);
    console.log("Movie Data:", movieData);
    
    populateMovieDetails(movieData);
    initializeButtons();
    
    // Initialize discussions after a short delay to ensure everything is loaded
    setTimeout(() => {
        if (typeof renderDiscussions === 'function') {
            renderDiscussions();
        }
        if (typeof initializeDiscussionButton === 'function') {
            initializeDiscussionButton();
        }
    }, 100);
});