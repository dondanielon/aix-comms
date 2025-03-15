import { useEffect, useState } from 'react';
import { useUIStore } from '@src/stores/ui.store';
import styles from './RoomsWindow.module.css';
import RoomsList from '../rooms-list/RoomsList';
import { XIcon } from '../Icons';

function RoomsWindow() {
  const { setShowRoomsWindow } = useUIStore();
  const [selected, setSelected] = useState<'L' | 'CR'>('L');
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: window.innerWidth - 482,
    y: window.innerHeight - 512,
  });

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    // Window without overflow solution
    // const containerWidth = 500;
    // const containerHeigth = 400;
    // let newX = e.clientX - start.x;
    // let newY = e.clientY - start.y;
    // newX = Math.max(0, Math.min(newX, window.innerWidth - containerWidth));
    // newY = Math.max(0, Math.min(newY, window.innerHeight - containerHeigth));

    // Window with overflow solution
    const newX = e.clientX - start.x;
    let newY = e.clientY - start.y;

    newY = Math.max(0, Math.min(newY, window.innerHeight));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className={styles.container}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <section
        className={styles.header}
        onMouseDown={handleMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <p className={styles.title}>Public Rooms</p>
        <button className={styles.closeButton} onClick={() => setShowRoomsWindow(false)}>
          <XIcon className={styles.closeIcon} />
        </button>
      </section>

      <section className={styles.selector}>
        <button
          className={`${styles.tabButton} ${selected === 'L' ? styles.active : ''}`}
          onClick={() => setSelected('L')}
        >
          List
        </button>
      </section>

      <div className={styles.content}>
        <RoomsList />{' '}
      </div>
    </div>
  );
}

export default RoomsWindow;
