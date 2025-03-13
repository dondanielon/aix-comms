import { useEffect } from 'react';
import Navbar from '@ui-components/navbar/Navbar';
import Lobby from '@ui-components/lobby/Lobby';
import { useGameStore } from '@stores/useGameStore';
import { GameMessage } from '@engine/types';
import { useWebSocket } from '@hooks/useWebSocket';
import RoomsWindow from '@src/ui-components/rooms-window/RoomsWindow';
import { useUIStore } from './stores/useUIStore';
import GameLoader from './ui-components/game-loader/GameLoader';

function UI() {
  const showRoomsWindow = useUIStore((state) => state.showRoomsWindow);
  return (
    <div>
      <Navbar />
      {showRoomsWindow && <RoomsWindow />}
    </div>
  );
}

function App() {
  const { isConnected, sendMessage } = useWebSocket();
  const userId = useGameStore((state) => state.userId);
  const isInLobby = useGameStore((state) => state.isInLobby);

  useEffect(() => {
    if (!userId && isConnected) {
      const idToken = localStorage.getItem('x-id-token');
      sendMessage(GameMessage.Authentication, idToken ?? '');
    }
  }, [isConnected]);

  return (
    <>
      <UI />
      {isInLobby ? <Lobby /> : <GameLoader />}
    </>
  );
}

export default App;
