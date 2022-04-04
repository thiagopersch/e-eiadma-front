import NextAuth from 'next-auth';
import { RedirectableProvider } from 'next-auth/client';

import { GACCESSUSERSMODULES } from 'models/GACCESSUSERSMODULES';
import { GACCESSLEVELS } from 'models/GACCESSLEVELS';

declare module 'next-auth' {
  interface Session {
    USER: {
      NAME: string;
      EMAIL: string;
      CHANGE_PASSWORD: boolean;
    };
    GECCLESIASTICALFIELD: {
      ID: string;
      TYPE: 'HEADQUARTER' | 'CONGREGATION';
    };
    JWT: string;
    ID: string;
    ACCESSLEVELS?: GACCESSLEVELS;
    PROFILE_ID?: string;
    CLASSID?: string;
    CLASS: {
      nameClass: string;
    };
    EBD: {
      EBD_ID: string;
    };
  }

  interface User {
    ID: string;
    EMAIL: string;
    JWT: string;
    NAME: string;
    CHANGE_PASSWORD: boolean;
    PROFILE_ID: string;
    ACCESSLEVELS: GACCESSLEVELS;
    GECCLESIASTICALFIELD_ID: string;
    GECCLESIASTICALFIELD_TYPE: 'HEADQUARTER' | 'CONGREGATION';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    ID: string;
    EMAIL: string;
    JWT: string;
    NAME: string;
    CHANGE_PASSWORD: boolean;
    PROFILE_ID: string;
    ACCESSLEVELS: GACCESSLEVELS;
    GECCLESIASTICALFIELD_ID: string;
    GECCLESIASTICALFIELD_TYPE: 'HEADQUARTER' | 'CONGREGATION';
  }
}

declare module 'next-auth/react' {
  export type CustomRedirectableProvider =
    | RedirectableProvider
    | 'refresh'
    | 'manualsignout';

  export function signIn<P extends SignInProvider = undefined>(
    provider?: P,
    options?: SignInOptions,
    authorizationParams?: SignInAuthorisationParams
  ): Promise<
    P extends CustomRedirectableProvider
      ? SignInResponse | undefined
      : undefined
  >;
}
