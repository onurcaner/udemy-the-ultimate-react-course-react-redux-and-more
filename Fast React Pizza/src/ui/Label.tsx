import { LabelHTMLAttributes } from 'react';

export function Label({
  children,
  className,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>): JSX.Element {
  return (
    <label
      {...rest}
      className={
        'text-sm text-stone-600 sm:text-base' +
        (className ? ` ${className}` : '')
      }
    >
      {children}
    </label>
  );
}
