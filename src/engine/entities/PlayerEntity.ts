import { AnimationComponent } from '../components/AnimationComponent';
import { ModelComponent } from '../components/ModelComponent';
import { MovementComponent } from '../components/MovementComponent';
import { PlayerEntityConfig } from '../types';
import { Entity } from './Entity';

export class PlayerEntity extends Entity {
  public username: string;

  public animation: AnimationComponent;
  public model: ModelComponent;
  public movement: MovementComponent;

  constructor(id: string, username: string, config: PlayerEntityConfig) {
    super(id);
    this.username = username;

    this.animation = new AnimationComponent(config.component.animation);
    this.model = new ModelComponent(config.component.model);
    this.movement = new MovementComponent(config.component.movement);
  }
}
