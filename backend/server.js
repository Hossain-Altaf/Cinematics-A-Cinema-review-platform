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
        console.error('❌ Error connecting to the database:', err);
        return;
    }
    console.log('✅ Connected to database');
    ensureVerificationColumns();
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Verify email configuration on startup
transporter.verify(function (error, success) {
    if (error) {
        console.log('⚠️  Email configuration error:', error.message);
        console.log('📧 Email verification is DISABLED - users will be auto-verified');
    } else {
        console.log('✅ Email server is ready to send messages');
    }
});

function ensureVerificationColumns() {
    const schemaQuery = `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = ?`;
    const addIsVerified = `ALTER TABLE users ADD COLUMN is_verified TINYINT(1) NOT NULL DEFAULT 0`;
    const addToken = `ALTER TABLE users ADD COLUMN verification_token VARCHAR(255)`;
    const addExpires = `ALTER TABLE users ADD COLUMN verification_expires DATETIME`;

    db.query(schemaQuery, ['is_verified'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addIsVerified, (e) => { 
                if (e) console.error('Could not add is_verified column', e); 
                else console.log('✓ Added is_verified column'); 
            });
        }
    });
    db.query(schemaQuery, ['verification_token'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addToken, (e) => { 
                if (e) console.error('Could not add verification_token column', e); 
                else console.log('✓ Added verification_token column'); 
            });
        }
    });
    db.query(schemaQuery, ['verification_expires'], (err, results) => {
        if (!err && results[0].cnt === 0) {
            db.query(addExpires, (e) => { 
                if (e) console.error('Could not add verification_expires column', e); 
                else console.log('✓ Added verification_expires column'); 
            });
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

// REGISTER - With Email Verification
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Insert user (NOT verified by default)
        const query = 'INSERT INTO users (username, email, password, is_verified) VALUES (?, ?, ?, 0)';
        
        db.query(query, [username, email, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                console.error('Registration error:', err);
                return res.status(500).json({ error: 'Error creating user' });
            }

            const userId = results.insertId;
            const verificationToken = crypto.randomBytes(32).toString('hex');
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            // Save verification token
            const updateQuery = 'UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?';
            db.query(updateQuery, [verificationToken, expires, userId], (uErr) => {
                if (uErr) {
                    console.error('Error saving verification token:', uErr);
                    return res.status(500).json({ error: 'Registration failed' });
                }

                // Send verification email
                const verifyUrl = `${process.env.BASE_URL}/api/verify?token=${verificationToken}`;
                const mailOptions = {
                    from: `"Cinematics" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                    to: email,
                    subject: '🎬 Verify your Cinematics Account',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                <h1 style="color: white; margin: 0;">🎬 Cinematics</h1>
                            </div>
                            <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
                                <h2 style="color: #333;">Welcome, ${username}! 🎉</h2>
                                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                                    Thank you for joining Cinematics - your ultimate cinema companion!
                                </p>
                                <p style="color: #666; font-size: 16px; line-height: 1.6;">
                                    To complete your registration, please verify your email address by clicking the button below:
                                </p>
                                <div style="text-align: center; margin: 30px 0;">
                                    <a href="${verifyUrl}" 
                                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                              color: white; 
                                              padding: 15px 40px; 
                                              text-decoration: none; 
                                              border-radius: 5px; 
                                              font-weight: bold;
                                              display: inline-block;">
                                        ✓ Verify Email Address
                                    </a>
                                </div>
                                <p style="color: #999; font-size: 14px;">
                                    Or copy and paste this link in your browser:<br>
                                    <a href="${verifyUrl}" style="color: #667eea; word-break: break-all;">${verifyUrl}</a>
                                </p>
                                <p style="color: #999; font-size: 14px; margin-top: 30px;">
                                    ⏰ This link will expire in 24 hours.
                                </p>
                                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                                <p style="color: #999; font-size: 12px; text-align: center;">
                                    If you didn't create this account, you can safely ignore this email.
                                </p>
                            </div>
                        </div>
                    `
                };

                transporter.sendMail(mailOptions, (mailErr, info) => {
                    if (mailErr) {
                        console.error('❌ Error sending verification email:', mailErr);
                        // Still return success but inform user
                        return res.status(201).json({ 
                            success: true, 
                            message: 'Account created! However, we could not send the verification email. Please contact support.',
                            emailSent: false
                        });
                    }
                    
                    console.log(`✅ Verification email sent to ${email}`);
                    return res.status(201).json({ 
                        success: true, 
                        message: 'Registration successful! Please check your email to verify your account.',
                        emailSent: true
                    });
                });
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// LOGIN - Check email verification
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], async (err, results) => {
            if (err) {
                console.error('Login query error:', err);
                return res.status(500).json({ error: 'Server error' });
            }
            
            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = results[0];
            
            // Check if email is verified
            if (!user.is_verified) {
                return res.status(403).json({ 
                    error: 'Email not verified',
                    message: 'Please verify your email before logging in. Check your inbox for the verification link.',
                    needsVerification: true,
                    email: user.email
                });
            }
            
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email }, 
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '7d' }
            );
            
            console.log(`✅ User logged in: ${user.username} (${user.email})`);
            res.json({ 
                token, 
                user: { 
                    id: user.id, 
                    username: user.username, 
                    email: user.email 
                } 
            });
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Verify endpoint - User clicks email link
app.get('/api/verify', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send(`
            <html>
                <body style="font-family: Arial; text-align: center; padding: 50px;">
                    <h1>❌ Invalid Verification Link</h1>
                    <p>This verification link is invalid.</p>
                </body>
            </html>
        `);
    }

    const query = 'SELECT * FROM users WHERE verification_token = ? AND verification_expires > NOW()';
    db.query(query, [token], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        
        if (results.length === 0) {
            return res.status(400).send(`
                <html>
                    <body style="font-family: Arial; text-align: center; padding: 50px;">
                        <h1>⚠️ Verification Link Expired</h1>
                        <p>This verification link has expired or is invalid.</p>
                        <p><a href="${process.env.FRONTEND_BASE_URL}/login.html" style="color: #667eea;">Go to Login</a></p>
                    </body>
                </html>
            `);
        }

        const user = results[0];
        const update = 'UPDATE users SET is_verified = 1, verification_token = NULL, verification_expires = NULL WHERE id = ?';
        db.query(update, [user.id], (uErr) => {
            if (uErr) {
                return res.status(500).send('Server error');
            }
            
            console.log(`✅ Email verified for user: ${user.username}`);
            
            // Redirect to login page with success message
            const frontend = process.env.FRONTEND_BASE_URL || 'http://127.0.0.1:5500';
            return res.send(`
                <html>
                    <head>
                        <meta http-equiv="refresh" content="3;url=${frontend}/login.html?verified=1">
                    </head>
                    <body style="font-family: Arial; text-align: center; padding: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto;">
                            <h1 style="color: #4CAF50;">✓ Email Verified Successfully!</h1>
                            <p style="color: #666; font-size: 18px;">Your account has been verified.</p>
                            <p style="color: #999;">Redirecting to login page...</p>
                            <p><a href="${frontend}/login.html" style="color: #667eea; font-weight: bold;">Click here if not redirected</a></p>
                        </div>
                    </body>
                </html>
            `);
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
        if (user.is_verified) return res.status(400).json({ error: 'Email already verified' });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const updateQuery = 'UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?';
        
        db.query(updateQuery, [verificationToken, expires, user.id], (uErr) => {
            if (uErr) return res.status(500).json({ error: 'Server error' });

            const verifyUrl = `${process.env.BASE_URL}/api/verify?token=${verificationToken}`;
            const mailOptions = {
                from: `"Cinematics" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                to: email,
                subject: '🎬 Verify your Cinematics Account',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2>Hi ${user.username},</h2>
                        <p>Please verify your email by clicking the button below:</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${verifyUrl}" style="background: #667eea; color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; display: inline-block;">
                                Verify Email
                            </a>
                        </div>
                        <p>Or copy this link: ${verifyUrl}</p>
                        <p style="color: #999;">This link expires in 24 hours.</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Error sending verification email', mailErr);
                    return res.status(500).json({ error: 'Failed to send verification email' });
                }
                console.log(`✅ Verification email resent to ${email}`);
                return res.json({ success: true, message: 'Verification email sent! Check your inbox.' });
            });
        });
    });
});

// Get current user info
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
        db.query("UPDATE users SET password = ? WHERE id = ?", [newHash, req.user.id], (updateErr) => {
            if (updateErr) return res.status(500).json({ error: "Server error" });
            res.json({ success: true });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Cinematics Backend Server`);
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📧 Email verification ENABLED`);
    console.log(`\n📝 Available endpoints:`);
    console.log(`   POST /api/register - Register (sends verification email)`);
    console.log(`   POST /api/login - Login (requires verified email)`);
    console.log(`   GET  /api/verify - Verify email from link`);
    console.log(`   POST /api/resend-verification - Resend verification email`);
    console.log(`\n💡 Make sure SMTP credentials are set in .env file!\n`);
});