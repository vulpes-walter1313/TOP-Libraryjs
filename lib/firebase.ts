// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6AGCuxwNfj8-7ASlA5-2NcC9a76Wokm0",
  authDomain: "top-library-d5756.firebaseapp.com",
  projectId: "top-library-d5756",
  storageBucket: "top-library-d5756.appspot.com",
  messagingSenderId: "769077300201",
  appId: "1:769077300201:web:b69c6ce219538432085978",
};

// Initialize Firebase
type FirebaseConfigType = typeof firebaseConfig;
function createFirebaseApp(config: FirebaseConfigType) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}
const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore = getFirestore(firebaseApp);
