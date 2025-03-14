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
