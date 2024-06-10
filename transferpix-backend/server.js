const express = require('express');
const cors = require('cors');
const multer = require('multer');
const NodeCache = require('node-cache');
const uploadFile = require('./gcs');
require('dotenv').config();

const app = express();
const cache = new NodeCache();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/upload', upload.array('photos', 10), async (req, res) => {
  try {
    const uploadPromises = req.files.map(file => uploadFile(file));
    const urls = await Promise.all(uploadPromises);
    const galleryId = Date.now().toString();
    cache.set(galleryId, urls);
    const galleryUrl = `http://localhost:5000/gallery/${galleryId}`;
    res.send(galleryUrl);
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).send('Upload failed');
  }
});

app.get('/gallery/:id', (req, res) => {
  const galleryId = req.params.id;
  const urls = cache.get(galleryId);
  if (!urls) {
    return res.status(404).send('Gallery not found');
  }
  res.json(urls);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));