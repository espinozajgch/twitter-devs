import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const firebase = getFirestore(app);
// const analytics = getAnalytics(app);

// modulo de autenticación
export const auth = firebase.auth();

// proveedor de autenticación
export const provider = new firebase.auth.GoogleAuthProvider();

// utilidad para hacer login con el popUp
export const loginConGoogle = () => auth.signInWithPopup(provider);

// utilidad para hacer logOut
export const logout = () => auth.signOut();

// exporta la funcionalidad de la base de datos
export const firestore = firebase.firestore();

// exporta la funcionalidad del almacenamiento
export const storage = firebase.storage();

// exporta el paquete de firebase
export default firebase;
