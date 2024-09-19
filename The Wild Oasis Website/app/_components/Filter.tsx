'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { DetailedHTMLProps, JSX, MenuHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FilterProps
  extends DetailedHTMLProps<
    MenuHTMLAttributes<HTMLMenuElement>,
    HTMLMenuElement
  > {
  searchField: string;
  defaultSearchValue: string;
  searchValuesAndLabels: {
    label: string | number;
    value: string;
  }[];
}

export function Filter({
  className,
  searchField,
  defaultSearchValue,
  searchValuesAndLabels,
  ...rest
}: FilterProps): JSX.Element {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get(searchField) ?? defaultSearchValue,
  );
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const newSearch = {
      ...Object.fromEntries(searchParams.entries()),
      [searchField]: searchValue,
    };

    router.replace(
      `${pathName}?${Object.entries(newSearch)
        .map(([key, value]) => `${key}=${value}`)
        .filter(
          (keyValue) => keyValue !== `${searchField}=${defaultSearchValue}`,
        )
        .join('&')}`,
      { scroll: false },
    );
  }, [
    defaultSearchValue,
    pathName,
    router,
    searchField,
    searchParams,
    searchValue,
  ]);

  return (
    <menu
      {...rest}
      className={twMerge(
        'flex border border-primary-200 dark:border-primary-800',
        className,
      )}
    >
      {searchValuesAndLabels.map(({ label, value }) => (
        <li key={value}>
          <button
            className={twMerge(
              'px-5 py-4 leading-none',
              'hover:bg-primary-800 hover:text-primary-200 dark:hover:bg-primary-200 dark:hover:text-primary-800',
              value === searchValue &&
                'bg-primary-800 text-primary-200 dark:bg-primary-200 dark:text-primary-800',
            )}
            onClick={setSearchValue.bind(null, value)}
          >
            {label}
          </button>
        </li>
      ))}
    </menu>
  );
}
