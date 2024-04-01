import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import {
  ACCOUNT,
  BOOKINGS,
  CABINS,
  DASHBOARD,
  LOGIN,
  SETTINGS,
  USERS,
} from './config/routePaths';
import { Account } from './pages/Account';
import { Bookings } from './pages/Bookings';
import { Cabins } from './pages/Cabins';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users';
import { AppLayout } from './ui/AppLayout';
import { CustomToaster } from './ui/CustomToaster';

export function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <CustomToaster />
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={DASHBOARD} />,
      },
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ACCOUNT,
        element: <Account />,
      },
      {
        path: BOOKINGS,
        element: <Bookings />,
      },
      {
        path: CABINS,
        element: <Cabins />,
      },
      {
        path: SETTINGS,
        element: <Settings />,
      },
      {
        path: USERS,
        element: <Users />,
      },
    ],
  },
  {
    path: `/${LOGIN}`,
    element: <Login />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);
