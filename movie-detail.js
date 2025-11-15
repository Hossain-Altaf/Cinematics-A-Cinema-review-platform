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
        poster: "https://static.wikia.nocookie.net/batman/images/3/38/The_Dark_Knight_poster6.jpg/revision/latest?cb=20160504033320",
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
        cast: [{ name: "Matthew McConaughey", role: "Cooper", image: "https://m.media-amazon.com/images/M/MV5BMTg0MDc3ODUwOV5BMl5BanBnXkFtZTcwMTk2NjY4Nw@@._V1_.jpg" },
            { name: "Anne Hathaway", role: "Brand", image: "https://upload.wikimedia.org/wikipedia/commons/0/03/Anne_Hathaway_at_The_Apprentice_in_NYC_03_%28cropped2%29.jpg" },
            { name: "michael Caine", role: "Professor Brand", image: "https://image.tmdb.org/t/p/w500/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg" }
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
    duration: "2h 12min",
    rating: "8.6/10",
    poster: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    genres: ["Thriller", "Drama"],
    plot: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    
    cast: [
        { 
            name: "Kang-ho Song", role: "Kim Ki-taek", 
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyxv7LN_UsQsIAg-MMobQ3eBwBzpk8ufwUjw&s" 
        },
        { 
            name: "Sun-kyun Lee",  role: "Park Dong-ik ", 
            image: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/rockcms/2023-12/231226-Lee-Sun-kyun-obit-se-1156p-99d222.jpg" 
        },
        { 
            name: "So-dam Park", 
            role: "Kim Ki-jung ", 
            image: "https://m.media-amazon.com/images/M/MV5BNzE2ZTM1ZGUtOWM5ZC00ZDU5LWExOTUtM2E5ZGVjNDI4OWQ2XkEyXkFqcGc@._V1_.jpg" 
        }
    ],
    crew: [
        {
            name: "Bong Joon Ho",
            role: "Director",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxDOChXKVHVk4T8QjsHkVAgDIl6Xa0c8GXQg&s"
        },
    ],

    reviews: [
        {
            id: 1,
            user: { 
                name: "MovieFan99", 
                avatar: "https://randomuser.me/api/portraits/men/32.jpg" 
            },
            rating: 5,
            date: "2023-11-10",
            content: "A masterpiece of tension, symbolism, and storytelling. A must-watch."
        }
    ],

    discussions: [
        {
            id: 1,
            title: "Basement symbolism explained",
            author: "FilmTheoryNerd",
            date: "2023-11-12",
            preview: "What does the hidden basement really represent?",
            replies: 42,
            likes: 230
        }
    ]
},
{
    id: 5,
    title: "Forrest Gump",
    year: "1994",
    duration: "2h 22min",
    rating: "8.8/10",
    poster: "https://image.tmdb.org/t/p/original/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    genres: ["Drama", "Romance"],
    plot: "The presidencies of Kennedy and Johnson, the Vietnam War, and more through the eyes of an Alabama man with a low IQ.",
    
    cast: [
        {
            name: "Tom Hanks",
            role: "Forrest Gump",
            image: "https://m.media-amazon.com/images/M/MV5BOWYxMzA4YWMtYWIyYy00NTE5LTljMDAtNzM1NDYyMWYwYzkwXkEyXkFqcGc@._V1_.jpg"
        },
        {
            name: "Robin Wright",
            role: "Jenny Curran",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxV7VzBZaipZ0RRzQgIjugdsUGAHjS0KdGA&s"
        }
    ],

    crew: [
        {
            name: "Robert Zemeckis",
            role: "Director",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Robert_Zemeckis_%22The_Walk%22_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_%2821835891403%29_%28cropped%29.jpg/250px-Robert_Zemeckis_%22The_Walk%22_at_Opening_Ceremony_of_the_28th_Tokyo_International_Film_Festival_%2821835891403%29_%28cropped%29.jpg"
        }
    ]
},
{
    id: 6,
    title: "Avengers: Endgame",
    year: "2019",
    duration: "3h 1min",
    rating: "8.4/10",
    poster: "https://heroichollywood.com/wp-content/uploads/2019/03/Avengers-Endgame-Marvel-Studios-MCU-Captain-Marvel.jpg",
    genres: ["Action", "Adventure", "Sci-Fi"],
    plot: "The surviving Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    
    cast: [
        {
            name: "Robert Downey Jr.",
            role: "Tony Stark / Iron Man",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmOI_ynNOoaPc00GTVTy8HSk4JNxE3nQb2sA&s"
        },
        {
            name: "Chris Evans",
            role: "Steve Rogers / Captain America",
            image: "https://m.media-amazon.com/images/M/MV5BNzQ0YWM1ODEtZDFkYy00MGJhLTkwZDUtMzVkZjljODU3ZTRmXkEyXkFqcGc@._V1_.jpg"
        },
        {
            name: "Scarlett Johansson",
            role: "Natasha Romanoff / Black Widow",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Scarlett_Johansson-8588.jpg/960px-Scarlett_Johansson-8588.jpg"
        },
        {
            name: "Chris Hemsworth", 
            role: "Thor",
            image: "https://media.vanityfair.com/photos/63765577474812eb37ec70bc/master/w_2560%2Cc_limit/Headshot%2520-%2520credit%2520%25E2%2580%259CNational%2520Geographic%2520for%2520Disney+%25E2%2580%259D.jpg"
        }

    ],

    crew: [
        {
            name: "Anthony Russo",
            role: "Director",
            image: "https://m.media-amazon.com/images/M/MV5BMTc2NjM5MTM0Ml5BMl5BanBnXkFtZTgwMTY3ODczNjM@._V1_.jpg"
        },
        {
            name: "Joe Russo",
            role: "Director",
            image: "https://m.media-amazon.com/images/M/MV5BMTc2NzY1NTY5OF5BMl5BanBnXkFtZTgwNjY3ODczNjM@._V1_.jpg"
        }
    ]
},
{
    id: 7,
    title: "Joker",
    year: "2019",
    duration: "2h 2min",
    rating: "8.4/10",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUhpImhE0LQJh-LxF43KGMvfZ2CqKPWnO8rA&s",
    genres: ["Crime", "Drama", "Thriller"],
    plot: "A mentally troubled comedian embarks on a downward spiral that leads to the creation of the iconic villain, Joker.",
    
    cast: [
        {
            name: "Joaquin Phoenix",
            role: "Arthur Fleck / Joker",
            image: "https://m.media-amazon.com/images/M/MV5BYjFjNGYzYjEtNGE0Ny00M2IyLTk5ZmYtODE3ZGFkMzVjYmNmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        },
        {
            name: "Robert De Niro",
            role: "Murray Franklin",
            image: "https://m.media-amazon.com/images/M/MV5BMjAwNDU3MzcyOV5BMl5BanBnXkFtZTcwMjc0MTIxMw@@._V1_FMjpg_UX1000_.jpg"
        }
    ],

    crew: [
        {
            name: "Todd Phillips",
            role: "Director",
            image: "https://goldenglobes.com/wp-content/uploads/2023/10/Todd_Phillips20190919_0.jpg"
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
