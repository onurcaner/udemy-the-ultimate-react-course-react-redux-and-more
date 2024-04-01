import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import { createCabin } from '../../services/apiCabins';
import { CreateCabinAttributes } from '../../services/types';
import { Button } from '../../ui/Button';
import { FileInput } from '../../ui/FileInput';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export function CreateCabinForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Record<keyof CreateCabinAttributes, string>>({
    mode: 'onChange',
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: async () => {
      toast.success('A new cabin created successfully');
      await queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<Record<keyof CreateCabinAttributes, string>> = (
    data,
  ) => {
    const { description, discount, name, imageUrl, maxCapacity, regularPrice } =
      data;
    mutate({
      description,
      imageUrl,
      name,
      discount: +discount,
      maxCapacity: +maxCapacity,
      regularPrice: +regularPrice,
    });
  };

  const validateDiscountIsLessThanRegularPrice = (
    discount: string,
  ): true | string => {
    const { regularPrice } = getValues();
    if (+regularPrice >= +discount) return true;
    else return 'Discount can not be more than regular price';
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Cabin name"
        htmlFor="name"
        errorMessage={errors.name?.message}
      >
        <Input
          id="name"
          type="text"
          defaultValue="001"
          disabled={isPending}
          aria-invalid={Boolean(errors.name)}
          {...register('name', {
            required: 'Cabin name can not be empty',
            minLength: {
              value: 3,
              message: 'Cabin name should be at least 3 characters long',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        htmlFor="maxCapacity"
        errorMessage={errors.maxCapacity?.message}
      >
        <Input
          id="maxCapacity"
          type="number"
          defaultValue="4"
          disabled={isPending}
          aria-invalid={Boolean(errors.maxCapacity)}
          {...register('maxCapacity', {
            required: 'Cabin capacity can not be empty',
            min: {
              value: 1,
              message: 'Cabin capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular Price"
        htmlFor="regularPrice"
        errorMessage={errors.regularPrice?.message}
      >
        <Input
          id="regularPrice"
          type="number"
          defaultValue="400"
          disabled={isPending}
          aria-invalid={Boolean(errors.regularPrice)}
          {...register('regularPrice', {
            required: 'Regular price can not be empty',
            min: {
              value: '1',
              message: 'Regular price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        htmlFor="discount"
        errorMessage={errors.discount?.message}
      >
        <Input
          id="discount"
          type="number"
          defaultValue="150"
          disabled={isPending}
          aria-invalid={Boolean(errors.discount)}
          {...register('discount', {
            required: 'Discount can not be empty',
            min: {
              value: 0,
              message: 'Discount should be 0 or higher',
            },
            validate: {
              v1: validateDiscountIsLessThanRegularPrice,
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin Description"
        htmlFor="description"
        errorMessage={errors.description?.message}
      >
        <Textarea
          id="description"
          defaultValue="Cozy nice cabin"
          disabled={isPending}
          aria-invalid={Boolean(errors.description)}
          {...register('description', {
            required: 'Cabin description can not be empty',
            minLength: {
              value: 10,
              message:
                'Cabin description should be at least 10 characters long',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        htmlFor="image"
        errorMessage={errors.imageUrl?.message}
      >
        {/* <FileInput id="image" accept="image/*" /> */}
        <Input
          id="image"
          type="text"
          defaultValue="/cabins/cabin-001.jpg"
          disabled={isPending}
          {...register('imageUrl', {
            required: 'Cabin photo should be added',
          })}
        />
      </FormRow>

      <ButtonsContainer>
        <Button
          $variation="secondary"
          $size="small"
          type="reset"
          disabled={isPending}
        >
          Clear
        </Button>
        <Button $size="small" type="submit" disabled={isPending}>
          Create cabin
        </Button>
      </ButtonsContainer>
    </Form>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;
