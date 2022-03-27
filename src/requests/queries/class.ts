import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { initializeApi } from 'services/api';
import { classMapper } from 'utils/mappers/classMapper';

import { ECLASS } from 'models/ECLASS';

type ListClassesFilters = {
  ID?: string;
  ECLASSTYPE_ID?: string;
  NAME?: string;
  DESCRIPTION?: string;
};

export const listClasses = async (
  session: Session | null,
  filters: ListClassesFilters = {}
) => {
  const api = initializeApi(session);

  const classes = await api
    .get<ECLASS[]>('/classes', { params: filters })
    .then((response) => response.data);

  return classes ? classes.map(classMapper) : [];
};

export const useListClasses = (
  session: Session | null,
  filters: ListClassesFilters
) => {
  const key = `list-classes-${JSON.stringify(filters)}`;
  const result = useQuery(key, () => listClasses(session, filters));

  return { ...result, key };
};
