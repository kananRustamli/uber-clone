// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnGEsw4Qn3wGxjoGo6rPrCmqtd6DfM0MY",
  authDomain: "uber-clone-2f431.firebaseapp.com",
  projectId: "uber-clone-2f431",
  storageBucket: "uber-clone-2f431.appspot.com",
  messagingSenderId: "949932655370",
  appId: "1:949932655370:web:f3bc961ebcb97260f930f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authProvider = new GoogleAuthProvider();
const auth = getAuth();

export { app, auth, authProvider };
