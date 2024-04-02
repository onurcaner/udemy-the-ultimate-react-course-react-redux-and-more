import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { SettingsAttributes } from '../../services/types';
import { Button } from '../../ui/Button';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { Spinner } from '../../ui/Spinner';
import { useMutationUpdateSettings } from './useMutationUpdateSettings';
import { useQuerySettings } from './useQuerySettings';

type SettingsFormAttributes = Record<keyof SettingsAttributes, string>;

export function SettingsForm(): JSX.Element {
  const { data: settings, isLoading } = useQuerySettings();
  const { mutate, isPending } = useMutationUpdateSettings();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<SettingsFormAttributes>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SettingsFormAttributes> = (data) => {
    mutate({
      breakfastPrice: +data.breakfastPrice,
      maximumBookingLength: +data.maximumBookingLength,
      maximumGuestsPerBooking: +data.maximumGuestsPerBooking,
      minimumBookingLength: +data.minimumBookingLength,
    });
  };

  if (isLoading) return <Spinner />;

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Minimum nights/booking"
        htmlFor="min-nights"
        errorMessage={errors.minimumBookingLength?.message}
      >
        <Input
          id="min-nights"
          type="number"
          defaultValue={settings?.minimumBookingLength}
          disabled={isPending}
          aria-invalid={Boolean(errors.minimumBookingLength)}
          required={true}
          {...register('minimumBookingLength', {
            required: 'Minimum booking nights can not be empty',
            min: {
              value: 2,
              message: 'Minimum booking nights should be at least 2 nights',
            },
            validate: {
              lessThanMax: (minimumBookingLength) =>
                +minimumBookingLength <= +getValues().maximumBookingLength ||
                'Minimum booking nights should be less than maximum booking nights',
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        htmlFor="max-nights"
        errorMessage={errors.maximumBookingLength?.message}
      >
        <Input
          id="max-nights"
          type="number"
          defaultValue={settings?.maximumBookingLength}
          disabled={isPending}
          aria-invalid={Boolean(errors.maximumBookingLength)}
          required={true}
          {...register('maximumBookingLength', {
            required: 'Maximum booking nights can not be empty',
            max: {
              value: 90,
              message: 'Maximum booking nights should be less than 90 nights',
            },
            validate: {
              moreThanMin: (maximumBookingLength) =>
                +maximumBookingLength >= +getValues().minimumBookingLength ||
                'Maximum booking nights should be more than minimum booking nights',
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        htmlFor="max-guests"
        errorMessage={errors.maximumGuestsPerBooking?.message}
      >
        <Input
          id="max-guests"
          type="number"
          defaultValue={settings?.maximumGuestsPerBooking}
          disabled={isPending}
          aria-invalid={Boolean(errors.maximumGuestsPerBooking)}
          required={true}
          {...register('maximumGuestsPerBooking', {
            required: 'Maximum guests per booking can not be empty',
            min: {
              value: 1,
              message:
                'Maximum guests per booking should be more than 0 people',
            },
            max: {
              value: 12,
              message:
                'Maximum guests per booking should be less than 12 people',
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Breakfast price"
        htmlFor="breakfast-price"
        errorMessage={errors.breakfastPrice?.message}
      >
        <Input
          id="breakfast-price"
          type="number"
          defaultValue={settings?.breakfastPrice}
          disabled={isPending}
          aria-invalid={Boolean(errors.breakfastPrice)}
          required={true}
          {...register('breakfastPrice', {
            required: 'Breakfast price can not be empty',
            min: {
              value: 0,
              message: 'Breakfast price should be more than 0',
            },
          })}
        />
      </FormRow>

      <FormRow>
        <ButtonsContainer>
          <Button $size="small" type="submit" disabled={isPending}>
            Update
          </Button>
        </ButtonsContainer>
      </FormRow>
    </Form>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;
