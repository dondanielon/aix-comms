import { useGameStore } from '@src/stores/game.store';
import { Point2D } from '@src/types/game.types';
import { useEffect, useRef } from 'react';
import { Mesh, Shape, Vector2 } from 'three';

const Terrain = () => {
  const meshRef = useRef<Mesh>(null);
  const gameState = useGameStore((state) => state.gameState);
  const setGameState = useGameStore((state) => state.setGameState);

  useEffect(() => {
    if (gameState && meshRef.current) {
      setGameState({
        ...gameState,
        terrain: {
          mesh: meshRef.current,
        },
      });
    }
  }, [gameState, meshRef.current]);

  if (!gameState) return null;

  const shape = new Shape(gameState.terrainPoints.map(({ x, y }: Point2D) => new Vector2(x, y)));

  return (
    <mesh
      ref={meshRef}
      receiveShadow
      position={[0, 0, 0]}
      rotation={[gameState.terrainRotation, 0, 0]}
    >
      <extrudeGeometry args={[shape, { steps: 2, depth: -0.1, bevelEnabled: false }]} />
      <meshToonMaterial side={1} color={0xb0c4de} />
    </mesh>
  );
};

export default Terrain;
