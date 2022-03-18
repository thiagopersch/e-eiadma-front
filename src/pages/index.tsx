import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';

import Dashboard /* , { DashboardProps } */ from 'templates/Dashboard';

import protectedRoutes from 'utils/protected-routes';
import prefetchQuery from 'utils/prefetch-query';

function DashboardPage(/* props: DashboardProps */) {
  return <Dashboard /* {...props} */ />;
}

/* const getSchoolData = async (session: Session | null) => {
  return session?.GECCLESIASTICALFIELD.TYPE !== 'HEADQUARTER' &&
    session?.ACCESSLEVELS?.CODE !== 'ADMIN'
    ? await getSchool(session, { id: 'me' })
    : null;
}; */

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);

  /* const school = session ? await getSchoolData(session) : null; */

  // const queries =
  //   session?.branch.type === 'MUNICIPAL_SECRETARY'
  //     ? [
  //         {
  //           key: 'show-school-year',
  //           fetcher: () => getSchoolYearWithSchoolTerms(session)
  //         },
  //         {
  //           key: `enroll-count-${JSON.stringify({})}`,
  //           fetcher: () => enrollCount(session)
  //         },
  //         {
  //           key: 'count-schools',
  //           fetcher: () => countSchools(session)
  //         },
  //         {
  //           key: 'grades-count',
  //           fetcher: () => gradesCount(session)
  //         },
  //         {
  //           key: 'count-employees',
  //           fetcher: () => employeesCount(session)
  //         }
  //       ]
  //     : [
  //         {
  //           key: 'show-school-year',
  //           fetcher: () => getSchoolYearWithSchoolTerms(session)
  //         },
  //         {
  //           key: `enroll-count-${JSON.stringify({ school_id: school?.id })}`,
  //           fetcher: () => enrollCount(session, { school_id: school?.id })
  //         },
  //         {
  //           key: `count-classrooms-${JSON.stringify({
  //             school_id: school?.id
  //           })}`,
  //           fetcher: () => countClassrooms(session, { school_id: school?.id })
  //         },
  //         {
  //           key: `count-school-teachers-${JSON.stringify({
  //             school_id: school?.id
  //           })}`,
  //           fetcher: () =>
  //             countSchoolTeachers(session, { school_id: school?.id })
  //         }
  //       ];

  const dehydratedState = await prefetchQuery([]);

  return {
    props: {
      session,
      /* school, */
      dehydratedState
    }
  };
}

DashboardPage.auth = {
  module: 'DASHBOARD'
};

export default DashboardPage;
