import { useSession } from 'next-auth/react';

import Base from 'templates/Base';

import Card from 'components/Card';

import { EEBD } from 'models/EEBD';
import { useGetEBD } from 'requests/queries/ebd';

import * as S from './styles';

const EBDAdministrationDashboard = () => {
  const { data: session } = useSession();

  const { data: EBD } = useGetEBD(session, {
    ID: 'me'
  });

  return (
    <Base>
      <S.Wrapper>
        {
          <Card description="EBD" link="/administration/EBD" module="EEBD">
            EBD
          </Card>
        }
      </S.Wrapper>
    </Base>
  );
};

export default EBDAdministrationDashboard;
