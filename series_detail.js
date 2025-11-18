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
        trailerUrl: "https://www.youtube.com/watch?v=HhesaQXLuRY",
        poster: "https://image.tmdb.org/t/p/original/jzBJ8N4GrtOJJSv5WNOf3BckuD7.jpg",
        genres: ["Crime", "Drama", "Thriller"],
        plot: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
        cast: [
            { name: "Bryan Cranston", role: "Walter White", image: "https://image.tmdb.org/t/p/original/kNyTXGkiSP8W4Gs60hF7UoxZnWN.jpg" },
            { name: "Aaron Paul", role: "Jesse Pinkman", image: "https://image.tmdb.org/t/p/original/3lAme5nldOZT60LEH6ivsXVMHYp.jpg" }
        ],
        crew: [{ name: "Vince Gilligan", role: "Creator", image: "https://image.tmdb.org/t/p/original/uFh3OrBvkwKSU3N5y0XnXOhqBJz.jpg" }],
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
        poster: "https://image.tmdb.org/t/p/original/v540zpevUheui5GWdJeQW6PfMk2.jpg",
        genres: ["Action", "Adventure", "Drama", "Fantasy"],
        plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
        cast: [
            { name: "Emilia Clarke", role: "Daenerys Targaryen", image: "https://www.themoviedb.org/t/p/original/2rnAc7fAvbjgggOWvH9nqfMpCYc.jpg" },
            { name: "Kit Harington", role: "Jon Snow", image: "https://image.tmdb.org/t/p/original/wWTG27LBVTuHhIZ96aJcrkHuy8Z.jpg" },

             { name: "Peter Dinklage", role: "Tyrion Lannister", image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTWXJtvz-euAdfGzvlWADWJgKYjW-djNM4arPoqJEmQSgGUgzOSXvWgB7gfy1bxUoDkuHk8TNpGgs8zmm6_dLjeRHknHiQQ7Ce834BdgZj-yXuHoY-N3GKiy-e6v9VDHHk9ak6yZbskDEWZ&s=19" },
            { name: "Lena Headey", role: "Cersei Lannister", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmxaJc08QDuXGDsMT1BumhNQjnTtV95vpibFoxYUBP5CvVE1fq650cNQ22UEEyh-4t7gRO4422SjMv4MWXq9kWXgNQ3lxqcUo2mgRltvV&s=10" },
            { name: "Sophie Turner", role: "Sansa Stark", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGo1enBaIRuAPYBVrMcuzR3bmRJ1K7veOKiR8UO8yOKV5pFoB1V8Eyadv0l7ncIfKdF__RsIilzMt6MABbwuk9QXwfpmFHmSchsdfEFs1ACQ&s=10" },
            { name: "Maisie Williams", role: "Arya Stark", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7hpH_wZZNW4kM6w3L_fuXj_9I6Ko4pnwJo5zXzI4LbbEfI5CwdtcEgzVcvJRSama4KR8gMSaGgcHNR5rosFyux47jpIrHDzpOigEAtf6D2g&s=10" },
            { name: "Nikolaj Coster-Waldau", role: "Jaime Lannister", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0oKoHAcWna80RlgG68REfFpfIavGG4BQE51GMLDy_c9Tks07EYAPR3JPKt1dO_qUX66uZXx4atZdTEKzZ6TtdRmY1Na9uYkLJlAes-F14&s=10" },
            { name: "Sean Bean", role: "Eddard Stark", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4CJoDKAk0I9bkIAtbHDK6JDjaEYeVu-o68lqDUp0ypk2lYAikoDy8g3vYxh3ZOrqX3-4e2XBl6FBneD5P-yXGqIN-wvJciMYuzAb2YSdu0w&s=10" },
            { name: "Iain Glen", role: "Jorah Mormont", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqW4flraBFmoDXD1iYzZUZixYJdEopHpdc9jXe98D8LV-7CBHRdxK2VMKrF6Ute6_KD2xvg_KvdRoc1VB0WKKR4BMFAFKgluk3XIWUXPINA&s=10" },
            { name: "Conleth Hill", role: "Varys", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR78U_lo3UJjCDG77u5YWQXqreDxz4poVb3AHSL9e4DkkPuU91MnzZh6I_U3O_X75qaQVQRIRaIUH6Q87b0jTVXPOcdMmKTyNUpqymVtzV1sQ&s=10" },
            { name: "John Bradley", role: "Samwell Tarly", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe0jNdsRVNdt_aUKqmGcBr7cINYxD8bsTmVtPkYtqvU76cEY3DiiIrF1th4QKu_5ywsUREp8pe9i7MUJB70tVuAEU-_6q_R9z9r0oipRQq&s=10" },
            {name:"Alfie Allen", role:"Theon Greyjoy", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYu7XXA0ItMLnPUi_6eeKJl5GWyhSrxghKb7RP_HvRWjQ3IR-07Xvq&s=0"},
            { name: "Carice van Houten", role: "Melisandre", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv_ET6m9ZGG2Jz7QNgWXW1hYUL-EtcEoD3U69ukpxOQGMoyErbON-wxeqh3nzfkuONEKm2tZPACtX_PsEhOpC9Se3NqXXt7rhq-irlkFaxRA&s=10" },
            { name: "Gwendoline Christie", role: "Brienne of Tarth", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq0p_wdfTtISDYrrqd-KBVuC_p7S_H83OQeNS6T8WtD1VFv3XTLOljwLd6uR9OVPx48-ankFs7U0MzntZOcIv5vI9av_JUNGO9n7PmTccT&s=10" },
            { name: "Liam Cunningham", role: "Davos Seaworth", image: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQKS9-MlGv8XhDzRXu11BgCQLjwwsZWqaCsBXTSKHZlfsuqcpquEhJbKTmIOeB0u--lzp4K9K0o5QyvsuWeCcOj__3xOR1U0pbMu5BuQY0A1LwxBnTr8t8tDSBX6wKeUzZOugx55VJcFhBn&s=19" },
            { name: "Natalie Dormer", role: "Margaery Tyrell", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL8xJV9jKRwBcReAdf5mHkDIVEGvC-KZWdbIoFvCbypif3Pt_MOYmCeFg8g_GZok7CfrhtpjP-m_HdgIKcblTUV39imzY4vjRs6Ex8SGeP&s=10" },
            { name: "Rory McCann", role: "Sandor Clegane", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO60mujnZnq-6Xfta4m3pEbqdJh0VBmjMHmNnOUkQ1Ojb4ZzzZB6ZtN_ak9L8qL0lGwhJDFUO0ZNUBH3fJ7JJdrYpuOzI7FgTTkTHlda--0w&s=10" },
            { name:"Padro Pascal", role:"Oberyn Martell", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNJHiFf-NixSxTY8UnBXX_05OKu3jfYDE12Pz8hpARF0R57ROXD_0MR4uaKwElDIwlPwCF59Hsw00LnvZP0_TJMXxik5hIUII3SpoNGJ9&s=10"},
            {name:"Rose Leslie", role:"Ygritte", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTidG4DNX4VYlsp-106VIJotv7ftAdjgA7TiV15jD5J9sfo04Hx6Vg_DgrUqnlziIW3e1At0_tvN5_uhCUsRF-5PD3CXM5k1X7kL4sJNstG&s=10"},
            {name:"Charles dance",role:"Tywin Lannister",image:"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSrjmsnzAlg5MbpIXPCBTJbR8IzQGeQtTNj2I8FrOvM_gO0-Z23pO2HYM8orUnclF814kVXnr7mAPjPoxL3HF2fC6MAJfTjg2db0JU_UrsNwmmnNYKk8cbqgk9D5g-IqOV5yYvykJQr7sPB&s=19"},
            {name:"jason momoa", role:"Khal Drogo", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlqpDJquMYfrNXllXCg1afilMvCqp8hhzCrPnyt-8sHtawu6LZpFBnj25g4Ly7u8UHIi6MjIbqmCj-6XkWtgoIPEseT4l7aY64JTzx68h9cw&s=10"}
           
        ],
        crew: [
            { name: "David Benioff", role: "Creator", image: "https://image.tmdb.org/t/p/original/bOlW8pymCeQLfwPIvc2D1MRcUoF.jpg" },
            { name: "D.B. Weiss", role: "Creator", image: "https://image.tmdb.org/t/p/w500/6Wt006TIQoDSSnl0YaKihfn3w7K.jpg" }
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
        trailerUrl: "https://www.youtube.com/watch?v=PssKpzB0Ah0",
        poster: "https://image.tmdb.org/t/p/original/cVxVGwHce6xnW8UaVUggaPXbmoE.jpg",
        genres: ["Drama", "Fantasy", "Horror", "Mystery"],
        plot: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
        cast: [
            { name: "Millie Bobby Brown", role: "Eleven", image: "https://image.tmdb.org/t/p/original/cQoPC18cHBN1zYTbOy5hbpjZ5ls.jpg" },
            { name: "Finn Wolfhard", role: "Mike Wheeler", image: "https://image.tmdb.org/t/p/original/fMCfuF7OaekBBsPSvzHSPSZgmOZ.jpg" }
        ],
        crew: [
            { name: "The Duffer Brothers", role: "Creators", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ZUiAr9TxBNkx0CllARACiqTn0Z1FQI1ByQ&s" }
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
        poster: "https://image.tmdb.org/t/p/original/nrjxuvdDUOTP0GXsBsVYEH0FcnD.jpg",
        genres: ["Biography", "Drama", "History"],
        plot: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
        cast: [
            { name: "Claire Foy", role: "Queen Elizabeth II", image: "https://image.tmdb.org/t/p/original/3CIyTakCHhiR29jhtvUCGeqWI1J.jpg" },
            { name: "Olivia Colman", role: "Queen Elizabeth II", image: "https://image.tmdb.org/t/p/original/4ZwZ66zXZyX26Kf2wfeMt1tQZQf.jpg" }
        ],
        crew: [{ name: "Peter Morgan", role: "Creator", image: "https://image.tmdb.org/t/p/original/lEh7TWg1iwYMFfbnIREwHh8FEP6.jpg" }],
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
        poster: "https://static.posters.cz/image/750/103406.jpg",
        genres: ["Action", "Adventure", "Sci-Fi"],
        plot: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        cast: [
            { name: "Pedro Pascal", role: "The Mandalorian", image: "https://image.tmdb.org/t/p/original/9VYK7oxcqhjd5LAH6ZFJ3XzOlID.jpg" },
            { name: "Chris Bartlett", role: "Droid Bunty hunter", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFiThkyuAWvHJDRVq3bvu8Q8uP5w5Slqw5ew&s" }
        ],
        crew: [{ name: "Jon Favreau", role: "Creator", image: "https://image.tmdb.org/t/p/w500/tnx7iMVydPQXGOoLsxXl84PXtbA.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 6,
        title: "Money Heist",
        year: "2019-2023",
        duration: "5 Seasons",
        rating: "8.1/10",
        type: "Series",
        poster: "https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
        genres: ["Action", "Crime", "Thriller"],
        plot: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
        cast: [
            { name: "Alvaro Morte ", role: "EI Professor", image: "https://image.tmdb.org/t/p/original/4tqKtUVIMHa5nfmGw4vgHaysrXf.jpg" },
            { name: "Ursula Corbero", role: "Tokyo", image: "https://image.tmdb.org/t/p/original/wfy2YBmaGkH5kl60y3P03tTAMMc.jpg" }
        ],
        crew: [{ name: "Alex Pina", role: "Director", image: "https://image.tmdb.org/t/p/w500/hMKcFPRKo0I4WLBvkvppyBFDGr8.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 7,
        title: "The Witcher",
        year: "2020-Present",
        duration: "4 Seasons",
        rating: "7.5/10",
        type: "Series",
        poster: "https://m.media-amazon.com/images/M/MV5BOTY2Yzk2ZTUtNDIwOS00ZTkzLTkyMmEtMzEyY2U2OTRmNTJkXkEyXkFqcGc@._V1_.jpg",
        genres: ["Action", "Adventure", "Warcraft"],
        plot: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
        cast: [
            { name: "Henry Cavill", role: "Geralt of Rivia", image: "https://image.tmdb.org/t/p/original/hErUwonrQgY5Y7RfxOfv8Fq11MB.jpg" },
            { name: "Anya Chalotra", role: "Yennefer", image: "https://image.tmdb.org/t/p/w500/uF7OzuFm0TEYP8MkaBiQBLjuxUv.jpg" }
        ],
        crew: [{ name: "Alex Garcia Lopez", role: "Director", image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/%28ENTREVISTA%29_Cien_a%C3%B1os_de_soledad%2C_la_serie%2C_por_%C3%81lex_Garc%C3%ADa._4_%28cropped%29.png" }],
        reviews: [],
        discussions: []
    },
    {
        id: 9,
        title: "Dark",
        year: "2016-2019",
        duration: "3 Seasons",
        rating: "8.9/10",
        type: "Series",
        poster: "https://image.tmdb.org/t/p/original/vfcYKbb5yUI1g3k0qLtc385U4EW.jpg",
        genres: ["Thriller", "Adventure", "Sci-Fi","Drama","Mystery"],
        plot: "A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.",
        cast: [
            { name: "Louis Hofmann", role: "Jonas Kahnwald (Teen) / The Stranger (Adult)", image: "https://image.tmdb.org/t/p/original/uu7WRPdcq3zKbrN7rdpSRw2K8xw.jpg" },
            { name: "Lisa Vicari", role: "Martha Nielsen (Teen) / The Female Stranger (Adult)", image: "https://image.tmdb.org/t/p/w500/vgcvazU9vTHBrWacGc5lGKUNECz.jpg" }
        ],
        crew: [{ name: "Baran Bo Odar", role: "Director", image: "https://image.tmdb.org/t/p/w500/3CfxoYPDPgFZ6jJMBOXCO5zhhEQ.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 10,
        title: "Fallout",
        year: "2024-Present",
        duration: "1 Season",
        rating: "8.3/10",
        type: "Series",
        poster: "https://image.tmdb.org/t/p/original/AnsSKR9LuK0T9bAOcPVA3PUvyWj.jpg",
        genres: ["Action", "Adventure", "Thriller","Sci-Fi"],
        plot: "In a future, post-apocalyptic Los Angeles brought about by nuclear decimation, citizens must live in underground bunkers to protect themselves from radiation, mutants and bandits.",
        cast: [
            { name: "Ella Purnell", role: "Lucy Maclean", image: "https://image.tmdb.org/t/p/original/eZB4GA4GtiJGCmyFoNtMihxr1gg.jpg" },
            { name: "Aaron Moten", role: "Maximus", image: "https://image.tmdb.org/t/p/w500/h2CJjnDEy2nCbCy6dWzXLmZ4p47.jpg" }
        ],
        crew: [{ name: "Daniel Gray Longino", role: "Director", image: "https://image.tmdb.org/t/p/w500/r1nYCNbmwTElvvHbSFNpLT1JbuN.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 11,
        title: "Attack on Titan",
        year: "2015-2024",
        duration: "5 Seasons",
        rating: "8.9/10",
        type: "Series",
        poster: "https://media.themoviedb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
        genres: ["Action", "Adventure", "Sci-Fi","Drama","Fantasy","Anime"],
        plot: "After his hometown is destroyed and is traumatized, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans that have brought humanity to the brink of extinction.",
        cast: [
            { name: "Yūki Kaji", role: "Eren Yeager", image: "https://image.tmdb.org/t/p/w500/8wKdPV11IwowfwoqGqMMNt9hmp6.jpg" },
            { name: "Yui Ishikawa", role: "Mikasa Ackerman", image: "https://image.tmdb.org/t/p/original/zptGIN1iklKJL1xrfHKOpxR2qJ9.jpg" }
        ],
        crew: [{ name: "Tetsurō Araki", role: "Director", image: "https://image.tmdb.org/t/p/w500/oEdiTbFLMJDSGUSDe8a48VbueGJ.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 12,
        title: "Better Call Saul",
        year: "2015-2022",
        duration: "5 Seasons",
        rating: "9.0/10",
        type: "Series",
        poster: "https://cdn.europosters.eu/image/750/47519.jpg",
        genres: ["Action", "Adventure", "Crime","Drama","Thriller"],
        plot: "The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.",
        cast: [
            { name: "Bob Odenkirk", role: "Jimmy McGill / Saul Goodman / Gene Takavic", image: "https://image.tmdb.org/t/p/w500/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg" },
            { name: "Rhea Seehorn", role: "Kim Wexler", image: "https://image.tmdb.org/t/p/w500/hXHjyQ1aLrsXt4kYzV5OE7NtYf6.jpg" }
        ],
        crew: [{ name: "Michael Morris", role: "Director", image: "https://media.themoviedb.org/t/p/w235_and_h235_face/2tvHMQ1OcOUxeAMDQPI4cWGwnRo.jpg" }],
        reviews: [],
        discussions: []
    },
    {
        id: 13,
        title: "Dexter",
        year: "2005-2011",
        duration: "7 Seasons",
        rating: "8.7/10",
        type: "Series",
        poster: "https://image.tmdb.org/t/p/original/yxylCqF28NttybWJvQtHztTdDKr.jpg",
        genres: ["Drama", "Crime", "Mystery","Thriller"],
        plot: "He's smart. He's lovable. He's Dexter Morgan, America's favorite serial killer, who spends his days solving crimes and his nights committing them.",
        cast: [
            { name: "Michael C. Hall", role: "Dexter Morgan", image: "https://image.tmdb.org/t/p/original/6xSfiAxMQNHExOmWOxab9id08gv.jpg" },
            { name: "Jennifer Carpenter", role: "Debra Morgan", image: "https://image.tmdb.org/t/p/original/q2Newaws22FnTcRGvK9TrRnvn01.jpg" }
        ],
        crew: [{ name: "John Dall", role: "Director", image: "https://image.tmdb.org/t/p/w500/8WDCi9LJ9Lc7z6BSwGiQqfkSx61.jpg" }],
        reviews: [],
        discussions: []
    },
    {
    id: 14,
    title: "Death Note",
    year: "2006-2007",
    duration: "1 Season (37 Episodes)",
    rating: "8.8/10",
    type: "Series",
    poster: "https://cdn.europosters.eu/image/350/posters/death-note-from-the-shadows-i58005.jpg",
    genres: ["Mystery", "Thriller", "Supernatural", "Crime", "Anime"],
    plot: "A genius high school student discovers a supernatural notebook that allows him to kill anyone by writing their name. As he attempts to create a crime-free world, a mysterious detective known as L challenges him in a deadly battle of wits.",
    cast: [
        { name: "Mamoru Miyano", role: "Light Yagami (Voice)", image: "https://image.tmdb.org/t/p/w500/nuok8ueG7k9hPZ09Tpr8e7Qn0ah.jpg" },
        { name: "Kappei Yamaguchi", role: "L (Voice)", image: "https://image.tmdb.org/t/p/w500/mJyxKRZxLv9D7LH5KcNSkjSKYOB.jpg" }
    ],
    crew: [
        { name: "Tetsurō Araki", role: "Director", image: "https://image.tmdb.org/t/p/w500/oEdiTbFLMJDSGUSDe8a48VbueGJ.jpg" }
    ],
    reviews: [],
    discussions: []
},
    {
    id: 15,
    title: "Panchayat",
    year: "2020-Present",
    duration: "3 Seasons",
    rating: "9.0/10",
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/gRKDEpUPd2pp2msmwdgEW34V0SL.jpg",
    genres: ["Comedy", "Drama"],
    plot: "An engineering graduate reluctantly takes a job as a secretary in a remote village panchayat office. His city-to-village struggle creates humorous and heartwarming moments.",
    cast: [
        { name: "Jitendra Kumar", role: "Abhishek Tripathi", image: "https://image.tmdb.org/t/p/w500/562Mucw9YaDHUlFBqK5aot3H2lJ.jpg" },
        { name: "Sanvikaa", role: "Rinki Dubey", image: "https://image.tmdb.org/t/p/w500/6w4tX0aU1TZBU7j4rhEr3zeLXuV.jpg" }
    ],
    crew: [
        { name: "Deepak Kumar Mishra", role: "Director", image: "https://image.tmdb.org/t/p/original/w3F4JYFoxBBw0LMFsasnj3xx00b.jpg" }
    ],
    reviews: [],
    discussions: []
},

    {
    id: 16,
    title: "Narcos",
    year: "2015-2017",
    duration: "3 Seasons",
    rating: "8.8/10",
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/39zuWDWmY7iag5UwcRwSMoylRAU.jpg",
    genres: ["Crime", "Drama", "Biography", "Thriller"],
    plot: "Narcos chronicles the rise and fall of Colombian drug lord Pablo Escobar and the Medellín Cartel, following DEA agents trying to bring him to justice.",
    cast: [
        { name: "Wagner Moura", role: "Pablo Escobar", image: "https://image.tmdb.org/t/p/w500/yJjV1ZCQbCSSgRy05FncCKjyaY4.jpg" },
        { name: "Pedro Pascal", role: "Javier Peña", image: "https://image.tmdb.org/t/p/original/wROJBhRvazeFl1SIWfzwMcKrYYn.jpg" }
    ],
    crew: [
        { name: "Chris Brancato", role: "Creator", image: "https://image.tmdb.org/t/p/w500/haVVgMyOnU4BSZrA262pUU2xHaA.jpg" }
    ],
    reviews: [],
    discussions: []
},
{
    id: 17,
    title: "Kota Factory",
    year: "2019-Present",
    duration: "2 Seasons",
    rating: "9/10",
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/7Pi6b2gFgwKtxniTqFQNxHPsJQ.jpg",
    genres: ["Drama"],
    plot: "The story follows students in Kota preparing for engineering entrance exams, highlighting the struggles, friendships and pressure of academic competition.",
    cast: [
        { name: "Jitendra Kumar", role: "Jeetu Bhaiya", image: "https://image.tmdb.org/t/p/w500/562Mucw9YaDHUlFBqK5aot3H2lJ.jpg" },
        { name: "Mayur More", role: "Vaibhav Pandey", image: "https://media.themoviedb.org/t/p/w500/rJDNKSQZ8dlp26D8QW3ExKc8abw.jpg" }
    ],
    crew: [
        { name: "Raghav Subbu", role: "Director", image: "https://m.media-amazon.com/images/M/MV5BNDNiYmFlZDMtMTcxMi00OTIzLWI5NDctYWY0YWZiN2I5MDBlXkEyXkFqcGc@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
},
    {
    id: 18,
    title: "Black Mirror",
    year: "2011-Present",
    duration: "6 Seasons",
    rating: "8.7/10",
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/xDsuWOHn5cXsgSMOIP6sSEKQVzr.jpg",
    genres: ["Sci-Fi", "Drama", "Thriller", "Mystery"],
    plot: "An anthology series exploring the dark and unsettling consequences of modern society, technology, and human behavior.",
    cast: [
        { name: "Bryce Dallas Howard", role: "Lacie Pound (Nosedive)", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjIbQoLOiKO8C_mU8uhY7VI-T8_w2RQD1NQ&s" },
        { name: "Daniel Kaluuya", role: "Bing (15 Million Merits)", image: "https://image.tmdb.org/t/p/w500/jj2kZqJobjom36wlhlYhc38nTwN.jpg" }
    ],
    crew: [
        { name: "Charlie Brooker", role: "Creator", image: "https://image.tmdb.org/t/p/original/dFHOuqWO6GOhtm8hdJfNGD7pNx9.jpg" }
    ],
    reviews: [],
    discussions: []
    },
    {
    id: 19,
    title: "Invincible",
    year: "2021-Present",
    duration: "3 Seasons",
    rating: "8.6/10",
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/jBn4LWlgdsf6xIUYhYBwpctBVsj.jpg",
    genres: ["Action", "Superhero", "Sci-Fi", "Drama", "Animation"],
    plot: "A teenager discovers he has inherited superpowers from his father, the world's most powerful superhero. As he learns to use them, he uncovers shocking truths about his family.",
    cast: [
        { name: "Steven Yeun", role: "Mark Grayson / Invincible (Voice)", image: "https://image.tmdb.org/t/p/w500/fOMFO2Xx4duzpNgS9Q5ytO44yGb.jpg" },
        { name: "J.K. Simmons", role: "Omni-Man (Voice)", image: "https://image.tmdb.org/t/p/w500/ScmKoJ9eiSUOthAt1PDNLi8Fkw.jpg" }
    ],
    crew: [
        { name: "Robert Kirkman", role: "Creator", image: "https://media.baselineresearch.com/images/2170127/2170127_small.jpg" }
    ],
    reviews: [],
    discussions: []
},
    {
    id: 20,
    title: "The Boys",
    year: "2019-Present",
    duration: "4 Seasons",
    rating: "8.4/10",
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w220_and_h330_face/zBi4Otjddaa92ecwcNDEIhQFxcl.jpg",
    genres: ["Action", "Superhero", "Drama", "Sci-Fi"],
    plot: "In a world where superheroes abuse their powers, a group of vigilantes known as The Boys fight to expose the truth and bring them down.",
    cast: [
        { name: "Karl Urban", role: "Billy Butcher", image: "https://image.tmdb.org/t/p/w500/7Y96dAfg0HcFrcLjlD5eD9N0uj4.jpg" },
        { name: "Antony Starr", role: "Homelander", image: "https://media.themoviedb.org/t/p/w500/b0T56GMrHM24hDDjJ4DNPJcEUp6.jpg" }
    ],
    crew: [
        { name: "Eric Kripke", role: "Creator", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE34DlU4TPa7ZNA0AaEG8Br4Lqe4KX5VFdtw&s" }
    ],
    reviews: [],
    discussions: []
},
    {
        id: 21,
        title: "The Last Kingdom",
        year: "2015–2022",
        duration: "5 Seasons",
        rating: "8.5/10",
        type: "Series",
        poster: "https://image.tmdb.org/t/p/original/8eJf0hxgIhE6QSxbtuNCekTddy1.jpg",
        genres: ["History", "Action", "Drama", "War"],
        plot: "After his parents are killed by Viking invaders, young Uhtred is raised by Danes and struggles to reclaim his birthright.",
        cast: [
            { name: "Alexander Dreymon", role: "Uhtred of Bebbanburg", image: "https://image.tmdb.org/t/p/original/4widAZ3bxaE6kIMiOWqpQLQWbsT.jpg" },
            { name: "Emily Cox", role: "Brida", image: "https://image.tmdb.org/t/p/w500/vuCvqZKsfoAJSBwThbfGGbPROgv.jpg" }
        ],
        crew: [
            { name: "Stephen Butchard", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BOGZhMWNhYWItNWE3Yi00MTg3LWFiMjktNTJkMmZjOGRkNTU4XkEyXkFqcGc@._V1_.jpg" }
        ],
        reviews: [],
        discussions: []
    },
    {
        id: 22,
        title: "Watchmen",
        year: "2019",
        duration: "1 Season",
        rating: "8.1/10",
        type: "Series",
        poster :"https://image.tmdb.org/t/p/original/qsNIhQiZgUTaDtGDXlX61GcUYCm.jpg",
        genres: ["Drama", "Dystopia", "Superhero"],
        plot: "In an alternate history, superheroes are outlawed and a masked vigilante investigates a conspiracy tied to the past.",
        cast: [
            { name: "Regina King", role: "Angela Abar / Sister Night", image: "https://image.tmdb.org/t/p/w500/fEIz0ljk9CBrp3AitM5nwjfoGVu.jpg" },
            { name: "Jeremy Irons", role: "Adrian Veidt / Ozymandias", image: "https://image.tmdb.org/t/p/w500/w8Ct1q02Ht3sWdOSqfp3B85TzT.jpg" }
        ],
        crew: [
            { name: "Damon Lindelof", role: "Creator", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Damon_Lindelof_by_Gage_Skidmore_3_%28cropped%29.jpg/960px-Damon_Lindelof_by_Gage_Skidmore_3_%28cropped%29.jpg" }
        ],
        reviews: [],
        discussions: []
    }, 
  { 
    id: 23,
    title: "Sacred Games",
    year: "2018–2019",
    duration: "2 Seasons",
    rating: "8.5/10", 
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/mVQ6JFJCAMRLKvsMZdiEeYXC6cp.jpg",
    genres: ["Crime", "Thriller", "Mystery"],
    plot: "A Mumbai cop receives a tip about a crime lord which sets off a chain of events revealing corruption, power, and secrets.",
    cast: [
      { name: "Saif Ali Khan", role: "Sartaj Singh", image: "https://image.tmdb.org/t/p/original/kzOy1DoCeLoKJ07nbYnQDObU3yY.jpg" },
      { name: "Nawazuddin Siddiqui", role: "Ganesh Gaitonde", image: "https://image.tmdb.org/t/p/original/w1eXF7T60QlEC2gNfr99J3n8CgX.jpg" }
    ],
    crew: [
      { name: "Vikramaditya Motwane", role: "Creator / Director", image: "https://image.tmdb.org/t/p/w500/kG5sfFXKOsUMtWUiAOaQhI9xlHX.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  { 
    id: 24,
    title: "Paatal Lok",
    year: "2020–2025",
    duration: "2 Seasons",
    rating: "8.3/10", 
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/bVKoX1AiN1jjUcvC7BkXypJPF2X.jpg",
    genres: ["Crime", "Thriller", "Neo-noir"],
    plot: "A disillusioned cop is assigned to investigate a failed assassination attempt, uncovering a deeper conspiracy rooted in the underworld.",
    cast: [
      { name: "Jaideep Ahlawat", role: "Hathi Ram Chaudhary", image: "https://image.tmdb.org/t/p/w500/uILn4y8EWbMdeu71laMsh8zHY0M.jpg" },
      { name: "Ishwak Singh", role: "Vishal Bhardwaj", image: "https://image.tmdb.org/t/p/w500/iN1QUGzN7c4qBps3xpuWYVzpMag.jpg" }
    ],
    crew: [
      { name: "Sudip Sharma", role: "Creator", image: "https://m.media-amazon.com/images/M/MV5BOTg3MmFlMWEtODZhMy00YTkxLTkzMmMtYTk3OTIzMGQ2YjM2XkEyXkFqcGc@._V1_.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  { 
    id: 25,
    title: "Dept. Q",
    year: "2025–Present",
    duration: "1 Season (so far)",
    rating: "8.2/10", // from IMDb :contentReference[oaicite:1]{index=1}
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w116_and_h174_face/h60alybJNgGGfPUbGGUXMXOoFvB.jpg", // Netflix media center image page, replace with real poster URL
    genres: ["Crime", "Thriller", "Mystery"],
    plot: "A troubled detective leads a basement cold-case unit, solving long-lost mysteries while building a team of misfits.",
    cast: [
      { name: "Matthew Goode", role: "DCI Carl Morck", image: "https://m.media-amazon.com/images/M/MV5BODE1NDJkYjYtOTg5NC00Y2RiLWI5YzktMjU0ZDY1YzNiZjdhXkEyXkFqcGc@._V1_.jpg" },
      { name: "Kelly Macdonald", role: "Rachel Irving", image: "https://image.tmdb.org/t/p/w500/k0yVocTnTMWlNdaeOO7YRViCdhO.jpg" }
    ],
    crew: [
      { name: "Scott Frank", role: "Creator / Writer / Director", image: "https://image.tmdb.org/t/p/w500/xU7fTHyCuWg8cQYyYmZi7Ism5U2.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  { 
    id: 26,
    title: "Vikings",
    year: "2013–2020",
    duration: "6 Seasons",
    rating: "8.5/10", // approximate
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/uU7F9eUQ2YvIR0CBKzSWgNWeFN1.jpg", // sample from IMDb
    genres: ["History", "Action", "Adventure", "Drama"],
    plot: "Follows the sagas of Viking chieftains, exploring Norse mythology, war, and family rivalries.",
    cast: [
      { name: "Travis Fimmel", role: "Ragnar Lothbrok", image: "https://image.tmdb.org/t/p/original/3feVQYAZXNHduKdtw3oMMAnUbQg.jpg" },
      { name: "Katheryn Winnick", role: "Lagertha", image: "https://image.tmdb.org/t/p/w500/vQSqH3ybDWZHZIqX4NZKhOCXAhQ.jpg" }
    ],
    crew: [
      { name: "Michael Hirst", role: "Creator", image: "https://image.tmdb.org/t/p/w500/70lhWPCdSPv7aGpaoAPk9h6sFOR.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  { 
    id: 28,
    title: "Squid Game",
    year: "2021–2025",
    duration: "3 Seasons", // if 3rd confirmed
    rating: "8.0/10", // from IMDb :contentReference[oaicite:2]{index=2}
    type: "Series",
    poster: "https://media.themoviedb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
    genres: ["Thriller", "Drama", "Survival"],
    plot: "Hundreds of cash-strapped contestants compete in deadly versions of childhood games for a tempting but lethal prize.",
    cast: [
      { name: "Lee Jung-jae", role: "Seong Gi-hun", image: "https://image.tmdb.org/t/p/original/3h5Cfm0X8ohWn7psZkqdNWqXAHH.jpg" },
      { name: "Park Hae-soo", role: "Cho Sang-woo", image: "https://media.themoviedb.org/t/p/w235_and_h235_face/hFt7Cj8sx1VYIwm18lYmq5kS7Pw.jpg" }
    ],
    crew: [
      { name: "Hwang Dong-hyuk", role: "Creator", image: "https://image.tmdb.org/t/p/original/4lO4WtP0DdNhriVu5BSBd1RWbtS.jpg" }
    ],
    reviews: [],
    discussions: []
  },
  { 
    id: 29,
    title: "All of Us Are Dead",
    year: "2022–Present",
    duration: "2 Seasons", // approximate
    rating: "7.4/10", // approximate
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/o9cRxGdB0Q9zizgllUiMIbPDB6W.jpg",
    genres: ["Horror", "Thriller", "Zombie"],
    plot: "High school students fight for survival during a zombie outbreak while trapped in their school.",
    cast: [
      { name: "Yoon Chan-young", role: "Lee Cheong-san", image: "https://image.tmdb.org/t/p/w500/7Al19wuV9XnjIiiPlsor3MK84Kx.jpg" },
      { name: "Park Ji-hu", role: "Nam On-jo", image: "https://image.tmdb.org/t/p/w500/bZy15WXLhOflOgtQpICbgeeqzm6.jpg" }
    ],
    crew: [],
    reviews: [],
    discussions: []
  },
  { 
    id: 30,
    title: "Gen V",
    year: "2023–Present",
    duration: "1 Season (so far)",
    rating: "7.5/10", // approximate
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/ongpFhUYuCwwRfOQgUKv5FXcGpO.jpg",
    genres: ["Superhero", "Drama", "Action"],
    plot: "Young superheroes at a college learn to harness their powers, deal with legacy, and face dark conspiracies.",
    cast: [
      { name: "Jaz Sinclair", role: "Marie Moreau", image: "https://image.tmdb.org/t/p/w500/rX1HQCi4cd3O14Q1Pn4AHoksPeD.jpg" },
      { name: "Chance Perdomo", role: "Andre Anderson", image: "https://image.tmdb.org/t/p/w500/xRRDtdHhTewrKMj5cpcmEkPNmuP.jpg" }
    ],
    crew: [],
    reviews: [],
    discussions: []
  },
  { 
    id: 32,
    title: "Ozark",
    year: "2017–2022",
    duration: "4 Seasons",
    rating: "8.4/10", // approx IMDB
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/db8V3MnfG6OZIUzFPTdfdZEMUt1.jpg",
    genres: ["Crime", "Drama", "Thriller"],
    plot: "A financial planner drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.",
    cast: [
      { name: "Jason Bateman", role: "Marty Byrde", image: "https://image.tmdb.org/t/p/w500/8e6mt0vGjPo6eW52gqRuXy5YnfN.jpg" },
      { name: "Laura Linney", role: "Wendy Byrde", image: "https://image.tmdb.org/t/p/w500/ztQXGmNLzhDV22rAvcXzCG4d0cy.jpg" }
    ],
    crew: [],
    reviews: [],
    discussions: []
  },
  { 
    id: 34,
    title: "Loki",
    year: "2021–2023",
    duration: "2 Seasons",
    rating: "8.2/10", // from IMDb :contentReference[oaicite:3]{index=3}
    type: "Series",
    poster: "https://image.tmdb.org/t/p/original/6FWzffD2YgygUayuFf32QGBoAUZ.jpg",
    genres: ["Superhero", "Sci-Fi", "Adventure"],
    plot: "The God of Mischief, Loki, travels through time and realities after escaping with the Tesseract, facing variants of himself and chaos.",
    cast: [
      { name: "Tom Hiddleston", role: "Loki", image: "https://image.tmdb.org/t/p/w500/mclHxMm8aPlCPKptP67257F5GPo.jpg" },
      { name: "Owen Wilson", role: "Mobius M. Mobius", image: "https://image.tmdb.org/t/p/w500/op8sGD20k3EQZLR92XtaHoIbW0o.jpg" }
    ],
    crew: [
      { name: "Michael Waldron", role: "Creator", image: "https://image.tmdb.org/t/p/w500/5hf8B7h92GhSSch0FVNSfWMyEG2.jpg" }
    ],
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
   // Trailer button - Open YouTube trailer
    const watchBtn = document.querySelector(".watch-btn");
    if (watchBtn && movieData && movieData.trailerUrl) {
        watchBtn.addEventListener("click", () => {
            window.open(movieData.trailerUrl, '_blank');
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