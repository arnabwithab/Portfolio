import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="bg-[#022c22] leading-relaxed text-slate-300 antialiased selection:bg-emerald-300 selection:text-emerald-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/archive" element={<Navigate to="https://github.com/arnabwithab" replace />} />
              <Route path="*" element={<NotFound />} />
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
