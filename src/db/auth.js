import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/app";
import { app } from "./firebase"; // Use the app instance from your firebase.js

export const auth = getAuth(app);

export const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logOut = () => signOut(auth);