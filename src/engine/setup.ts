import {
  AmbientLight,
  AnimationClip,
  AnimationMixer,
  Box3,
  DirectionalLight,
  Vector2,
  Vector3,
} from 'three';
import { TerrainEntity } from './entities/TerrainEntity';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { PlayerEntity } from './entities/PlayerEntity';

export function setupTerrain(): TerrainEntity {
  return new TerrainEntity('terrain-id', {
    rotation: -Math.PI / 2,
    points: ['0:0', '10:0', '10:10', '20:10', '20:20', '0:20', '0:0'].map((point) => {
      const [x, y] = point.split(':');
      return new Vector2(Number(x), Number(y));
    }),
  });
}

export function setupLighting() {
  const directionalLight = new DirectionalLight(0xffffff, 1);
  const ambientLight = new AmbientLight(0x404040, 1);
  const shadowCamera = directionalLight.shadow.camera;

  directionalLight.position.set(0, 10, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1_024;
  directionalLight.shadow.mapSize.height = 1_024;
  shadowCamera.left = -50;
  shadowCamera.right = -50;
  shadowCamera.top = -50;
  shadowCamera.bottom = -50;
  shadowCamera.near = -50;
  shadowCamera.far = -50;

  return { directionalLight, ambientLight };
}

export async function setupPlayer() {
  const loader = new GLTFLoader();
  const model = await loader.loadAsync('/src/assets/girl.glb');
  const mesh = model.scene;
  const mixer = new AnimationMixer(mesh);

  const findAnimations = (animations: AnimationClip[]) => ({
    idle: animations.find((animation) => animation.name === 'idle')!,
    run: animations.find((animation) => animation.name === 'fast-run')!,
    tpose: animations.find((animation) => animation.name === 'tpose')!,
    walk: animations.find((animation) => animation.name === 'walk')!,
    jump: animations.find((animation) => animation.name === 'jump')!,
  });

  const animations = findAnimations(model.animations);
  const initialMoveAnimation = mixer.clipAction(animations.walk);

  mesh.scale.set(1, 1, 1);
  mesh.castShadow = true;
  mesh.position.set(0, 0, 0);

  return new PlayerEntity('player-id', 'danvr', {
    component: {
      animation: {
        idle: mixer.clipAction(animations.idle),
        run: mixer.clipAction(animations.run),
        tpose: mixer.clipAction(animations.tpose),
        walk: mixer.clipAction(animations.walk),
        selectedMoveAnimation: initialMoveAnimation,
        mixer,
      },
      movement: { isMoving: false, speed: 1, targetPosition: new Vector3(), toggleRun: false },
      model: { asset: model, boundingBox: new Box3().setFromObject(mesh), mesh },
    },
  });
}
