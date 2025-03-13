import { type Vector2 } from 'three';
import { AnimationComponent } from './components/AnimationComponent';
import { ModelComponent } from './components/ModelComponent';
import { MovementComponent } from './components/MovementComponent';

// Entity configurations
export type TerrainConfig = {
  rotation: number;
  points: Vector2[];
};

export type PlayerEntityConfig = {
  component: {
    animation: AnimationComponent;
    model: ModelComponent;
    movement: MovementComponent;
  };
};

export enum GameMessage {
  Authentication = 1,
  CreateGame = 2,
  GamesList = 3,
  JoinGame = 4,
  PlayerMove = 5,
  PlayerMessage = 6,
  MessageList = 7,
  GameStateUpdate = 8,
}

export enum GameError {
  Invalid = 252,
  Forbidden = 253,
  Unauthorized = 254,
  ServerError = 255,
}
