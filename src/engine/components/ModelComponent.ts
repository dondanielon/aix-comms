import { Box3, Group, Object3DEventMap } from 'three';
import { GLTF } from 'three/examples/jsm/Addons.js';

export class ModelComponent {
  public asset!: GLTF;
  public boundingBox!: Box3;
  public mesh!: Group<Object3DEventMap>;

  constructor(data: ModelComponent) {
    Object.assign(this, data);
  }
}
