import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { GACCESSUSERSMODULES } from 'models/GACCESSUSERSMODULES';

import { initializeApi } from 'services/api';

type ListAccessModulesFilters = {
  GACCESSLEVELS_ID?: string;
};

export const listAccessModules = (
  session: Session | null,
  filters: ListAccessModulesFilters = {}
) => {
  const api = initializeApi(session);

  return api
    .get<GACCESSUSERSMODULES[]>('/app/access-modules', { params: filters })
    .then((response) => response.data);
};

export const useListAccessModules = (
  session: Session | null,
  filters: ListAccessModulesFilters = {}
) => {
  const key = `list-access-modules-${JSON.stringify(filters)}`;

  const result = useQuery(key, () => listAccessModules(session, filters));

  return { ...result, key };
};
