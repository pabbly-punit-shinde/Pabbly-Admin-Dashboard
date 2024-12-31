import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/app/dashboard'));
const ApiPage = lazy(() => import('src/pages/app/api'));

const UserPage = lazy(() => import('src/pages/app/user'));
const UsersPage = lazy(() => import('src/pages/app/user/users'));
const LogsPage = lazy(() => import('src/pages/app/user/logs'));

const CustomerPage = lazy(() => import('src/pages/app/customer'));
const CustomersPage = lazy(() => import('src/pages/app/customer/customers'));
const PasswordResetPage = lazy(() => import('src/pages/app/customer/passwordReset'));
const UpdateEmailPage = lazy(() => import('src/pages/app/customer/updateEmail'));
const BlockEmailPage = lazy(() => import('src/pages/app/customer/blockEmail'));

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
      { path: 'api', element: <ApiPage /> },

      {
        path: 'customer',
        children: [
          { element: <CustomerPage />, index: true },
          { path: 'customers', element: <CustomersPage /> },
          { path: 'passwordreset', element: <PasswordResetPage/>},
          { path: 'updateemail', element: <UpdateEmailPage /> },
          { path: 'blockemail', element: <BlockEmailPage /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserPage />, index: true },
          { path: 'users', element: <UsersPage /> },
          { path: 'logs', element: <LogsPage /> },
        ],
      },
    ],
  },
];
