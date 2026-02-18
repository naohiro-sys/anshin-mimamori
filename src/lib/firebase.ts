import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxlPg_miO1gZoamy_4NGhx_k6m_tABDs8",
    authDomain: "anshin-mimamori.firebaseapp.com",
    projectId: "anshin-mimamori",
    storageBucket: "anshin-mimamori.firebasestorage.app",
    messagingSenderId: "40470928954",
    appId: "1:40470928954:web:bd0b90ae1dadaab6d81f03"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
