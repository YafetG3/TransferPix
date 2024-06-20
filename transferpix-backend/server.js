const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());

const keyFilePath = path.join(__dirname, 'transferpix-76682b31086f.json');

const storage = new Storage({ keyFilename: keyFilePath });
const bucket = storage.bucket('transferpix-yafet');

// Multer setup for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // Increase to 20MB or as needed
});

app.use(express.json());

app.post('/upload', upload.array('photos'), async (req, res) => {
  try {
    console.log('Files received:', req.files); // Log received files

    const filePromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream();

        blobStream.on('finish', async () => {
          try {
            // Generate a signed URL for the uploaded file
            const [url] = await blob.getSignedUrl({
              action: 'read',
              expires: '03-01-2500', // Set expiration as needed
            });
            resolve({ url, galleryId: 'someGalleryId' });
          } catch (err) {
            reject(err);
          }
        });

        blobStream.on('error', err => {
          console.error('Error uploading file:', err);
          reject(err);
        });

        blobStream.end(file.buffer);
      });
    });

    const files = await Promise.all(filePromises);
    console.log('Files uploaded successfully:', files);
    res.status(200).json({ url: 'http://localhost:5000/gallery/someGalleryId', files });
  } catch (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      console.error('File size exceeds limit:', error);
      res.status(400).send('File size exceeds limit');
    } else {
      console.error('Upload failed:', error);
      res.status(500).send('Upload failed');
    }
  }
});

// Serve gallery page with uploaded files
app.get('/gallery/:galleryId', async (req, res) => {
  try {
    const [files] = await bucket.getFiles();

    const fileUrls = files.map(file => {
      return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    });

    const imageElements = fileUrls.map(url => `<li><img src="${url}" alt="Gallery Image" style="width: 200px; height: auto;" /></li>`).join('');

    res.status(200).send(`
      <html>
        <head>
          <title>Your Gallery</title>
        </head>
        <body>
          <h1>Your Gallery</h1>
          <ul>
            ${imageElements}
          </ul>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).send('Failed to load gallery');
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));