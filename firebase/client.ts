import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNGnGN0zDkcw-qSRNcdEGqSSR5ja7b0LE",
  authDomain: "prepwise-ea876.firebaseapp.com",
  projectId: "prepwise-ea876",
  storageBucket: "prepwise-ea876.firebasestorage.app",
  messagingSenderId: "90676278028",
  appId: "1:90676278028:web:e62be203408f5496638f29",
  measurementId: "G-KQYVMF3N7W",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
