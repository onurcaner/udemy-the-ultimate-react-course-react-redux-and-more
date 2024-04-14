import { MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../ui/Button';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { useMutationLoggedInUser } from './useMutationLoggedInUser';

interface UpdatePasswordFormFields {
  password: string;
  passwordConfirm: string;
}

export function UpdatePasswordForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<UpdatePasswordFormFields>({ mode: 'onChange' });

  const { mutate, isPending } = useMutationLoggedInUser();

  const onSubmit: SubmitHandler<UpdatePasswordFormFields> = ({ password }) => {
    mutate({ password });
  };

  const handleClickToReset: MouseEventHandler<HTMLButtonElement> = () => {
    reset();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        htmlFor="password"
        label="Password"
        errorMessage={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          disabled={isPending}
          aria-invalid={Boolean(errors.password)}
          required
          {...register('password', {
            required: 'Password can not be empty',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="passwordConfirm"
        label="Confirm password"
        errorMessage={errors.passwordConfirm?.message}
      >
        <Input
          id="passwordConfirm"
          type="password"
          disabled={isPending}
          aria-invalid={Boolean(errors.passwordConfirm)}
          required
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: () =>
              getValues().password === getValues().passwordConfirm ||
              'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $size="small"
          $variation="secondary"
          disabled={isPending}
          onClick={handleClickToReset}
          type="reset"
        >
          Cancel
        </Button>
        <Button $size="small" disabled={isPending} type="submit">
          Update password
        </Button>
      </FormRow>
    </Form>
  );
}
