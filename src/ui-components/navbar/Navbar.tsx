import styles from './Navbar.module.css';
import { useUIStore } from '@src/stores/useUIStore';
import { http } from '@src/services';

function Navbar() {
  const { showRoomsWindow, setShowRoomsWindow } = useUIStore();

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
