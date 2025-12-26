import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBN2PxHOA9u-I2iPCX_5gT1iogL5zYGHhM",
  authDomain: "antrianky.firebaseapp.com",
  projectId: "antrianky",
  storageBucket: "antrianky.firebasestorage.app",
  messagingSenderId: "194560917480",
  appId: "1:194560917480:web:1aa1faa95f7e30c747ae5d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
