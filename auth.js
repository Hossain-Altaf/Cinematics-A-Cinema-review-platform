// DOM Elements
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Check if we should show register form
function checkAndShowRegisterForm() {
    const showRegister = localStorage.getItem('showRegisterForm');
    if (showRegister === 'true') {
        // Clear the flag
        localStorage.removeItem('showRegisterForm');
        // Show register form
        authTabs.forEach(t => t.classList.remove('active'));
        const registerTab = document.querySelector('[data-tab="register"]');
        if (registerTab) {
            registerTab.classList.add('active');
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
        }
    }
}

// Tab switching logic
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        if (tab.dataset.tab === 'login') {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
        }
    });
});

// Check for register form display when page loads
document.addEventListener('DOMContentLoaded', checkAndShowRegisterForm);

// Login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        // Call backend login endpoint
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) {
            // If not verified, backend sends 403 with message
            showError(loginForm, data.error || 'Login failed');
            return;
        }

        // Save token and fetch user info
        localStorage.setItem('token', data.token);
        const meRes = await fetch('/api/me', { headers: { 'Authorization': `Bearer ${data.token}` } });
        if (meRes.ok) {
            const user = await meRes.json();
            localStorage.setItem('user', JSON.stringify(user));
        }
        window.location.href = 'index.html';
    } catch (error) {
        showError(loginForm, 'An error occurred. Please try again.');
    }
});

// Register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPass = document.getElementById('confirmPassword').value;

    if (password !== confirmPass) {
        showError(registerForm, 'Passwords do not match');
        return;
    }

    try {
        // Call backend register endpoint (which will send verification email)
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (!res.ok) {
            showError(registerForm, data.error || 'Registration failed');
            return;
        }

        // Show message asking user to check email for verification
        const msg = document.createElement('div');
        msg.className = 'form-success';
        msg.textContent = 'Registration successful — please check your email to verify your account before logging in.';
        registerForm.appendChild(msg);

        // Switch to login tab after registration
        authTabs.forEach(t => t.classList.remove('active'));
        const loginTab = document.querySelector('[data-tab="login"]');
        if (loginTab) loginTab.classList.add('active');
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
    } catch (error) {
        showError(registerForm, 'An error occurred. Please try again.');
    }
});

// Helper functions
function showError(form, message) {
    const existingError = form.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
}

// Mock API functions (replace these with real API calls)
async function mockLoginAPI(email, password) {
    // Simulating API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // For demo purposes, accept any email/password
            resolve({
                success: true,
                user: {
                    id: 1,
                    username: email.split('@')[0],
                    email: email
                }
            });
        }, 1000);
    });
}

async function mockRegisterAPI(username, email, password) {
    // Simulating API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    id: 1,
                    username: username,
                    email: email
                }
            });
        }, 1000);
    });
}

// Check if user is already logged in (require both user and token)
const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('token');
try {
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    if (parsedUser && storedToken) {
        // If both user and token exist, consider the user logged in
        window.location.href = 'index.html';
    }
} catch (err) {
    // If parsing fails, clear corrupt user data
    localStorage.removeItem('user');
}