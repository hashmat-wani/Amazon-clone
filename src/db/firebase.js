// old way
// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";

//new way
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

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

// oldway
// const app = firebase.initializeApp(firebaseConfig);
// export const db = firebase.firestore();

//new way
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
