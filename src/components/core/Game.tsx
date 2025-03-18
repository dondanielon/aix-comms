import { Canvas } from '@react-three/fiber';
import MovementSystem from './MovementSystem';
import CameraSystem from './CameraSystem';

const Game: React.FC = () => {
  return (
    <Canvas>
      <MovementSystem />
      <CameraSystem />
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
    </Canvas>
  );
};

export default Game;
