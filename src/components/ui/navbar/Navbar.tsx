import styles from './Navbar.module.css';
import { useUIStore } from '@src/stores/ui.store';
import { http } from '@src/services/config';

function Navbar() {
  const showRoomsWindow = useUIStore((store) => store.showRoomsWindow);
  const setShowRoomsWindow = useUIStore((store) => store.setShowRoomsWindow);

  const getToken = async () => {
    const response = await http.post(
      '/user/login',
      {
        email: 'admin@tyenet.com',
        password: 'Secure1',
      },
      { withCredentials: true }
    );

    localStorage.setItem('x-access-token', response.data.accessToken);
    localStorage.setItem('x-id-token', response.data.idToken);
  };

  return (
    <nav className={styles.container}>
      <button className={styles.button} onClick={() => setShowRoomsWindow(!showRoomsWindow)}>
        Rooms
      </button>
      <button className={styles.button} onClick={() => getToken()}>
        Update jwt
      </button>
    </nav>
  );
}

export default Navbar;
