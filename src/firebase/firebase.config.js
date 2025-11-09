// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW0ILdPSD1h1QrxcqPd7dr9JLNg_7oZZY",
  authDomain: "meal-share-25899.firebaseapp.com",
  projectId: "meal-share-25899",
  storageBucket: "meal-share-25899.firebasestorage.app",
  messagingSenderId: "972819790037",
  appId: "1:972819790037:web:2d98bd45976f60b99d8a5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
