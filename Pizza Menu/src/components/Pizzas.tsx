import { PizzaAttributes } from '../../data/pizza-data';
import { Pizza } from './Pizza';

export interface PizzasProps {
  pizzaData: PizzaAttributes[];
}

export function Pizzas({ pizzaData }: PizzasProps) {
  const pizzaDataMapper = (pizzaAttributes: PizzaAttributes): JSX.Element => (
    <li key={pizzaAttributes.name}>
      <Pizza {...pizzaAttributes} />
    </li>
  );

  return <ul className="pizzas">{pizzaData.map(pizzaDataMapper)}</ul>;
}
