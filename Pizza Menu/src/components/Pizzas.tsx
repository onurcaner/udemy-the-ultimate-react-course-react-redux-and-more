import { PizzaAttributes } from '../../data/pizza-data';
import { Pizza } from './Pizza';

export interface PizzasProps {
  pizzas: PizzaAttributes[];
}

export function Pizzas({ pizzas }: PizzasProps) {
  const renderPizza = (pizzaAttributes: PizzaAttributes): JSX.Element => (
    <li key={pizzaAttributes.name}>
      <Pizza {...pizzaAttributes} />
    </li>
  );

  return <ul className="pizzas">{pizzas.map(renderPizza)}</ul>;
}
