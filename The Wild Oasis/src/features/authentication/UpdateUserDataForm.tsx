import { MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CustomUserMetadata } from '../../services/types';
import { Button } from '../../ui/Button';
import { FileInput } from '../../ui/FileInput';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { Spinner } from '../../ui/Spinner';
import { useMutationLoggedInUser } from './useMutationLoggedInUser';
import { useQueryLoggedInUser } from './useQueryLoggedInUser';

interface UpdateUserDataFormFields {
  fullName: string;
  avatar: FileList;
}

export function UpdateUserDataForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserDataFormFields>({
    mode: 'onChange',
  });
  const { data, isPending: isPendingUser } = useQueryLoggedInUser();
  const metaData = data?.user?.user_metadata as CustomUserMetadata | undefined;
  const { mutate, isPending: isPendingMutation } = useMutationLoggedInUser();

  const onSubmit: SubmitHandler<UpdateUserDataFormFields> = (data) => {
    mutate({ fullName: data.fullName, avatar: data.avatar.item(0) });
  };

  const handleClickToReset: MouseEventHandler<HTMLButtonElement> = () => {
    reset();
  };

  if (isPendingUser) return <Spinner />;
  if (!data?.user) return <></>;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input defaultValue={data.user.email} disabled />
      </FormRow>

      <FormRow
        htmlFor="fullName"
        label="Full name"
        errorMessage={errors.fullName?.message}
      >
        <Input
          id="fullName"
          type="text"
          defaultValue={metaData?.fullName}
          required
          aria-invalid={Boolean(errors.fullName?.message)}
          disabled={isPendingMutation}
          {...register('fullName', {
            required: 'Full name can not be empty',
            minLength: {
              value: 3,
              message: 'Full name can not be shorter than 3 characters',
            },
          })}
        />
      </FormRow>

      <FormRow htmlFor="avatar" label="Avatar image">
        <FileInput
          id="avatar"
          type="file"
          accept="image/*"
          multiple={false}
          disabled={isPendingMutation}
          {...register('avatar')}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          $size="small"
          disabled={isPendingMutation}
          onClick={handleClickToReset}
        >
          Cancel
        </Button>
        <Button $size="small" type="submit" disabled={isPendingMutation}>
          Update account
        </Button>
      </FormRow>
    </Form>
  );
}
