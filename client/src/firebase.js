// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "virtually-real.firebaseapp.com",
  projectId: "virtually-real",
  storageBucket: "virtually-real.appspot.com",
  messagingSenderId: "441124637817",
  appId: "1:441124637817:web:922de249de58ee4c98d8a8",
  measurementId: "G-KQHVEB8NHP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);