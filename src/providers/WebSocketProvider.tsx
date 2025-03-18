import { useEffect, useRef, useState } from 'react';
import { WebSocketContext } from './contexts/websocket.context';
import { useShallow } from 'zustand/shallow';
import { useGameStore } from '@stores/game.store';
import { useUIStore } from '@src/stores/ui.store';

import { GameEvent } from '@enums/game.enums';
import { GameState } from '@src/types/game.types';

const wsUrl = 'ws://localhost:80';

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [isConnected, setIsConnected] = useState(false);

  const setShowRoomsWindow = useUIStore((state) => state.setShowRoomsWindow);
  const { setUser, setGameState, setGamesList } = useGameStore(
    useShallow((store) => ({
      setUser: store.setUser,
      setGameState: store.setGameState,
      setGamesList: store.setGamesList,
    }))
  );

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(wsUrl);
    ws.binaryType = 'arraybuffer';
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to server.');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const buffer = event.data as ArrayBuffer;
      const view = new Uint8Array(buffer);
      const messageType = view[0];
      const payload = JSON.parse(new TextDecoder().decode(view.slice(1)));

      console.log({ messageType, payload });

      switch (messageType) {
        case GameEvent.Authentication:
          setUser(payload);
          break;
        case GameEvent.GamesList: {
          setGamesList(payload);
          break;
        }
        case GameEvent.JoinGame: {
          const gameState = payload as GameState;
          setGameState(gameState);
          setShowRoomsWindow(false);
          break;
        }
      }
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    ws.onclose = () => {
      console.log('Connection closed.');
      setIsConnected(false);
      localStorage.removeItem('terrains-list');
    };
  }, []);

  const sendMessage = (type: GameEvent, payload: string): void => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('Connection with server dropped');
      return;
    }

    const payloadBuffer = new TextEncoder().encode(payload);
    const message = new Uint8Array(1 + payloadBuffer.length);
    message[0] = type;
    message.set(payloadBuffer, 1);

    wsRef.current.send(message);
  };

  return (
    <WebSocketContext.Provider value={{ sendMessage }}>
      {isConnected && props.children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
