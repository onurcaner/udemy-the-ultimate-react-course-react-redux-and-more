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
  CHECK_IN,
  DASHBOARD,
  LOGIN,
  SETTINGS,
  USERS,
} from './config/routePaths';
import { ProtectedRouteLoggedIn } from './features/authentication/ProtectedRouteLoggedIn';
import { DarkModeProvider } from './features/dark-mode/DarkModeProvider';
import { Account } from './pages/Account';
import { Booking } from './pages/Booking';
import { Bookings } from './pages/Bookings';
import { Cabins } from './pages/Cabins';
import { CheckIn } from './pages/CheckIn';
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

      <DarkModeProvider>
        <RouterProvider router={router} />
        <CustomToaster />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRouteLoggedIn>
        <AppLayout />
      </ProtectedRouteLoggedIn>
    ),
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
        path: `${BOOKINGS}/:id`,
        element: <Booking />,
      },
      {
        path: `${CHECK_IN}/:id`,
        element: <CheckIn />,
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
