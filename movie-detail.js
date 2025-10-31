// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Tab switching logic
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show corresponding content
        const tabId = button.dataset.tab;
        tabContents.forEach(content => {
            content.classList.add('hidden');
            if (content.id === `${tabId}Tab`) {
                content.classList.remove('hidden');
            }
        });
    });
});

// Mock data (replace with actual API calls)
const movieData = {
    id: 1,
    title: "Inception",
    year: "2010",
    duration: "2h 28min",
    rating: "8.8/10",
    poster: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg",
    genres: ["Action", "Adventure", "Sci-Fi"],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: [
        {
            name: "Leonardo DiCaprio",
            role: "Cobb",
            image: "https://example.com/leo.jpg"
        },
        // Add more cast members
    ],
    crew: [
        {
            name: "Christopher Nolan",
            role: "Director",
            image: "https://example.com/nolan.jpg"
        },
        // Add more crew members
    ],
    reviews: [
        {
            id: 1,
            user: {
                name: "MovieBuff123",
                avatar: "https://example.com/avatar1.jpg"
            },
            rating: 5,
            date: "2023-10-15",
            content: "A masterpiece of modern cinema..."
        },
        // Add more reviews
    ],
    discussions: [
        {
            id: 1,
            title: "The ending - what really happened?",
            author: "CinemaFan",
            date: "2023-10-20",
            preview: "Let's discuss the ambiguous ending...",
            replies: 45,
            likes: 123
        },
        // Add more discussions
    ]
};

// Populate movie details
function populateMovieDetails() {
    document.getElementById('movieTitle').textContent = movieData.title;
    document.getElementById('movieYear').textContent = movieData.year;
    document.getElementById('movieDuration').textContent = movieData.duration;
    document.getElementById('movieRating').textContent = movieData.rating;
    document.getElementById('moviePoster').src = movieData.poster;
    document.getElementById('moviePlot').textContent = movieData.plot;

    // Populate genres
    const genresContainer = document.getElementById('movieGenres');
    genresContainer.innerHTML = movieData.genres
        .map(genre => `<span class="genre-tag">${genre}</span>`)
        .join('');

    // Populate cast
    const castList = document.getElementById('castList');
    castList.innerHTML = movieData.cast
        .map(person => `
            <div class="cast-card">
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <div class="person-info">
                    <h4 class="person-name">${person.name}</h4>
                    <span class="person-role">${person.role}</span>
                </div>
            </div>
        `)
        .join('');

    // Populate crew
    const crewList = document.getElementById('crewList');
    crewList.innerHTML = movieData.crew
        .map(person => `
            <div class="crew-card">
                <img src="${person.image}" alt="${person.name}" class="person-image">
                <div class="person-info">
                    <h4 class="person-name">${person.name}</h4>
                    <span class="person-role">${person.role}</span>
                </div>
            </div>
        `)
        .join('');

    // Populate reviews
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = movieData.reviews
        .map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <img src="${review.user.avatar}" alt="${review.user.name}" class="reviewer-avatar">
                        <span class="reviewer-name">${review.user.name}</span>
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</div>
                <p class="review-content">${review.content}</p>
            </div>
        `)
        .join('');

    // Populate discussions
    const discussionsList = document.getElementById('discussionsList');
    discussionsList.innerHTML = movieData.discussions
        .map(discussion => `
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
            </div>
        `)
        .join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateMovieDetails();

    // Handle watchlist button
    const watchlistBtn = document.querySelector('.watchlist-btn');
    watchlistBtn.addEventListener('click', () => {
        const isInWatchlist = watchlistBtn.classList.contains('in-watchlist');
        if (isInWatchlist) {
            watchlistBtn.innerHTML = '<span class="icon">+</span> Add to Watchlist';
            watchlistBtn.classList.remove('in-watchlist');
        } else {
            watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
            watchlistBtn.classList.add('in-watchlist');
        }
    });

    // Handle trailer button
    const watchBtn = document.querySelector('.watch-btn');
    watchBtn.addEventListener('click', () => {
        // Implement trailer functionality
        alert('Opening trailer...');
    });
});