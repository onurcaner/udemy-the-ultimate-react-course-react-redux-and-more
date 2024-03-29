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

export function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

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
