import { WebSocketContext } from '@src/providers/context';
import { useContext } from 'react';

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw Error('useWebSocket hook must be used inside provider.');
  }

  return context;
};
