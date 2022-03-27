import { useSession } from 'next-auth/react';

import AdminDashboard from 'templates/AdminDashboard';

import EBDAdministrationDashboard, {
  EBDAdministrationDashboardProps
} from 'templates/EBDAdministrationDashboard';

export type DashboardProps = EBDAdministrationDashboardProps | never;

const Dashboard = (props: DashboardProps) => {
  const { data: session } = useSession();

  if (session?.ACCESSLEVELS?.CODE === 'ADMINISTRADOR') {
    return <AdminDashboard />;
  }

  return <EBDAdministrationDashboard {...props} />;
};

export default Dashboard;
