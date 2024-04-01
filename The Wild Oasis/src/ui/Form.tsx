import styled, { css } from 'styled-components';

export interface FormProps {
  $type?: 'modal';
}

export const Form = styled.form<FormProps>`
  font-size: 0.85rem;
  overflow: hidden;

  ${(props) =>
    props.$type !== 'modal' &&
    css`
      padding: 1.5rem 2.5rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.$type === 'modal' &&
    css`
      width: 80rem;
    `}
`;
