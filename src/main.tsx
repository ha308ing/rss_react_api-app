import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';
import { ErrorBoundary } from './components';
import { BrowserRouter, Route, Routes } from 'react-router';

(() => {
  const root = document.getElementById('root');

  if (root === null) return;

  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
})();
