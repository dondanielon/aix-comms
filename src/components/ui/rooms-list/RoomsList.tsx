import { useWebSocket } from '@src/hooks/websocket.hook';
import { useEffect } from 'react';
import { useGameStore } from '@src/stores/game.store';
import { AdminIcon, JoinIcon } from '../Icons';
import { GameEvent } from '@enums/game.enums';

import styles from './RoomsList.module.css';

const isAdmin = true;

function RoomsList() {
  const { gamesList, setLobbyId } = useGameStore();
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    sendMessage(GameEvent.GamesList, '');
  }, []);

  const handleJoin = (id: string) => {
    sendMessage(GameEvent.JoinGame, id);
    setLobbyId(id);
  };

  return (
    <div className={styles.container}>
      {gamesList?.length ? (
        <ul className={styles.list}>
          {gamesList.map((item) => (
            <li key={item.id} className={styles.room}>
              <div className={styles.left}>
                <span className={styles.playerCount}>{item.playerCount}</span>
                <div className={styles.details}>
                  <p className={styles.roomName}>{item.name}</p>
                  <p className={styles.hostName}>Host: {item.host}</p>
                </div>
              </div>
              <div className={styles.right}>
                {isAdmin && (
                  <button className={`${styles.roomButton} ${styles.roomAdminButton}`}>
                    <AdminIcon className={styles.roomAdminIcon} />
                  </button>
                )}
                <button
                  className={`${styles.roomButton} ${styles.roomJoinButton}`}
                  onClick={() => handleJoin(item.id)}
                >
                  <JoinIcon className={styles.roomJoinIcon} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyMessage}>No games available.</p>
      )}
    </div>
  );
}

export default RoomsList;
