import { useEffect, useState } from 'react';
import styles from './CreateRoom.module.css';
import { Terrain } from '@src/interfaces';
import { http } from '@src/services';
import { useWebSocket } from '@src/hooks/useWebSocket';
import { GameMessage } from '@src/engine/types';

function CreateRoom() {
  const { isConnected, sendMessage } = useWebSocket();
  const [terrains, setTerrains] = useState<Terrain[]>([]);
  const [name, setName] = useState('');
  const [selectedTerrain, setSelectedTerrain] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await http.get('/terrain');
        setTerrains(data.terrains);
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !selectedTerrain || !isConnected) {
      return;
    }

    sendMessage(GameMessage.CreateGame, JSON.stringify({ id: selectedTerrain, name }));
    setName('');
    setSelectedTerrain(null);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor='name'>
          <p>Name</p>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label htmlFor='terrain'>
          <p>Select terrain</p>
          <div className={styles.terrainList}>
            {terrains.map((terrain) => (
              <div
                key={terrain.id}
                className={`${styles.terrainItem} ${
                  selectedTerrain === terrain.id ? styles.selected : ''
                }`}
                onClick={() => setSelectedTerrain(terrain.id)}
              >
                {`${terrain.id} - ${terrain.name}`}
              </div>
            ))}
          </div>
        </label>

        <button type='submit' className={styles.button}>
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
