// =======================
// CONFIG - Match your backend URL
// =======================
const API_BASE = "http://localhost:3001"; // 

// =======================
// Check Authentication
// =======================
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// =======================
// Load Profile Data
// =======================
async function loadProfile() {
    try {
        const res = await fetch(`${API_BASE}/api/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
            console.error('Failed to load profile, status:', res.status);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "login.html";
            return;
        }

        const user = await res.json();
        console.log('Profile loaded:', user);
        
        document.getElementById("profileInfo").innerHTML = `
            <strong>Username:</strong> ${user.username}
            <strong>Email:</strong> ${user.email}
        `;

        document.getElementById("editUsername").value = user.username;
    } catch (error) {
        console.error('Error loading profile:', error);
        showMsg("Failed to load profile. Please try again.", "error");
    }
}

loadProfile();

// =======================
// Message Display
// =======================
const msgBox = document.getElementById("msg");

function showMsg(text, type = "success") {
    msgBox.innerHTML = `<div class="${type === "success" ? "success-msg" : "error-msg"}">${text}</div>`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        msgBox.innerHTML = "";
    }, 3000);
}

// =======================
// Update Username
// =======================
document.getElementById("saveUsername").onclick = async () => {
    const newName = document.getElementById("editUsername").value.trim();
    
    if (!newName) {
        return showMsg("Username cannot be empty", "error");
    }

    if (newName.length < 3) {
        return showMsg("Username must be at least 3 characters", "error");
    }

    try {
        const res = await fetch(`${API_BASE}/api/update-username`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ username: newName })
        });

        const data = await res.json();

        if (!res.ok) {
            return showMsg(data.error || "Failed to update username", "error");
        }

        showMsg("Username updated successfully!");
        
        // Update localStorage
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        user.username = newName;
        localStorage.setItem('user', JSON.stringify(user));
        
        loadProfile();
    } catch (error) {
        console.error('Error updating username:', error);
        showMsg("Network error. Please try again.", "error");
    }
};

// =======================
// Change Password
// =======================
document.getElementById("savePassword").onclick = async () => {
    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;

    if (!oldPass || !newPass) {
        return showMsg("Enter both old and new password", "error");
    }

    if (newPass.length < 6) {
        return showMsg("New password must be at least 6 characters", "error");
    }

    try {
        const res = await fetch(`${API_BASE}/api/update-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ old_password: oldPass, new_password: newPass })
        });

        const data = await res.json();

        if (!res.ok) {
            return showMsg(data.error || "Password update failed", "error");
        }

        showMsg("Password updated successfully!");
        
        // Clear password fields
        document.getElementById("oldPassword").value = "";
        document.getElementById("newPassword").value = "";
    } catch (error) {
        console.error('Error updating password:', error);
        showMsg("Network error. Please try again.", "error");
    }
};

// =======================
// Logout
// =======================
document.getElementById("logoutBtn").onclick = () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "index.html";
    }
};

// =======================
// Debug Info (Remove in production)
// =======================
console.log('Profile page loaded');
console.log('API Base:', API_BASE);
console.log('Token exists:', !!token);