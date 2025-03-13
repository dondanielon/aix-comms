import { GameMessage } from '@engine/types';
import { useWebSocket } from '@hooks/useWebSocket';
import { useEffect } from 'react';
import { useGameStore } from '@src/stores/useGameStore';

import styles from './RoomsList.module.css';

function RoomsList() {
  const { gamesList } = useGameStore();
  const { isConnected, sendMessage } = useWebSocket();

  useEffect(() => {
    if (isConnected) {
      sendMessage(GameMessage.GamesList, '');
    }
  }, [isConnected]);

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
                <button className={`${styles.roomButton} ${styles.roomAdminButton}`}>Admin</button>
                <button className={`${styles.roomButton} ${styles.roomJoinButton}`}>Join</button>
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
