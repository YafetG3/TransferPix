import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [galleryUrl, setGalleryUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('photos', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      setGalleryUrl(response.data);
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h1>Upload Photos</h1>
      <input type="file" onChange={handleFileChange} multiple />
      <button onClick={handleUpload}>Upload</button>
      {uploadProgress > 0 && (
        <div>
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      {galleryUrl && (
        <div>
          <h3>Gallery URL:</h3>
          <a href={galleryUrl} target="_blank" rel="noopener noreferrer">
            {galleryUrl}
          </a>
          <div>
            <h3>Scan the QR code to view the gallery:</h3>
            <QRCode value={galleryUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Upload;