require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const keyFilePath = process.env.GCLOUD_KEYFILE_PATH;

if (!keyFilePath) {
  throw new Error('GCLOUD_KEYFILE_PATH environment variable is not set.');
}

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../', keyFilePath),
    projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

module.exports = bucket;
