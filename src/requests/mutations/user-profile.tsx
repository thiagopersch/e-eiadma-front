import { useCallback } from 'react';
import { useSession } from 'next-auth/react';

import ToastContent from 'components/ToastContent';

import { initializeApi, useMutation } from 'services/api';

type CreateUserProfileForm = {
  GUSERS_ID: string;
  GECCLESIASTICALFIELD_ID: string;
  GACCESSLEVELS_ID?: string;
  GACCESSCODE?: string;
};

type DeleteUserProfileData = {
  ID?: string;
  GUSERS_ID: string;
  GECCLESIASTICALFIELD_ID: string;
  GACCESSLEVELS_ID?: string;
  GACCESSCODE?: string;
};

export function useCreateUserProfile() {
  const { data: session } = useSession();

  const createUserProfile = useCallback(
    async (values: CreateUserProfileForm) => {
      const api = initializeApi(session);

      const { data: responseData } = await api.post(`/user-profiles`, values);

      return responseData;
    },
    [session]
  );

  return useMutation('create-user-profile', createUserProfile, {
    renderLoading: function render() {
      return <ToastContent showSpinner>Salvando...</ToastContent>;
    },
    renderError: () => `Falha ao salvar alterações`,
    renderSuccess: () => `Alterações registradas com sucesso.`
  });
}

type DeleteUserProfileOptions = {
  showToasts?: boolean;
};
export function useDeleteUserProfile({
  showToasts = true
}: DeleteUserProfileOptions = {}) {
  const { data: session } = useSession();

  const deleteUserProfile = useCallback(
    async (values: DeleteUserProfileData) => {
      const api = initializeApi(session);

      const { ID, ...data } = values;
      if (ID) return api.delete(`/user-profiles/${ID}`);

      return api.delete(`/user-profiles`, {
        data
      });
    },
    [session]
  );

  return useMutation('create-user-profile', deleteUserProfile, {
    renderLoading: showToasts
      ? function render() {
          return <ToastContent showSpinner>Removendo...</ToastContent>;
        }
      : undefined,
    renderError: showToasts ? () => `Falha ao salvar alterações` : undefined,
    renderSuccess: showToasts
      ? () => `Alterações registradas com sucesso.`
      : undefined
  });
}
