import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import { CredentialInput } from 'next-auth/providers';
import { AxiosError, AxiosInstance } from 'axios';

import { Credentials, Refresh } from 'providers';

import { initializeApi } from 'services/api';

import { GECCLESIASTICALFIELD } from 'models/GECCLESIASTICALFIELD';

const getEcclesiasticalField = async (api: AxiosInstance, token?: string) => {
  return api
    .get<GECCLESIASTICALFIELD>('/ecclesiastical-field/me', {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const refreshProvider = Refresh<Record<string, CredentialInput>>({
  name: 'refresh',
  credentials: {},
  async authorize(params) {
    if (!params) return null;

    const { PROFILE_ID, TOKEN } = params;

    const api = initializeApi();
    try {
      const response = await api.put(
        '/sessions',
        { PROFILE_ID: PROFILE_ID },
        {
          headers: { authorization: TOKEN ? `Bearer ${TOKEN}` : '' }
        }
      );

      const { data } = response;
      if (data.USER) {
        const [GECCLESIASTICALFIELD] = await Promise.all([
          getEcclesiasticalField(api, data.TOKEN)
        ]);

        return {
          ...data.USER,
          NAME: data.USER.EMAIL,
          JWT: data.TOKEN,
          /* employeeId: employee?.id, */
          PROFILE_ID: data.PROFILE_ID?.ID,
          ACCESSLEVELS: data.PROFILE.GACCESSLEVELS,
          GECCLESIASTICALFIELDId: GECCLESIASTICALFIELD
            ? GECCLESIASTICALFIELD.ID
            : undefined,
          GECCLESIASTICALFIELDType: GECCLESIASTICALFIELD
            ? GECCLESIASTICALFIELD.TYPE
            : undefined
        };
      }

      return null;
    } catch (err) {
      return null;
    }
  }
});

const signInProvider = Credentials<Record<string, CredentialInput>>({
  name: 'sign-in',
  credentials: {},
  async authorize(params) {
    if (!params) return null;

    const { EMAIL, PASSWORD } = params;

    const api = initializeApi();

    try {
      const response = await api.post(`/sessions`, {
        EMAIL,
        PASSWORD
      });

      const { data } = response;
      if (data.USER) {
        const [GECCLESIASTICALFIELD] = await Promise.all([
          getEcclesiasticalField(api, data.TOKEN)
        ]);

        return {
          ...data.USER,
          NAME: data.USER.EMAIL,
          JWT: data.TOKEN,
          /* employeeId: employee?.id, */
          PROFILE_ID: data.PROFILE_ID?.ID,
          ACCESSLEVELS: data.PROFILE.GACCESSLEVELS,
          /* schoolId: school ? school.id : undefined, */
          GECCLESIASTICALFIELDId: GECCLESIASTICALFIELD
            ? GECCLESIASTICALFIELD.ID
            : undefined,
          GECCLESIASTICALFIELDType: GECCLESIASTICALFIELD
            ? GECCLESIASTICALFIELD.TYPE
            : undefined
        };
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
});

const options: NextAuthOptions = {
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  secret: 'Q0yLUJWJw+fsHG98mWLOZq/lxYMD8q1xDRxGJqROhTY=',
  pages: {
    signIn: '/sign-in'
  },
  providers: [signInProvider, refreshProvider],
  callbacks: {
    session: async (...args) => {
      console.log(args);
      const { token, session } = args[0];
      const api = initializeApi();

      try {
        await api
          .get('/sessions/validate', {
            headers: { authorization: token.JWT ? `Bearer ${token.JWT}` : '' }
          })
          .then(({ data }) => {
            console.log(data);
          });
      } catch (err) {
        const { response } = err as AxiosError;

        if (response?.status === 401) {
          return Promise.resolve({} as Session);
        }
      }

      const sessionConfigs: Record<string, string | undefined> = {};

      /* try {
        const { data: schoolYear } = await api.get<SchoolYear>(
          '/education/admin/school-years/current',
          {
            headers: { authorization: token.jwt ? `Bearer ${token.jwt}` : '' }
          }
        );

        sessionConfigs.school_year_id = schoolYear?.id;
      } catch {
        sessionConfigs.school_year_id = undefined;
      } */

      const {
        /* schoolId, */
        PROFILE_ID,
        ACCESSLEVELS,
        JWT,
        GECCLESIASTICALFIELD_ID,
        GECCLESIASTICALFIELD_TYPE,
        ...rest
      } = token;

      session.JWT = JWT;
      session.ID = token.ID;
      session.USER = {
        ...rest
      };
      session.PROFILE_ID = PROFILE_ID;
      session.ACCESSLEVELS = ACCESSLEVELS;
      /* session.schoolId = schoolId; */
      session.GECCLESIASTICALFIELD = {
        ID: GECCLESIASTICALFIELD_ID,
        TYPE: GECCLESIASTICALFIELD_TYPE
      };
      /* session.configs = sessionConfigs; */

      return Promise.resolve(session);
    },
    jwt: async (args) => {
      console.log(args);
      const { token, user } = args;
      if (user) {
        token.ID = user.ID;
        token.CHANGE_PASSWORD = user.CHANGE_PASSWORD;
        token.EMAIL = user.EMAIL;
        token.JWT = user.JWT;
        token.ACCESSLEVELS = user.ACCESSLEVELS;
        token.PROFILE_ID = user.PROFILE_ID;
        token.GECCLESIASTICALFIELD_ID = user.GECCLESIASTICALFIELD_ID;
        token.GECCLESIASTICALFIELD_TYPE = user.GECCLESIASTICALFIELD_TYPE;
      }

      return Promise.resolve(token);
    }
  }
};

const Auth = (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, options);

export default Auth;
