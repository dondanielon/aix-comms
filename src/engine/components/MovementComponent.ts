import { Vector3 } from 'three';

export class MovementComponent {
  public isMoving!: boolean;
  public speed!: number;
  public targetPosition!: Vector3;
  public toggleRun!: boolean;

  constructor(data: MovementComponent) {
    Object.assign(this, data);
  }
}
