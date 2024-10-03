'use client';

import Image from 'next/image';
import type { JSX } from 'react';
import { useFormStatus } from 'react-dom';

import { GuestFormKeys } from './types';
import { updateGuestAction } from './updateGuestAction';
import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { Input } from '@/app/_components/Input';
import { GuestAttributes } from '@/app/_services/types';

interface UserFormProps {
  SelectCountry: JSX.Element;
  guest: GuestAttributes;
}

export function UserForm(props: UserFormProps): JSX.Element {
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Form action={updateGuestAction}>
      <_UserForm {...props} />
    </Form>
  );
}

function _UserForm({ SelectCountry, guest }: UserFormProps): JSX.Element {
  const { pending: isPending } = useFormStatus();

  return (
    <>
      <div>
        <label>Full name</label>
        <Input disabled value={guest.fullName} />
      </div>

      <div>
        <label>Email address</label>
        <Input disabled value={guest.email} />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor={GuestFormKeys.Nationality}>Where are you from?</label>
          <div className="relative h-5 w-8 overflow-hidden rounded-sm bg-primary-800 dark:bg-primary-200">
            <Image
              src={guest.countryFlag}
              fill
              alt="Country flag"
              className="absolute object-cover object-center"
            />
          </div>
        </div>

        {SelectCountry}
      </div>

      <div>
        <label htmlFor={GuestFormKeys.NationalId}>National ID</label>
        <Input
          name={GuestFormKeys.NationalId}
          id={GuestFormKeys.NationalId}
          defaultValue={guest.nationalId}
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button
          $variant="primary"
          type="submit"
          className="text-base"
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update profile'}
        </Button>
      </div>
    </>
  );
}
