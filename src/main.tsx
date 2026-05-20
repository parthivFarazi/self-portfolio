import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App';
import './index.css';
import './components/panels/_registerImageSlot';
import { Audio } from './audio/AudioManager';

// AudioContext can only start from a user gesture. Bind once-listeners on
// the canonical user-input events; the first one wins, then they detach.
function bootAudioOnFirstGesture() {
  const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'touchstart'];
  const handler = () => {
    Audio.ensureStart();
    events.forEach((e) => window.removeEventListener(e, handler));
  };
  events.forEach((e) => window.addEventListener(e, handler, { once: true, passive: true }));
}
bootAudioOnFirstGesture();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
