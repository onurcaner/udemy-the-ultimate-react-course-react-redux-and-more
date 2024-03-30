import styled, { css } from 'styled-components';

export interface ButtonProps {
  $variation?: 'primary' | 'secondary' | 'danger';
  $size?: 'small' | 'medium' | 'large';
}

export const Button = styled.button.attrs<ButtonProps>((props) => ({
  $variation: props.$variation ?? 'primary',
  $size: props.$size ?? 'medium',
}))`
  text-transform: uppercase;
  line-height: 1;
  border: 2px solid transparent;
  border-radius: var(--border-radius-sm);
  outline: transparent solid 2px;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-duration) ease-in-out;

  &:focus-visible {
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
  }

  ${(props) => props.$variation && variations[props.$variation]}
  ${(props) => props.$size && sizes[props.$size]}
`;

const sizes = {
  small: css`
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
  `,

  medium: css`
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 2rem;
  `,

  large: css`
    font-size: 1.25rem;
    font-weight: 500;
    padding: 1.125rem 2.25rem;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    border-color: var(--color-brand-600);

    &:hover,
    &:focus-visible {
      background-color: var(--color-brand-700);
      border-color: var(--color-brand-700);
    }

    &:focus-visible {
      outline-color: var(--color-brand-700);
    }
  `,

  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-300);
    border-color: var(--color-grey-600);

    &:hover,
    &:focus-visible {
      background-color: var(--color-grey-200);
    }

    &:focus-visible {
      outline-color: var(--color-grey-600);
    }
  `,

  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);
    border-color: var(--color-red-700);

    &:hover,
    &:focus-visible {
      background-color: var(--color-red-800);
      border-color: var(--color-red-800);
    }

    &:focus-visible {
      outline-color: var(--color-red-800);
    }
  `,
};
