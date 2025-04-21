import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwl-2rtpXqnlx3l3EUyDKUOq0B4B2RNR4",
  authDomain: "donationsmanagement-b9635.firebaseapp.com",
  projectId: "donationsmanagement-b9635",
  storageBucket: "donationsmanagement-b9635.firebasestorage.app",
  messagingSenderId: "227679669926",
  appId: "1:227679669926:web:133ec200348aca70072e67",
  measurementId: "G-FZZX6PY88J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
export const googleProvider = new GoogleAuthProvider();
