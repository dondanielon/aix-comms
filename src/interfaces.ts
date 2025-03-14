export interface WebSocketMessageLog {
  action: 'sent' | 'received';
  type: number;
  payload: string;
  timestamp: number;
}

export interface WebSocketPlayer {
  username: string;
  skin: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  targetPosition: {
    x: number;
    y: number;
    z: number;
  } | null;
}

export interface WebSocketGameState {
  id: string;
  host: string;
  name: string;
  players: Record<string, WebSocketPlayer>;
  terrainId: string;
  terrainRotation: number;
  terrainPoints: Array<{ x: number; y: number }>;
}

export interface WebSocketRoom {
  id: string;
  name: string;
  host: string;
  playerCount: number;
}

export interface Terrain {
  id: string;
  name: string;
  rotation: number;
  points: Array<{ x: number; y: number }>;
  createdAt: Date;
  updatedAt: Date;
}
