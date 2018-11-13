import * as firebase from "firebase";

const config = {
    apiKey            : "",
    authDomain        : "",
    databaseURL       : "",
    messagingSenderId : "",
    projectId         : "",
    storageBucket     : "",
  };
  firebase.initializeApp(config);

  export const auth    = firebase.auth()
  export const db      = firebase.firestore()
  export const storage = firebase.storage()
