require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const storage = new Storage({
    keyFilename: path.join(__dirname, '../../', process.env.GCLOUD_KEYFILE_PATH),
    projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

module.exports = bucket;