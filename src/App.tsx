import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Archive from './pages/Archive';

function App() {
  return (
    <Router>
      {/* Changed bg-slate-900 to bg-black */}
      <div className="bg-black leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </div>
      <Analytics />
    </Router>
  );
}

export default App;