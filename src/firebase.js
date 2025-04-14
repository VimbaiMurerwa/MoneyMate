
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCqvKqm2D24DmQZqjP3cTEaNBw1CHIrt8",
  authDomain: "financial-tracker-dd8eb.firebaseapp.com",
  projectId: "financial-tracker-dd8eb",
  storageBucket: "financial-tracker-dd8eb.firebasestorage.app",
  messagingSenderId: "275486330470",
  appId: "1:275486330470:web:b62e9ee95fa9ff9b16a7a7",
  measurementId: "G-T2MT1T4VF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


export { db, auth, doc, setDoc };