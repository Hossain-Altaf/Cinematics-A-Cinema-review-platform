// ---------------------------
// TAB SWITCHING
// ---------------------------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    tabContents.forEach(c => {
      c.classList.add('hidden');
      if (c.id === `${tabId}Tab`) c.classList.remove('hidden');
    });
  });
});

// ---------------------------
// SERIES DATA (mock database)
// ---------------------------
const seriesList = [
  {
    id: 1,
    title: "Stranger Things",
    year: "2016 – present",
    duration: "4 Seasons",
    rating: "8.7/10",
    poster: "https://media.newyorker.com/photos/5d237f1779745c0008681f21/16:9/w_2264,h_1273,c_limit/Phillips-StrangerThingsKidsS3.jpg",
    genres: ["Drama", "Horror", "Sci-Fi"],
    plot: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and supernatural forces.",
    cast: [
      { name: "Millie Bobby Brown", role: "Eleven", image: "https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQQSyYvPf2RJLD4YCptTUVv8AVUa-7ULAOW9095Gqdj-Ov876DhPc1COPbf-3vZZ4-_0VI4htFTTUQeQ-yVftvvxUcRUEyyFEIaChUgLX3hJAOQsiEWTxmheItH0dT1iDAefkEVL6GapivFwr5ygpzMfkxiI.jpg?r=16c" }
    ],
    crew: [
      { name: "The Duffer Brothers", role: "Creators", image: "https://variety.com/wp-content/uploads/2022/06/Duffer-Brothers-MasterClass.jpg" }
    ],
    reviews: [
      { id: 1, user: { name: "SciFiFan", avatar: "https://randomuser.me/api/portraits/women/32.jpg" }, rating: 5, date: "2023-09-10", content: "80s nostalgia and monsters — perfection!" }
    ],
    discussions: [
      { id: 1, title: "Best season so far?", author: "FanGirl99", date: "2023-09-12", preview: "Is S4 the peak of the series?", replies: 25, likes: 80 }
    ]
  },
  {
    id: 2,
    title: "Breaking Bad",
    year: "2008 – 2013",
    duration: "5 Seasons",
    rating: "9.5/10",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nCOQtpFRGcXpsWYwO4IfljyFMyuFTocncA&s",
    genres: ["Crime", "Drama", "Thriller"],
    plot: "A chemistry teacher turned meth producer partners with a former student to secure his family's future.",
    cast: [
      { name: "Bryan Cranston", role: "Walter White", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMSt___dK1Umy1K7b6_Hr3coqsxQgKbsWpg&s" }
    ],
    crew: [
      { name: "Vince Gilligan", role: "Creator", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmcc7zCwjl8pAxDnQQWTFFdhRTvvgQ3RTM8Q&s" }
    ],
    reviews: [
      { id: 1, user: { name: "HeisenbergFan", avatar: "https://randomuser.me/api/portraits/men/12.jpg" }, rating: 5, date: "2023-08-15", content: "Flawless storytelling and character arcs!" }
    ],
    discussions: [
      { id: 1, title: "Most shocking moment?", author: "MethKing", date: "2023-08-17", preview: "That Gus scene still haunts me!", replies: 42, likes: 150 }
    ]
  },
  {
    id: 3,
    title: "Money Heist",
    year: "2017 – 2021",
    duration: "5 Seasons",
    rating: "8.2/10",
    poster: "https://www.tallengestore.com/cdn/shop/products/MoneyHeist-NetflixTVShowPosterFanArt_2fbbb757-22e3-43da-9e44-604ca8e397d6.jpg",
    genres: ["Crime", "Action", "Thriller"],
    plot: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    cast: [
      { name: "Álvaro Morte", role: "El Professor", image: "https://m.media-amazon.com/images/M/MV5BZWRjNmZmNzctNTA3NC00NGU1LWJhMTMtOTA4MzA2ZGM1MjkxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Álex Pina", role: "Director", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf53CeEddfQYwwFtVjDmDZRHuxTZI9SV5Zhg&s" }
    ],
    reviews: [
      { id: 1, user: { name: "ProfessorFan", avatar: "https://randomuser.me/api/portraits/men/12.jpg" }, rating: 5, date: "2023-08-15", content: "Mind-blowing thriller with twists!" }
    ],
    discussions: [
      { id: 1, title: "Most shocking moment?", author: "ProfessorFan", date: "2023-08-17", preview: "Professor has plans for every situation.", replies: 42, likes: 150 }
    ]
  },
  {
    id: 4,
    title: "The Witcher",
    year: "2019 – Present",
    duration: "4 Seasons",
    rating: "8.2/10",
    poster: "https://i5.walmartimages.com/asr/fc053685-d1c8-4998-ba8c-257fb9853ef1.dabd20917fd15ef57febc03fe6e44a14.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    genres: ["Action", "Adventure", "Fantasy"],
    plot: "Geralt of Rivia, a mutated monster-hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
    cast: [
      { name: "Henry Cavill", role: "Geralt of Rivia", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Henry_Cavill_at_the_2009_Tribeca_Film_Festival.jpg/250px-Henry_Cavill_at_the_2009_Tribeca_Film_Festival.jpg" },
      { name: "Anya Chalotra", role: "Yennefer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eONWpXAYJEquJiinEgbi7-wmTM-yCl0f_A&s" }
    ],
    crew: [
      { name: "Lauren Schmidt Hissrich", role: "Showrunner", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf_n-ih2a5jR__BwAk9m5Kk77q7cGnMUt6iA&s" }
    ],
    reviews: [
      { id: 1, user: { name: "WitcherFan", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }, rating: 5, date: "2023-09-01", content: "Epic fantasy series with amazing visuals and fight scenes!" }
    ],
    discussions: [
      { id: 1, title: "Best monster episode?", author: "WitcherFan", date: "2023-09-05", preview: "That Griffin battle was insane!", replies: 30, likes: 120 }
    ]
  },
  {
    id: 5,
    title: "Dark",
    year: "2017 – 2020",
    duration: "3 Seasons",
    rating: "8.8/10",
    poster: "https://i.redd.it/b7ux95rczt551.jpg",
    genres: ["Mystery", "Sci-fi", "Thriller"],
    plot: "A German town's dark secrets unravel after children start disappearing, exposing hidden connections across four generations.",
    cast: [
      { name: "Louis Hofmann", role: "Jonas Kahnwald", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEovCysmGgfqus_IoIosXKkvrnDFPIJy0dTg&s" },
      { name: "Lisa Vicari", role: "Martha Nielsen", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzAOwthFzR06lur1rhGWZ85PjEjndcs4-jhw&s" }
    ],
    crew: [
      { name: "Baran bo Odar", role: "Director", image: "https://images.mubicdn.net/images/cast_member/141421/cache-129312-1455345647/image-w856.jpg" }
    ],
    reviews: [
      { id: 1, user: { name: "TimeLooper", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }, rating: 5, date: "2023-07-20", content: "Mind-bending plot and perfect time-travel storyline!" }
    ],
    discussions: [
      { id: 1, title: "Favorite twist?", author: "TimeLooper", date: "2023-07-22", preview: "The reveal about older Jonas blew my mind.", replies: 25, likes: 95 }
    ]
  },
  {
    id: 6,
    title: "Game of Thrones",
    year: "2011 – 2019",
    duration: "8 Seasons",
    rating: "9.3/10",
    poster: "https://m.media-amazon.com/images/I/61W-KI4mR6L._UF1000,1000_QL80_.jpg",
    genres: ["Action", "Adventure", "Drama"],
    plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
    cast: [
      { name: "Emilia Clarke", role: "Daenerys Targaryen", image: "https://m.media-amazon.com/images/M/MV5BYzY4ZWFmNzMtZGU5NS00M2ZiLThiOGMtYTE3MWFiOWU4Y2RmXkEyXkFqcGc@._V1_.jpg" },
      { name: "Kit Harington", role: "Jon Snow", image: "https://m.media-amazon.com/images/M/MV5BMTA2NTI0NjYxMTBeQTJeQWpwZ15BbWU3MDIxMjgyNzY@._V1_.jpg" }
    ],
    crew: [
      { name: "David Benioff & D.B. Weiss", role: "Showrunners", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPCRxqgw6cD73FHD4rNC1tgse9YdWG17c_qQ&s" }
    ],
    reviews: [
      { id: 1, user: { name: "ThronesFan", avatar: "https://randomuser.me/api/portraits/men/77.jpg" }, rating: 5, date: "2023-06-10", content: "Epic saga! Characters, politics, and dragons all in one." }
    ],
    discussions: [
      { id: 1, title: "Most shocking death?", author: "ThronesFan", date: "2023-06-12", preview: "Ned Stark's death still hits hard!", replies: 40, likes: 200 }
    ]
  }
];

// ---------------------------
// FETCH SERIES BY ID
// ---------------------------
const params = new URLSearchParams(window.location.search);
const seriesId = parseInt(params.get("id"));
const seriesData = seriesList.find(s => s.id === seriesId);

// ---------------------------
// HELPER FUNCTIONS
// ---------------------------

// Get logged-in user
function getLoggedUser() {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
}

// Load reviews from localStorage
function loadStoredReviews(seriesId) {
    const data = localStorage.getItem("series_reviews_" + seriesId);
    return data ? JSON.parse(data) : [];
}

// Save reviews
function saveReviews(seriesId, reviews) {
    localStorage.setItem("series_reviews_" + seriesId, JSON.stringify(reviews));
}

// Render reviews
function renderReviews() {
    if (!seriesData) return;
    
    const reviewsList = document.getElementById("reviewsList");
    const stored = loadStoredReviews(seriesId);
    const allReviews = [...seriesData.reviews, ...stored];

    if (allReviews.length === 0) {
        reviewsList.innerHTML = '<p style="text-align: center; color: #888;">No reviews yet. Be the first to review!</p>';
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
    document.getElementById("averageRating").textContent = avgRating;
    document.getElementById("totalReviews").textContent = `Based on ${allReviews.length} reviews`;
}

// ---------------------------
// POPULATE DETAILS
// ---------------------------
function populateSeriesDetails(data) {
  if (!data) {
    document.querySelector(".movie-detail").innerHTML = "<h2 style='text-align: center; padding: 50px;'>Series not found!</h2>";
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

  document.getElementById("castList").innerHTML =
    data.cast.map(c => `
      <div class="cast-card">
        <img src="${c.image}" alt="${c.name}" class="person-image">
        <div class="person-info">
          <h4>${c.name}</h4><span>${c.role}</span>
        </div>
      </div>`).join("");

  document.getElementById("crewList").innerHTML =
    data.crew.map(p => `
      <div class="crew-card">
        <img src="${p.image}" alt="${p.name}" class="person-image">
        <div class="person-info">
          <h4>${p.name}</h4><span>${p.role}</span>
        </div>
      </div>`).join("");

  // Render reviews
  renderReviews();

  // Render discussions
  document.getElementById("discussionsList").innerHTML =
    data.discussions.map(d => `
      <div class="discussion-card">
        <div class="discussion-header">
          <h3 class="discussion-title">${d.title}</h3>
          <div class="discussion-meta">Started by ${d.author} • ${d.date}</div>
        </div>
        <p class="discussion-preview">${d.preview}</p>
        <div class="discussion-stats">
          <span>💬 ${d.replies} replies</span>
          <span>❤️ ${d.likes} likes</span>
        </div>
      </div>`).join("");
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

    const existing = loadStoredReviews(seriesId);
    existing.push(newReview);
    saveReviews(seriesId, existing);

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
        const isInWatchlist = watchlist.includes(seriesId);
        
        if (isInWatchlist) {
            watchlistBtn.classList.add("in-watchlist");
            watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
        }

        watchlistBtn.addEventListener("click", () => {
            const user = getLoggedUser();
            if (!user) {
                alert("Please login to add to watchlist!");
                return;
            }

            let watchlist = JSON.parse(localStorage.getItem("series_watchlist") || "[]");
            const index = watchlist.indexOf(seriesId);
            
            if (index > -1) {
                // Remove from watchlist
                watchlist.splice(index, 1);
                watchlistBtn.classList.remove("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">+</span> Add to Watchlist';
            } else {
                // Add to watchlist
                watchlist.push(seriesId);
                watchlistBtn.classList.add("in-watchlist");
                watchlistBtn.innerHTML = '<span class="icon">✓</span> In Watchlist';
            }
            
            localStorage.setItem("series_watchlist", JSON.stringify(watchlist));
        });
    }

    // Trailer button
    const trailerBtn = document.querySelector(".watch-btn");
    if (trailerBtn) {
        trailerBtn.addEventListener("click", () => {
            alert(`Opening trailer for "${seriesData.title}"...\n\nTrailer feature coming soon!`);
            // In a real app, you would open a YouTube embed or video player
        });
    }

    // Discussion button
    const discussionBtn = document.querySelector(".discussion-btn");
    if (discussionBtn) {
        discussionBtn.addEventListener("click", () => {
            const user = getLoggedUser();
            if (!user) {
                alert("Please login to start a discussion!");
                window.location.href = "login.html";
                return;
            }
            alert("Discussion feature coming soon!");
            // In a real app, open a modal or redirect to discussion creation page
        });
    }
}

// ---------------------------
// INITIALIZE PAGE
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
    console.log("Series Detail Page Loaded");
    console.log("Series ID:", seriesId);
    console.log("Series Data:", seriesData);
    
    populateSeriesDetails(seriesData);
    initializeButtons();
});