import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr9wZvp0IzigY7ZoXtq7oappzCglAYOJ4",
  authDomain: "projektukas-5048b.firebaseapp.com",
  projectId: "projektukas-5048b",
  storageBucket: "projektukas-5048b.appspot.com",
  messagingSenderId: "237229428361",
  appId: "1:237229428361:web:6db079109a6e88fd738058",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };
