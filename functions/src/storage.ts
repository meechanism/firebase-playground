import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// sdk allows us to download our file
import * as Storage from '@google-cloud/storage';

const gcs = Storage();

// promise based lib to work w/ nodejs filesystem. make life easier
import * as fs from 'fs-extra';
import {tmpdir} from 'os';
import {join} from 'path';

// img optimization
import * as sharp from 'sharp';

export const resizeAvatar = functions.storage
    // Returns info about the file stored in bucket
    .object()
    .onFinalize(async object => {
        // Download it from bucket
        const bucket = gcs.bucket(object.bucket);

        // Loc where file is stored in bucket currently
        const filePath = object.name;
        const fileName = filePath.split('/').pop();

        // download img onto our cloud fn filesystem
        const tmpFilePath = join(tmpdir(), object.name);

        const avatarFileName = `avatar_${fileName}`;

        // Make it so we dont trigger an infinite loop in this fn
        const tmpAvatarPath = join(tmpdir(), avatarFileName);

        // file already resized
        if(fileName.includes('avatar_')) {
            console.log("File is already resized. Exit function...");
            return false;
        }

        // Do resize after file downloads into tmp dir
        await bucket.file(filePath).download({
            destination: tmpFilePath
        });

        // Do image resize and save to tmp dir
        await sharp(tmpFilePath)
            .resize(100,100)
            .toFile(tmpAvatarPath);

        return bucket.upload(tmpAvatarPath, {
            destination: join(dirname(filePath), avatarFileName)
        });
    });
