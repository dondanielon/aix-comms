import type { GameEvent } from '@enums/game.enums';
import { createContext } from 'react';

export interface IWebSocketContext {
  sendMessage: (event: GameEvent, payload: string) => void;
}

export const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);
