const API_BASE_URL = 'http://localhost:3001/api';

class API {
    static async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async register(username, email, password) {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async getMovies() {
        const response = await fetch(`${API_BASE_URL}/movies`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async getMovie(id) {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async getMovieReviews(movieId) {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}/reviews`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async createReview(movieId, rating, content) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ rating, content })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async getMovieDiscussions(movieId) {
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}/discussions`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async createDiscussion(movieId, title, content) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/movies/${movieId}/discussions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async getWatchlist() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/watchlist`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }

    static async addToWatchlist(movieId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ movie_id: movieId })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    }
}