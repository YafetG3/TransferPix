import React from 'react';
import './About.css';
import profileImage from '../Headshot.jpg'; // Ensure this path is correct

const About = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <h1>About the Page</h1>
      <p>This page is designed to simplify the process of transferring photos from your computer to your mobile device, specifically benefiting my portfolio on Instagram @getachewsgallery. With TransferPix, you can easily upload your images and generate a QR code for quick download to your phone. This streamlined process ensures that high-quality photos are ready for immediate posting on Instagram, maintaining the visual appeal and professional quality of your portfolio.
        
        The page is built using modern web technologies including React for the frontend, Node.js and Express for the backend, and Google Cloud Storage for storing uploaded images. This combination ensures a smooth and efficient photo transfer experience, allowing for quick updates and consistent management of your online presence.
        
        Creating this project not only addressed the inconvenience of manually transferring photos between devices but also leveraged my skills in full-stack development to provide a practical solution. This tool enhances the efficiency of my photography workflow, enabling me to focus more on capturing and editing stunning photos for my Gallery.</p>
        </div>
      <div className="about-section">
        <h1>About Me</h1>
        <div className="about-me-content">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="text-content">
        <p>My name is Yafet Getachew, and I am a rising second-year undergraduate student at the University of Virginia, planning to major in Computer Science with minors in Business and Data Science. I am passionate about solving real-world problems through technology and possess a diverse skill set including React.js, Java, Python, and more.
        
           I am particularly interested in full-stack development, backend systems, and machine learning. My technical experience includes developing web applications, creating machine learning models, and working on high-performance computing projects.

          This project, TransferPix, reflects my dedication to improving everyday workflows through technology. Outside of my academic pursuits, I enjoy photography, which inspired me to develop this tool to streamline my process of transferring photos for my Instagram portfolio @getachewsgallery. I strive to create practical and innovative solutions that make a difference, and I hope you find this tool as useful as I do!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;