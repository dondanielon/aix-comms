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
import { WebSocketPlayer } from '@src/interfaces';
import { getModel } from '@src/services/assets.service';

export function setupTerrain(
  id: string,
  rotation: number,
  points: Array<{ x: number; y: number }>
): TerrainEntity {
  return new TerrainEntity(id, {
    rotation,
    points: points.map((point) => new Vector2(point.x, point.y)),
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

const findAnimations = (animations: AnimationClip[]) => ({
  idle: animations.find((animation) => animation.name === 'idle')!,
  run: animations.find((animation) => animation.name === 'fast-run')!,
  tpose: animations.find((animation) => animation.name === 'tpose')!,
  walk: animations.find((animation) => animation.name === 'walk')!,
  jump: animations.find((animation) => animation.name === 'jump')!,
});

export async function setupPlayers(
  players: Record<string, WebSocketPlayer>
): Promise<PlayerEntity[]> {
  const loader = new GLTFLoader();

  return Promise.all(
    Object.entries(players).map(async ([id, data]) => {
      let modelPath = '/src/assets/girl.glb';

      const modelBlob = await getModel(data.skin);
      if (modelBlob) {
        modelPath = URL.createObjectURL(modelBlob);
      }

      const model = await loader.loadAsync(modelPath);
      const mesh = model.scene;
      const mixer = new AnimationMixer(mesh);

      const animations = findAnimations(model.animations);
      const initialMoveAnimation = mixer.clipAction(animations.walk);

      mesh.scale.set(1, 1, 1);
      mesh.castShadow = true;
      mesh.position.set(0, 0, 0);

      return new PlayerEntity(id, data.username, {
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
    })
  );
}
