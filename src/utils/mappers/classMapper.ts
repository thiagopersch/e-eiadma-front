import { parseISO, format } from 'date-fns';

import { ECLASS } from 'models/ECLASS';

import { masks } from 'utils/masks';

export const classMapper = (classEntity: ECLASS) => {
  return {
    ...classEntity,
    formattedClassDate: format(parseISO(classEntity.CREATED_AT), 'dd/MM/yyyy')
    /* formattedTimeStart: masks.time(classEntity.time_start),
    formattedTimeEnd: classEntity.time_end && masks.time(classEntity.time_end) */
  };
};
