import { useEffect, useMemo, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three/examples/jsm/Addons.js';
import { useFrame, useGraph, useThree } from '@react-three/fiber';

interface PlayerProps {
  position: Vector3;
}

const Player: React.FC<PlayerProps> = ({ ...props }) => {
  const playerRef = useRef<Group>(null);
  const { scene, animations } = useGLTF('/girl.glb');
  const { actions } = useAnimations(animations, playerRef);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animation, _setAnimation] = useState<string>('idle');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);
  const position = useMemo(() => props.position, []);
  const clock = useThree((state) => state.clock);
  const camera = useThree((state) => state.camera);

  console.log(clock.getDelta());
  console.log(clock.elapsedTime);

  useFrame(() => {
    if (playerRef.current && playerRef.current.position.distanceTo(props.position) > 0.1) {
      const direction = playerRef.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(50 * clock.getDelta());

      playerRef.current.position.sub(direction);
      playerRef.current.lookAt(props.position);
      camera.position.set(
        playerRef.current.position.x + 10,
        playerRef.current.position.y + 10,
        playerRef.current.position.z + 10
      );
      camera.lookAt(playerRef.current.position);
    }
  });

  useEffect(() => {
    actions[animation]?.reset().play();

    return () => {
      actions[animation]?.fadeOut(0.5);
    };
  }, [animation]);

  return (
    <group ref={playerRef} position={position}>
      <primitive object={nodes.girl} />
    </group>
  );
};

useGLTF.preload('/girl.glb');

export default Player;
