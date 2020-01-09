import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

// we have a mobile game and keep track of the # of games
// a user has played.
// Ex shell cmd: gameCount({uid: 'foo'}),
// assuming we have a user with doc id 'foo'
export const gameCount = functions.firestore
    // Scope to every new game doc that is created
    .document(`games/{gameId}`)
    // Use onCreate trigger (there are 4 total):
    //  onCreate, onDelete, onWrite, onUpdate
    .onCreate(async (snapshot, context) => {
        // access data for newly created doc
        const data = snapshot.data();

        // ref user doc associated to game doc
        const userRef = db.doc(`users/${data.uid}`);

        // retrieve user snapshot
        const userSnap = await userRef.get();
        const userData = userSnap.data();

        // basic data aggregation example
        return userRef.update({
            gameCount: userData.gameCount + 1
        })
    });

/**
 * shell test:
 * userTrend({ before: { uid: 'foo', score: 500}, after: { uid: 'foo', score: 700}})
 *
*/
export const userTrend = functions.firestore
    .document('games/{gameId}')
    .onUpdate((snapshot, context) => {
        // the state before change occured
        const before = snapshot.before.data();
        // after the update
        const after = snapshot.after.data();

        // check to see if user improved score
        let trend ;

        if(after.score >= before.score) {
            trend = 'Your score is improving';
        } else {
            trend = "Your score is declining :(";
        }

        const userRef = db.doc(`users/${after.uid}`);

        return userRef.update({
            trend
        });
    })