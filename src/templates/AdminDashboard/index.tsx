import { useSession } from 'next-auth/react';

import Base from 'templates/Base';

import Card from 'components/Card';
import DatabaseDumpCard from 'components/DatabaseDumpCard';

import { useCountUsers } from 'requests/queries/users';

import * as S from './styles';

const AdminDashboard = () => {
  const { data: session } = useSession();

  const { data: usersCount } = useCountUsers(session);

  return (
    <Base>
      <S.Wrapper>
        <Card description="Usuários" link="/users" module="USER" rule="READ">
          {usersCount?.count}
        </Card>

        <DatabaseDumpCard />
      </S.Wrapper>
    </Base>
  );
};

export default AdminDashboard;
