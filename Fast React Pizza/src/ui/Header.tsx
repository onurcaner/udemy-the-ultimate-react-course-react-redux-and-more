import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <header>
      <Link to="/">
        <h1>Fast React Pizza</h1>
      </Link>
      <p>TODO: username</p>
    </header>
  );
}
