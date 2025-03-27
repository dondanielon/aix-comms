import { useUIStore } from '@src/stores/ui.store';

const Navbar: React.FC = () => {
  const showRoomsWindow = useUIStore((store) => store.showRoomsWindow);
  const setShowRoomsWindow = useUIStore((store) => store.setShowRoomsWindow);

  return (
    <nav className='fixed bottom-8 right-8 bg-card rounded-[10px] p-[14px] shadow-md flex gap-2 z-9'>
      <button
        className='bg-main-ui text-card-foreground p-2.5 border-none rounded-[8px] text-sm transition-colors duration-200 hover:bg-main-ui/80'
        onClick={() => setShowRoomsWindow(!showRoomsWindow)}
      >
        Rooms
      </button>
    </nav>
  );
};

export default Navbar;
