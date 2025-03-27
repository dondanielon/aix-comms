import { createRoot } from 'react-dom/client';
import App from '@src/App.tsx';
import '@src/index.css';
import WebSocketProvider from '@providers/WebSocketProvider.tsx';
import AuthenticationProvider from '@providers/AuthenticationProvider.tsx';
import { http } from './services/config';

window.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r') {
    const credentials = { email: 'admin@tyenet.com', password: 'Secure1' };

    http
      .post('/v1/user/login', credentials, { withCredentials: true })
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.accessToken);
        localStorage.setItem('x-id-token', res.data.idToken);
      })
      .catch((err: unknown) => console.error(err));
  }

  if (e.key.toLowerCase() === 't') {
    const credentials = { email: 'admin1@tyenet.com', password: 'Secure1' };

    http
      .post('/v1/user/login', credentials, { withCredentials: true })
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.accessToken);
        localStorage.setItem('x-id-token', res.data.idToken);
      })
      .catch((err: unknown) => console.error(err));
  }
});

createRoot(document.getElementById('root')!).render(
  <WebSocketProvider>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </WebSocketProvider>
);
