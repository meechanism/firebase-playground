// import * as functions from 'firebase-functions';

// Export all functions here as it is what will get deployed to firebase fns backend
//  This is like our registry to deploy fns


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


export { basicHTTP, api } from './http';
export {createUserRecord} from './auth'
export {gameCount, userTrend} from './firestore'