import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecurityChecklist from './pages/SecurityChecklist';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checklists/security" element={<SecurityChecklist />} />
      </Routes>
    </Router>
  );
}

export default App;
