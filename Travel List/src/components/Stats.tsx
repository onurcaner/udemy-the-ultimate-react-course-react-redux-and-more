import { ItemAttributes } from '../ItemData';

export interface StatsProps {
  items: ItemAttributes[];
}

export function Stats({ items }: StatsProps) {
  const numberOfItems = items.length;
  const numberOfItemsArePacked = items.filter((item) => item.isPacked).length;
  const completionPercent = Math.round(
    (numberOfItemsArePacked / numberOfItems) * 100
  );

  const isListEmpty = numberOfItems === 0;
  const isOnProgress = !isListEmpty && numberOfItems !== numberOfItemsArePacked;
  const isCompleted = !isListEmpty && !isOnProgress;
  return (
    <footer className="stats">
      <p>
        <em>
          {isListEmpty && 'Add some items on your packing list to get started!'}

          {isOnProgress &&
            `You have ${numberOfItems} items on your list,
            and you already packed ${numberOfItemsArePacked}
            (${completionPercent}%).`}

          {isCompleted &&
            'You packed all items on your list. You are ready to go!'}
        </em>
      </p>
    </footer>
  );
}
