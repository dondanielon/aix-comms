import { lazy, Suspense, useState } from 'react';
import Loader from '../../ui/loader/Loader';
import { useGameStore } from '@src/stores/game.store';

const Game = lazy(() => import('../game/$$Game'));

function GameLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const gameState = useGameStore((store) => store.state)!;

  const handleLoading = (x: boolean) => setIsLoading(x);

  return (
    <>
      {isLoading && <Loader />}
      {gameState && (
        <Suspense fallback={<Loader />}>
          <Game loading={handleLoading} />
        </Suspense>
      )}
    </>
  );
}

export default GameLoader;
