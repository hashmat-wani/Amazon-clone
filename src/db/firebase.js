import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcwUgUAqDFdI5IWlXO2SUH5cM3uVMZLW4",
  authDomain: "e-clone-b796e.firebaseapp.com",
  projectId: "e-clone-b796e",
  storageBucket: "e-clone-b796e.appspot.com",
  messagingSenderId: "60919130149",
  appId: "1:60919130149:web:3d5e1ae8d6fe8816d3b7cc",
  measurementId: "G-QMC9JXG4NW",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
