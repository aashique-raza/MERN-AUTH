

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-o-auth.firebaseapp.com",
  projectId: "mern-o-auth",
  storageBucket: "mern-o-auth.appspot.com",
  messagingSenderId: "692554914575",
  appId: "1:692554914575:web:b1c4ea0f28f20e44a6bc7a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);