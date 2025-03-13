import { useEffect } from 'react';
import Navbar from '@ui-components/navbar/Navbar';
import Lobby from '@ui-components/lobby/Lobby';
import { useGameStore } from '@stores/useGameStore';
import { GameMessage } from '@engine/types';
import { useWebSocket } from '@hooks/useWebSocket';
import RoomsWindow from '@src/ui-components/rooms-window/RoomsWindow';
import { useUIStore } from './stores/useUIStore';
import Game from './ui-components/game/Game';

function App() {
  const { isConnected, sendMessage } = useWebSocket();
  const userId = useGameStore((state) => state.userId);
  const isInLobby = useGameStore((state) => state.isInLobby);
  const showRoomsWindow = useUIStore((state) => state.showRoomsWindow);

  useEffect(() => {
    if (!userId && isConnected) {
      const idToken = localStorage.getItem('x-id-token');
      sendMessage(GameMessage.Authentication, idToken ?? '');
    }
  }, [isConnected]);

  return (
    <>
      <Navbar />
      {isInLobby ? <Lobby /> : <Game />}
      {showRoomsWindow && <RoomsWindow />}
    </>
  );
}

export default App;
