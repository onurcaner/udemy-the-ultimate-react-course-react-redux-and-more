import { Heading } from '../ui/Heading';

export function Account(): JSX.Element {
  return (
    <>
      <Heading as="h2">Update your account</Heading>

      <div>
        <Heading as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </div>

      <div>
        <Heading as="h3">Update password</Heading>
        <p>Update user password form</p>
      </div>
    </>
  );
}
