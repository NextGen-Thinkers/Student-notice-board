// --- INITIAL DATA ---
const ADMIN_UID = "admin2007@gmail.com";
const ADMIN_PASS = "admin@2007";
let currentUser = null;

// --- AUTH FUNCTIONS ---
function showAuthPage(pageId) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('register-page').style.display = 'none';
    document.getElementById(pageId).style.display = 'block';
}

function handleRegister() {
    const email = document.getElementById('reg-email').value;
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email) || email === ADMIN_UID) {
        alert("Email already registered!");
        return;
    }

    const newUser = {
        fname: document.getElementById('reg-fname').value,
        lname: document.getElementById('reg-lname').value,
        email: email,
        pass: document.getElementById('reg-pass').value,
        class: document.getElementById('reg-class').value,
        section: document.getElementById('reg-section').value,
        pic: "https://via.placeholder.com/100",
        role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration Successful!");
    showAuthPage('login-page');
}

function handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    if (email === ADMIN_UID && pass === ADMIN_PASS) {
        startSession({ fname: "Admin", lname: "", email: email, role: 'admin', pic: "https://via.placeholder.com/100" });
    } else {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        let user = users.find(u => u.email === email && u.pass === pass);
        if (user) startSession(user);
        else alert("Invalid credentials!");
    }
}

function startSession(user) {
    currentUser = user;
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-dashboard').style.display = 'flex';
    document.getElementById('welcome-msg').innerText = "Welcome: " + user.email;
    document.getElementById('display-profile-pic').src = user.pic;

    document.getElementById('admin-controls').style.display = user.role === 'admin' ? 'block' : 'none';
    document.getElementById('user-controls').style.display = user.role === 'user' ? 'block' : 'none';
    showContent('view-notice-page');
}

// --- CONTENT MANAGEMENT ---
function showContent(id) {
    document.querySelectorAll('.sub-page').forEach(p => p.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if (id === 'view-notice-page') renderNotices();
    if (id === 'comments-page') renderComments();
}

function updateProfile() {
    // Basic update logic
    currentUser.fname = document.getElementById('edit-fname').value;
    currentUser.lname = document.getElementById('edit-lname').value;
    currentUser.pass = document.getElementById('edit-pass').value;
    
    // Save back to localStorage if user
    if (currentUser.role === 'user') {
        let users = JSON.parse(localStorage.getItem('users'));
        let idx = users.findIndex(u => u.email === currentUser.email);
        users[idx] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    alert("Profile Updated!");
}

function postNotice() {
    let notices = JSON.parse(localStorage.getItem('notices') || '[]');
    if (notices.length >= 10) { alert("Daily limit of 10 notices reached!"); return; }

    const newNotice = {
        to: document.getElementById('notice-target').value,
        subject: document.getElementById('notice-subject').value,
        text: document.getElementById('notice-text').value,
        date: new Date().toLocaleDateString(),
        author: currentUser.fname,
        authorPic: currentUser.pic
    };

    notices.push(newNotice);
    localStorage.setItem('notices', JSON.stringify(notices));
    alert("Notice Posted!");
    showContent('view-notice-page');
}

function renderNotices() {
    let notices = JSON.parse(localStorage.getItem('notices') || '[]');
    let html = notices.map(n => `
        <div class="notice-card">
            <img src="${n.authorPic}" style="width:30px; border-radius:50%"> <strong>${n.author}</strong>
            <h4>${n.subject} <small>(${n.date})</small></h4>
            <p>${n.text}</p>
            <small>Target: ${n.to}</small>
        </div>
    `).join('');
    document.getElementById('notice-display-list').innerHTML = html || "No notices available.";
}

function adminDeleteAll() {
    if(confirm("Erase all notices and comments?")) {
        localStorage.removeItem('notices');
        localStorage.removeItem('comments');
        renderNotices();
        alert("Data Cleared");
    }
}

function logout() { location.reload(); }