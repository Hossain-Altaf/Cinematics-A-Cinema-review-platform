// Get query params
const params = new URLSearchParams(window.location.search);
const type = params.get("type"); // "actor" or "director"
const id = parseInt(params.get("id"));

// ----------------------
// Mock data
// ----------------------
const data = {
  actors: [
    {
      id: 1,
      name: "Leonardo DiCaprio",
      bio: "American actor and film producer. Known for his work in epic dramas and psychological thrillers.",
      image: "https://cdn.britannica.com/68/154868-050-7589A071/Titanic-Leonardo-DiCaprio.jpg",
      works: [
        { title: "Inception", year: 2010, role: "Cobb" },
        { title: "The Revenant", year: 2015, role: "Hugh Glass" },
        { title: "Titanic", year: 1997, role: "Jack Dawson" }
      ],
      discussions: [
        { title: "Is DiCaprio the most versatile actor?", author: "MovieManiac", replies: 40 },
      ]
    },
    {
      id: 2,
      name: "Robert Downey Jr.",
      bio: "Iconic American actor and producer, famous for his role as Tony Stark / Iron Man in the MCU.",
      image: "https://californiamuseum.org/wp-content/uploads/robertdowneyjr_cahalloffameinductee.png",
      works: [
        { title: "Iron Man", year: 2008, role: "Tony Stark" },
        { title: "Sherlock Holmes", year: 2009, role: "Sherlock Holmes" }
      ],
      discussions: [
        { title: "RDJ's best performance outside Marvel?", author: "CineGeek42", replies: 28 }
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
// Select and populate
// ----------------------
function populateDetails(person) {
  if (!person) {
    document.querySelector(".person-detail").innerHTML = "<h2>Person not found!</h2>";
    return;
  }

  document.getElementById("personName").textContent = person.name;
  document.getElementById("personRole").textContent = type === "actor" ? "Actor" : "Director";
  document.getElementById("personBio").textContent = person.bio;
  document.getElementById("personImage").src = person.image;

  const worksList = document.getElementById("worksList");
  worksList.innerHTML = person.works
    .map(w => `<li>${w.title} (${w.year}) — ${w.role}</li>`)
    .join("");

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

document.addEventListener("DOMContentLoaded", () => {
  const personList = type === "actor" ? data.actors : data.directors;
  const person = personList.find(p => p.id === id);
  populateDetails(person);
});
