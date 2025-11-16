// ---------------------------
// DISCUSSION SECTION LOGIC
// ---------------------------

// Get all discussions for current movie
function loadDiscussions(movieId) {
    const data = localStorage.getItem(`movie_discussions_${movieId}`);
    return data ? JSON.parse(data) : [];
}

// Save discussions
function saveDiscussions(movieId, discussions) {
    localStorage.setItem(`movie_discussions_${movieId}`, JSON.stringify(discussions));
}

// Render discussions list
function renderDiscussions() {
    if (!movieData) return;
    
    const discussionsList = document.getElementById("discussionsList");
    const discussions = loadDiscussions(movieId);
    
    if (discussions.length === 0) {
        discussionsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #888;">
                <p style="font-size: 18px; margin-bottom: 10px;">No discussions yet</p>
                <p style="font-size: 14px;">Be the first to start a conversation!</p>
            </div>
        `;
        return;
    }
    
    // Sort discussions by latest activity
    discussions.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    
    discussionsList.innerHTML = discussions.map(discussion => {
        const totalReplies = discussion.replies ? discussion.replies.length : 0;
        const totalLikes = discussion.likes || 0;
        
        return `
            <div class="discussion-card" data-discussion-id="${discussion.id}">
                <div class="discussion-header">
                    <div class="discussion-user-info">
                        <img src="${discussion.author.avatar}" class="discussion-avatar" alt="${discussion.author.name}">
                        <div>
                            <h3 class="discussion-title">${discussion.title}</h3>
                            <div class="discussion-meta">
                                Started by <strong>${discussion.author.name}</strong> • ${formatDate(discussion.date)}
                            </div>
                        </div>
                    </div>
                </div>
                <p class="discussion-preview">${discussion.content}</p>
                <div class="discussion-actions">
                    <button class="discussion-action-btn like-btn ${discussion.likedBy && discussion.likedBy.includes(getLoggedUser()?.username) ? 'liked' : ''}" 
                            onclick="toggleLike(${discussion.id})">
                        <span class="icon">👍</span> ${totalLikes}
                    </button>
                    <button class="discussion-action-btn" onclick="openDiscussionDetail(${discussion.id})">
                        <span class="icon">💬</span> ${totalReplies} ${totalReplies === 1 ? 'Reply' : 'Replies'}
                    </button>
                    <button class="discussion-action-btn" onclick="openDiscussionDetail(${discussion.id})">
                        <span class="icon">👁️</span> View Discussion
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return date.toLocaleDateString();
}

// Toggle like
function toggleLike(discussionId) {
    const user = getLoggedUser();
    if (!user) {
        alert("Please login to like discussions!");
        window.location.href = "login.html";
        return;
    }
    
    const discussions = loadDiscussions(movieId);
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (!discussion) return;
    
    if (!discussion.likedBy) discussion.likedBy = [];
    if (!discussion.likes) discussion.likes = 0;
    
    const userIndex = discussion.likedBy.indexOf(user.username);
    
    if (userIndex > -1) {
        // Unlike
        discussion.likedBy.splice(userIndex, 1);
        discussion.likes--;
    } else {
        // Like
        discussion.likedBy.push(user.username);
        discussion.likes++;
    }
    
    saveDiscussions(movieId, discussions);
    renderDiscussions();
}

// Open discussion detail modal
function openDiscussionDetail(discussionId) {
    const discussions = loadDiscussions(movieId);
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (!discussion) return;
    
    // Create modal HTML
    const modalHTML = `
        <div id="discussionModal" class="modal">
            <div class="modal-content discussion-modal-content">
                <button class="modal-close" onclick="closeDiscussionModal()">×</button>
                
                <div class="discussion-detail">
                    <div class="discussion-main">
                        <div class="discussion-header">
                            <div class="discussion-user-info">
                                <img src="${discussion.author.avatar}" class="discussion-avatar" alt="${discussion.author.name}">
                                <div>
                                    <h2 class="discussion-title">${discussion.title}</h2>
                                    <div class="discussion-meta">
                                        Started by <strong>${discussion.author.name}</strong> • ${formatDate(discussion.date)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="discussion-content">
                            <p>${discussion.content}</p>
                        </div>
                        <div class="discussion-actions">
                            <button class="discussion-action-btn like-btn ${discussion.likedBy && discussion.likedBy.includes(getLoggedUser()?.username) ? 'liked' : ''}" 
                                    onclick="toggleLike(${discussion.id})">
                                <span class="icon">👍</span> ${discussion.likes || 0}
                            </button>
                        </div>
                    </div>
                    
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                    
                    <div class="replies-section">
                        <h3 style="margin-bottom: 20px;">${discussion.replies ? discussion.replies.length : 0} ${discussion.replies && discussion.replies.length === 1 ? 'Reply' : 'Replies'}</h3>
                        
                        <div class="reply-form">
                            <textarea id="replyText" placeholder="Write your reply..." rows="3"></textarea>
                            <button class="submit-reply-btn" onclick="submitReply(${discussion.id})">Post Reply</button>
                        </div>
                        
                        <div class="replies-list" id="repliesList">
                            ${renderReplies(discussion.replies || [])}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('discussionModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Render replies
function renderReplies(replies) {
    if (!replies || replies.length === 0) {
        return '<p style="text-align: center; color: #888; padding: 20px;">No replies yet. Be the first to reply!</p>';
    }
    
    return replies.map(reply => `
        <div class="reply-card">
            <div class="reply-header">
                <img src="${reply.author.avatar}" class="reply-avatar" alt="${reply.author.name}">
                <div class="reply-info">
                    <strong>${reply.author.name}</strong>
                    <span class="reply-date">${formatDate(reply.date)}</span>
                </div>
            </div>
            <div class="reply-content">
                <p>${reply.content}</p>
            </div>
            <div class="reply-actions">
                <button class="reply-action-btn ${reply.likedBy && reply.likedBy.includes(getLoggedUser()?.username) ? 'liked' : ''}" 
                        onclick="toggleReplyLike(${reply.discussionId}, ${reply.id})">
                    <span class="icon">👍</span> ${reply.likes || 0}
                </button>
            </div>
        </div>
    `).join('');
}

// Submit reply
function submitReply(discussionId) {
    const user = getLoggedUser();
    if (!user) {
        alert("Please login to reply!");
        window.location.href = "login.html";
        return;
    }
    
    const replyText = document.getElementById('replyText').value.trim();
    
    if (!replyText) {
        alert("Reply cannot be empty!");
        return;
    }
    
    if (replyText.length < 5) {
        alert("Reply must be at least 5 characters long!");
        return;
    }
    
    const discussions = loadDiscussions(movieId);
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (!discussion) return;
    
    if (!discussion.replies) discussion.replies = [];
    
    const newReply = {
        id: Date.now(),
        discussionId: discussionId,
        author: {
            name: user.username || user.name || "Anonymous",
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=667eea&color=fff`
        },
        content: replyText,
        date: new Date().toISOString(),
        likes: 0,
        likedBy: []
    };
    
    discussion.replies.push(newReply);
    discussion.lastActivity = new Date().toISOString();
    
    saveDiscussions(movieId, discussions);
    
    // Update UI
    document.getElementById('replyText').value = '';
    document.getElementById('repliesList').innerHTML = renderReplies(discussion.replies);
    
    // Update reply count in header
    const replyHeader = document.querySelector('.replies-section h3');
    if (replyHeader) {
        replyHeader.textContent = `${discussion.replies.length} ${discussion.replies.length === 1 ? 'Reply' : 'Replies'}`;
    }
    
    renderDiscussions();
}

// Toggle reply like
function toggleReplyLike(discussionId, replyId) {
    const user = getLoggedUser();
    if (!user) {
        alert("Please login to like replies!");
        window.location.href = "login.html";
        return;
    }
    
    const discussions = loadDiscussions(movieId);
    const discussion = discussions.find(d => d.id === discussionId);
    
    if (!discussion || !discussion.replies) return;
    
    const reply = discussion.replies.find(r => r.id === replyId);
    if (!reply) return;
    
    if (!reply.likedBy) reply.likedBy = [];
    if (!reply.likes) reply.likes = 0;
    
    const userIndex = reply.likedBy.indexOf(user.username);
    
    if (userIndex > -1) {
        reply.likedBy.splice(userIndex, 1);
        reply.likes--;
    } else {
        reply.likedBy.push(user.username);
        reply.likes++;
    }
    
    saveDiscussions(movieId, discussions);
    
    // Update UI
    document.getElementById('repliesList').innerHTML = renderReplies(discussion.replies);
}

// Close discussion modal
function closeDiscussionModal() {
    const modal = document.getElementById('discussionModal');
    if (modal) {
        modal.remove();
    }
    renderDiscussions();
}

// Start new discussion
function openNewDiscussionModal() {
    const user = getLoggedUser();
    if (!user) {
        alert("Please login to start a discussion!");
        window.location.href = "login.html";
        return;
    }
    
    const modalHTML = `
        <div id="newDiscussionModal" class="modal">
            <div class="modal-content">
                <h3>Start a New Discussion</h3>
                
                <label>Discussion Title:</label>
                <input type="text" id="discussionTitle" placeholder="What do you want to discuss?" maxlength="100">
                
                <label>Your Thoughts:</label>
                <textarea id="discussionContent" placeholder="Share your thoughts about this ${movieData.type === 'Series' ? 'series' : 'movie'}..." rows="5"></textarea>
                
                <div class="modal-actions">
                    <button id="submitDiscussionBtn" onclick="submitNewDiscussion()">Start Discussion</button>
                    <button onclick="closeNewDiscussionModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Close new discussion modal
function closeNewDiscussionModal() {
    const modal = document.getElementById('newDiscussionModal');
    if (modal) {
        modal.remove();
    }
}

// Submit new discussion
function submitNewDiscussion() {
    const user = getLoggedUser();
    if (!user) {
        alert("Please login!");
        window.location.href = "login.html";
        return;
    }
    
    const title = document.getElementById('discussionTitle').value.trim();
    const content = document.getElementById('discussionContent').value.trim();
    
    if (!title) {
        alert("Please enter a discussion title!");
        return;
    }
    
    if (title.length < 5) {
        alert("Title must be at least 5 characters long!");
        return;
    }
    
    if (!content) {
        alert("Please share your thoughts!");
        return;
    }
    
    if (content.length < 10) {
        alert("Discussion content must be at least 10 characters long!");
        return;
    }
    
    const newDiscussion = {
        id: Date.now(),
        title: title,
        content: content,
        author: {
            name: user.username || user.name || "Anonymous",
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=667eea&color=fff`
        },
        date: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        replies: []
    };
    
    const discussions = loadDiscussions(movieId);
    discussions.unshift(newDiscussion);
    saveDiscussions(movieId, discussions);
    
    closeNewDiscussionModal();
    renderDiscussions();
    
    alert("✓ Discussion started successfully!");
}

// Initialize discussion button
function initializeDiscussionButton() {
    const discussionBtn = document.querySelector(".discussion-btn");
    if (discussionBtn) {
        discussionBtn.addEventListener("click", openNewDiscussionModal);
    }
}

// Update the DOMContentLoaded to include discussion initialization
const originalDOMContentLoaded = document.querySelector('script[src="movie-detail.js"]');
if (originalDOMContentLoaded) {
    document.addEventListener("DOMContentLoaded", () => {
        renderDiscussions();
        initializeDiscussionButton();
    });
}