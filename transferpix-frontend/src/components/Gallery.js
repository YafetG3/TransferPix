import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import './Gallery.css';

const Gallery = () => {
  const location = useLocation();
  const { files } = location.state || [];
  const [galleryUrls, setGalleryUrls] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (files && files.length > 0) {
      const urls = files.map(file => file.url);
      setGalleryUrls(urls);
      setCurrentUrl(window.location.href); // Get the current URL
    }
  }, [files]);

  return (
    <div className="gallery-container">
      <h1>Your Gallery</h1>
      <ul>
        {galleryUrls.length > 0 ? (
          galleryUrls.map((url, index) => (
            <li key={index}>
              <img src={url} alt={`Image ${index + 1}`} style={{ width: '200px', height: 'auto' }} />
            </li>
          ))
        ) : (
          <p>Loading your gallery...</p>
        )}
      </ul>
      {currentUrl && (
        <div className="qr-code">
          <h3>Scan the QR code to view the gallery on your phone:</h3>
          <QRCode value={currentUrl} />
        </div>
      )}
    </div>
  );
};

export default Gallery;