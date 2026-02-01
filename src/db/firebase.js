import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW2m6pXigUTdpI0LuxeR5p6kPiHf2Opes",
  authDomain: "comp-1-76c8d.firebaseapp.com",
  projectId: "comp-1-76c8d",
  storageBucket: "comp-1-76c8d.firebasestorage.app",
  messagingSenderId: "404051401353",
  appId: "1:404051401353:web:d40e22179934f6fe5e8458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);