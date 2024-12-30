import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/app/one'));
const PageTwo = lazy(() => import('src/pages/app/two'));
const GetHelp = lazy(() => import('src/pages/app/get-help'));

const Settings = lazy(() => import('src/pages/app/settings'));
const API = lazy(() => import('../../sections/settings-page/api'));
const TimeZone = lazy(() => import('../../sections/settings-page/time-zone'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'admin',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'get-help', element: <GetHelp /> },
     
      {
        path: 'settings',
        element: <Settings />,
        children: [
          // { element: <PageFour />, index: true },
          { path: 'timezone', element: <TimeZone /> },
          { path: 'api', element: <API /> },
        
        ],
      },
    ],
  },
];
