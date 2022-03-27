import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { AxiosInstance } from 'axios';

import { Credentials, Refresh } from 'providers';

import { GECCLESIASTICALFIELD } from 'models/GECCLESIASTICALFIELD';

import { initializeApi } from 'services/api';

const getEcclesiasticalField = async (api: AxiosInstance, token?: string) => {
  return api
    .get<GECCLESIASTICALFIELD>('/app/ecclesiastical-field/me', {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    })
    .then((response) => response.data)
    .catch(() => undefined);
};

const refreshProvider = Refresh({
  name: 'refresh',
  credentials: {},
  async authorize({ profileId, token }: Record<string, string>) {
    const api = initializeApi();

    try {
      const response = await api.put(
        '/sessions',
        { PROFILE_ID: profileId },
        {
          headers: { authorization: token ? `Bearer ${token}` : '' }
        }
      );

      const { data } = response;
      if (data.GUSERS) {
        const [GECCLESIASTICALFIELD] = await Promise.all([
          getEcclesiasticalField(api, data.token)
        ]);

        return {
          ...data.GUSERS,
          NAME: data.GUSERS.NAME,
          JWT: data.token,
          /* PROFILE_ID: data.profile.id,
          ACCESSLEVELS: data.profile.accessLevel, */
          GECCLESIASTICALFIELD_ID: GECCLESIASTICALFIELD?.ID,
          GECCLESIASTICALFIELD_TYPE: GECCLESIASTICALFIELD?.TYPE
        };
      }

      return null;
    } catch (err) {
      return null;
    }
  }
});

const signInProvider = Credentials({
  name: 'sign-in',
  credentials: {},
  async authorize({ EMAIL, PASSWORD }: Record<string, string>) {
    const api = initializeApi();

    try {
      const response = await api.post(`/sessions`, {
        EMAIL,
        PASSWORD
      });

      const { data } = response;
      if (data.GUSERS) {
        const [GECCLESIASTICALFIELD] = await Promise.all([
          getEcclesiasticalField(api, data.token)
        ]);

        return {
          ...data.GUSERS,
          NAME: data.GUSERS.NAME,
          JWT: data.token,
          GECCLESIASTICALFIELD_ID: GECCLESIASTICALFIELD?.ID,
          GECCLESIASTICALFIELD_TYPE: GECCLESIASTICALFIELD?.TYPE
        };
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
});

const options = {
  JWT: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  pages: {
    signIn: '/sign-in'
  },
  providers: [signInProvider, refreshProvider],
  callbacks: {
    session: async (session: any, user: any) => {
      const api = initializeApi();

      const { data } = await api.get('/users/me', {
        headers: { authorization: user.JWT ? `Bearer ${user.jwt}` : '' }
      });

      const sessionConfigs: Record<string, string | undefined> = {};

      const {
        PROFILE_ID,
        ACCESSLEVELS,
        JWT,
        GECCLESIASTICALFIELD_ID,
        GECCLESIASTICALFIELDTYPE,
        ...rest
      } = user;

      session.jwt = JWT;
      session.id = user.ID;
      session.user = {
        ...rest,
        CHANGE_PASSWORD: data.CHANGE_PASSWORD
      };
      session.profileId = PROFILE_ID;
      session.accessLevel = ACCESSLEVELS;
      session.ecclesiasticalField = {
        ID: GECCLESIASTICALFIELD_ID,
        TYPE: GECCLESIASTICALFIELDTYPE
      };
      session.configs = sessionConfigs;

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        token.ID = user.ID;
        token.EMAIL = user.EMAIL;
        token.JWT = user.JWT;
        token.profileId = user.PROFILE_ID;
        token.accessLevel = user.ACCESSLEVELS;
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
