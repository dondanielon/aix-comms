import { PerspectiveCamera, Vector3 } from 'three';
import { PlayerEntity } from '../entities/PlayerEntity';

export class CameraSystem {
  private camera: PerspectiveCamera;
  private player: PlayerEntity;

  public cX = 10;
  public cY = 10;
  public cZ = 10;

  constructor(camera: PerspectiveCamera, player: PlayerEntity) {
    this.camera = camera;
    this.camera.position.set(0, 0, 0);

    this.player = player;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_delta: number): void {
    const position = this.player.model.mesh.position;
    const v = {
      x: position.x + this.cX,
      y: position.y + this.cY,
      z: position.z + this.cZ,
    };

    // this.camera.position.lerp(v, CAMERA_SYSTEM_POSITION_LERP_ALPHA);
    this.camera.position.set(v.x, v.y, v.z);
    this.camera.lookAt(new Vector3(position.x, position.y + 0.7, position.z));
  }
}
