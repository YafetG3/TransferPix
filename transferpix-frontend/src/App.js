import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';

const App = () => (
  <Router>
    <div className="flex-container">
      <Header />
      <main style={{ paddingTop: '60px' }}> {/* Add padding to account for fixed header */}
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;