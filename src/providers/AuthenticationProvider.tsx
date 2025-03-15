import { useEffect } from 'react';
import { useGameStore } from '@src/stores/game.store';
import { useWebSocket } from '@src/hooks/websocket.hook';
import { GameEvent } from '@enums/game.enums';

const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const user = useGameStore((store) => store.user);
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    if (!user) {
      const idToken = localStorage.getItem('x-id-token') ?? '';
      sendMessage(GameEvent.Authentication, idToken);
    }
  }, []);

  return user && props.children;
};

export default AuthenticationProvider;
