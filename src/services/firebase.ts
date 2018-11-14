import * as firebase from "firebase";

import firebaseConfig from "../config/firebase-config";

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export const auth    = firebase.auth()
export const db      = firestore
export const storage = firebase.storage()
