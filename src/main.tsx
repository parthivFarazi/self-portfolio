import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import './index.css';
import './components/panels/_registerImageSlot';

// Audio boot lives in App and is scoped to Exploration Mode — Landing and
// Quick View visitors should never get surprise music from their first tap.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
