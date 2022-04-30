// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/firestore"
import "firebase/auth"
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcdA16aHszes1b1VhJPcYoB1OqdAJ5UUE",
  authDomain: "andwemet-f5af0.firebaseapp.com",
  projectId: "andwemet-f5af0",
  storageBucket: "andwemet-f5af0.appspot.com",
  messagingSenderId: "653977242228",
  appId: "1:653977242228:web:bad40eb6c5a08c3e965f21",
  measurementId: "G-BB616N2Y1H"
};

// Initialize Firebase
let app;
  if(firebase.apps.length === 0)
  {
    app = firebase.initializeApp(firebaseConfig);
  }
  else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export  { db, auth };











  