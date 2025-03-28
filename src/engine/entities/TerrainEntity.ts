import {
  Box3,
  Color,
  ExtrudeGeometry,
  Mesh,
  MeshToonMaterial,
  Shape,
  type Object3DEventMap,
} from 'three';
import { TerrainConfig } from '../types';
import { Entity } from './Entity';

export class TerrainEntity extends Entity {
  public mesh: Mesh<ExtrudeGeometry, MeshToonMaterial, Object3DEventMap>;
  public collision: Box3;

  constructor(id: string, config: TerrainConfig) {
    super(id);
    // const textureLoader = new TextureLoader();
    // const woodFloorTexture = textureLoader.load('/textures/hardwood.jpg');
    // woodFloorTexture.wrapS = RepeatWrapping;
    // woodFloorTexture.wrapT = RepeatWrapping;
    // woodFloorTexture.repeat.set(1, 1);

    const extrudeSettings = {
      steps: 2, // Number of subdivisions
      depth: -0.1, // Depth of the extrusion (platform height)
      bevelEnabled: false, // Adds a bevel around the edges
    };

    const shape = new Shape(config.points);
    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    const material = new MeshToonMaterial({
      // map: woodFloorTexture,
      side: 1,
      color: new Color(0xb0c4de),
    });

    this.mesh = new Mesh(geometry, material);
    this.mesh.receiveShadow = true;
    this.mesh.rotation.x = config.rotation;

    this.mesh.position.set(0, 0, 0);

    this.collision = new Box3().setFromObject(this.mesh);
  }
}
