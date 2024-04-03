/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext } from 'react';
import styled from 'styled-components';

const TableContext = createContext<{ templateColumns: string }>({
  templateColumns: '1fr',
});

function TableProvider({
  children,
  templateColumns,
}: {
  children: ReactNode;
  templateColumns: string;
}): JSX.Element {
  return (
    <TableContext.Provider value={{ templateColumns }}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function TableHeaderRow({ children }: { children: ReactNode }): JSX.Element {
  const { templateColumns } = useContext(TableContext);

  return (
    <>
      <StyledHeaderRow $templateColumns={templateColumns}>
        {children}
      </StyledHeaderRow>
    </>
  );
}

function TableBody<T>({
  items,
  render,
}: {
  items: T[];
  render: (item: T) => JSX.Element;
}): JSX.Element {
  if (items.length === 0) return <StyledEmpty>No data to show</StyledEmpty>;
  return <StyledBody>{items.map(render)}</StyledBody>;
}

function TableFooter({ children }: { children: ReactNode }): JSX.Element {
  return <StyledFooter>{children}</StyledFooter>;
}

function TableRow({ children }: { children: ReactNode }): JSX.Element {
  const { templateColumns } = useContext(TableContext);

  return <StyledRow $templateColumns={templateColumns}>{children}</StyledRow>;
}

const StyledTable = styled.table`
  display: block;
  font-size: 1rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(---border-radius-md);
  overflow: hidden;
`;

const StyledCommonRow = styled.tr<{ $templateColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$templateColumns};
  align-items: center;
  column-gap: 1rem;
`;

const StyledHeaderRow = styled(StyledCommonRow)`
  font-weight: 600;
  text-transform: uppercase;
  text-align: left;
  color: var(--color-grey-600);
  padding: 1rem 1.5rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;

const StyledRow = styled(StyledCommonRow)`
  padding: 0.75rem 1.25rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.tbody`
  margin: 0.4rem 0;
`;

const StyledFooter = styled.tfoot`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const StyledEmpty = styled.p`
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  margin: 1.5rem;
`;

export const Table = {
  Context: TableContext,
  Provider: TableProvider,
  HeaderRow: TableHeaderRow,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
};
