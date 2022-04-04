import { Session } from 'next-auth';
import { useQuery } from 'react-query';

import { initializeApi } from 'services/api';
import { EBDMapper } from 'utils/mappers/EBDMapper';

import { EEBD } from 'models/EEBD';

type GetEBDFilters = {
  ID?: string;
};

type ListEBDFilters = {
  ID?: string;
  DATE?: string;
  START_TIME?: Date;
  FINAL_TIME?: Date;
  CALL_TIMEOUT?: Date;
};

type CountEBDResponse = {
  count: number;
};

export const EBDKeys = {
  all: 'EBD' as const,
  lists: () => [...EBDKeys.all, 'list'] as const,
  list: (filters: string) => [...EBDKeys.lists(), { filters }] as const,
  shows: () => [...EBDKeys.all, 'shows'] as const,
  show: (filters: string) => [...EBDKeys.shows(), { filters }] as const,
  details: () => [...EBDKeys.all, 'details'] as const,
  detail: (filters: string) => [...EBDKeys.details(), { filters }] as const,
  counts: () => [...EBDKeys.all, 'counts'] as const,
  count: (filters: string) => [...EBDKeys.counts(), { filters }] as const
};

export const getEBD = (
  session?: Session | null,
  filters: GetEBDFilters = {}
) => {
  const api = initializeApi(session);

  const { ID } = filters;

  return api.get<EEBD>(`/EBD/${ID || 'me'}`).then((response) => response.data);
};

export const countEBD = async (session?: Session | null) => {
  const api = initializeApi(session);

  return api
    .get<CountEBDResponse>('/EBD/count')
    .then((response) => response.data)
    .catch(() => undefined);
};

export const useGetEBD = (
  session?: Session | null,
  filters: GetEBDFilters = {}
) => {
  return useQuery<EEBD>(EBDKeys.show(JSON.stringify(filters)), () =>
    getEBD(session, filters)
  );
};

export const useCountSchools = (session?: Session | null) => {
  return useQuery(EBDKeys.count(JSON.stringify({})), () => countEBD(session));
};
