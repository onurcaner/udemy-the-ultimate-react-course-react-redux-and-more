import { useState, FormEventHandler, ChangeEventHandler } from 'react';
import { ItemAttributes } from '../ItemData';

export function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const resetFormStates = () => {
    setQuantity(1);
    setDescription('');
  };

  const constructNewItem = (): ItemAttributes => {
    return {
      description,
      quantity,
      id: new Date().getTime(),
      isPacked: false,
    };
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = constructNewItem();
    console.log(newItem);

    resetFormStates();
  };

  const handleChangeOfDescription: ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const { value } = e.target;
    setDescription(value);
  };

  const handleChangeOfQuantity: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value } = e.target;
    setQuantity(+value);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your next trip?</h3>
      <select
        name="item-quantity"
        aria-label="item quantity"
        value={quantity}
        onChange={handleChangeOfQuantity}
      >
        {Array.from({ length: 20 })
          .map((_, i) => i + 1)
          .map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </select>
      <input
        name="item-description"
        aria-label="item description"
        placeholder="Shirts"
        type="text"
        value={description}
        onChange={handleChangeOfDescription}
      />
      <button aria-label="Add to packing list">Add</button>
    </form>
  );
}
