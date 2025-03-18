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
