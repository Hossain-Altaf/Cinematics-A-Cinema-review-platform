// Redirect if not logged in
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// Get profile data
async function loadProfile() {
    const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "login.html";
        return;
    }

    const user = await res.json();
    document.getElementById("profileInfo").innerHTML = `
        <strong>Username:</strong> ${user.username}
        <strong>Email:</strong> ${user.email}
    `;

    document.getElementById("editUsername").value = user.username;
}

loadProfile();

const msgBox = document.getElementById("msg");

function showMsg(text, type = "success") {
    msgBox.innerHTML =
        `<div class="${type === "success" ? "success-msg" : "error-msg"}">${text}</div>`;
}

// Update username
document.getElementById("saveUsername").onclick = async () => {
    const newName = document.getElementById("editUsername").value.trim();
    if (!newName) return showMsg("Username cannot be empty", "error");

    const res = await fetch("/api/update-username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ username: newName })
    });

    if (!res.ok) return showMsg("Failed to update username", "error");

    showMsg("Username updated!");
    loadProfile();
};

// Change password
document.getElementById("savePassword").onclick = async () => {
    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;

    if (!oldPass || !newPass) {
        return showMsg("Enter both old and new password", "error");
    }

    const res = await fetch("/api/update-password", {
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

    showMsg("Password updated!");
};

// Logout
document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "index.html";
};
