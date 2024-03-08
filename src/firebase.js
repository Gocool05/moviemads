import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Add Firebase storage
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDx72w_EI-nlK-i_uL09KSvvCHaqeMkUek",
  authDomain: "moviemads.firebaseapp.com",
  projectId: "moviemads",
  storageBucket: "moviemads.appspot.com",
  messagingSenderId: "465355488556",
  appId: "1:465355488556:web:f893aa63e5aea754c48089"
};

const app = initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage().ref;
export { auth, provider, storage };
export default db;
