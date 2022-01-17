import { Story, Meta } from '@storybook/react';
import {
  UserPlus,
  Users,
  Link,
  Eye,
  Book,
  Calendar,
  FilePlus,
  Plus
} from '@styled-icons/feather';

import { Book as Class } from '@styled-icons/material-outlined';

import Card, { CardProps } from '.';

export default {
  title: 'Card',
  component: Card,
  argsTypes: {
    children: {
      type: 'string'
    },
    icon: {
      type: ''
    }
  }
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

Default.args = {
  children: '000',
  description: 'Usuários ativos',
  link: '/'
};

export const Register: Story<CardProps> = (args) => <Card {...args} />;

Register.args = {
  description: 'Cadastrar usuário',
  icon: <UserPlus />,
  link: '/'
};

export const RegisterProfile: Story<CardProps> = (args) => <Card {...args} />;

RegisterProfile.args = {
  description: 'Cadastrar perfil',
  icon: <Users />,
  link: '/'
};

export const LinkProfile: Story<CardProps> = (args) => <Card {...args} />;

LinkProfile.args = {
  description: 'Vincular perfil',
  icon: <Link />,
  link: '/'
};

export const ViewEBD: Story<CardProps> = (args) => <Card {...args} />;

ViewEBD.args = {
  description: 'Visualizar EBD',
  icon: <Eye />,
  link: '/'
};

export const RegisterEBD: Story<CardProps> = (args) => <Card {...args} />;

RegisterEBD.args = {
  description: 'Cadastrar EBD',
  icon: <Book />,
  link: '/'
};

export const TrimestreEBD: Story<CardProps> = (args) => <Card {...args} />;

TrimestreEBD.args = {
  description: 'Cadastrar trimestre',
  icon: <Calendar />,
  link: '/'
};

export const RegisterClassEBD: Story<CardProps> = (args) => <Card {...args} />;

RegisterClassEBD.args = {
  description: 'Cadastrar classes',
  icon: <Class />,
  link: '/'
};

export const RegisterMagazines: Story<CardProps> = (args) => <Card {...args} />;

RegisterMagazines.args = {
  description: 'Cadastrar revistas',
  icon: <FilePlus />,
  link: '/'
};

export const RegisterLessons: Story<CardProps> = (args) => <Card {...args} />;

RegisterLessons.args = {
  description: 'Cadastrar lições',
  icon: <FilePlus />,
  link: '/'
};

export const RegisterModules: Story<CardProps> = (args) => <Card {...args} />;

RegisterModules.args = {
  description: 'Cadastrar módulos',
  icon: <Plus />,
  link: '/'
};
