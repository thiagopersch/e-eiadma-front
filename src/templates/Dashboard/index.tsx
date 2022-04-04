import { useSession } from 'next-auth/react';

import AdminDashboard from 'templates/AdminDashboard';

import EBDAdministrationDashboard from 'templates/EBDAdministrationDashboard';

const Dashboard = () => {
  const { data: session } = useSession();

  if (session?.ACCESSLEVELS?.CODE === 'ADMINISTRADOR') {
    return <AdminDashboard />;
  }

  return <EBDAdministrationDashboard />;
};

export default Dashboard;
