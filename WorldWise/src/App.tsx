import { Suspense, lazy } from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { City } from './components/City';
import { CityList } from './components/CityList';
import { CountryList } from './components/CountryList';
import { Form } from './components/Form';
import { SpinnerFullPage } from './components/SpinnerFullPage';
import { CitiesProvider } from './contexts/CitiesProvider';
import { FakeAuthProvider } from './contexts/FakeAuthProvider';
import { ProtectedRoute } from './pages/ProtectedRoute';
import {
  APP,
  CITIES,
  COUNTRIES,
  FORM,
  LOGIN,
  PRICING,
  PRODUCT,
} from './routes';

/*
import { AppLayout } from './pages/AppLayout';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Pricing } from './pages/Pricing';
import { Product } from './pages/Product';
*/

const AppLayout = lazy(async () => ({
  default: (await import('./pages/AppLayout')).AppLayout,
}));
const Homepage = lazy(async () => ({
  default: (await import('./pages/Homepage')).Homepage,
}));
const Login = lazy(async () => ({
  default: (await import('./pages/Login')).Login,
}));
const PageNotFound = lazy(async () => ({
  default: (await import('./pages/PageNotFound')).PageNotFound,
}));
const Pricing = lazy(async () => ({
  default: (await import('./pages/Pricing')).Pricing,
}));
const Product = lazy(async () => ({
  default: (await import('./pages/Product')).Product,
}));

const router = createBrowserRouter([
  {
    index: true,
    element: <Homepage />,
  },
  {
    path: PRICING,
    element: <Pricing />,
  },
  {
    path: PRODUCT,
    element: <Product />,
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: APP,
    element: (
      <CitiesProvider>
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </CitiesProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={CITIES} replace={true} />,
      },
      {
        path: CITIES,
        element: <CityList />,
      },
      {
        path: CITIES + '/:id',
        element: <City />,
      },
      {
        path: COUNTRIES,
        element: <CountryList />,
      },
      {
        path: FORM,
        element: <Form />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export function App(): JSX.Element {
  return (
    <FakeAuthProvider>
      <Suspense fallback={<SpinnerFullPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </FakeAuthProvider>
  );
}
