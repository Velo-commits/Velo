  import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCW2m6pXigUTDpI0LuxeR5p6kPiHf20pes",
  authDomain: "comp-1-76c8d.firebaseapp.com",
  projectId: "comp-1-76c8d",
  storageBucket: "comp-1-76c8d.firebasestorage.app",
  messagingSenderId: "404051401353",
  appId: "1:404051401353:web:d40e22179934f6fe5e8458"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);