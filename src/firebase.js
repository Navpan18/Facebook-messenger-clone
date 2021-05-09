import firebase from "firebase"
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAh0bmLOkxSJp395itvzqdBU4HCOGbr54c",
    authDomain: "facebook-mess-clon.firebaseapp.com",
    projectId: "facebook-mess-clon",
    storageBucket: "facebook-mess-clon.appspot.com",
    messagingSenderId: "277126235445",
    appId: "1:277126235445:web:621a2b623bd7dbab9fb87c",
    measurementId: "G-B8X9KN637Y"
  });

  const db = firebaseApp.firestore();

  export default db;