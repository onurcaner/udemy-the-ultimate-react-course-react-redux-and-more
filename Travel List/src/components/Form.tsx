import { useState, FormEventHandler, ChangeEventHandler } from 'react';

import { ItemAttributes } from '../data/ItemData';

export interface FormProps {
  onAddItem: (item: ItemAttributes) => void;
}

export function Form({ onAddItem }: FormProps): JSX.Element {
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
    onAddItem(newItem);

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
        <Options from={1} to={20} />
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

function Options({ from, to }: { from: number; to: number }): JSX.Element[] {
  const length = to - from + 1;
  return Array.from({ length })
    .map((_, i) => i + from)
    .map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
}
