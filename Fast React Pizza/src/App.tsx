import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Cart } from './features/cart/Cart';
import { Menu } from './features/menu/Menu';
import { menuLoader } from './features/menu/menuLoader';
import { CreateOrder } from './features/order/CreateOrder';
import { Order } from './features/order/Order';
import { CreateUser } from './features/user/CreateUser';
import { CART, MENU, NEW, ORDER, USER } from './pageUrls';
import { AppLayout } from './ui/AppLayout';
import { Home } from './ui/Home';
import { NotFound } from './ui/NotFound';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: `/${CART}`,
        element: <Cart />,
      },
      {
        path: `/${MENU}`,
        element: <Menu />,
        errorElement: <NotFound />,
        loader: menuLoader,
      },
      {
        path: `/${ORDER}/:id`,
        element: <Order />,
      },
      {
        path: `/${ORDER}/${NEW}`,
        element: <CreateOrder />,
      },
      {
        path: `/${USER}/${NEW}`,
        element: <CreateUser />,
      },
    ],
  },
]);

export function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
