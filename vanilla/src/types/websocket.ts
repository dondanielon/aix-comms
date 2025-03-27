/**
 * Base interface for all WebSocket messages
 */
export interface WebSocketMessage {
  type: string;
  payload: unknown;
}

/**
 * Authentication message type
 */
export interface AuthMessage extends WebSocketMessage {
  type: 'auth';
  payload: {
    token: string;
  };
}

/**
 * Game state update message type
 */
export interface GameStateMessage extends WebSocketMessage {
  type: 'gameState';
  payload: {
    gameState: unknown;
  };
}

/**
 * Error message type
 */
export interface ErrorMessage extends WebSocketMessage {
  type: 'error';
  payload: {
    message: string;
    code?: number;
  };
}

/**
 * Union type of all possible WebSocket messages
 */
export type WebSocketMessageType = AuthMessage | GameStateMessage | ErrorMessage;
