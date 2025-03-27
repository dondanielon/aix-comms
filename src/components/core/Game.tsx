import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Terrain from './Terrain';
import { useGameStore } from '@src/stores/game.store';
import RightClickIndicator from './RightClickIndicator';
import Player from './Player';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import { Perf } from 'r3f-perf';

interface GameProps {
  setLoading: (value: boolean) => void;
}

const Game: React.FC<GameProps> = ({ setLoading }) => {
  const gameState = useGameStore((state) => state.gameState)!;

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    gameState && (
      <Canvas
        camera={{
          fov: 25,
          aspect: window.innerWidth / window.innerHeight,
          near: 0.1,
          far: 1000,
          position: [10, 10, 10],
        }}
      >
        <Perf position='bottom-left' />
        <color attach='background' args={['#ececec']} />
        <Terrain points={gameState.terrain.points} />
        {Object.values(gameState.players).map((player) => (
          <Player
            key={player.username}
            position={new Vector3(player.position.x, player.position.y, player.position.z)}
          />
        ))}
        <RightClickIndicator />
        <Environment preset='sunset' />
        <OrbitControls />
        <ContactShadows blur={2} />
        <ambientLight intensity={0.3} castShadow={true} />
      </Canvas>
    )
  );
};

export default Game;
