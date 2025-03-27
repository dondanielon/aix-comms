import { useGameStore } from '@stores/game.store';
import GameLoader from '@components/core/GameLoader';
import Lobby from '@src/components/core/Lobby';
import UI from '@components/ui/UI';

const App: React.FC = () => {
  const gameState = useGameStore((store) => store.gameState);

  return (
    <>
      <UI />
      {gameState ? <GameLoader /> : <Lobby />}
    </>
  );
};

export default App;
