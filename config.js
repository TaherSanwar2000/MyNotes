import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZikf3X5DymZRM14P2IeVGVwcwUIwEr2Q",
  authDomain: "notesapp-16f7a.firebaseapp.com",
  projectId: "notesapp-16f7a",
  storageBucket: "notesapp-16f7a.appspot.com",
  messagingSenderId: "443341085556",
  appId: "1:443341085556:web:ccb0cbcf26008cc64eea21",
  measurementId: "G-QCKR3K4CCT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase, auth, db };
