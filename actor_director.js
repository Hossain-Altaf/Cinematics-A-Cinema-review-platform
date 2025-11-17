// Get query params
const params = new URLSearchParams(window.location.search);
const type = params.get("type"); // "actor" or "director"
const id = parseInt(params.get("id"));

// ----------------------
// Mock data
const data = {
  actors: [
    {
      id: 1,
      name: "Leonardo DiCaprio",
      bio: "American actor and film producer known for intense performances in dramas and thrillers.",
      image: "https://cdn.britannica.com/68/154868-050-7589A071/Titanic-Leonardo-DiCaprio.jpg",
      works: [
        { title: "Inception", year: 2010, role: "Cobb" },
        { title: "The Revenant", year: 2015, role: "Hugh Glass" },
        { title: "Titanic", year: 1997, role: "Jack Dawson" },
        { title: "The Wolf of Wall Street", year: 2013, role: "Jordan Belfort" },
        { title: "Shutter Island", year: 2010, role: "Teddy Daniels" }
      ],
      discussions: [
        { title: "Is DiCaprio the most versatile actor?", author: "MovieManiac", replies: 40 }
      ]
    },
    {
      id: 2,
      name: "Robert Downey Jr.",
      bio: "Iconic American actor and producer, best known as Tony Stark from the Marvel Cinematic Universe.",
      image: "https://californiamuseum.org/wp-content/uploads/robertdowneyjr_cahalloffameinductee.png",
      works: [
        { title: "Iron Man", year: 2008, role: "Tony Stark" },
        { title: "Avengers: Endgame", year: 2019, role: "Tony Stark" },
        { title: "Sherlock Holmes", year: 2009, role: "Sherlock Holmes" },
        { title: "Chaplin", year: 1992, role: "Charlie Chaplin" },
        { title: "Tropic Thunder", year: 2008, role: "Kirk Lazarus" }
      ],
      discussions: [
        { title: "RDJ's best performance outside Marvel?", author: "CineGeek42", replies: 28 }
      ]
    },
    {
      id: 3,
      name: "Scarlett Johansson",
      bio: "American actress known for action roles and emotional performances across genres.",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Scarlett_Johansson_in_Kuwait_01b-tweak.jpg",
      works: [
        { title: "Lucy", year: 2014, role: "Lucy" },
        { title: "Marriage Story", year: 2019, role: "Nicole Barber" },
        { title: "Black Widow", year: 2021, role: "Natasha Romanoff" },
        { title: "Lost in Translation", year: 2003, role: "Charlotte" },
        { title: "Her", year: 2013, role: "Samantha (voice)" }
      ],
      discussions: [
        { title: "Her best non-Marvel role?", author: "FilmFanatic", replies: 22 }
      ]
    },
    {
      id: 4,
      name: "Tom Hanks",
      bio: "Legendary American actor known for heartfelt roles and inspiring performances.",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Tom_Hanks_TIFF_2019.jpg",
      works: [
        { title: "Forrest Gump", year: 1994, role: "Forrest Gump" },
        { title: "Cast Away", year: 2000, role: "Chuck Noland" },
        { title: "Saving Private Ryan", year: 1998, role: "Captain Miller" },
        { title: "The Green Mile", year: 1999, role: "Paul Edgecomb" },
        { title: "Captain Phillips", year: 2013, role: "Captain Phillips" }
      ],
      discussions: [
        { title: "Is he the most lovable actor?", author: "CinemaSoul", replies: 19 }
      ]
    },
    {
      id: 5,
      name: "Christian Bale",
      bio: "British actor known for extreme body transformations and deep method acting.",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/54/Christian_Bale_SDCC_2014.jpg",
      works: [
        { title: "The Dark Knight", year: 2008, role: "Bruce Wayne / Batman" },
        { title: "American Psycho", year: 2000, role: "Patrick Bateman" },
        { title: "The Prestige", year: 2006, role: "Alfred Borden" },
        { title: "Ford v Ferrari", year: 2019, role: "Ken Miles" },
        { title: "Vice", year: 2018, role: "Dick Cheney" }
      ],
      discussions: [
        { title: "Best Batman actor ever?", author: "DarkKnightFan", replies: 33 }
      ]
    },
    {
      id: 6,
      name: "Emma Stone",
      bio: "American actress known for comedic and dramatic roles, including her Oscar-winning performance.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Emma_Stone_Cannes_2015.jpg",
      works: [
        { title: "La La Land", year: 2016, role: "Mia Dolan" },
        { title: "Cruella", year: 2021, role: "Cruella de Vil" },
        { title: "The Amazing Spider-Man", year: 2012, role: "Gwen Stacy" },
        { title: "Poor Things", year: 2023, role: "Bella Baxter" },
        { title: "Birdman", year: 2014, role: "Sam Thomson" }
      ],
      discussions: [
        { title: "Is she the best actress of her generation?", author: "ActingNerd", replies: 26 }
      ]
    },
    {
      id: 7,
      name: "Benedict Cumberbatch",
      bio: "British actor known for intelligent and complex roles in drama, mystery, and sci-fi.",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Benedict_Cumberbatch_2019.jpg",
      works: [
        { title: "Doctor Strange", year: 2016, role: "Dr. Stephen Strange" },
        { title: "Sherlock", year: 2010, role: "Sherlock Holmes" },
        { title: "The Imitation Game", year: 2014, role: "Alan Turing" },
        { title: "12 Years a Slave", year: 2013, role: "William Ford" },
        { title: "The Power of the Dog", year: 2021, role: "Phil Burbank" }
      ],
      discussions: [
        { title: "Is he the smartest actor alive?", author: "MindMarvel", replies: 18 }
      ]
    },
    {
      id: 8,
      name: "Chris Evans",
      bio: "American actor famous for his role as Captain America in the Marvel Cinematic Universe.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Chris_Evans_SDCC_2014.jpg",
      works: [
        { title: "Captain America: The First Avenger", year: 2011, role: "Steve Rogers" },
        { title: "Avengers: Endgame", year: 2019, role: "Steve Rogers" },
        { title: "Knives Out", year: 2019, role: "Ransom Drysdale" },
        { title: "Snowpiercer", year: 2013, role: "Curtis" },
        { title: "Gifted", year: 2017, role: "Frank Adler" }
      ],
      discussions: [
        { title: "Is Cap the best MCU character?", author: "SuperheroFan", replies: 25 }
      ]
    },
    {
      id: 9,
      name: "Chris Hemsworth",
      bio: "Australian actor best known for his role as Thor in the MCU.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Chris_Hemsworth_by_Gage_Skidmore_2.jpg",
      works: [
        { title: "Thor", year: 2011, role: "Thor" },
        { title: "Avengers: Infinity War", year: 2018, role: "Thor" },
        { title: "Extraction", year: 2020, role: "Tyler Rake" },
        { title: "Rush", year: 2013, role: "James Hunt" },
        { title: "Snow White and the Huntsman", year: 2012, role: "The Huntsman" }
      ],
      discussions: [
        { title: "Hemsworth's best non-Thor role?", author: "ActionJunkie", replies: 14 }
      ]
    }
  ],

  directors: [
    {
      id: 1,
      name: "Christopher Nolan",
      bio: "British-American filmmaker known for complex storytelling and large-scale productions.",
      image: "https://static01.nyt.com/images/2014/11/02/magazine/02nolan1/mag-02Nolan-t_CA1-articleLarge.jpg",
      works: [
        { title: "Inception", year: 2010, role: "Director" },
        { title: "The Dark Knight", year: 2008, role: "Director" },
        { title: "Interstellar", year: 2014, role: "Director" }
      ],
      discussions: [
        { title: "Is Nolan the best director of the century?", author: "FilmNerd", replies: 60 }
      ]
    },
    {
      id: 2,
      name: "Steven Spielberg",
      bio: "American director, producer, and screenwriter widely considered one of the founding pioneers of modern cinema.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7qiJR6rHPHaYKKIdcV--suyIVk85h8m_9g&s",
      works: [
        { title: "Jurassic Park", year: 1993, role: "Director" },
        { title: "Schindler's List", year: 1993, role: "Director" },
        { title: "E.T. the Extra-Terrestrial", year: 1982, role: "Director" }
      ],
      discussions: [
        { title: "Favorite Spielberg scene ever?", author: "CineGuru", replies: 35 }
      ]
    }
  ]
};

// ----------------------
// Populate person details
function populateDetails(person) {
  if (!person) {
    document.querySelector(".person-detail").innerHTML = "<h2>Person not found!</h2>";
    return;
  }

  // Hero section
  document.getElementById("personName").textContent = person.name;
  document.getElementById("personRole").textContent = type === "actor" ? "Actor" : "Director";
  document.getElementById("personBio").textContent = person.bio;
  document.getElementById("personImage").src = person.image;

  // Works tab
  const worksList = document.getElementById("worksList");
  worksList.innerHTML = person.works
    .map(w => `<li>${w.title} (${w.year}) — ${w.role}</li>`)
    .join("");

  // Discussions tab
  const discussionsList = document.getElementById("discussionsList");
  discussionsList.innerHTML = person.discussions
    .map(d => `
      <div class="discussion-card">
        <h4>${d.title}</h4>
        <p>Started by ${d.author} • ${d.replies} replies</p>
      </div>
    `)
    .join("");
}

// ----------------------
// Tabs functionality
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.add('hidden'));
      document.getElementById(tab).classList.remove('hidden');
    });
  });
}

// ----------------------
// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  const personList = type === "actor" ? data.actors : data.directors;
  const person = personList.find(p => p.id === id);

  populateDetails(person);
  setupTabs();
});
