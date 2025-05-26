// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvE5cjIuuYX8ZDHjOgjz71kLib_o8-KJo",
  authDomain: "projeto-mobile-76f4b.firebaseapp.com",
  projectId: "projeto-mobile-76f4b",
  storageBucket: "projeto-mobile-76f4b.firebasestorage.app",
  messagingSenderId: "986713581901",
  appId: "1:986713581901:web:904fbda2ab1e8e14bdaf04",
  measurementId: "G-7RJV6VCG4J"
};

// Initialize Firebase
const app = inicializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth }