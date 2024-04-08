import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '../../ui/Button';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { useMutationLogin } from './useMutationLogin';

interface FormFields {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'onChange' });
  const { mutate, isPending } = useMutationLogin();

  const onSubmit: SubmitHandler<FormFields> = (formFields) => {
    const { email, password } = formFields;
    mutate({ email, password });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        htmlFor="email"
        isVertical={true}
        label="Email address"
        errorMessage={errors.email?.message}
      >
        <Input
          id="email"
          type="email"
          disabled={isPending}
          aria-invalid={Boolean(errors.email)}
          {...register('email', { required: 'Email address can not be empty' })}
        />
      </FormRow>
      <FormRow
        htmlFor="password"
        isVertical={true}
        label="Password"
        errorMessage={errors.password?.message}
      >
        <Input
          id="password"
          type="password"
          disabled={isPending}
          aria-invalid={Boolean(errors.password)}
          {...register('password', { required: 'Password can not be empty' })}
        />
      </FormRow>
      <FormRow>
        <Button $size="medium" disabled={isPending} type="submit">
          Login
        </Button>
      </FormRow>
    </Form>
  );
}
