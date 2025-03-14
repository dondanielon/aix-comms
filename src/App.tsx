import Navbar from '@components/ui/navbar/Navbar';
import { useGameStore } from '@stores/game.store';
import { useUIStore } from '@stores/ui.store';
import GameLoader from '@components/core/game-loader/GameLoader';
import RoomsWindow from '@components/ui/rooms-window/RoomsWindow';
import Lobby from '@components/core/lobby/Lobby';

function UI() {
  const showRoomsWindow = useUIStore((store) => store.showRoomsWindow);
  return (
    <div>
      <Navbar />
      {showRoomsWindow && <RoomsWindow />}
    </div>
  );
}

function App() {
  const lobbyId = useGameStore((store) => store.lobbyId);
  return (
    <>
      <UI />
      {lobbyId ? <GameLoader /> : <Lobby />}
    </>
  );
}

export default App;
