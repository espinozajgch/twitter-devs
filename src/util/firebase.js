import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3-FXkUDZd8Zom1pwZLT-ugzK1Jc2WBM0",
  authDomain: "acamica-proyect.firebaseapp.com",
  projectId: "acamica-proyect",
  storageBucket: "acamica-proyect.appspot.com",
  messagingSenderId: "982107120873",
  appId: "1:982107120873:web:470bdba37963aa3a24fc78",
  measurementId: "G-CP1SG3XPSY"
};

 firebase.initializeApp(firebaseConfig);


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firebase = getFirestore(app);
// const analytics = getAnalytics(app);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
