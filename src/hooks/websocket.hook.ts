import { WebSocketContext } from '@src/providers/contexts/websocket.context';
import { useContext } from 'react';

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw Error('useWebSocket hook must be used inside provider.');
  }

  return context;
};
