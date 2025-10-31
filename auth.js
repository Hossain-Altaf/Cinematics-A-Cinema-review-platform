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
        // Here you would typically make an API call to your backend
        const response = await mockLoginAPI(email, password);
        if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = 'index.html';
        } else {
            showError(loginForm, 'Invalid email or password');
        }
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
        // Here you would typically make an API call to your backend
        const response = await mockRegisterAPI(username, email, password);
        if (response.success) {
            localStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = 'index.html';
        } else {
            showError(registerForm, 'Registration failed. Please try again.');
        }
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

// Check if user is already logged in
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
    window.location.href = 'index.html';
}