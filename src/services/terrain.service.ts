import { Terrain } from '@src/interfaces';
import { http } from './config';
import { HttpStatusCode } from 'axios';

const baseUrl = '/v1/terrain';

export const TerrainService = {
  getTerrains: async (): Promise<{ terrains: Terrain[] } | null> => {
    const url = `${http.getUri()}${baseUrl}`;

    const response = await http.get(url, { responseType: 'json' });

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    return null;
  },
};
