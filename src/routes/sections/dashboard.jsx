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
const UsersPage = lazy(() => import('src/sections/user/users'));
const LogsPage = lazy(() => import('src/sections/user/logs'));

const CustomerPage = lazy(() => import('src/pages/app/customer'));
const CustomersPage = lazy(() => import('src/sections/customer/customers'));
const PasswordResetPage = lazy(() => import('src/sections/customer/passwordReset'));
const UpdateEmailPage = lazy(() => import('src/sections/customer/updateEmail'));
const BlockEmailPage = lazy(() => import('src/sections/customer/blockEmail'));

const AdminPanel = lazy(() => import('src/pages/app/adminPanel'));
const PSBAdmin = lazy(() => import('src/sections/admin/psbAdmin'));
const PFBAdmin = lazy(() => import('src/sections/admin/pfbAdmin'));
const PEVAdmin = lazy(() => import('src/sections/admin/pevAdmin'));
const PEMAdmin = lazy(() => import('src/sections/admin/pemAdmin'));

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

      {
        path: 'customer',
        children: [
          { element: <CustomerPage />, index: true },
          { path: 'customers', element: <CustomersPage /> },
          { path: 'passwordreset', element: <PasswordResetPage /> },
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
      { path: 'api', element: <ApiPage /> },
      {
        path: 'adminloginpanel',
        children: [
          { element: <AdminPanel />, index: true },
          { path: 'psbAdmin', element: <PSBAdmin /> },
          { path: 'pfbAdmin', element: <PFBAdmin /> },
          { path: 'pevAdmin', element: <PEVAdmin /> },
          { path: 'pemAdmin', element: <PEMAdmin /> },
        ],
      },
    ],
  },
];
