import Navbar from '@components/ui/navbar/Navbar';
import { useGameStore } from '@stores/game.store';
import { useUIStore } from '@stores/ui.store';
import GameLoader from '@components/core/game-loader/GameLoader';
import Lobby from '@components/core/lobby/Lobby';
import PublicRooms from '@src/components/ui/PublicRooms';

function UI() {
  const showRoomsWindow = useUIStore((store) => store.showRoomsWindow);
  return (
    <div>
      <Navbar />
      {showRoomsWindow && (
        <>
          <PublicRooms />
          {/* <RoomsWindow /> */}
        </>
      )}
    </div>
  );
}

function App() {
  const gameState = useGameStore((store) => store.gameState);

  return (
    <>
      <UI />
      {gameState ? <GameLoader /> : <Lobby />}
    </>
  );
}

export default App;
