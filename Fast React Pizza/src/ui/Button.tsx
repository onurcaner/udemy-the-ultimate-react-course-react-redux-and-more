import { ButtonHTMLAttributes } from 'react';

export function Button({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      {...rest}
      className={
        'inline-block rounded-full border-2 border-yellow-400 bg-yellow-400 px-[2em] py-[0.5em] text-sm font-semibold uppercase text-stone-800 outline-none transition-all duration-200 hover:border-yellow-300 hover:bg-yellow-300 focus:border-yellow-300 focus:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-300 sm:text-base' +
        (className ? ` ${className}` : '')
      }
    >
      {children}
    </button>
  );
}
