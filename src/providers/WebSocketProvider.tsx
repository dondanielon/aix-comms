import { GameMessage } from '@engine/types';
import { WebSocketMessageLog, WebSocketProviderType } from '@src/interfaces';
import { useGameStore } from '@stores/useGameStore';
import { useEffect, useRef, useState } from 'react';
import { WebSocketContext } from './context';

export const WebSocketProvider: WebSocketProviderType = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessageLog[]>([]);
  const { setUserId, setGameState, setGamesList } = useGameStore();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:80');
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
      const payload = new TextDecoder().decode(view.slice(1));

      console.log({ messageType, payload });

      setMessages((prev) => [
        ...prev,
        { action: 'received', type: messageType, payload, timestamp: Date.now() },
      ]);

      switch (messageType) {
        case GameMessage.Authentication:
          setUserId(payload);
          break;
        case GameMessage.GamesList: {
          const list = JSON.parse(payload);
          setGamesList(list);
          break;
        }
        case GameMessage.JoinGame:
          setGameState(JSON.parse(payload));
          break;
      }
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    ws.onclose = () => {
      console.log('Connection closed.');
      setIsConnected(false);
    };
  }, [setGameState, setGamesList, setUserId]);

  const sendMessage = (type: GameMessage, payload: string): void => {
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
    <WebSocketContext.Provider value={{ messages, sendMessage, isConnected }}>
      {props.children}
    </WebSocketContext.Provider>
  );
};
