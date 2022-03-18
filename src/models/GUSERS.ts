export type GUSERS = {
  ID: string;
  NAME: string;
  EMAIL: string;
  BAPTIZED_IN_WATER: string;
  BAPTIZED_DATE?: string;
  CREATED_AT: string;
  UPDATED_AT: string;
};

export type FormatedDateUser = GUSERS & {
  FORMATEDCREATED_AT: string;
  FORMATEDUPDATED_AT: string;
};
