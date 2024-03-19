import { Outlet, useNavigation } from 'react-router-dom';

import { CartOverview } from '../features/cart/CartOverview';
import { Header } from './Header';
import { Loader } from './Loader';

export function AppLayout(): JSX.Element {
  const navigation = useNavigation();

  const isIdle = navigation.state === 'idle';

  return (
    <div className="grid h-screen grid-rows-[min-content_1fr_min-content]">
      {!isIdle && <Loader />}
      <Header />
      <main className="mx-auto overflow-y-auto px-4 md:px-6">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
