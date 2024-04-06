import { MouseEventHandler } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { PAGINATION_ITEM_COUNT, SearchParamsNamesGlobal } from '../config';

export function Pagination({
  itemsNumber,
}: {
  itemsNumber: number;
}): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +(searchParams.get(SearchParamsNamesGlobal.Page) ?? '1');
  const totalPages = Math.ceil(itemsNumber / PAGINATION_ITEM_COUNT);

  const handleClickOnPrevious: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentPage <= 1) return;

    searchParams.set(SearchParamsNamesGlobal.Page, String(currentPage - 1));
    setSearchParams(searchParams);
  };

  const handleClickOnNext: MouseEventHandler<HTMLButtonElement> = () => {
    if (currentPage >= totalPages) return;

    searchParams.set(SearchParamsNamesGlobal.Page, String(currentPage + 1));
    setSearchParams(searchParams);
  };

  const thisPageResults = {
    from: (currentPage - 1) * PAGINATION_ITEM_COUNT + 1,
    to: Math.min(currentPage * PAGINATION_ITEM_COUNT, itemsNumber),
  };

  if (itemsNumber <= 0) return <></>;

  return (
    <StyledPagination>
      <P>
        Showing <strong>{thisPageResults.from}</strong> to{' '}
        <strong>{thisPageResults.to}</strong> of <strong>{itemsNumber}</strong>{' '}
        results
      </P>

      <StyledButtons>
        <StyledPaginationButton
          type="button"
          onClick={handleClickOnPrevious}
          disabled={currentPage <= 1}
        >
          <span>
            <HiOutlineChevronLeft />
          </span>
          <span>Previous</span>
        </StyledPaginationButton>

        <StyledPaginationButton
          type="button"
          onClick={handleClickOnNext}
          disabled={currentPage >= totalPages}
        >
          <span>Next</span>
          <span>
            <HiOutlineChevronRight />
          </span>
        </StyledPaginationButton>
      </StyledButtons>
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 0.85rem;
  margin-left: 0.5rem;

  & strong {
    font-weight: 600;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StyledPaginationButton = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  font-size: 0.85rem;
  font-weight: 500;
  color: ${(props) => (props.$active ? ' var(--color-brand-50)' : 'inherit')};

  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.$active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  border-radius: var(--border-radius-sm);

  transition: all var(--transition-duration) ease-in-out;

  & svg {
    height: 1.125rem;
    width: 1.125rem;
  }

  &:hover:not(:disabled) {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }
`;
