// =======================
// CONFIG
// =======================

// Change ONLY this if backend is hosted somewhere else
const API_BASE = "http://localhost:3000";


// =======================
// DOM Elements
// =======================

const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');


// =======================
// Show Register Form IF Coming From "Register" Button
// =======================

function checkAndShowRegisterForm() {
    const showRegister = localStorage.getItem('showRegisterForm');

    if (showRegister === 'true') {
        localStorage.removeItem('showRegisterForm');

        authTabs.forEach(t => t.classList.remove('active'));

        const registerTab = document.querySelector('[data-tab="register"]');
        registerTab.classList.add('active');

        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', checkAndShowRegisterForm);


// =======================
// Tab Switching
// =======================

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


// =======================
// LOGIN FUNCTIONALITY
// =======================

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    try {
        const res = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            showError(loginForm, data.error || "Login failed");
            return;
        }

        // Save token
        localStorage.setItem('token', data.token);

        // Fetch user info
        const meRes = await fetch(`${API_BASE}/api/me`, {
            headers: { "Authorization": `Bearer ${data.token}` }
        });

        if (meRes.ok) {
            const user = await meRes.json();
            localStorage.setItem('user', JSON.stringify(user));
        }

        // Redirect
        window.location.href = "index.html";

    } catch (error) {
        showError(loginForm, "Network error. Please try again.");
    }
});


// =======================
// REGISTER FUNCTIONALITY
// =======================

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPass) {
        showError(registerForm, "Passwords do not match");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            showError(registerForm, data.error || "Registration failed");
            return;
        }

        // Success Message
        const msg = document.createElement('div');
        msg.className = 'form-success';
        msg.textContent = "Registration successful! Check your email for verification.";
        registerForm.appendChild(msg);

        // Switch to login tab
        authTabs.forEach(t => t.classList.remove('active'));
        const loginTab = document.querySelector('[data-tab="login"]');
        loginTab.classList.add('active');

        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';

    } catch (error) {
        showError(registerForm, "Network error. Please try again.");
    }
});


// =======================
// Helper: Show Error Messages
// =======================

function showError(form, message) {
    const oldError = form.querySelector('.form-error');
    if (oldError) oldError.remove();

    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
}


// =======================
// AUTO-REDIRECT IF ALREADY LOGGED IN
// =======================

try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
        window.location.href = "index.html";
    }
} catch (err) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}
