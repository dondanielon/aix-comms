import { CACHE_GAME_ASSETS_V1 } from '../constants/cache.constants';

export async function getAssetCache(): Promise<Cache> {
  return caches.open(CACHE_GAME_ASSETS_V1);
}
