import { auth, firestore, storage } from "firebase";
import * as firebase from './firebase'

const services = {
    ...firebase
}

export default services

export interface IServices {
    auth: auth.Auth
    db: firestore.Firestore
    storage: storage.Storage
}