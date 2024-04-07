import { MouseEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { SearchParamsNamesGlobal } from '../config';

export function Filter({
  searchParamName,
  buttonProperties,
}: {
  searchParamName: string;
  buttonProperties: { label: string; value: string }[];
}): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeValue =
    searchParams.get(searchParamName) ?? buttonProperties.at(0)?.value ?? '';

  const createHandleClick = (
    value: string,
  ): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      searchParams.set(searchParamName, value);
      if (searchParams.get(SearchParamsNamesGlobal.Page))
        searchParams.delete(SearchParamsNamesGlobal.Page);

      setSearchParams(searchParams);
    };
  };

  return (
    <StyledFilter>
      {buttonProperties.map(({ label, value }) => (
        <li key={label + value}>
          <StyledFilterButton
            $active={value === activeValue}
            disabled={value === activeValue}
            onClick={createHandleClick(value)}
          >
            {label}
          </StyledFilterButton>
        </li>
      ))}
    </StyledFilter>
  );
}

const StyledFilter = styled.ul`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledFilterButton = styled.button<{ $active: boolean }>`
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-duration) ease-in-out();

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
`;
