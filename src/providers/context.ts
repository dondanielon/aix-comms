import { type WebSocketContextType } from '@src/interfaces';
import { createContext } from 'react';

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);
