import { HTMLAttributes } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';

export function CustomLink({
  children,
  to,
  className,
  ...rest
}:
  | LinkProps
  | (HTMLAttributes<HTMLButtonElement> & Record<'to', string>)): JSX.Element {
  const navigate = useNavigate();

  if (to === '-1')
    return (
      <button
        {...(rest as HTMLAttributes<HTMLButtonElement>)}
        onClick={() => {
          navigate(-1);
        }}
        className={
          'inline-block text-sm text-blue-500 underline underline-offset-4 transition-all duration-200 hover:text-blue-600 sm:text-base' +
          (className ? ` ${className}` : '')
        }
      >
        {children}
      </button>
    );
  else
    return (
      <Link
        {...(rest as LinkProps)}
        to={to}
        className={
          'inline-block text-sm text-blue-500 underline underline-offset-4 transition-all duration-200 hover:text-blue-600 sm:text-base' +
          (className ? ` ${className}` : '')
        }
      >
        {children}
      </Link>
    );
}
