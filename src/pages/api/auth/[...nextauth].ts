import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import { AxiosInstance } from 'axios';

import { Credentials, Refresh } from 'providers';

import { GECCLESIASTICALFIELD } from 'models/GECCLESIASTICALFIELD';
/* import { SchoolYear } from 'models/SchoolYear';
import { Employee } from 'models/Employee';
import { School } from 'models/School'; */

import { initializeApi } from 'services/api';

/* const getEmployee = async (api: AxiosInstance, token?: string) => {
  return await api
    .get<Employee>(`/employees/me`, {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    })
    .then((response) => response.data)
    .catch(() => undefined);
};

const getSchool = async (api: AxiosInstance, token?: string) => {
  return api
    .get<School>('/schools/me', {
      headers: { authorization: token ? `Bearer ${token}` : '' }
    })
    .then((response) => response.data)
    .catch(() => undefined);
};
 */
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
      if (data.user) {
        const [/* employee, school, */ ecclesiasticalField] = await Promise.all(
          [
            /* getEmployee(api, data.token),
          getSchool(api, data.token), */
            getEcclesiasticalField(api, data.token)
          ]
        );

        return {
          ...data.user,
          NAME: data.GUSERS.NAME,
          JWT: data.token,
          PROFILE_ID: data.profile.id,
          ACCESSLEVELS: data.profile.accessLevel,
          GECCLESIASTICALFIELD_ID: ecclesiasticalField?.ID,
          GECCLESIASTICALFIELD_TYPE: ecclesiasticalField?.TYPE
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
  async authorize({ email, password }: Record<string, string>) {
    const api = initializeApi();

    try {
      const response = await api.post(`/sessions`, {
        login: email,
        password
      });

      const { data } = response;
      if (data.user) {
        const [/* employee, school, */ ecclesiasticalField] = await Promise.all(
          [
            /* getEmployee(api, data.token),
          getSchool(api, data.token), */
            getEcclesiasticalField(api, data.token)
          ]
        );

        return {
          ...data.user,
          NAME: data.GUSERS.NAME,
          JWT: data.token,
          PROFILE_ID: data.profile.id,
          ACCESSLEVELS: data.profile.accessLevel,
          GECCLESIASTICALFIELD_ID: ecclesiasticalField?.ID,
          GECCLESIASTICALFIELD_TYPE: ecclesiasticalField?.TYPE
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

      /* try {
        const { data } = await api.get<SchoolYear>(
          '/education/admin/school-years/current',
          {
            headers: { authorization: user.jwt ? `Bearer ${user.jwt}` : '' }
          }
        );

        sessionConfigs.school_year_id = data?.id;
      } catch {
        sessionConfigs.school_year_id = undefined;
      } */

      const {
        /* schoolId, */
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
      /* session.schoolId = schoolId; */
      session.ecclesiasticalField = {
        ID: GECCLESIASTICALFIELD_ID,
        TYPE: GECCLESIASTICALFIELDTYPE
      };
      session.configs = sessionConfigs;

      return Promise.resolve(session);
    },
    jwt: async (token: any, user: any) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.jwt = user.jwt;
        token.profileId = user.PROFILE_ID;
        token.accessLevel = user.ACCESSLEVELS;
        /* token.schoolId = user.schoolId;
        token.employeeId = user.employeeId;*/
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
