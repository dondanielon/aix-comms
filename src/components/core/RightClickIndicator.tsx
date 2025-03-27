import { useRef, useEffect } from 'react';
import { MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import {
  DEFAULT_MESH_ROTATION,
  RIGHT_CLICK_INDICATOR_DURATION,
  RIGHT_CLICK_INDICATOR_RADIUS,
} from '@src/constants/game.constants';
import { useGameStore } from '@src/stores/game.store';

const RightClickIndicator: React.FC = () => {
  const rightClickIndicator = useGameStore((state) => state.rightClickIndicator);
  const materialRef = useRef<MeshBasicMaterial>(null);
  const startTime = useRef(Date.now());
  const setRightClickIndicator = useGameStore((state) => state.setRightClickIndicator);

  // Reset timer when position changes
  useEffect(() => {
    startTime.current = Date.now();
  }, [rightClickIndicator]);

  useFrame(() => {
    if (!materialRef.current) return;

    const elapsed = (Date.now() - startTime.current) / 1000;
    const progress = Math.min(elapsed / RIGHT_CLICK_INDICATOR_DURATION, 1);

    // Fade out the circle
    materialRef.current.opacity = 1 - progress;

    if (progress >= 1) {
      setRightClickIndicator(null);
    }
  });

  return (
    rightClickIndicator && (
      <mesh
        position={[rightClickIndicator.x, 0.01, rightClickIndicator.z]}
        rotation={[DEFAULT_MESH_ROTATION, 0, 0]}
      >
        <circleGeometry args={[RIGHT_CLICK_INDICATOR_RADIUS, 32]} />
        <meshBasicMaterial ref={materialRef} color={0x00ff00} transparent opacity={1} side={2} />
      </mesh>
    )
  );
};

export default RightClickIndicator;
