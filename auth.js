// =======================
// CONFIG
// =======================
const API_BASE = "http://localhost:3001"; // Update if your server is on different port

// =======================
// DOM Elements
// =======================
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// =======================
// Check for verification success
// =======================
function checkVerificationStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('verified') === '1') {
        showSuccess(loginForm, "✓ Email verified successfully! You can now login.");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

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

document.addEventListener('DOMContentLoaded', () => {
    checkAndShowRegisterForm();
    checkVerificationStatus();
});

// =======================
// Tab Switching
// =======================
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        clearMessages();
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
    
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showError(loginForm, "Please fill in all fields");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            // Handle email not verified
            if (data.needsVerification) {
                showError(loginForm, "📧 " + data.message);
                showResendButton(loginForm, data.email);
            } else {
                showError(loginForm, data.error || "Login failed");
            }
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
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

        showSuccess(loginForm, "✓ Login successful! Redirecting...");
        
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {
        console.error('Login error:', error);
        showError(loginForm, "Network error. Please check your connection and try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// =======================
// REGISTER FUNCTIONALITY
// =======================
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = registerForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';

    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPass = document.getElementById('confirmPassword').value.trim();

    // Validation
    if (!username || !email || !password || !confirmPass) {
        showError(registerForm, "Please fill in all fields");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }

    if (username.length < 3) {
        showError(registerForm, "Username must be at least 3 characters long");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }

    if (password.length < 6) {
        showError(registerForm, "Password must be at least 6 characters long");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        return;
    }

    if (password !== confirmPass) {
        showError(registerForm, "Passwords do not match");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
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
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        // Clear form
        registerForm.reset();

        // Success Message
        if (data.emailSent) {
            showSuccess(registerForm, `
                ✓ Registration successful! <br>
                📧 We've sent a verification email to <strong>${email}</strong>.<br>
                Please check your inbox and click the verification link.
            `);
        } else {
            showSuccess(registerForm, "✓ " + data.message);
        }

        // Don't auto-switch - let user read the message
        submitBtn.disabled = false;
        submitBtn.textContent = "Registered! Check Your Email";
        
    } catch (error) {
        console.error('Registration error:', error);
        showError(registerForm, "Network error. Please check your connection and try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});

// =======================
// RESEND VERIFICATION EMAIL
// =======================
async function resendVerification(email) {
    try {
        const res = await fetch(`${API_BASE}/api/resend-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (res.ok) {
            showSuccess(loginForm, "✓ Verification email sent! Please check your inbox.");
        } else {
            showError(loginForm, data.error || "Failed to send verification email");
        }
    } catch (error) {
        showError(loginForm, "Network error. Please try again.");
    }
}

// =======================
// Helper: Show Resend Button
// =======================
function showResendButton(form, email) {
    const existingBtn = form.querySelector('.resend-verification-btn');
    if (existingBtn) return;

    const resendBtn = document.createElement('button');
    resendBtn.type = 'button';
    resendBtn.className = 'resend-verification-btn';
    resendBtn.textContent = '📧 Resend Verification Email';
    resendBtn.style.cssText = `
        margin-top: 10px;
        width: 100%;
        padding: 10px;
        background: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
    `;
    resendBtn.onclick = () => {
        resendBtn.disabled = true;
        resendBtn.textContent = 'Sending...';
        resendVerification(email);
        setTimeout(() => {
            resendBtn.disabled = false;
            resendBtn.textContent = '📧 Resend Verification Email';
        }, 5000);
    };
    
    const errorDiv = form.querySelector('.form-error');
    if (errorDiv) {
        errorDiv.after(resendBtn);
    }
}

// =======================
// Helper: Show Error Messages
// =======================
function showError(form, message) {
    clearMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = message;
    errorDiv.style.cssText = `
        color: #ff4444;
        background-color: rgba(255, 68, 68, 0.1);
        padding: 12px;
        border-radius: 5px;
        margin-top: 10px;
        text-align: center;
        border: 1px solid rgba(255, 68, 68, 0.3);
        line-height: 1.5;
    `;
    form.appendChild(errorDiv);
}

// =======================
// Helper: Show Success Messages
// =======================
function showSuccess(form, message) {
    clearMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = message;
    successDiv.style.cssText = `
        color: #4CAF50;
        background-color: rgba(76, 175, 80, 0.1);
        padding: 12px;
        border-radius: 5px;
        margin-top: 10px;
        text-align: center;
        border: 1px solid rgba(76, 175, 80, 0.3);
        line-height: 1.5;
    `;
    form.appendChild(successDiv);
}

// =======================
// Helper: Clear Messages
// =======================
function clearMessages() {
    document.querySelectorAll('.form-error, .form-success, .resend-verification-btn').forEach(el => el.remove());
}

// =======================
// AUTO-REDIRECT IF ALREADY LOGGED IN
// =======================
try {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
        fetch(`${API_BASE}/api/me`, {
            headers: { "Authorization": `Bearer ${storedToken}` }
        }).then(res => {
            if (res.ok) {
                window.location.href = "index.html";
            } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }).catch(() => {
            // Network error, allow user to stay on login page
        });
    }
} catch (err) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}