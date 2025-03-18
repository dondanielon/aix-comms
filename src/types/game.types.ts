import type { AnimationAction, Mesh } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';

export interface Point2D {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  username: string;
  skin: string;
}

export interface PlayerProps {
  id: string;
  username: string;
  position: [number, number, number];
  gltf: GLTF;
}

export interface PlayerAnimations {
  idle: AnimationAction;
  run: AnimationAction;
  tpose: AnimationAction;
  walk: AnimationAction;
  jump: AnimationAction;
}

export interface RoomInfo {
  id: string;
  name: string;
  host: string;
  playerCount: number;
}

export interface GameState {
  id: string;
  host: string;
  name: string;
  players: Record<string, Player>;
  terrainId: string;
  terrainRotation: number;
  terrainPoints: Point2D[];
  terrain?: {
    mesh: Mesh;
  };
}

export interface User {
  id: string;
  username: string;
}
