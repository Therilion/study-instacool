import { firestore } from "firebase";
import { AnyAction, Dispatch, } from 'redux';
import { IServices } from '../services';
import { download } from "../utils";
import { IState } from './index';

const START = 'posts/fetch-start'
const SUCCESS = 'posts/fetch-success'
const ERROR = 'posts/fetch-error'
const ADD = 'posts/add'
const UPLOAD_START = 'posts/upload-start'
const UPLOAD_SUCCESS = 'posts/upload-success'

export interface IPosts {
    comment: string
    createdAt: firestore.Timestamp
    imageUrl: string
    userId: string
}

export interface IDataPosts {
    [key: string] : IPosts
}

export interface IUploadPost {
    file: File
    comment: string
}

const fetchStart = () => ({
    type: START
})

const fetchSuccess = (payload: IDataPosts) => ({
    payload,
    type: SUCCESS,
})

const fetchError = (error: Error) => ({
    error,
    type: ERROR,
})

const add = (payload: IDataPosts) => ({
    payload,
    type: ADD
})

const uploadStart = () => ({
    type: UPLOAD_START
})

const uploadSuccess = (payload: IDataPosts) => ({
    payload,
    type: UPLOAD_SUCCESS,
})

const initialState = {
    data: {},
    fetched: false,
    fetching: false,
    uploaded: false,
    uploading: false,
}

export default function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true,
            }
        
        case SUCCESS: 
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false,
            }

        case ERROR: 
            return {
                ...state,
                error: action.error,
                fetching: false,
                uploading: false,
            }
        case ADD: 
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
            }
        case UPLOAD_START:
            return {
                ...state,
                uploading: true
            }
        case UPLOAD_SUCCESS: 
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload,
                },
                uploaded: true,
                uploading: false,
            }
        default:
            return state
    }
}

export const fetchPosts = () => 
    async (dispatch: Dispatch, getState: () => IState, { db, storage }: IServices) => {
        dispatch(fetchStart())
        try {
            const snaps = await db.collection('posts').get()
            const posts = {}
            snaps.forEach(x => posts[x.id] = x.data())
            
            const imgIds = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const ref = storage.ref(`posts/${x}.jpg`)
                    const url = await ref.getDownloadURL()
                    return [x, url]
                }))
            const keyedImages = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1])
            
            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageUrl: keyedImages[x]
            })
            dispatch(fetchSuccess(posts))
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e)
            dispatch(fetchError(e))
        }
    }

export const like = (id: string) => 
    async(dispatch: Dispatch, getState: () => IState, { auth }: IServices) => {
        if(!auth.currentUser){
            return
        }
        const token  = await auth.currentUser.getIdToken()
        
        await fetch(`/api/posts/${id}/like`, {
            headers: {
                authorization: token
            }
        })
    }

export const share = (id: string) => 
    async(dispatch: Dispatch, getState: () => IState, { auth, db, storage }: IServices) => {
        if(!auth.currentUser){
            return
        }
        const token  = await auth.currentUser.getIdToken()
        
        const result = await fetch(`/api/posts/${id}/share`, {
            headers: {
                authorization: token
            }
        })

        const url = await storage.ref(`posts/${id}.jpg`).getDownloadURL()
        const blob = await download(url)
        const { id: postId }: { id: string } = await result.json()
        const ref = await storage.ref(`posts/${postId}.jpg`)
        await ref.put(blob)
        const imageUrl = await ref.getDownloadURL()
        const snap = await db.collection('posts').doc(postId).get()

        dispatch(add({ [snap.id]: {
            ...snap.data(),
            imageUrl
        } } as IDataPosts))
    }

export const uploadPost = (payload: { file: File, comment: string}) =>
    async(dispatch: Dispatch, getState: () => IState, { auth, db, storage }: IServices) => {
        if(!auth.currentUser || !payload.file || !payload.comment){
            return
        }
        dispatch(uploadStart())
        const token  = await auth.currentUser.getIdToken()
        const result = await fetch(`/api/posts/upload`, {
            body: JSON.stringify({comment: payload.comment}),
            headers: {
                authorization: token
            },
            method: 'POST'
        })
       
        const { id: postId }: { id: string } = await result.json()
        const storageRef = storage.ref()
        const response = await storageRef
            .child(`posts`)
            .child(`${postId}.jpg`)
            .put(payload.file)
        const imageUrl = await response.ref.getDownloadURL()
        const snap = await db.collection('posts').doc(postId).get()
        dispatch(uploadSuccess({ [snap.id]: {
            ...snap.data(),
            imageUrl
        } } as IDataPosts))

    }