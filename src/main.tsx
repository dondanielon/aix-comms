import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { WebSocketProvider } from './providers/WebSocketProvider.tsx';

window.addEventListener('contextmenu', (e) => e.preventDefault());

createRoot(document.getElementById('root')!).render(
  <WebSocketProvider url='ws://localhost:80'>
    <App />
  </WebSocketProvider>
);
