// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCrbcgys-E1QryUx10imiJwpijlxHUs3ss",
  authDomain: "canteen-app-5818d.firebaseapp.com",
  projectId: "canteen-app-5818d",
  storageBucket: "canteen-app-5818d.firebasestorage.app",
  messagingSenderId: "690317196942",
  appId: "1:690317196942:web:461f9091ad5a1b573b53df",
  measurementId: "G-1WT4CKN0R7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);




/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrbcgys-E1QryUx10imiJwpijlxHUs3ss",
  authDomain: "canteen-app-5818d.firebaseapp.com",
  projectId: "canteen-app-5818d",
  storageBucket: "canteen-app-5818d.firebasestorage.app",
  messagingSenderId: "690317196942",
  appId: "1:690317196942:web:461f9091ad5a1b573b53df",
  measurementId: "G-1WT4CKN0R7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */