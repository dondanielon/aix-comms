import { lazy, Suspense, useState } from 'react';
import Loader from '../loader/Loader';

const Game = lazy(() => import('@ui-components/game/Game'));

function GameLoader() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = (x: boolean) => setIsLoading(x);

  return (
    <div>
      {isLoading && <Loader />} {/* Loader mientras se carga Three.js */}
      <Suspense fallback={<Loader />}>
        <Game loading={handleLoading} />
      </Suspense>
    </div>
  );
}

export default GameLoader;
