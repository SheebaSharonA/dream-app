// firebase.js
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaDnRQ5zwcH4TEPuiqIVoFKGILS5MYnYk",
  authDomain: "dream-app-diary.firebaseapp.com",
  projectId: "dream-app-diary",
  storageBucket: "dream-app-diary.firebasestorage.app",
  messagingSenderId: "52125784028",
  appId: "1:52125784028:web:3377aed054856752dd2119",
  measurementId: "G-EJLNV20QHK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
var db = getFirestore(app);

export default db;
