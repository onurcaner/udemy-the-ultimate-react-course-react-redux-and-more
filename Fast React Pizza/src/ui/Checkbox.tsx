import { InputHTMLAttributes } from 'react';

export function Checkbox({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      {...rest}
      type="checkbox"
      className={
        'aspect-square h-[1em] text-xl text-stone-700 accent-yellow-400 outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2' +
        (className ? ` ${className}` : '')
      }
    />
  );
}
