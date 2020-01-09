# Firebase playground

Tutorial from https://fireship.io/courses/cloud-functions/firestore-onupdate/

Setup:

1. Install nvm and use node v10.
    ```sh
    $ nvm use v10
    ```
1. Build once
    ```sh
    $ cd functions
    $ npm run build
    ```
1. Export settings. Go to Firebase > settings > Project Settings > Service Accounts and click on "Generate new key" button. Save file under `functions/service-account.json`, then export:
    ```sh
    $ export GOOGLE_APPLICATION_CREDENTIALS=/PATH_TO/firebase-playground/functions/service-account.json
    ```
1. Test/deploy functions locally
    ```sh
    $ npm run serve
    ```
1. Run local hosting env (FE app) w/ deployed functions
    ```sh
    $ npm run app
    ```

## Testing

Use the firebase shell to test the functions locally. Example:
```sh
# shart shell
$ npm run shell
# Run function to add user
> createUserRecord({uid: 'my-test-uid'})
# Go to firebase > Database > users and check new entry
```

## Test
http://localhost:5001/fir-playground-65310/us-central1/basicHTTP