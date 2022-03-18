import { parseISO, format } from 'date-fns';

import { GUSERS } from 'models/GUSERS';

export const userMapper = (user: GUSERS) => ({
  ...user,
  FORMATEDCREATED_AT: format(parseISO(user.CREATED_AT), "dd/MM/yyyy '-' HH:mm"),
  FORMATEDUPDATED_AT: format(parseISO(user.UPDATED_AT), "dd/MM/yyyy '-' HH:mm")
});
