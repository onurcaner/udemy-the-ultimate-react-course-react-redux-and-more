import { SignUpForm } from '../features/authentication/SignUpForm';
import { Heading } from '../ui/Heading';

export function Users(): JSX.Element {
  return (
    <>
      <Heading as="h2">Create a new user</Heading>
      <SignUpForm />
    </>
  );
}
