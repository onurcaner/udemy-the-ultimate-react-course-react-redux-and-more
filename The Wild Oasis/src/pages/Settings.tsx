import { SettingsForm } from '../features/settings/SettingsForm';
import { Heading } from '../ui/Heading';

export function Settings(): JSX.Element {
  return (
    <>
      <Heading as="h2">Update hotel settings</Heading>
      <SettingsForm />
    </>
  );
}
