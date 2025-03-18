import { useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { AnimationAction, AnimationMixer, Group, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

interface PlayerProps {
  id: string;
  username: string;
  skin: string;
  position?: [number, number, number];
  isMainPlayer?: boolean;
}

interface PlayerAnimations {
  idle: AnimationAction;
  run: AnimationAction;
  tpose: AnimationAction;
  walk: AnimationAction;
  jump: AnimationAction;
}

const Player = ({ skin, position = [0, 0, 0], isMainPlayer = false }: PlayerProps) => {
  const modelRef = useRef<Group>(null);
  const mixerRef = useRef<AnimationMixer>();
  const animationsRef = useRef<PlayerAnimations>();
  const modelPath = skin || '/src/assets/girl.glb';
  const gltf = useLoader(GLTFLoader, modelPath);
  const targetPosition = useRef(new Vector3(position[0], position[1], position[2]));
  const isMoving = useRef(false);
  const speed = useRef(1);
  const isRunning = useRef(false);

  const setMovementTarget = (x: number, y: number, z: number) => {
    targetPosition.current.set(x, y, z);
    isMoving.current = true;

    if (animationsRef.current) {
      const currentAnimation = isRunning.current
        ? animationsRef.current.run
        : animationsRef.current.walk;
      animationsRef.current.idle.fadeOut(0.2);
      currentAnimation.reset().fadeIn(0.2).play();
    }
  };

  const toggleRunning = () => {
    isRunning.current = !isRunning.current;
    speed.current = isRunning.current ? 2.2 : 1;
  };

  useEffect(() => {
    if (!modelRef.current || !gltf.animations.length) return;

    mixerRef.current = new AnimationMixer(modelRef.current);
    animationsRef.current = {
      idle: mixerRef.current.clipAction(gltf.animations.find((a) => a.name === 'idle')!),
      run: mixerRef.current.clipAction(gltf.animations.find((a) => a.name === 'fast-run')!),
      tpose: mixerRef.current.clipAction(gltf.animations.find((a) => a.name === 'tpose')!),
      walk: mixerRef.current.clipAction(gltf.animations.find((a) => a.name === 'walk')!),
      jump: mixerRef.current.clipAction(gltf.animations.find((a) => a.name === 'jump')!),
    };

    animationsRef.current.idle.play();

    return () => {
      mixerRef.current?.stopAllAction();
    };
  }, [gltf.animations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);

    if (isMoving.current && modelRef.current) {
      const currentPos = modelRef.current.position;
      const direction = new Vector3().subVectors(targetPosition.current, currentPos).normalize();
      const distance = speed.current * delta;
      const step = direction.multiplyScalar(distance);

      if (currentPos.distanceTo(targetPosition.current) > distance) {
        currentPos.add(step);

        // Rotate player to face movement direction
        const targetRotation = Math.atan2(direction.x, direction.z);
        const currentRotation = modelRef.current.rotation.y;
        let difference = targetRotation - currentRotation;

        if (difference > Math.PI) difference -= Math.PI * 2;
        if (difference < -Math.PI) difference += Math.PI * 2;

        modelRef.current.rotation.y += difference * 10 * delta;
      } else {
        currentPos.copy(targetPosition.current);
        isMoving.current = false;

        if (animationsRef.current) {
          const currentAnimation = isRunning.current
            ? animationsRef.current.run
            : animationsRef.current.walk;
          currentAnimation.fadeOut(0.2);
          animationsRef.current.idle.reset().fadeIn(0.2).play();
        }
      }
    }
  });

  // Expose methods for external control
  (window as any).playerControls = isMainPlayer
    ? {
        setMovementTarget,
        toggleRunning,
      }
    : undefined;

  return (
    <group ref={modelRef} position={position}>
      <primitive object={gltf.scene} />
      {isMainPlayer && <pointLight intensity={1} distance={10} color={0xffffff} />}
    </group>
  );
};

export default Player;
