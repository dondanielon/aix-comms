import Navbar from '@components/ui/navbar/Navbar';
import { useGameStore } from '@stores/game.store';
import { useUIStore } from '@stores/ui.store';
import GameLoader from '@components/core/game-loader/GameLoader';
import Lobby from '@components/core/lobby/Lobby';
import Rooms from '@components/ui/Rooms';
import RoomsWindow from './components/ui/rooms-window/RoomsWindow';

function UI() {
  const showRoomsWindow = useUIStore((store) => store.showRoomsWindow);
  return (
    <div>
      <Navbar />
      {showRoomsWindow && (
        <>
          <Rooms />
          <RoomsWindow />
        </>
      )}
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
