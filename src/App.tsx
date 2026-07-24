import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';

const Archive = lazy(() => import('./pages/Archive'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <div className="bg-black leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/archive"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center bg-black">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-300 border-t-transparent" />
                      </div>
                    }
                  >
                    <Archive />
                  </Suspense>
                }
              />
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
