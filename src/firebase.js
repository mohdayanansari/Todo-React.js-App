// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  import firebase from "firebase/app";
  import { firebase_config } from "./config";
  import "firebase/firestore"; 
  
  const firebaseApp = firebase.initializeApp(firebase_config);

  const db = firebaseApp.firestore();

  export default db;