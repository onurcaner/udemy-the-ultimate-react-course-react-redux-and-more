import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Cart } from './features/cart/Cart';
import { Menu } from './features/menu/Menu';
import { menuLoader } from './features/menu/menuLoader';
import { CreateOrder } from './features/order/CreateOrder';
import { Order } from './features/order/Order';
import { createOrderAction } from './features/order/createOrderAction';
import { orderAction } from './features/order/orderAction';
import { orderLoader } from './features/order/orderLoader';
import { CreateUser } from './features/user/CreateUser';
import { CART, MENU, NEW, ORDER, USER } from './pageUrls';
import { store } from './store';
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
        errorElement: <NotFound />,
        loader: menuLoader,
      },
      {
        path: `/${MENU}`,
        element: <Menu />,
        errorElement: <NotFound />,
        loader: menuLoader,
      },
      {
        path: `/${ORDER}/${NEW}`,
        element: <CreateOrder />,
        action: createOrderAction,
        loader: menuLoader,
      },
      {
        path: `/${ORDER}/:id`,
        element: <Order />,
        errorElement: <NotFound />,
        loader: orderLoader,
        action: orderAction,
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
