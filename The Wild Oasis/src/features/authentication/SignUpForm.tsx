import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../ui/Button';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { useMutationCreateUser } from './useMutationCreateUser';

// Email regex: /\S+@\S+\.\S+/

interface SignUpFormFields {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export function SignUpForm(): JSX.Element {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<SignUpFormFields>({ mode: 'onChange' });
  const { isPending, mutate } = useMutationCreateUser();

  const validatePasswordFieldsAreMatching = (): true | string => {
    const { password, passwordConfirm } = getValues();
    if (password === passwordConfirm) return true;
    return 'Passwords must match';
  };

  const onSubmit: SubmitHandler<SignUpFormFields> = (data) => {
    mutate(data);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        htmlFor="fullName"
        label="Full name"
        errorMessage={errors.fullName?.message}
      >
        <Input
          id="fullName"
          type="text"
          aria-invalid={Boolean(errors.fullName)}
          disabled={isPending}
          required
          {...register('fullName', {
            required: 'Full name can not be empty',
            minLength: {
              value: 3,
              message: 'Full name can not be shorter than 3 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="email"
        label="Email address"
        errorMessage={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          disabled={isPending}
          required
          {...register('email', {
            required: 'Email can not be empty',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'The email has to be valid email',
            },
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="password"
        label="Password"
        errorMessage={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          aria-invalid={Boolean(errors.password)}
          disabled={isPending}
          required
          {...register('password', {
            required: 'Password can not be empty',
            minLength: {
              value: 8,
              message: 'Password can not be shorter than 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        htmlFor="passwordConfirm"
        label="Repeat password"
        errorMessage={errors.passwordConfirm?.message}
      >
        <Input
          id="passwordConfirm"
          type="password"
          aria-invalid={Boolean(errors.passwordConfirm)}
          disabled={isPending}
          required
          {...register('passwordConfirm', {
            validate: {
              v1: validatePasswordFieldsAreMatching,
            },
          })}
        />
      </FormRow>

      <FormRow>
        <Button disabled={isPending} type="submit">
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}
