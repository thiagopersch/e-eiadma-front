import { RefObject, useCallback } from 'react';
import { Session } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

import ToastContent from 'components/ToastContent';
import { ModalRef } from 'components/Modal';

import { GACCESSLEVELS } from 'models/GACCESSLEVELS';

import { initializeApi, useMutation } from 'services/api';

export function useAddAccessLevelMutation(
  modalRef: RefObject<ModalRef>,
  session?: Session | null
) {
  const addAccessLevel = useCallback(
    async (values) => {
      const api = initializeApi(session);
      return api.post('/app/access-levels', values);
    },
    [session]
  );

  return useMutation('add-access-levels', addAccessLevel, {
    linkedQueries: {
      'get-access-levels': (old, newAccessLevel) => [
        ...old,
        { ...newAccessLevel, id: uuidv4(), disabled: true }
      ]
    },
    onMutate: () => modalRef.current?.closeModal(),
    renderLoading: function render(newAccessLevel) {
      return (
        <ToastContent showSpinner>
          Salvando o nível de acesso {newAccessLevel.NAME}...
        </ToastContent>
      );
    },
    renderError: (newAccessLevel) =>
      `Falha ao inserir o nível de acesso ${newAccessLevel.NAME}`,
    renderSuccess: (newAccessLevel) =>
      `${newAccessLevel.NAME} inserido com sucesso`
  });
}

export function useDeleteAccessLevelMutation(session?: Session | null) {
  const deleteAccessLevel = useCallback(
    async (accessLevel) => {
      const api = initializeApi(session);
      return api.delete(`/app/access-levels/${accessLevel.ID}`);
    },
    [session]
  );

  return useMutation('delete-access-levels', deleteAccessLevel, {
    linkedQueries: {
      'get-access-levels': (
        old: GACCESSLEVELS[],
        deleteAccessLevel: GACCESSLEVELS
      ) =>
        old.map((accessLevel) =>
          accessLevel.ID === deleteAccessLevel.ID
            ? { ...accessLevel, disabled: true }
            : accessLevel
        )
    },
    renderLoading: function render(deleteAccessLevel) {
      return (
        <ToastContent showSpinner>
          Removendo {deleteAccessLevel.NAME} ...
        </ToastContent>
      );
    },
    renderError: (deleteAccessLevel) =>
      `Falha ao remover ${deleteAccessLevel.NAME}`,
    renderSuccess: (deleteAccessLevel) =>
      `${deleteAccessLevel.NAME} removido com sucesso`
  });
}
