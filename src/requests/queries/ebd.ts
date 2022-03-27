import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { initializeApi } from 'services/api';
import { EBDMapper } from 'utils/mappers/EBDMapper';

import { EEBD } from 'models/EEBD';

type ListEBDFilters = {
  ID?: string;
  DATE?: string;
  START_TIME?: Date;
  FINAL_TIME?: Date;
  CALL_TIMEOUT?: Date;
};

export const listEBD = async (
  session: Session | null,
  filters: ListEBDFilters = {}
) => {
  const api = initializeApi(session);

  const EBD = await api
    .get<EEBD[]>('/EBD', { params: filters })
    .then((response) => response.data);

  return EBD ? EBD.map(EBDMapper) : [];
};

export const useListEBD = (
  session: Session | null,
  filters: ListEBDFilters
) => {
  const key = `list-EBD-${JSON.stringify(filters)}`;
  const result = useQuery(key, () => listEBD(session, filters));

  return { ...result, key };
};
