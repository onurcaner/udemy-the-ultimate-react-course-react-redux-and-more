import { InputHTMLAttributes } from 'react';

export function Input({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      {...rest}
      className={
        'w-full rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-700 outline-none transition-all duration-200 placeholder:text-stone-500 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 sm:text-base' +
        (className ? ` ${className}` : '')
      }
    />
  );
}
