import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { useGameStore } from '@src/stores/game.store';
import { Raycaster, Vector2 } from 'three';
import Player from '../player/Player';
import Terrain from '../terrain/Terrain';

interface PlayerControls {
  setMovementTarget: (x: number, y: number, z: number) => void;
  toggleRunning: () => void;
}

declare global {
  interface Window {
    playerControls?: PlayerControls;
  }
}

function Scene() {
  const { camera } = useThree();
  const raycaster = useRef(new Raycaster());
  const mouseRightClick = useRef(new Vector2());
  const { user, gameState } = useGameStore((state) => ({
    user: state.user,
    gameState: state.gameState,
  }));

  useEffect(() => {
    if (!gameState?.terrain?.mesh || !user) return;
    const terrainMesh = gameState.terrain.mesh;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      mouseRightClick.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRightClick.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.current.setFromCamera(mouseRightClick.current, camera);

      const intersects = raycaster.current.intersectObject(terrainMesh, false);
      if (intersects.length > 0 && window.playerControls) {
        const point = intersects[0].point;
        window.playerControls.setMovementTarget(point.x, 0, point.z);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'c' && window.playerControls) {
        window.playerControls.toggleRunning();
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [camera, gameState, user]);

  if (!gameState || !user) return null;

  return (
    <>
      <perspectiveCamera
        position={[10, 10, 10]}
        fov={25}
        aspect={window.innerWidth / window.innerHeight}
        near={0.1}
        far={1000}
      />
      <ambientLight args={[0x404040, 1]} castShadow />
      <directionalLight
        args={[0xffffff, 1]}
        position={[0, 10, 10]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Terrain />
      {Object.entries(gameState.players).map(([id, player]) => (
        <Player
          key={id}
          id={id}
          username={player.username}
          skin={player.skin}
          isMainPlayer={id === user.id}
        />
      ))}
    </>
  );
}

const Game: React.FC<{ loading: (v: boolean) => void }> = ({ loading }) => {
  useEffect(() => {
    loading(false);
  }, [loading]);

  return (
    <Canvas shadows gl={{ antialias: true }} className='fixed top-0 left-0 w-full h-full z-[1]'>
      <Scene />
    </Canvas>
  );
};

export default Game;
