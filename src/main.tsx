import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/app/providers/AppProviders';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
);
