import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

export const createUserRecord = functions.auth
    .user()
    .onCreate( (user, context) => {

        // every firestore doc has a unique id correspond to user record
        const userRef = db.doc(`users/${user.uid}`);

        // set returns a promise
        return userRef.set({
            name: user.displayName,
            createdAt: context.timestamp,
            nickname: "Meer"
        });
    });