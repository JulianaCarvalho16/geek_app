// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { get } from "mongoose";
import { AxiosHeaders } from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPZZBHtc_fCm3mdyw1BLJDH51z6IJoPoM",
  authDomain: "gekapp-af106.firebaseapp.com",
  projectId: "gekapp-af106",
  storageBucket: "gekapp-af106.firebasestorage.app",
  messagingSenderId: "340151076360",
  appId: "1:340151076360:web:f6865292fd204fce37b3bd",
  measurementId: "G-S9VW0P7XR9",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const authFirebase = getAuth(appFirebase);
const Auth = {
  login: async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (email, password) => {
    try {
      const user = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  checkIfLogin: async () => {
    return authFirebase.currentUser;
  },
};

export default Auth;
