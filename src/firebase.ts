import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB1ePpQvuNvKL7shWvU8X-cA3mdDZySRKM",
    authDomain: "eduhub-416e5.firebaseapp.com",
    projectId: "eduhub-416e5",
    storageBucket: "eduhub-416e5.firebasestorage.app",
    messagingSenderId: "623186353761",
    appId: "1:623186353761:web:d0818b750394f7f072d420",
    measurementId: "G-Z9WR6M7JW9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();


