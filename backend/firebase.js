// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu1IOl8zb7-kcn1fa3FILJiVV78NqXjRk",
  authDomain: "fruitfull-fdf94.firebaseapp.com",
  projectId: "fruitfull-fdf94",
  storageBucket: "fruitfull-fdf94.appspot.com",
  messagingSenderId: "646322889986",
  appId: "1:646322889986:web:7a15ad17fdf5f5f1590e1b",
  measurementId: "G-Y4GPHGX6YZ"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };