import styled, { css } from 'styled-components';

export interface HeadingProps {
  $marginBottom?: string;
}

export const Heading = styled.h1<HeadingProps>`
  font-weight: 600;
  text-transform: capitalize;

  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3.4rem;
      line-height: 4.5rem;
      margin-bottom: 2.5rem;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2.5rem;
      line-height: 3.4rem;
      margin-bottom: 1.7rem;
    `}

  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1.7rem;
      line-height: 2.5rem;
      margin-bottom: 1.25rem;
    `}

  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 1.25rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    `}

  ${(props) =>
    props.$marginBottom &&
    css`
      margin-bottom: ${props.$marginBottom};
    `}
`;
