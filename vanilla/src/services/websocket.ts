import { WebSocketMessageType, AuthMessage } from '../types/websocket';

/**
 * WebSocket service for handling real-time communication
 */
class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000;

  constructor() {
    this.connect();
  }

  private connect(): void {
    const token = localStorage.getItem('x-access-token');
    if (!token) return;

    this.ws = new WebSocket(`ws://${window.location.host}/ws`);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      const authMessage: AuthMessage = {
        type: 'auth',
        payload: { token },
      };
      this.ws?.send(JSON.stringify(authMessage));
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onmessage = (event) => {
      this.handleMessage(JSON.parse(event.data) as WebSocketMessageType);
    };
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectTimeout * this.reconnectAttempts);
    }
  }

  private handleMessage(data: WebSocketMessageType): void {
    // TODO: Implement message handling based on message type
    console.log('Received message:', data);
  }

  public send(message: WebSocketMessageType): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  public disconnect(): void {
    this.ws?.close();
    this.ws = null;
  }
}

// Create and export a singleton instance
export const wsService = new WebSocketService();

/**
 * Initialize WebSocket connection
 */
export const setupWebSocket = (): void => {
  // The WebSocket service is already initialized as a singleton
  // Additional setup can be done here if needed
};
