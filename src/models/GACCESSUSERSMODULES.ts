import { GACCESSLEVELS } from './GACCESSLEVELS';
import { GAPPMODULES } from './GAPPMODULES';

export type GACCESSUSERSMODULES = {
  ID: string;
  GACCESSLEVELS_ID: GACCESSLEVELS;
  GACCESSLEVELS: string;
  GAPPMODULES_ID: GAPPMODULES;
  GAPPMODULES: string;
  READ: boolean;
  WRITE: boolean;
  CREATED_AT: string;
  UPDATED_AT: string;
};
