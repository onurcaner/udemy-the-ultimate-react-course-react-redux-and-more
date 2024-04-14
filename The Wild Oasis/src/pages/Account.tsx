import { UpdatePasswordForm } from '../features/authentication/UpdatePasswordForm';
import { UpdateUserDataForm } from '../features/authentication/UpdateUserDataForm';
import { Heading } from '../ui/Heading';

export function Account(): JSX.Element {
  return (
    <>
      <Heading as="h2">Update your account</Heading>

      <div style={{ marginBottom: '2rem' }}>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </div>

      <div>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </div>
    </>
  );
}
