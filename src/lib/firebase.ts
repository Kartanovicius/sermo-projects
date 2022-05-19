import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyAqmqyU1t21_0002MlSOR8yKTXS1uxr2A8",
  authDomain: "sermo-projects.firebaseapp.com",
  projectId: "sermo-projects",
  storageBucket: "sermo-projects.appspot.com",
  messagingSenderId: "652494557455",
  appId: "1:652494557455:web:5b09528f0bfeb9adfa2e7a",
  measurementId: "G-MF9KNT4H1E"
};

const firebase = initializeApp(config);
const auth = getAuth(firebase);
const fieldValue = getFirestore();

export { auth, firebase, fieldValue };