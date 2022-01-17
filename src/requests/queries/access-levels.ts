import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { GACCESSLEVELS } from 'models/GACCESSLEVELS';

import { initializeApi } from 'services/api';

export const listAccessLevels = (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<GACCESSLEVELS[]>('/app/access-levels')
    .then((response) => response.data);
};

export const useListAccessLevels = (session?: Session | null) => {
  return useQuery('get-access-levels', () => listAccessLevels(session));
};
