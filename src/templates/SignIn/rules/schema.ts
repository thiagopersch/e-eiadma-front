import * as Yup from 'yup';

export const signInSchema = Yup.object({
  EMAIL: Yup.string()
    .email('Digite um e-mail válido')
    .required('Campo obrigatório'),
  PASSWORD: Yup.string().required('Campo obrigatório')
}).defined();
