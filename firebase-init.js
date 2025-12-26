// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN2PxHOA9u-I2iPCX_5gT1iogL5zYGHhM",
  authDomain: "antrianky.firebaseapp.com",
  projectId: "antrianky",
  storageBucket: "antrianky.firebasestorage.app",
  messagingSenderId: "194560917480",
  appId: "1:194560917480:web:1aa1faa95f7e30c747ae5d",
  measurementId: "G-2WVLM97MP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
