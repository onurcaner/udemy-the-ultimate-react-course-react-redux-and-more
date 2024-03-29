import styled from 'styled-components';

export function Login(): JSX.Element {
  return <LoginLayout>Login</LoginLayout>;
}

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 32rem;
  align-content: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  gap: 2rem;
  background-color: var(--color-grey-50);
`;
