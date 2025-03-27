import { lazy, Suspense, useState } from 'react';
import Loader from '@src/components/ui/Loader';

const Game = lazy(() => import('@src/components/core/Game'));

const GameLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <Game setLoading={(x: boolean) => setLoading(x)} />
      </Suspense>
    </>
  );
};

export default GameLoader;
