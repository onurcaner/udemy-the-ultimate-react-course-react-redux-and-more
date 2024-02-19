import { openingHour } from '../../data/opening-closing-hours';
import { closingHour } from '../../data/opening-closing-hours';

export function Footer() {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= openingHour && currentHour < closingHour;

  return (
    <footer className="footer">
      <div className="order">
        {isOpen && (
          <>
            <p>
              We&apos;re open from {openingHour}:00 to {closingHour}:00. Come
              visit us or order online.
            </p>
            <button className="btn">Order Now</button>
          </>
        )}
        {!isOpen && (
          <p>
            We&apos;re happy to welcome you between {openingHour}:00 and{' '}
            {closingHour}:00
          </p>
        )}
      </div>
    </footer>
  );
}
