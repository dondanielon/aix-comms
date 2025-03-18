import { useEffect, useRef } from 'react';
import { AnimationMixer, Group, Vector3 } from 'three';
import { DEFAULT_SPEED } from '@src/constants/game.constants';
import { PlayerAnimations, PlayerProps } from '@src/types/game.types';

const Player: React.FC<PlayerProps> = ({ initialPosition = [0, 0, 0], gltf }) => {
  const model = useRef<Group>(null);
  const mixer = useRef<AnimationMixer>(null);
  const animations = useRef<PlayerAnimations>(null);

  // const isMoving = useRef(false);
  // const speed = useRef(DEFAULT_SPEED);
  // const targetPosition = useRef<Vector3 | null>(null);

  useEffect(() => {
    if (!model.current || !gltf.animations.length) return;

    mixer.current = new AnimationMixer(model.current);
    animations.current = {
      idle: mixer.current.clipAction(gltf.animations.find((a) => a.name === 'idle')!),
      run: mixer.current.clipAction(gltf.animations.find((a) => a.name === 'fast-run')!),
      tpose: mixer.current.clipAction(gltf.animations.find((a) => a.name === 'tpose')!),
      walk: mixer.current.clipAction(gltf.animations.find((a) => a.name === 'walk')!),
      jump: mixer.current.clipAction(gltf.animations.find((a) => a.name === 'jump')!),
    };

    animations.current.idle.play();

    return () => {
      mixer.current?.stopAllAction();
    };
  }, []);

  return (
    <group ref={model} position={initialPosition}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Player;
