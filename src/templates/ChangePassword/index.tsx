import { useRef, useState } from 'react';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import { toast } from 'react-toastify';
import Image from 'next/image';

import Heading from 'components/Heading';
import Button from 'components/Button';
import Input from 'components/Input';

import { useApi } from 'services/api';

import { changePasswordSchema } from './rules/schema';

import * as S from './styles';

type ChangePasswordFormData = {
  newPassword: string;
  passwordConfirmation: string;
};

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [session] = useSession();
  const api = useApi(session);

  const formRef = useRef<FormHandles>(null);
  const { push, query } = useRouter();

  const handleSubmit = async (values: ChangePasswordFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      await changePasswordSchema.validate(values, { abortEarly: false });

      await api.put(`/users/${session?.ID}/password`, {
        password: values.newPassword
      });

      // update session
      await getSession({});

      toast.success('Senha criada com sucesso.', {
        position: toast.POSITION.TOP_RIGHT
      });

      return push(`${query?.callbackUrl || ''}`);
    } catch (err) {
      if (err instanceof ValidationError) {
        const validationErrors: Record<string, string> = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });

        formRef.current?.setErrors(validationErrors);
      } else {
        toast.error('Não foi possível salvar sua nova senha!', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    }

    setLoading(false);
  };

  return (
    <S.Wrapper>
      <S.Content>
        <S.UserContent>
          <Heading>Criar senha</Heading>
          <S.UserImageContainer>
            <Image
              src="/img/user2.png"
              layout="fill"
              objectFit="cover"
              quality={80}
              sizes="80px"
              alt={session?.GUSERS.NAME || undefined}
            />
          </S.UserImageContainer>
          <span>{session?.GUSERS.NAME}</span>
        </S.UserContent>

        <span>
          Olá {session?.GUSERS.NAME}, para acessar o portal você precisa criar
          uma nova senha!
        </span>

        <S.Form onSubmit={handleSubmit} ref={formRef}>
          <Input
            name="newPassword"
            label="Digite sua nova senha"
            type="password"
          />
          <Input
            name="passwordConfirmation"
            label="Confirme sua nova senha"
            type="password"
          />
          <Button styleType="normal" size="large" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar senha'}
          </Button>
        </S.Form>
      </S.Content>
    </S.Wrapper>
  );
};

export default ChangePassword;
