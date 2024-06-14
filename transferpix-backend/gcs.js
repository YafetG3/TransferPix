const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

console.log('GCLOUD_PROJECT_ID:', process.env.GCLOUD_PROJECT_ID);
console.log('GCLOUD_KEY_FILE:', process.env.GCLOUD_KEY_FILE);
console.log('GCLOUD_BUCKET_NAME:', process.env.GCLOUD_BUCKET_NAME);

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

const uploadFile = async (file) => {
  console.log('Starting upload for file:', file.originalname);
  const blob = bucket.file(Date.now() + file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('finish', async () => {
      try {
        const [url] = await blob.getSignedUrl({
          action: 'read',
          expires: '03-01-2500',
        });
        console.log('Upload finished:', url);
        resolve(url);
      } catch (err) {
        console.error('Error generating signed URL:', err);
        reject(err);
      }
    });

    blobStream.on('error', (err) => {
      console.error('Upload error:', err);
      reject(err);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = uploadFile;