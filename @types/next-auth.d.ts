import NextAuth from 'next-auth';
import { RedirectableProvider } from 'next-auth/client';

import { GACCESSUSERSMODULES } from 'models/GACCESSUSERSMODULES';
import { GACCESSLEVELS } from 'models/GACCESSLEVELS';

declare module 'next-auth' {
  interface Session {
    GUSERS: {
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
    /* schoolId?: string;
    configs: {
      school_year_id: string;
    }; */
  }
}

declare module 'next-auth/client' {
  export type CustomRedirectableProvider = RedirectableProvider | 'refresh';

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
