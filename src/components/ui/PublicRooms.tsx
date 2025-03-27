import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Label } from '@components/shadcn/label';
import { useUIStore } from '@stores/ui.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/shadcn/tabs';
import { Card, CardContent } from '@components/shadcn/card';
import CreateRoom from './CreateRoom';
import RoomsList from './RoomsList';

const PublicRooms: React.FC = () => {
  const setShowRoomsWindow = useUIStore((state) => state.setShowRoomsWindow);
  const position = useRef({
    x: window.innerWidth - 482,
    y: window.innerHeight - 512,
  });
  const start = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    start.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;

    const newX = e.clientX - start.current.x;
    let newY = e.clientY - start.current.y;

    newY = Math.max(
      0,
      Math.min(newY, window.innerHeight - (containerRef.current?.offsetHeight || 0))
    );

    position.current = { x: newX, y: newY };

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='absolute w-[350px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden select-none transition-shadow duration-200 ease-in-out z-10 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] rounded-xl  text-card-foreground'
      style={{ transform: `translate(${position.current.x}px, ${position.current.y}px)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <section
        className='flex justify-between items-center h-[40px] bg-card'
        onMouseDown={onMouseDown}
      >
        <Label htmlFor='current' className='ml-4'>
          Hotel
        </Label>
        <button
          className='bg-transparent border-none text-card-foreground transition-colors duration-200 ease-in-out flex p-[1px] rounded-[5px] hover:text-[#ddd] hover:bg-destructive mr-3'
          onClick={() => setShowRoomsWindow(false)}
        >
          <X size={20} />
        </button>
      </section>
      <Tabs defaultValue='rooms-list'>
        <TabsList className='grid w-full grid-cols-2 px-4'>
          <TabsTrigger value='rooms-list'>List</TabsTrigger>
          <TabsTrigger value='create-room'>Create Room</TabsTrigger>
        </TabsList>
        <TabsContent value='rooms-list'>
          <Card className='rounded-t-none'>
            <CardContent className='space-y-2'>
              <RoomsList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='create-room'>
          <Card className='rounded-t-none'>
            <CardContent className='space-y-4'>
              <CreateRoom />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PublicRooms;
