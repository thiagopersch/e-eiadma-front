import { Session } from 'next-auth';

import { GACCESSUSERSMODULES } from 'models/GACCESSUSERSMODULES';

export type WithAccessOptions = {
  module: string;
  rule?: 'READ' | 'WRITE';
};

export const validateHasAccess = (
  session: Session | null,
  modules: GACCESSUSERSMODULES[],
  { module, rule }: WithAccessOptions
) => {
  if (!session) return false;

  const findedModule = modules.find(
    ({ GAPPMODULES_ID }) => GAPPMODULES_ID.NAME === module
  );
  if (!findedModule) return false;

  if (rule) {
    if (rule === 'READ') return findedModule.READ;
    if (rule === 'WRITE') return findedModule.WRITE;
    return false;
  }

  return true;
};
