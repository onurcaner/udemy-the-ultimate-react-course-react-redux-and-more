import { Outlet, useNavigation } from 'react-router-dom';

import { CartOverview } from '../features/cart/CartOverview';
import { Header } from './Header';
import { Loader } from './Loader';

export function AppLayout(): JSX.Element {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';

  return (
    <div>
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
