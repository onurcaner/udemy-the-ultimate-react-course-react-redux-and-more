import { pizzaData } from '../../data/pizza-data';
import { Pizzas } from './Pizzas';

export function Menu() {
  const pizzaCount = pizzaData.length;

  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <p>
        Authentic Italian cuisine. {pizzaCount} creative dishes to choose from.
        All from our stone oven, all organic, all delicious.
      </p>
      <Pizzas pizzaData={pizzaData} />
    </main>
  );
}
