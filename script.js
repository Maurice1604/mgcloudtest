// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKNVLHiVMMiJ2Vcwoq8c_HvNn83AtvQeI",
  authDomain: "mgcloudtest-78d07.firebaseapp.com",
  projectId: "mgcloudtest-78d07",
  storageBucket: "mgcloudtest-78d07.firebasestorage.app",
  messagingSenderId: "188345418823",
  appId: "1:188345418823:web:4b809dec46478c8b031d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const logoutBtn = document.getElementById('logout-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const userDisplay = document.getElementById('user-display');
const lastLoginDisplay = document.getElementById('last-login');
const loginMessage = document.getElementById('login-message');

// Show/Hide screens
function showDashboard(user) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    userDisplay.textContent = user.email;
}

function showLogin() {
    loginScreen.style.display = 'block';
    dashboardScreen.style.display = 'none';
}

// Auth State Observer
onAuthStateChanged(auth, async (user) => {
    if (user) {
        showDashboard(user);
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            lastLoginDisplay.textContent = "Last login: " + docSnap.data().lastLogin;
        } else {
            lastLoginDisplay.textContent = "Welcome! This is your first login.";
        }
        const now = new Date().toLocaleString();
        await setDoc(userRef, { email: user.email, lastLogin: now });
    } else {
        showLogin();
    }
});

// Login
loginBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            loginMessage.textContent = "Login failed: " + error.message;
        });
});

// Sign Up
signupBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    createUserWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            loginMessage.textContent = "Sign up failed: " + error.message;
        });
});

// Logout
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});