import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import {
  PRICING,
  PRODUCT,
  LOGIN,
  APP,
  CITIES,
  COUNTRIES,
  FORM,
} from './routes';

import { PageNotFound } from './pages/PageNotFound';
import { Homepage } from './pages/Homepage';
import { Pricing } from './pages/Pricing';
import { Product } from './pages/Product';
import { Login } from './pages/Login';
import { AppLayout } from './pages/AppLayout';
import { CityList } from './components/CityList';
import { CountryList } from './components/CountryList';
import { Form } from './components/Form';
import { City } from './components/City';

import { CitiesProvider } from './contexts/CitiesProvider';

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
        <AppLayout />
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
    <>
      <RouterProvider router={router} />
    </>
  );
}
