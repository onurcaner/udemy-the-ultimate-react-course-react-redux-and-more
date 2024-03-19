import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export function CreateOrder(): JSX.Element {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const errors = useActionData() as
    | Partial<Record<'customer' | 'address' | 'phone', string>>
    | undefined;

  const cart = fakeCart;

  const isSubmitting = navigation.state === 'submitting';

  const randomNumber = Math.random();

  return (
    <div className="mt-8">
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST">
        <div>
          <label htmlFor={`customer_${randomNumber}`}>First Name</label>
          <input
            id={`customer_${randomNumber}`}
            type="text"
            name="customer"
            required
          />
          <p>{errors?.customer ?? ''}</p>
        </div>

        <div>
          <label htmlFor={`phone_${randomNumber}`}>Phone number</label>
          <div>
            <input
              id={`phone_${randomNumber}`}
              type="tel"
              name="phone"
              required
            />
          </div>
          <p>{errors?.phone ?? ''}</p>
        </div>

        <div>
          <label htmlFor={`address_${randomNumber}`}>Address</label>
          <div>
            <textarea id={`address_${randomNumber}`} name="address" required />
          </div>
          <p>{errors?.address ?? ''}</p>
        </div>

        <div>
          <input
            id={`priority_${randomNumber}`}
            type="checkbox"
            name="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor={`priority_${randomNumber}`}>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order' : 'Order now'}
          </button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}
