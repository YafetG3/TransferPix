import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import './Upload.css';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [galleryUrl, setGalleryUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

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
      navigate('/gallery', { state: { files: response.data } });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-container">
      <h1>TransferPix</h1>
      <p>Welcome to TransferPix! This website allows you to upload your photos to Google Cloud Storage and provides you with a QR code to easily access your gallery. Keep in mind I have the ability to see any pictures you choose to upload so try not to post any sensitive information and follow the instructions below to get started:</p>
      <ol>
        <li>Click on the "Choose Files" button to select the photos you want to upload.</li>
        <li>Click on the "Upload" button to start uploading your photos.</li>
        <li>Once uploaded, you will see a gallery URL and a QR code to view your photos.</li>
      </ol>
      <input type="text" placeholder="Name goes here" className="name-input" />
      <input type="file" onChange={handleFileChange} multiple className="file-input" />
      <button onClick={handleUpload} className="upload-button">Upload</button>
      {uploadProgress > 0 && (
        <div className="progress-container">
          <progress value={uploadProgress} max="100" />
          <span>{uploadProgress}%</span>
        </div>
      )}
      {galleryUrl && (
        <div className="gallery-url-container">
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