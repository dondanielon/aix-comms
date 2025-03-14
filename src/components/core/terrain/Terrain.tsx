import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@src/stores/game.store';
import { useRef } from 'react';
import { Mesh, Vector2 } from 'three';

const Terrain: React.FC = () => {
  const state = useGameStore((store) => store.state)!;
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      receiveShadow={true}
      position={[0, 0, 0]}
      rotation={[state.terrainRotation, 0, 0]}
    >
      <extrudeGeometry args={[undefined, { steps: 2, depth: -0.1, bevelEnabled: true }]}>
        <shape args={[state.terrainPoints.map(({ x, y }) => new Vector2(x, y))]} />
      </extrudeGeometry>
      <meshToonMaterial side={1}>
        <color args={[0xb0c4de]} />
      </meshToonMaterial>
    </mesh>
  );
};

export default Terrain;
