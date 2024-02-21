import { useState } from 'react';

import { ItemAttributes } from './ItemData';

import { Header } from './components/Header';
import { Form } from './components/Form';
import { PackingList } from './components/PackingList';
import { Stats } from './components/Stats';

import { initialItems } from './ItemData';

export function App() {
  const [items, setItems] = useState<ItemAttributes[]>(initialItems);

  const handleAddItem = (item: ItemAttributes) => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleIsPackedOfItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  };

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        {...{ handleToggleIsPackedOfItem, handleDeleteItem }}
      />
      <Stats items={items} />
    </div>
  );
}
