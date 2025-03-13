import {
  CircleGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3DEventMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
} from 'three';
import { PlayerEntity } from '../entities/PlayerEntity';
import { TerrainEntity } from '../entities/TerrainEntity';

export class MovementSystem {
  private mouseRightClick: Vector2;
  private mouseRightClickEffect: Mesh<CircleGeometry, MeshBasicMaterial, Object3DEventMap> | null;
  private mouseRightClickEffectTimer: number;
  private raycaster: Raycaster;
  private targetPosition: Vector3;

  // public players: PlayerEntity[];

  public player: PlayerEntity;

  constructor(
    player: PlayerEntity,

    private canvas: HTMLCanvasElement,
    private scene: Scene,
    private camera: PerspectiveCamera,
    private terrain: TerrainEntity
  ) {
    this.mouseRightClick = new Vector2();
    this.mouseRightClickEffect = null;
    this.mouseRightClickEffectTimer = 0;
    this.raycaster = new Raycaster();
    this.targetPosition = new Vector3();

    this.addEventListeners();

    this.player = player;
  }

  public update(delta: number): void {
    // for (const player of this.players) {
    if (this.mouseRightClickEffect) {
      this.mouseRightClickEffectTimer -= delta;
      if (this.mouseRightClickEffectTimer <= 0) {
        this.scene.remove(this.mouseRightClickEffect);
        this.mouseRightClickEffect = null;
      } else {
        this.mouseRightClickEffect.material.opacity = Math.max(
          0,
          this.mouseRightClickEffectTimer / 1
        );
      }
    }

    if (this.player.movement.isMoving) {
      const direction = new Vector3()
        .subVectors(this.targetPosition, this.player.model.mesh.position)
        .normalize();
      const distance = this.player.movement.speed * delta;
      const step = direction.multiplyScalar(distance); // Calculates displacement based on speed and elapsed time

      if (this.player.model.mesh.position.distanceTo(this.targetPosition) > distance) {
        if (!this.player.animation.selectedMoveAnimation.isRunning()) {
          this.player.animation.idle.fadeOut(0.2);
          this.player.animation.selectedMoveAnimation.reset().fadeIn(0.2).play();
        }
        this.player.model.mesh.position.add(step);
      } else {
        this.player.model.mesh.position.copy(this.targetPosition);
        this.player.movement.isMoving = false;

        if (this.player.animation.selectedMoveAnimation.isRunning()) {
          this.player.animation.selectedMoveAnimation.fadeOut(0.2);
          this.player.animation.idle.reset().fadeIn(0.2).play();
        }
      }

      const targetRotation = Math.atan2(direction.x, direction.z);
      const currentRotationY = this.player.model.mesh.rotation.y;
      let diference = targetRotation - currentRotationY;

      if (diference > Math.PI) diference -= Math.PI * 2;
      if (diference < -Math.PI) diference += Math.PI * 2;

      const smoothAngle = currentRotationY + diference * 10 * delta;

      // this.player.mesh.rotation.y = MathUtils.euclideanModulo(smoothAngle, Math.PI * 2);
      this.player.model.mesh.rotation.y =
        MathUtils.euclideanModulo(smoothAngle + Math.PI, Math.PI * 2) - Math.PI;
    }

    this.player.model.boundingBox.setFromObject(this.player.model.mesh);
    this.player.animation.mixer.update(delta);
    // }
  }

  private addEventListeners(): void {
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      this.mouseRightClick.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseRightClick.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouseRightClick, this.camera);

      const intersects = this.raycaster.intersectObject(this.terrain.mesh);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        point.y = 0;
        console.log(point);
        if (this.player.model.mesh.position.distanceTo(point) < 0.2) return;

        this.targetPosition.copy(point);
        this.player.movement.isMoving = true;

        if (this.mouseRightClickEffect) {
          this.scene.remove(this.mouseRightClickEffect);
        }

        const geometry = new CircleGeometry(0.1, 15);
        const material = new MeshBasicMaterial({
          color: 0xff0000,
          opacity: 1,
          transparent: true,
        });

        this.mouseRightClickEffect = new Mesh(geometry, material);
        this.mouseRightClickEffect.position.set(point.x, 0 + 0.01, point.z);
        this.mouseRightClickEffect.rotation.x = -Math.PI / 2;
        this.scene.add(this.mouseRightClickEffect);

        this.mouseRightClickEffectTimer = 1;
      }
    });

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();

      const touch = e.touches[0];
      this.mouseRightClick.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouseRightClick.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mouseRightClick, this.camera);

      const intersects = this.raycaster.intersectObject(this.terrain.mesh);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        if (this.player.model.mesh.position.distanceTo(point) < 0.2) return;

        this.targetPosition.copy(point);
        this.player.movement.isMoving = true;

        if (this.mouseRightClickEffect) {
          this.scene.remove(this.mouseRightClickEffect);
        }

        const geometry = new CircleGeometry(0.1, 15);
        const material = new MeshBasicMaterial({
          color: 0xff0000,
          opacity: 1,
          transparent: true,
        });

        this.mouseRightClickEffect = new Mesh(geometry, material);
        this.mouseRightClickEffect.position.set(point.x, 0 + 0.01, point.z);
        this.mouseRightClickEffect.rotation.x = -Math.PI / 2;
        this.scene.add(this.mouseRightClickEffect);

        this.mouseRightClickEffectTimer = 1;
      }
    });

    window.addEventListener('keypress', (e) => {
      if (this.player.movement.isMoving) {
        if (e.key.toLowerCase() === ' ') {
          // TODO: Handle jump
        }

        return;
      }

      if (e.key.toLowerCase() === 'c') {
        const toggle = !this.player.movement.toggleRun;
        if (toggle) {
          this.player.animation.selectedMoveAnimation = this.player.animation.run;
          this.player.movement.speed = 2.2;
        } else {
          this.player.animation.selectedMoveAnimation = this.player.animation.walk;
          this.player.movement.speed = 1;
        }

        this.player.movement.toggleRun = !this.player.movement.toggleRun;
      }
    });
  }
}
