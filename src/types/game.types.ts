import type { AnimationAction } from 'three';

export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Player {
  username: string;
  skin: string;
  position: Point3D;
  targetPosition: Point3D | null;
}

export interface Terrain {
  id: string;
  name: string;
  rotation: number;
  points: Point2D[];
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
  terrain: Terrain;
}

export interface TerrainProps {
  points: Point2D[];
}

export interface User {
  id: string;
  username: string;
}

export interface PlayerLoaderProps {
  id: string;
  player: Player;
}
