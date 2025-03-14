import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import Terrain from '../terrain/Terrain';

const Game: React.FC<{ loading: (v: boolean) => void }> = (props) => {
  useEffect(() => {
    props.loading(false);
  }, []);

  return (
    <Canvas id='renderer' gl={{ antialias: true }}>
      <perspectiveCamera
        position={[10, 10, 10]}
        lookAt={[0, 0, 0]}
        args={[25, window.innerWidth / window.innerHeight, 0.1, 1000]}
      />
      <ambientLight args={[0x404040, 1]} castShadow={true} />
      <directionalLight args={[0xffffff, 1]} />
      <Terrain />
    </Canvas>
  );
};

export default Game;
