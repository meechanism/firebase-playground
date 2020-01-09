import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

// Only call once to avoid errs
admin.initializeApp();

export const basicHTTP = functions.https.onRequest((req, res) => {
    const name = req.query.name;

    if(!name) {
        // error
        res.status(400).send('ERROR: Please send `name` in query');
    }
    res.send(`Hi there, ${name}`);
});

const auth = (req, res, next) => {
    if(!req.header.authorization) {
        res.status(400).send('Unauthorized :[');
    }
    next();
};

// Our express app
const app = express();

// middleware, (just a fn that intercepts a response)
// apply cors to all routes
app.use(cors({origin: true}));

app.use(auth);

// our routes
app.get('cat', (req, res) => {
    res.send('I am cat')
})

app.get('dog', (req, res) => {
    res.send('I am dog')
})

export const api = functions.https.onRequest(app);
