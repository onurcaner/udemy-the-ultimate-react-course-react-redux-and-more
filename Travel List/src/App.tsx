import { useState } from 'react';

import { ItemAttributes } from './data/ItemData';

import { Header } from './components/Header';
import { Form } from './components/Form';
import { PackingList } from './components/PackingList';
import { Stats } from './components/Stats';

import { initialItems } from './data/ItemData';

export function App() {
  const [items, setItems] = useState<ItemAttributes[]>(initialItems);

  const handleAddItem = (item: ItemAttributes): void => {
    setItems([...items, item]);
  };

  const handleDeleteItem = (id: number): void => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleDeleteAllItems = (): void => {
    setItems([]);
  };

  const handleToggleIsPackedOfItem = (id: number): void => {
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
        onDeleteItem={handleDeleteItem}
        onDeleteAllItems={handleDeleteAllItems}
        onToggleIsPackedOfItem={handleToggleIsPackedOfItem}
      />
      <Stats items={items} />
    </div>
  );
}
