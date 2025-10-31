require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cinematics_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to database');
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Auth routes
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Error creating user' });
            }

            const token = jwt.sign({ id: results.insertId, email }, process.env.JWT_SECRET || 'your-secret-key');
            res.status(201).json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Server error' });
            if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

            const user = results[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'your-secret-key');
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Movie routes
app.get('/api/movies', (req, res) => {
    const query = 'SELECT * FROM movies';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching movies' });
        res.json(results);
    });
});

app.get('/api/movies/:id', (req, res) => {
    const query = 'SELECT * FROM movies WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching movie' });
        if (results.length === 0) return res.status(404).json({ error: 'Movie not found' });
        res.json(results[0]);
    });
});

// Reviews routes
app.post('/api/movies/:id/reviews', authenticateToken, (req, res) => {
    const { rating, content } = req.body;
    const query = 'INSERT INTO reviews (movie_id, user_id, rating, content) VALUES (?, ?, ?, ?)';
    db.query(query, [req.params.id, req.user.id, rating, content], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error creating review' });
        res.status(201).json({ id: results.insertId });
    });
});

app.get('/api/movies/:id/reviews', (req, res) => {
    const query = `
        SELECT r.*, u.username 
        FROM reviews r 
        JOIN users u ON r.user_id = u.id 
        WHERE r.movie_id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching reviews' });
        res.json(results);
    });
});

// Watchlist routes
app.post('/api/watchlist', authenticateToken, (req, res) => {
    const { movie_id } = req.body;
    const query = 'INSERT INTO watchlist (user_id, movie_id) VALUES (?, ?)';
    db.query(query, [req.user.id, movie_id], (err) => {
        if (err) return res.status(500).json({ error: 'Error adding to watchlist' });
        res.status(201).json({ message: 'Added to watchlist' });
    });
});

app.get('/api/watchlist', authenticateToken, (req, res) => {
    const query = `
        SELECT m.* 
        FROM movies m 
        JOIN watchlist w ON m.id = w.movie_id 
        WHERE w.user_id = ?
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching watchlist' });
        res.json(results);
    });
});

// Discussion routes
app.post('/api/movies/:id/discussions', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const query = 'INSERT INTO discussions (movie_id, user_id, title, content) VALUES (?, ?, ?, ?)';
    db.query(query, [req.params.id, req.user.id, title, content], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error creating discussion' });
        res.status(201).json({ id: results.insertId });
    });
});

app.get('/api/movies/:id/discussions', (req, res) => {
    const query = `
        SELECT d.*, u.username 
        FROM discussions d 
        JOIN users u ON d.user_id = u.id 
        WHERE d.movie_id = ?
    `;
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching discussions' });
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});