import { pizzaData as pizzas } from '../../data/pizza-data';
import { Pizzas } from './Pizzas';

export function Menu() {
  const isPizzaDataOk = pizzas as typeof pizzas | undefined;
  const pizzaCount = isPizzaDataOk ? pizzas.length : 0;
  const shouldRenderMenu = pizzaCount > 0;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      {shouldRenderMenu && (
        <>
          <p>
            Authentic Italian cuisine. {pizzaCount} creative dishes to choose
            from. All from our stone oven, all organic, all delicious.
          </p>
          <Pizzas pizzas={pizzas} />
        </>
      )}
      {!shouldRenderMenu && (
        <p>We&apos;re still working on our menu. Please come back later.</p>
      )}
    </main>
  );
}
