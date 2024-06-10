import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';
import Gallery from './components/Gallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/gallery/:id" element={<Gallery />} />
        <Route path="/" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;