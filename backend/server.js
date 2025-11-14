require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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
    // Ensure verification columns exist
    ensureVerificationColumns();
});

// Create Nodemailer transporter using env vars (Gmail SMTP recommended)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS // App password for Gmail
    }
});

function ensureVerificationColumns() {
    const schemaQuery = `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = ?`;
    const addIsVerified = `ALTER TABLE users ADD COLUMN is_verified TINYINT(1) NOT NULL DEFAULT 0`;
    const addToken = `ALTER TABLE users ADD COLUMN verification_token VARCHAR(255)`;
    const addExpires = `ALTER TABLE users ADD COLUMN verification_expires DATETIME`;

    db.query(schemaQuery, ['is_verified'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addIsVerified, (e) => { if (e) console.error('Could not add is_verified column', e); else console.log('Added is_verified column'); });
        }
    });
    db.query(schemaQuery, ['verification_token'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addToken, (e) => { if (e) console.error('Could not add verification_token column', e); else console.log('Added verification_token column'); });
        }
    });
    db.query(schemaQuery, ['verification_expires'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addExpires, (e) => { if (e) console.error('Could not add verification_expires column', e); else console.log('Added verification_expires column'); });
        }
    });
}

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

            const verificationToken = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
            const updateQuery = 'UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?';
            db.query(updateQuery, [verificationToken, expires, results.insertId], (uErr) => {
                if (uErr) {
                    console.error('Error saving verification token', uErr);
                }

                // Send verification email
                const verifyUrl = `${process.env.BASE_URL || ('http://localhost:' + (process.env.PORT || 3000))}/api/verify?token=${verificationToken}`;
                const mailOptions = {
                    from: process.env.SMTP_FROM || process.env.SMTP_USER,
                    to: email,
                    subject: 'Verify your Cinematics email',
                    html: `<p>Hi ${username},</p><p>Thank you for registering. Please confirm your email by clicking the link below:</p><p><a href="${verifyUrl}">Verify email</a></p><p>This link expires in 24 hours.</p>`
                };

                transporter.sendMail(mailOptions, (mailErr, info) => {
                    if (mailErr) {
                        console.error('Error sending verification email', mailErr);
                        return res.status(500).json({ error: 'User created but failed to send verification email' });
                    }
                    return res.status(201).json({ success: true, message: 'Verification email sent' });
                });
            });
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
            if (!user.is_verified) return res.status(403).json({ error: 'Email not verified' });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'your-secret-key');
            res.json({ token });
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify endpoint - user clicks email link
app.get('/api/verify', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(400).send('Invalid verification link');

    const query = 'SELECT * FROM users WHERE verification_token = ? AND verification_expires > NOW()';
    db.query(query, [token], (err, results) => {
        if (err) return res.status(500).send('Server error');
        if (results.length === 0) return res.status(400).send('Verification link is invalid or expired');

        const user = results[0];
        const update = 'UPDATE users SET is_verified = 1, verification_token = NULL, verification_expires = NULL WHERE id = ?';
        db.query(update, [user.id], (uErr) => {
            if (uErr) return res.status(500).send('Server error');
            // Redirect to frontend login page with a success flag
            const frontend = process.env.FRONTEND_BASE_URL || (process.env.BASE_URL || ('http://localhost:' + (process.env.PORT || 3000)));
            return res.redirect(`${frontend}/login.html?verified=1`);
        });
    });
});

// Resend verification email
app.post('/api/resend-verification', (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = results[0];
        if (user.is_verified) return res.status(400).json({ error: 'User already verified' });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const updateQuery = 'UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?';
        db.query(updateQuery, [verificationToken, expires, user.id], (uErr) => {
            if (uErr) return res.status(500).json({ error: 'Server error' });

            const verifyUrl = `${process.env.BASE_URL || ('http://localhost:' + (process.env.PORT || 3000))}/api/verify?token=${verificationToken}`;
            const mailOptions = {
                from: process.env.SMTP_FROM || process.env.SMTP_USER,
                to: email,
                subject: 'Verify your Cinematics email',
                html: `<p>Hi ${user.username},</p><p>Please confirm your email by clicking the link below:</p><p><a href="${verifyUrl}">Verify email</a></p><p>This link expires in 24 hours.</p>`
            };

            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Error sending verification email', mailErr);
                    return res.status(500).json({ error: 'Failed to send verification email' });
                }
                return res.json({ success: true, message: 'Verification email resent' });
            });
        });
    });
});

// Endpoint to get current user info
app.get('/api/me', authenticateToken, (req, res) => {
    const query = 'SELECT id, username, email FROM users WHERE id = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    });
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

// Update username
app.post('/api/update-username', authenticateToken, (req, res) => {
    const { username } = req.body;
    const q = "UPDATE users SET username = ? WHERE id = ?";
    db.query(q, [username, req.user.id], (err) => {
        if (err) return res.status(500).json({ error: "Server error" });
        res.json({ success: true });
    });
});

// Change password
app.post('/api/update-password', authenticateToken, (req, res) => {
    const { old_password, new_password } = req.body;

    db.query("SELECT password FROM users WHERE id = ?", [req.user.id], async (err, rows) => {
        if (err || rows.length === 0)
            return res.status(500).json({ error: "Server error" });

        const valid = await bcrypt.compare(old_password, rows[0].password);
        if (!valid) return res.status(400).json({ error: "Incorrect old password" });

        const newHash = await bcrypt.hash(new_password, 10);
        db.query("UPDATE users SET password = ? WHERE id = ?", [newHash, req.user.id]);

        res.json({ success: true });
    });
});
