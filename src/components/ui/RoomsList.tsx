import { useEffect } from 'react';
import { Input } from '@components/shadcn/input';
import { useGameStore } from '@stores/game.store';
import { GameEvent } from '@enums/game.enums';
import { useWebSocket } from '@hooks/websocket.hook';
import { Users, BookUser, ArrowBigRightDash } from 'lucide-react';
import { Card, CardContent } from '../shadcn/card';
import { Label } from '../shadcn/label';

const RoomsList: React.FC = () => {
  const gamesList = useGameStore((state) => state.gamesList);
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    sendMessage(GameEvent.GamesList, '');
  }, []);

  const onJoin = (id: string) => {
    sendMessage(GameEvent.JoinGame, id);
  };

  return (
    <div className='w-full'>
      <div className='flex items-center gap-3  mb-6'>
        <Input placeholder='Filter rooms...' />
      </div>
      <div className='rounded-md border'>
        {gamesList.map((gameInfo) => (
          <Card key={gameInfo.id} className='hover:bg-muted rounded-md'>
            <CardContent className='flex items-center justify-between'>
              <div className='flex items-center gap-5'>
                <div className='flex gap-1 items-center justify-center text-main-green text-[12px]'>
                  {gameInfo.playerCount}
                  <Users className='w-4' />
                </div>
                <div className='flex flex-col content-center gap-2'>
                  <Label>{gameInfo.name}</Label>
                  <Label className='flex items-center content-center text-[12px] text-ring'>
                    <p className='text-main-ui text-[12px]'>Host: </p>
                    {gameInfo.host}
                  </Label>
                </div>
              </div>
              <div className='flex items-center gap-1'>
                <button className='bg-amber-600 flex p-1 rounded-[6px] items-center justify-center cursor-pointer'>
                  <BookUser className='w-5 h-5' />
                </button>
                <button
                  onClick={() => onJoin(gameInfo.id)}
                  className='bg-blue-600 flex p-1 rounded-[6px] items-center justify-center cursor-pointer'
                >
                  <ArrowBigRightDash className='w-5 h-5' />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
