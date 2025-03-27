import { Color, ExtrudeGeometry, MeshToonMaterial, Shape, Vector2 } from 'three';
import { TerrainProps } from '@src/types/game.types';
import { ThreeEvent } from '@react-three/fiber';
import { useGameStore } from '@src/stores/game.store';
import { useWebSocket } from '@src/hooks/websocket.hook';
import { GameEvent } from '@src/enums/game.enums';

const Terrain: React.FC<TerrainProps> = ({ points }) => {
  const setRightClickIndicator = useGameStore((state) => state.setRightClickIndicator);
  const gameState = useGameStore((state) => state.gameState)!;
  const user = useGameStore((state) => state.user)!;
  const { sendMessage } = useWebSocket();

  const extrudeSettings = {
    steps: 2,
    depth: -0.1,
    bevelEnabled: false,
  };

  const shape = new Shape(points.map((point) => new Vector2(point.x, point.y)));
  const geometry = new ExtrudeGeometry(shape, extrudeSettings);
  const material = new MeshToonMaterial({
    side: 1,
    color: new Color(0xb0c4de),
  });

  const onRightClick = (e: ThreeEvent<MouseEvent>) => {
    const player = gameState.players[user.id];
    if (!player) return;

    e.point.y = 0;
    setRightClickIndicator(e.point);

    sendMessage(GameEvent.PlayerMove, JSON.stringify({ position: e.point }));
  };

  return (
    <mesh
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[-5, -0.001, 5]}
      receiveShadow={true}
      onContextMenu={onRightClick}
    />
  );
};

export default Terrain;
