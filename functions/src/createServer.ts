import * as express from "express"
import * as admin from 'firebase-admin'
import { doesNotReject } from "assert";


interface IRequest extends express.Request {
    user: {
        uid: string,
        email, string,
        role: string,
    }
}

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const db   = admin.firestore()
db.settings({ timestampsInSnapshots: true })
const auth = admin.auth()

export default () => {
    const app = express()

    // Middleware que aplicará a todos los métodos a continuación de este.
    app.use(async (req, res, next) => {
        const token = req.headers.authorization
        try {
            const { uid, email } = await auth.verifyIdToken(token)
            const snap = await db.collection('users').doc(uid).get()
            const user = snap.data()
            Object.assign(req, {
                user: {
                    ...user,
                    uid,
                    email
                }
            })
            next()
        } catch(e) {
            res.status(403).send('Error al autorizar')
        }
        
    })

    app.get('/posts/:postId/like', async (req: IRequest, res) => {
        const { uid } = req.user
        const { postId } = req.params
        const snaps = await db.collection('likes')
            .where('userId', '==', uid)
            .where('postId','==', postId)
            .limit(1)
            .get()

        const result: { id?: string } = {}
        snaps.forEach(x => Object.assign(result, {...x.data(), id: x.id}))

        if(result.id){
            await db.collection('likes').doc(result.id).delete()
        } else {
            await db.collection('likes').doc().set({
                userId: uid,
                postId,
                createdAt: new Date()
            })
        }

        res.sendStatus(204)
    })
    
    app.get('/posts/:postId/share', async (req: IRequest, res) => {
        const { uid } = req.user
        const { postId } = req.params
        
        const snap = await db.collection('posts').doc(postId).get()
        const post = snap.data()

        const result = await db.collection('posts').add({
            ...post,
            userId: uid,
            createdAt: new Date()
        })

        await db.collection('shares').doc().set({
            userId: uid,
            originalPost: postId,
            postId: result.id,
            createdAt: new Date()
        })

        res.send({ id: result.id })

    })

    return app 
}