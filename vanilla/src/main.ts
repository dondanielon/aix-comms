import './styles/index.css';
import { App } from './components/App';
import { setupWebSocket } from './services/websocket
import { setupAuth } from './services/auth';

// Prevent context menu
window.addEventListener('contextmenu', (e) => e.preventDefault());

// Setup authentication shortcuts
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'r') {
    const credentials = { email: 'admin@tyenet.com', password: 'Secure1' };
    setupAuth(credentials);
  }

  if (e.key.toLowerCase() === 't') {
    const credentials = { email: 'admin1@tyenet.com', password: 'Secure1' };
    setupAuth(credentials);
  }
});

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Create and append the root app component
  const app = document.createElement('app-component');
  document.getElementById('root')?.appendChild(app);

  // Initialize services
  setupWebSocket();
  setupAuth();
});
