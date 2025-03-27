import { useUIStore } from '@src/stores/ui.store';
import PublicRooms from './PublicRooms';
import Navbar from './Navbar';

const UI: React.FC = () => {
  const showRoomsWindow = useUIStore((state) => state.showRoomsWindow);

  return (
    <div>
      <Navbar />
      {showRoomsWindow && <PublicRooms />}
    </div>
  );
};

export default UI;
