import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Gallery = () => {
  const { id } = useParams();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/gallery/${id}`);
        setUrls(response.data);
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      }
    };
    fetchUrls();
  }, [id]);

  return (
    <div>
      <h1>Gallery</h1>
      {urls.length > 0 ? (
        urls.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Uploaded ${index}`} style={{ width: '200px', margin: '10px' }} />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Gallery;