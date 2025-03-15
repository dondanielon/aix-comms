import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Input } from '@components/shadcn/input';
import { ScrollArea } from '@components/shadcn/scroll';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWebSocket } from '@src/hooks/websocket.hook';
import { GameEvent } from '@src/enums/game.enums';
import { Terrain } from '@src/interfaces';
import { TerrainService } from '@src/services/terrain.service';
import { Card } from '@components/shadcn/card';
import { Button } from '@components/shadcn/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/shadcn/form';
import { useUIStore } from '@src/stores/ui.store';

const formSchema = z.object({
  name: z.string().min(5, { message: 'Name must be at least 5 characters.' }),
  terrainId: z.string().nonempty('Select a terrain.'),
});

const CreateRoom: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const setShowRoomsWindow = useUIStore((state) => state.setShowRoomsWindow);
  const [terrains, setTerrains] = useState<Terrain[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await TerrainService.getTerrains();
      if (!res) {
        console.error('Error fetching terrains');
        return;
      }

      setTerrains(res.terrains);
    })();
  }, []);

  const onSubmit = ({ name, terrainId }: z.infer<typeof formSchema>) => {
    sendMessage(GameEvent.CreateGame, JSON.stringify({ id: terrainId, name }));
    setShowRoomsWindow(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      terrainId: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6' autoComplete='off'>
        <div className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room name</FormLabel>
                <FormControl>
                  <Input id='current' {...field} />
                </FormControl>
                <div className='h-1'>
                  <FormMessage className='text-[12px]' />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='terrainId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terrain Layout</FormLabel>
                <FormControl>
                  <ScrollArea className='custom-scrollbar'>
                    <div className='flex flex-col gap-2 h-[148px] overflow-y-auto p-0'>
                      {terrains.length &&
                        terrains.map((terrain) => (
                          <Card
                            key={terrain.id}
                            className={`terrain-item p-3 rounded-lg cursor-pointer bg-muted transition-colors duration-100 text-[12px] border border-muted hover:bg-main-ui hover:border-main-ui ${
                              selected === terrain.id ? 'bg-main-ui border-main-ui' : ''
                            }`}
                            onClick={() => {
                              if (selected === terrain.id) {
                                setSelected(null);
                                field.onChange('');
                              } else {
                                field.onChange(terrain.id);
                                setSelected(terrain.id);
                              }
                            }}
                          >
                            {terrain.id} - {terrain.name}
                          </Card>
                        ))}
                    </div>
                  </ScrollArea>
                </FormControl>
                <div className='h-1'>
                  <FormMessage className='text-[12px]' />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='cursor-pointer'>
          Create room
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoom;
