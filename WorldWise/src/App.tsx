import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import { City } from './components/City';
import { CityList } from './components/CityList';
import { CountryList } from './components/CountryList';
import { Form } from './components/Form';
import { CitiesProvider } from './contexts/CitiesProvider';
import { AppLayout } from './pages/AppLayout';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { PageNotFound } from './pages/PageNotFound';
import { Pricing } from './pages/Pricing';
import { Product } from './pages/Product';
import {
  APP,
  CITIES,
  COUNTRIES,
  FORM,
  LOGIN,
  PRICING,
  PRODUCT,
} from './routes';

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
