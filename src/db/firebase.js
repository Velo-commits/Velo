import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <--- 1. Make sure this is imported!

const firebaseConfig = {
  apiKey: "AIzaSyCW2m6pXigUTdpI0LuxeR5p6kPiHf2Opes",
  authDomain: "comp-1-76c8d.firebaseapp.com",
  projectId: "comp-1-76c8d",
  storageBucket: "comp-1-76c8d.firebasestorage.app",
  messagingSenderId: "404051401353",
  appId: "1:404051401353:web:d40e22179934f6fe5e8458"
};

const app = initializeApp(firebaseConfig);

// --- 2. Make sure both of these have 'export' in front! ---
export const db = getFirestore(app);
export const auth = getAuth(app);