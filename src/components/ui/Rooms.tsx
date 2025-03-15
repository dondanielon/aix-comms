import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@components/shadcn/input';
import { Label } from '@components/shadcn/label';
import { useUIStore } from '@stores/ui.store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/shadcn/tabs';
import { Card, CardContent } from '@components/shadcn/card';
import CreateRoom from './CreateRoom';

const Rooms: React.FC = () => {
  const setShowRoomsWindow = useUIStore((state) => state.setShowRoomsWindow);
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({
    x: window.innerWidth - 482,
    y: window.innerHeight - 512,
  });

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    } else {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const onMouseMove = (e: MouseEvent) => {
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

  const onMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className='absolute w-[450px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] overflow-hidden select-none transition-shadow duration-200 ease-in-out z-10 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] rounded-xl bg-main-ui text-card-foreground'
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <section
        className='flex justify-between items-center px-6  h-[40px]'
        onMouseDown={onMouseDown}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        <Label htmlFor='current'>Public Rooms</Label>
        <button
          onClick={() => setShowRoomsWindow(false)}
          className='bg-transparent border-none text-card-foreground cursor-pointer transition-colors duration-200 ease-in-out flex p-0 rounded-[5px] hover:text-[#ddd] hover:bg-muted'
        >
          <X size={20} />
        </button>
      </section>
      <Tabs defaultValue='rooms-list'>
        <TabsList className='grid w-full grid-cols-2 px-3'>
          <TabsTrigger value='rooms-list'>List</TabsTrigger>
          <TabsTrigger value='create-room'>Create Room</TabsTrigger>
        </TabsList>
        <TabsContent value='rooms-list'>
          <Card className='rounded-t-none'>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' defaultValue='Pedro Duarte' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='username'>Username</Label>
                <Input id='username' defaultValue='@peduarte' />
              </div>
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

export default Rooms;
