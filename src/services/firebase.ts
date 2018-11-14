import * as firebase from "firebase";

import config from "../config/firebase-config";

firebase.initializeApp(config);

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)

export const auth    = firebase.auth()
export const db      = firestore
export const storage = firebase.storage()
