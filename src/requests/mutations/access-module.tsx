import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/client';
import { v4 as uuidv4 } from 'uuid';

import ToastContent from 'components/ToastContent';

import { initializeApi, useMutation } from 'services/api';

import { GACCESSUSERSMODULES } from 'models/GACCESSUSERSMODULES';
import { GACCESSLEVELS } from 'models/GACCESSLEVELS';

type MutateAcessModulesFormData = Array<{
  GACCESSLEVELS_ID: string;
  MODULE_ID: string;
  MODULE_NAME: string;
  READ: boolean;
  WRITE: boolean;
}>;

const queryMutateAccessModule = (
  oldItems: GACCESSUSERSMODULES[],
  newItems: MutateAcessModulesFormData
) => {
  if (!oldItems) return oldItems;

  const oldItemsObj = oldItems.reduce<Record<string, GACCESSUSERSMODULES>>(
    (acc, item) => {
      const key = `${item.GAPPMODULES_ID}-${item.GACCESSLEVELS_ID}`;
      return { ...acc, [key]: item };
    },
    {}
  );

  const newItemsObj = newItems.reduce((acc, item) => {
    const key = `${item.MODULE_ID}-${item.GACCESSLEVELS_ID}`;
    const accessModule = oldItemsObj[key] || {};

    return {
      ...acc,
      [key]: {
        ...accessModule,
        id: accessModule.ID || uuidv4(),
        app_module: {
          description: item.MODULE_NAME
        },
        read: item.READ,
        write: item.WRITE,
        disabled: true
      }
    };
  }, {});

  return Object.values({ ...oldItemsObj, ...newItemsObj });
};

export function useMutateAccessModules(accessLevel?: GACCESSLEVELS) {
  const [session] = useSession();

  const queryFilter = useMemo(
    () => ({ access_level_id: accessLevel?.ID }),
    [accessLevel]
  );

  const mutateAcessModules = useCallback(
    async (values: MutateAcessModulesFormData) => {
      const api = initializeApi(session);

      const requestData = values.map(
        ({ GACCESSLEVELS_ID, MODULE_ID, READ, WRITE }) => ({
          GACCESSLEVELS_ID,
          MODULE_ID,
          READ,
          WRITE
        })
      );

      const { data: responseData } = await api.post<GACCESSUSERSMODULES>(
        '/app/access-modules',
        requestData
      );

      return responseData;
    },
    [session]
  );

  return useMutation('mutate-access-modules', mutateAcessModules, {
    linkedQueries: {
      [`list-access-modules-${JSON.stringify(queryFilter)}`]:
        queryMutateAccessModule
    },
    renderLoading: function render() {
      return <ToastContent showSpinner>Salvando...</ToastContent>;
    },
    renderError: () => `Falha ao salvar alterações.`,
    renderSuccess: () => `Alterações realizadas com sucesso.`
  });
}

export function useDeleteAccessModule() {
  const [session] = useSession();

  const deleteAcessModule = useCallback(
    async (accessModule: GACCESSLEVELS) => {
      const api = initializeApi(session);

      await api.delete(`/app/access-modules/${accessModule.ID}`);
    },
    [session]
  );

  return useMutation('delete-access-module', deleteAcessModule, {
    renderLoading: function render() {
      return <ToastContent showSpinner>Salvando...</ToastContent>;
    },
    renderError: () => `Falha ao salvar alterações.`,
    renderSuccess: () => `Alterações realizadas com sucesso.`
  });
}
