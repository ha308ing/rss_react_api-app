import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app';

(() => {
  const root = document.getElementById('root');

  if (root === null) return;

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
})();
