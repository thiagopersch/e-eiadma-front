import { parseISO, format } from 'date-fns';

import { EEBD } from 'models/EEBD';

import { masks } from 'utils/masks';

export const EBDMapper = (EBDEntity: EEBD) => ({
  ...EBDEntity,
  FORMATEDCREATED_AT: format(parseISO(EBDEntity.CREATED_AT), 'dd/MM/yyyy'),
  FORMATEDUPDATED_AT: format(parseISO(EBDEntity.UPDATED_AT), 'dd/MM/yyyy')
  /* formattedTimeStart: masks.time(classEntity.time_start),
    formattedTimeEnd: classEntity.time_end && masks.time(classEntity.time_end) */
});
