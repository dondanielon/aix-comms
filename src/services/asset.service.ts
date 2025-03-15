import { getAssetCache } from '@src/utils/cache.utils';
import { http } from './config';
import { HttpStatusCode } from 'axios';

const baseUrl = '/assets';

export const AssetService = {
  getModel: async (id: string): Promise<Blob | null> => {
    const url = `${http.getUri()}${baseUrl}/models/${id}`;
    const cache = await getAssetCache();

    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      return blob;
    }

    console.log('⬇️ Fetching model from server:', url);

    const response = await http.get(url, { responseType: 'arraybuffer' });

    console.log(`Response status: ${response.status}`);

    if (response.status === HttpStatusCode.Ok) {
      const blob = new Blob([response.data], { type: 'model/gltf-binary' });

      const cachedResponse = new Response(blob);
      await cache.put(url, cachedResponse);

      return blob;
    }

    return null;
  },
};
