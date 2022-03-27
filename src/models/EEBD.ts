export type EEBD = {
  ID: string;
  ETRIMESTRE_ID: string;
  DATE: string;
  START_TIME: string;
  FINAL_TIME: string;
  CALL_TIMEOUT: string;
  CREATED_AT: string;
  UPDATED_AT: string;
};

export type FormatedDateEBD = EEBD & {
  FORMATEDCREATED_AT: string;
  FORMATEDUPDATED_AT: string;
};
