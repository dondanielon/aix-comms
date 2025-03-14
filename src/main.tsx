import { createRoot } from 'react-dom/client';
import App from '@src/App.tsx';
import '@src/index.css';
import { WebSocketProvider } from '@providers/WebSocketProvider.tsx';
import { AuthenticationProvider } from '@providers/AuthenticationProvider.tsx';

window.addEventListener('contextmenu', (e) => e.preventDefault());

createRoot(document.getElementById('root')!).render(
  <WebSocketProvider>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </WebSocketProvider>
);
