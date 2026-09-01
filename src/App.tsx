import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="bg-black leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Navigate to="https://github.com/arnabwithab" replace />} />
            </Routes>
          </div>
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
