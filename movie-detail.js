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
    },
  {
    id: 8,
    title: "Spider‑Man",
    year: "2002",
    duration: "2h 1min",
    rating: "7.4/10",
    poster: "https://m.media-amazon.com/images/M/MV5BZWM0OWVmNTEtNWVkOS00MzgyLTkyMzgtMmE2ZTZiNjY4MmFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genres: ["Action", "Adventure", "Sci-Fi"],
    plot: "A shy teen bitten by a genetically-modified spider becomes Spider‑Man and battles crime in New York.",
    cast: [
      { name: "Tobey Maguire", role: "Peter Parker / Spider‑Man", image: "https://m.media-amazon.com/images/M/MV5BMTYwMTI5NTM2OF5BMl5BanBnXkFtZTcwODk3MDQ2Mg@@._V1_FMjpg_UX1000_.jpg" },
      { name: "Willem Dafoe", role: "Norman Osborn / Green Goblin", image: "https://image.tmdb.org/t/p/w500/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg" }
    ],
    crew: [
      { name: "Sam Raimi", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BODQ0NjI0NzkzMV5BMl5BanBnXkFtZTYwMDc0ODk1._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 9,
    title: "Iron Man",
    year: "2008",
    duration: "2h 6min",
    rating: "7.9/10",
    poster: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg",
    genres: ["Action", "Adventure", "Sci-Fi"],
    plot: "Billionaire engineer Tony Stark builds a powerful suit of armor and becomes Iron Man.",
    cast: [
      { name: "Robert Downey Jr.", role: "Tony Stark / Iron Man", image: "https://m.media-amazon.com/images/M/MV5BNzg1MTUyNDYxOF5BMl5BanBnXkFtZTgwNTQ4MTE2MjE@._V1_.jpg" },
      { name: "Gwyneth Paltrow", role: "Pepper Potts", image: "https://m.media-amazon.com/images/M/MV5BNzIxOTQ1NTU1OV5BMl5BanBnXkFtZTcwMTQ4MDY0Nw@@._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Jon Favreau", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNzBiZGI5MmMtOWEzYi00ZDgwLTg4MGEtOTBjMmE1Y2ZiNDg5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  
  {
    id: 10,
    title: "Nobody",
    year: "2021",
    duration: "1h 32min",
    rating: "7.4/10",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaBUJOHmiD5YjxuvXd-zJfO3Rd7ke0EUl2dQ&s",
    genres: ["Action", "Thriller", "Crime"],
    plot: "A quiet man’s hidden past and lethal skills emerge when his family is threatened after a home invasion.",
    cast: [
      { name: "Bob Odenkirk", role: "Hutch Mansell / Nobody", image: "https://m.media-amazon.com/images/M/MV5BNjc1MDBkMWEtMzNmYy00NjFjLWFmZDktMzRlYThhMGQxZDYwXkEyXkFqcGc@._V1_.jpg" },
      { name: "Christopher Lloyd", role: "Hutch's Father", image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/ChristopherLloyd2022.jpg" }
    ],
    crew: [
      { name: "Ilya Naishuller", role: "Director", image: "https://image.tmdb.org/t/p/w500/gvBwViahAMgKrrXi5RX69JZ60dY.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 11,
    title: "Thor",
    year: "2011",
    duration: "1h 55min",
    rating: "7.0/10",
    poster: "https://m.media-amazon.com/images/M/MV5BNjRhNGZjZjEtYTQzYS00OWUxLThjNGEtMTIwMTE2ZDFlZTZkXkEyXkFqcGc@._V1_.jpg",
    genres: ["Action", "Adventure", "Fantasy"],
    plot: "Thor, the god of thunder, is cast out of Asgard and must prove himself worthy on Earth to reclaim his powers.",
    cast: [
      { name: "Chris Hemsworth", role: "Thor", image: "https://cdn.britannica.com/92/215392-050-96A4BC1D/Australian-actor-Chris-Hemsworth-2019.jpg" },
      { name: "Natalie Portman", role: "Jane Foster", image: "https://cdn.britannica.com/86/255786-050-5A8D7B3A/actress-natalie-portman-attends-christian-dior-haute-couture-paris-fashion-week.jpg" }
    ],
    crew: [
      { name: "Kenneth Branagh", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BMjI0NTQ4Mjk5Ml5BMl5BanBnXkFtZTcwMDc1NjkzNw@@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 12,
    title: "Captain America: The First Avenger",
    year: "2011",
    duration: "2h 4min",
    rating: "6.9/10",
    poster: "https://m.media-amazon.com/images/M/MV5BNzUyM2YyY2MtNzNlMS00MWU5LTgxNjAtNzZlNmI2NjU2NDZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genres: ["Action", "Adventure", "Sci-Fi"],
    plot: "Steve Rogers, a rejected soldier, becomes the super-soldier Captain America during World War II.",
    cast: [
      { name: "Chris Evans", role: "Steve Rogers / Captain America", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Chris_Evans_SDCC_2014.jpg" },
      { name: "Hayley Atwell", role: "Peggy Carter", image: "https://m.media-amazon.com/images/M/MV5BYjc1YmI2N2MtYTFkYS00NzcxLTlmN2QtOWQ1OWY0MTkxNTQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Joe Johnston", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNzcxNDQwNzgxNV5BMl5BanBnXkFtZTYwNTQ1MTA0._V1_FMjpg_UX1000_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 13,
    title: "The Shawshank Redemption",
    year: "1994",
    duration: "2h 22min",
    rating: "9.3/10",
    poster: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_SY679_.jpg",
    genres: ["Drama"],
    plot: "Two imprisoned men bond over several years, finding solace and eventual redemption through acts of common decency.",
    cast: [
      { name: "Tim Robbins", role: "Andy Dufresne", image: "https://m.media-amazon.com/images/M/MV5BZTY1NWZmMDQtZWU0NC00YTBjLTkzN2MtMzVlMzQyMjQ1YTQzXkEyXkFqcGc@._V1_.jpg" },
      { name: "Morgan Freeman", role: "Ellis Boyd 'Red' Redding", image: "https://www.shutterstock.com/editorial/image-editorial/Mez5k2z7N4D4If04OTgy/440nw-390916jh.jpg" }
    ],
    crew: [
      { name: "Frank Darabont", role: "Director", image: "https://resizing.flixster.com/-GSgCoF43Wz12X98K8UAbIwuW0A=/fit-in/705x460/v2/http://media.baselineresearch.com/images/280516/280516_full.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 14,
    title: "The Godfather",
    year: "1972",
    duration: "2h 55min",
    rating: "9.2/10",
    poster: "https://www.lab111.nl/wp-content/uploads/2024/04/s-l1600.png",
    genres: ["Crime", "Drama"],
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    cast: [
      { name: "Marlon Brando", role: "Don Vito Corleone", image: "https://images8.alphacoders.com/370/thumb-1920-370883.png" },
      { name: "Al Pacino", role: "Michael Corleone", image: "https://assets-prd.ignimgs.com/2025/04/14/al-pacino-godfather-favorite-1280x720-1744647098867.jpg" }
    ],
    crew: [
      { name: "Francis Ford Coppola", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BMTM5NDU3OTgyNV5BMl5BanBnXkFtZTcwMzQxODA0NA@@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 15,
    title: "The Dark Knight",
    year: "2008",
    duration: "2h 32min",
    rating: "9.0/10",
    poster: "https://ew.com/thmb/B0w9qzmQqCZ1tumxv8cBx0aPTrQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mcddakn_ec005-2000-a3d30c1958fb442486fb1e10ba92dd17.jpg",
    genres: ["Action", "Crime", "Drama"],
    plot: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    cast: [
      { name: "Christian Bale", role: "Bruce Wayne / Batman", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Q0zpeUW2Az4czxe9fycMRv5Zf7Nhd5JZRg&s" },
      { name: "Heath Ledger", role: "Joker", image: "https://m.media-amazon.com/images/M/MV5BMTI2NTY0NzA4MF5BMl5BanBnXkFtZTYwMjE1MDE0._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Christopher Nolan", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 16,
    title: "12 Angry Men",
    year: "1957",
    duration: "1h 36min",
    rating: "9.0/10",
    poster: "https://storage.googleapis.com/pod_public/750/262454.jpg",
    genres: ["Crime", "Drama"],
    plot: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    cast: [
      { name: "Henry Fonda", role: "Juror #8", image: "https://m.media-amazon.com/images/M/MV5BMTMyODAxMDE2MF5BMl5BanBnXkFtZTcwNzg4NDc3Mw@@._V1_.jpg" }
    ],
    crew: [
      { name: "Sidney Lumet", role: "Director", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK4iOWEZK8Bu4MD0c9oXDDsDjVlceJZl0CEg&s" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 17,
    title: "Schindler's List",
    year: "1993",
    duration: "3h 15min",
    rating: "9.0/10",
    poster: "https://m.media-amazon.com/images/I/817R7RXH9PL._UF1000,1000_QL80_.jpg",
    genres: ["Biography", "Drama", "History"],
    plot: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce.",
    cast: [
      { name: "Liam Neeson", role: "Oskar Schindler", image: "https://m.media-amazon.com/images/M/MV5BMjE0Njg0MzQ0MF5BMl5BanBnXkFtZTYwNTk3OTE3._V1_.jpg" },
      { name: "Ralph Fiennes", role: "Amon Goeth", image: "https://imgix.ranker.com/list_img_v2/2661/102661/original/ralph-fiennes-movies-and-films-and-filmography-u5?w=1200&h=630&fm=pjpg&q=80&fit=crop&dpr=1" }
    ],
    crew: [
      { name: "Steven Spielberg", role: "Director", image: "https://cdn.britannica.com/56/190156-050-88A44C86/Steven-Spielberg-filming-Jurassic-Park.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 18,
    title: "The Lord of the Rings: The Return of the King",
    year: "2003",
    duration: "3h 21min",
    rating: "8.9/10",
    poster: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_SY679_.jpg",
    genres: ["Action", "Adventure", "Drama"],
    plot: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    cast: [
      { name: "Elijah Wood", role: "Frodo Baggins", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Elijah_Wood-D.jpg/250px-Elijah_Wood-D.jpg" },
      { name: "Ian McKellen", role: "Gandalf", image: "https://m.media-amazon.com/images/M/MV5BMTQ2MjgyNjk3MV5BMl5BanBnXkFtZTcwNTA3NTY5Mg@@._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Peter Jackson", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNTk2MzA0ZDAtMTI0Yy00NzU2LTgyYmUtMDRlOGFmYjM3NzJhXkEyXkFqcGc@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  {
    id: 19,
    title: "Pulp Fiction",
    year: "1994",
    duration: "2h 34min",
    rating: "8.9/10",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdX5gfR5CmXENJbuimiUvElI7YhLxOXPzmtA&s",
    genres: ["Crime", "Drama"],
    plot: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: [
      { name: "John Travolta", role: "Vincent Vega", image: "https://m.media-amazon.com/images/M/MV5BNWUyNDZiMjItMjQzMy00YmQyLTliOTYtOGRkYzNhZTk5NDBiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
      { name: "Samuel L. Jackson", role: "Jules Winnfield", image: "https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_FMjpg_UX1000_.jpg" }
    ],
    crew: [
      { name: "Quentin Tarantino", role: "Director", image: "https://cdn.britannica.com/81/220481-050-55413025/Quentin-Tarantino-2020.jpg" }
    ],
    reviews: [],
    discussions: []
  },
    
  {
    "id": 20,
    "title": "Gladiator",
    "year": "2000",
    "duration": "2h 35min",
    "rating": "8.5/10",
    "poster": "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjEtOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg",
    "genres": ["Action", "Adventure", "Drama"],
    "plot": "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",  
    "cast": [
      { "name": "Russell Crowe", "role": "Maximus Decimus Meridius", "image": "" },
      { "name": "Joaquin Phoenix", "role": "Commodus", "image": "" }
    ],
    "crew": [
      { "name": "Ridley Scott", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 21,
    "title": "Jurassic World",
    "year": "2015",
    "duration": "2h 4min",
    "rating": "6.9/10",
    "poster": "https://m.media-amazon.com/images/M/MV5BNzBhNzlkM2UtZTQyOC00NjUyLTkzMmMtNDQ1YTM5N2NmMGE5XkEyXkFqcGc@._V1_.jpg",
    "genres": ["Adventure", "Action", "Sci-Fi"],
    "plot": "A new theme park built on the original site of Jurassic Park creates a genetically modified hybrid dinosaur, the Indominus Rex, which escapes containment and causes chaos.",  
    "cast": [
      { "name": "Chris Pratt", "role": "Owen Grady", "image": "" },
      { "name": "Bryce Dallas Howard", "role": "Claire Dearing", "image": "" }
    ],
    "crew": [
      { "name": "Colin Trevorrow", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 22,
    "title": "Avatar",
    "year": "2009",
    "duration": "2h 42min",
    "rating": "7.8/10",
    "poster": "https://m.media-amazon.com/images/I/41kTVLeW1CL._AC_.jpg",
    "genres": ["Action", "Adventure", "Fantasy", "Sci-Fi"],
    "plot": "A paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following his orders and protecting the world he feels is his home.",
    "cast": [
      { "name": "Sam Worthington", "role": "Jake Sully", "image": "" },
      { "name": "Zoe Saldana", "role": "Neytiri", "image": "" }
    ],
    "crew": [
      { "name": "James Cameron", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 23,
    "title": "Deadpool",
    "year": "2016",
    "duration": "1h 48min",
    "rating": "8.0/10",
    "poster": "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Deadpool_%282016_poster%29.png/250px-Deadpool_%282016_poster%29.png",
    "genres": ["Action", "Adventure", "Comedy"],
    "plot": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",  
    "cast": [
      { "name": "Ryan Reynolds", "role": "Wade Wilson / Deadpool", "image": "" },
      { "name": "Morena Baccarin", "role": "Vanessa Carlysle", "image": "" }
    ],
    "crew": [
      { "name": "Tim Miller", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 24,
    "title": "Fight Club",
    "year": "1999",
    "duration": "2h 19min",
    "rating": "8.8/10",
    "poster": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    "genres": ["Drama"],
    "plot": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more.",  
    "cast": [
      { "name": "Brad Pitt", "role": "Tyler Durden", "image": "" },
      { "name": "Edward Norton", "role": "The Narrator", "image": "" }
    ],
    "crew": [
      { "name": "David Fincher", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 25,
    "title": "Spider-Man: Into the Spider-Verse",
    "year": "2018",
    "duration": "1h 57min",
    "rating": "8.4/10",
    "poster": "https://ae01.alicdn.com/kf/U8131aae12dae43888c7d6a79c140fa88v.jpg",
    "genres": ["Animation", "Action", "Adventure"],
    "plot": "Teen Miles Morales becomes the Spider-Man of his reality and must join with other spider-people from different dimensions to stop a threat for all realities.",  
    "cast": [
      { "name": "Shameik Moore", "role": "Miles Morales", "image": "" },
      { "name": "Jake Johnson", "role": "Peter B. Parker", "image": "" }
    ],
    "crew": [
      { "name": "Bob Persichetti", "role": "Director", "image": "" },
      { "name": "Peter Ramsey", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 26,
    "title": "The Matrix Reloaded",
    "year": "2003",
    "duration": "2h 18min",
    "rating": "7.2/10",
    "poster": "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
    "genres": ["Action", "Sci-Fi"],
    "plot": "Neo and the rebel leaders estimate that they have 72 hours until 250,000 probes discover Zion and destroy it; meanwhile, Neo must decide how he can save Trinity from a new danger.",  
    "cast": [
      { "name": "Keanu Reeves", "role": "Neo", "image": "" },
      { "name": "Laurence Fishburne", "role": "Morpheus", "image": "" }
    ],
    "crew": [
      { "name": "Lana Wachowski", "role": "Director", "image": "" },
      { "name": "Lilly Wachowski", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 27,
    "title": "The Lion King",
    "year": "1994",
    "duration": "1h 28min",
    "rating": "8.5/10",
    "poster": "https://imgc.allpostersimages.com/img/posters/trends-international-disney-the-lion-king-mufasa-and-simba_u-L-FAAQL30.jpg",
    "genres": ["Animation", "Adventure", "Drama"],
    "plot": "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",  
    "cast": [
      { "name": "Matthew Broderick", "role": "Adult Simba", "image": "" },
      { "name": "Jeremy Irons", "role": "Scar", "image": "" }
    ],
    "crew": [
      { "name": "Roger Allers", "role": "Director", "image": "" },
      { "name": "Rob Minkoff", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 28,
    "title": "Back to the Future",
    "year": "1985",
    "duration": "1h 56min",
    "rating": "8.5/10",
    "poster": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Back_to_the_Future.jpg/250px-Back_to_the_Future.jpg",
    "genres": ["Adventure", "Comedy", "Sci-Fi"],
    "plot": "Marty McFly, a teenager, is accidentally sent 30 years into the past in a time‑traveling DeLorean invented by his eccentric scientist friend Doc Brown.",  
    "cast": [
      { "name": "Michael J. Fox", "role": "Marty McFly", "image": "" },
      { "name": "Christopher Lloyd", "role": "Dr. Emmett Brown", "image": "" }
    ],
    "crew": [
      { "name": "Robert Zemeckis", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
  },
  {
    "id": 29,
    "title": "Guardians of the Galaxy",
    "year": "2014",
    "duration": "2h 1min",
    "rating": "8.0/10",
    "poster": "https://m.media-amazon.com/images/M/MV5BM2ZmNjQ2MzAtNDlhNi00MmQyLWJhZDMtNmJiMjFlOWY4MzcxXkEyXkFqcGc@._V1_.jpg",
    "genres": ["Action", "Adventure", "Sci-Fi"],
    "plot": "A group of intergalactic criminals must pull together to stop a powerful villain from destroying the universe.",  
    "cast": [
      { "name": "Chris Pratt", "role": "Peter Quill / Star‑Lord", "image": "" },
      { "name": "Zoe Saldana", "role": "Gamora", "image": "" }
    ],
    "crew": [
      { "name": "James Gunn", "role": "Director", "image": "" }
    ],
    "reviews": [],
    "discussions": []
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