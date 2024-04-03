import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { CabinAttributes, CreateCabinAttributes } from '../../services/types';
import { Button } from '../../ui/Button';
import { FileInput } from '../../ui/FileInput';
import { Form } from '../../ui/Form';
import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { Modal } from '../../ui/Modal';
import { Textarea } from '../../ui/Textarea';
import { useMutationCreateCabin } from './useMutationCreateCabin';
import { useMutationUpdateCabin } from './useMutationUpdateCabin';

export interface CabinFormProps {
  cabin?: CabinAttributes;
}

type CabinFormAttributes = Record<keyof CreateCabinAttributes, string>;

export function CabinForm({ cabin }: CabinFormProps): JSX.Element {
  const { setOpenWindowName } = useContext(Modal.Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CabinFormAttributes>({
    mode: 'onChange',
    defaultValues: cabin
      ? (cabin as unknown as CabinFormAttributes)
      : defaultValues,
  });

  const { mutate: mutateCreateCabin, isPending: isPendingCabinCreation } =
    useMutationCreateCabin();
  const { mutate: mutateUpdateCabin, isPending: isPendingCabinUpdating } =
    useMutationUpdateCabin(cabin);

  const isPending = isPendingCabinCreation || isPendingCabinUpdating;

  const onSubmit: SubmitHandler<CabinFormAttributes> = (data) => {
    const cabinToMutate: CreateCabinAttributes = {
      description: data.description,
      discount: +data.discount,
      imageUrl: data.imageUrl,
      maxCapacity: +data.maxCapacity,
      name: data.name,
      regularPrice: +data.regularPrice,
    };

    if (cabin) mutateUpdateCabin(cabinToMutate);
    else mutateCreateCabin(cabinToMutate);
  };

  const validateRegularPriceIsMoreThanDiscount = (
    regularPrice: string,
  ): true | string => {
    const { discount } = getValues();
    if (+regularPrice >= +discount) return true;
    else return 'Regular price can not be less than discount';
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
          disabled={isPending}
          aria-invalid={Boolean(errors.name)}
          required={true}
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
          disabled={isPending}
          aria-invalid={Boolean(errors.maxCapacity)}
          required={true}
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
          disabled={isPending}
          aria-invalid={Boolean(errors.regularPrice)}
          required={true}
          {...register('regularPrice', {
            required: 'Regular price can not be empty',
            min: {
              value: '1',
              message: 'Regular price should be at least 1',
            },
            validate: {
              v1: validateRegularPriceIsMoreThanDiscount,
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
          disabled={isPending}
          aria-invalid={Boolean(errors.discount)}
          required={true}
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
          disabled={isPending}
          aria-invalid={Boolean(errors.description)}
          required={true}
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
        {/* <FileInput id="image" accept="image/*" type="file" /> */}
        <Input
          id="image"
          type="text"
          disabled={isPending}
          required={true}
          {...register('imageUrl', {
            required: 'Cabin photo should be added',
          })}
        />
      </FormRow>

      <FormRow>
        <ButtonsContainer>
          <Button
            $variation="secondary"
            $size="small"
            type="button"
            disabled={isPending}
            onClick={setOpenWindowName.bind(null, '')}
          >
            Cancel
          </Button>
          <Button $size="small" type="submit" disabled={isPending}>
            {cabin ? 'Edit cabin' : 'Create cabin'}
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

const defaultValues: Partial<CabinFormAttributes> = {
  name: 'Default cabin',
  description: 'Default description',
  discount: '150',
  imageUrl: '/cabins/cabin-005.jpg',
  maxCapacity: '5',
  regularPrice: '600',
};
