import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDK7jXjNoH_-pUQHO5izP5rX4puO3MU4vU",
  authDomain: "makpop-75b24.firebaseapp.com",
  projectId: "makpop-75b24",
  storageBucket: "makpop-75b24.firebasestorage.app",
  messagingSenderId: "886749102856",
  appId: "1:886749102856:web:1fa3f0826b2ea753da62bd",
  measurementId: "G-R8RKLTEXJS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
