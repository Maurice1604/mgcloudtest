const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const userDisplay = document.getElementById('user-display');
const loginMessage = document.getElementById('login-message');

// Simulate a hardcoded user for testing
const testUser = {
    username: 'testuser',
    password: 'password123'
};

function showDashboard(username) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    userDisplay.textContent = username;
}

function showLogin() {
    loginScreen.style.display = 'block';
    dashboardScreen.style.display = 'none';
}

loginBtn.addEventListener('click', () => {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === testUser.username && enteredPassword === testUser.password) {
        localStorage.setItem('loggedInUser', enteredUsername);
        showDashboard(enteredUsername);
    } else {
        loginMessage.textContent = 'Invalid username or password.';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    showLogin();
});

// Check on load
const storedUser = localStorage.getItem('loggedInUser');
if (storedUser) {
    showDashboard(storedUser);
} else {
    showLogin();
}