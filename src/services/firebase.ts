import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAbBGDnXYPnMQaQFhPzHtRV3naW972OCDc",
    authDomain: "th-instacool.firebaseapp.com",
    databaseURL: "https://th-instacool.firebaseio.com",
    messagingSenderId: "590169519984",
    projectId: "th-instacool",
    storageBucket: "th-instacool.appspot.com",
  };
  firebase.initializeApp(config);

  export const auth    = firebase.auth()
  export const db      = firebase.firestore()
  export const storage = firebase.storage()
