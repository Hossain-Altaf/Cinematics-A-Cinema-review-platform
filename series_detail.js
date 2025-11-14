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
      { name: "Millie Bobby Brown", role: "Eleven", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Millie_Bobby_Brown_in_2022.jpg" }
    ],
    crew: [
      { name: "The Duffer Brothers", role: "Creators", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Duffer_Brothers_2017.jpg" }
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
    poster: "https://upload.wikimedia.org/wikipedia/en/6/61/Breaking_Bad_title_card.png",
    genres: ["Crime", "Drama", "Thriller"],
    plot: "A chemistry teacher turned meth producer partners with a former student to secure his family's future.",
    cast: [
      { name: "Bryan Cranston", role: "Walter White", image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Bryan_Cranston_2018.jpg" }
    ],
    crew: [
      { name: "Vince Gilligan", role: "Creator", image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Vince_Gilligan_by_Gage_Skidmore.jpg" }
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
    title: "Money-Hiest",
    year: "2017 – 2021",
    duration: "5 Seasons",
    rating: "8.2/10",
    poster: "",
    genres: ["Crime", "Action", "Thriller"],
    plot: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
    cast: [
      { name: "Alvaro Morte", role: "EL Professor", image: "https://www.https://m.media-amazon.com/images/I/51Jxq9bLSuL._SY741_.jpg" }
    ],
    crew: [
      { name: "Alex Pina", role: "Director", image: "https://www.shutterstock.com/editorial/image-editorial/M6TfAax0N1DbUay6Nzk0NDY=/alex-pina-1500w-10067894a.jpg" }
    ],
    reviews: [
      { id: 1, user: { name: "ProfessorFan", avatar: "https://randomuser.me/api/portraits/men/12.jpg" }, rating: 5, date: "2023-08-15", content: "it just mind blowing thriller and twiested series!" }
    ],
    discussions: [
      { id: 1, title: "Most shocking moment?", author: "Professorfan", date: "2023-08-17", preview: "Professor has a lot of plans for  every situations", replies: 42, likes: 150 }
    ]
  },

  // add, Witcher, Dark, GoT similarly
];

// ---------------------------
// FETCH SERIES BY ID
// ---------------------------
const params = new URLSearchParams(window.location.search);
const seriesId = parseInt(params.get("id"));
const seriesData = seriesList.find(s => s.id === seriesId);

// ---------------------------
// POPULATE DETAILS
// ---------------------------
function populateSeriesDetails(data) {
  if (!data) {
    document.querySelector(".movie-detail").innerHTML = "<h2>Series not found!</h2>";
    return;
  }

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

  document.getElementById("reviewsList").innerHTML =
    data.reviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <div class="reviewer-info">
            <img src="${r.user.avatar}" class="reviewer-avatar" alt="${r.user.name}">
            <span class="reviewer-name">${r.user.name}</span>
          </div>
          <div class="review-date">${r.date}</div>
        </div>
        <div class="review-rating">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p class="review-content">${r.content}</p>
      </div>`).join("");

  document.getElementById("discussionsList").innerHTML =
    data.discussions.map(d => `
      <div class="discussion-card">
        <div class="discussion-header">
          <h3 class="discussion-title">${d.title}</h3>
          <div class="discussion-meta">Started by ${d.author} • ${d.date}</div>
        </div>
        <p class="discussion-preview">${d.preview}</p>
        <div class="discussion-stats">
          <span>${d.replies} replies</span>
          <span>${d.likes} likes</span>
        </div>
      </div>`).join("");
}

// ---------------------------
// INITIALIZE PAGE
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  populateSeriesDetails(seriesData);

  const watchlistBtn = document.querySelector(".watchlist-btn");
  watchlistBtn.addEventListener("click", () => {
    const isIn = watchlistBtn.classList.toggle("in-watchlist");
    watchlistBtn.innerHTML = isIn
      ? '<span class="icon">✓</span> In Watchlist'
      : '<span class="icon">+</span> Add to Watchlist';
  });

  const trailerBtn = document.querySelector(".watch-btn");
  trailerBtn.addEventListener("click", () => alert("Opening trailer..."));
});
