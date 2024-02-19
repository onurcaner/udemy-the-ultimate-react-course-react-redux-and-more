import { PizzaAttributes } from '../../data/pizza-data';

export function Pizza({
  ingredients,
  name,
  photoName,
  price,
  soldOut,
}: PizzaAttributes) {
  const formattedPrice = soldOut
    ? 'Sold Out'
    : new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price);

  const containerClassList = ['pizza'];
  if (soldOut) containerClassList.push('sold-out');

  return (
    <div className={containerClassList.join(' ')}>
      <img src={`assets/images/pizzas/${photoName}`} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredients}</p>
        <p>
          <span>{formattedPrice}</span>
        </p>
      </div>
    </div>
  );
}
