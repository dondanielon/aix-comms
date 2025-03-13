import { AnimationAction, AnimationMixer } from 'three';

export class AnimationComponent {
  public mixer!: AnimationMixer;
  public idle!: AnimationAction;
  public run!: AnimationAction;
  public tpose!: AnimationAction;
  public walk!: AnimationAction;
  public selectedMoveAnimation!: AnimationAction;

  constructor(data: AnimationComponent) {
    Object.assign(this, data);
  }
}
