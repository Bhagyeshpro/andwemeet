// Import the functions you need from the SDKs you need

import "firebase/firestore"
import "firebase/auth"
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfRo4fCLqEsYSTdyAQNiaJfWTcYGaqR6E",
  authDomain: "andwe-27bb3.firebaseapp.com",
  projectId: "andwe-27bb3",
  storageBucket: "andwe-27bb3.appspot.com",
  messagingSenderId: "690644528722",
  appId: "1:690644528722:web:c35dab853c8f04709cb98b",
  measurementId: "G-0S4Q4PV4WN"
};
// Initialize Firebase
let app;
  if(firebase.apps.length === 0)
  {
    app = firebase.initializeApp(firebaseConfig);
    firebase.firestore().settings({ experimentalForceLongPolling: true });

  }
  else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export  { db, auth };











  