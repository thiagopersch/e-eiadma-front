import { useSession } from 'next-auth/react';

import Base from 'templates/Base';

import Card from 'components/Card';

import { EEBD } from 'models/EEBD';
import { useListEBD } from 'requests/queries/ebd';

import * as S from './styles';

export type EBDAdministrationDashboardProps = {
  EBD: EEBD;
};
const EBDAdministrationDashboard = ({
  EBD
}: EBDAdministrationDashboardProps) => {
  const { data: session } = useSession();

  const { data } = useListEBD(session, {
    ID: EBD.ID
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
