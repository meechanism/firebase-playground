import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as Twilio from 'twilio';

const db = admin.firestore();

// We set up the api keys with cli:
// $ firebase function:config:set twilio.sid="abc" twilio.token="xyz"
const credentials = functions.config().twilio;
const client = new Twilio(credentials.sid, credentials.token);

// Hard to test in dev now, need to push live
// Data object is anything we want passed in from clientside code
// context contains info about authed user
export const  sendText = functions.https.onCall( async(data, context) => {
    // info about authed user
    const userId = context.auth.uid;
    const userRef = db.doc(`users/${userId}`);

    // Get data from user doc
    const userSnap = await userRef.get();

    // get # from firestore doc.
    // Here, we assume we already have a number saved for use doc
    const number = userSnap.data().phoneNumber;

    // send text msg to user
    return client.messages.create({
        body: data.message || "Hello there",
        to: number, // user's number
        from: '+12345678901' // your twilio number when you register
    })
});
