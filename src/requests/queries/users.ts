import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { GUSERS, FormatedDateUser } from 'models/GUSERS';

import { initializeApi } from 'services/api';

import { userMapper } from 'utils/mappers/userMapper';

type CountUsersResponse = {
  count: number;
};

export const listUsers = (
  session?: Session | null
): Promise<FormatedDateUser[]> => {
  const api = initializeApi(session);

  return api
    .get<GUSERS[]>('/users')
    .then((response) => response.data.map(userMapper));
};

export const countUsers = (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<CountUsersResponse>('/users/count')
    .then((response) => response.data);
};

export const useCountUsers = (session: Session | null) => {
  const key = `count-users`;
  const result = useQuery(key, () => countUsers(session));

  return { ...result, key };
};
