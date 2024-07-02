'use client';

import Image from 'next/image';

import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';

interface UserFormProps {
  SelectCountry: JSX.Element;
}

export function UserForm({ SelectCountry }: UserFormProps): JSX.Element {
  return (
    <Form>
      <div>
        <label>Full name</label>
        <input
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200"
        />
      </div>

      <div>
        <label>Email address</label>
        <input
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200"
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative h-5 w-8 overflow-hidden rounded-sm bg-primary-800 dark:bg-primary-200">
            <Image
              src={'https://flagcdn.com/dz.svg'}
              fill
              alt="Country flag"
              className="absolute object-cover object-center"
            />
          </div>
        </div>

        {SelectCountry}
      </div>

      <div>
        <label htmlFor="nationalId">National ID</label>
        <input
          name="nationalId"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-800 dark:text-primary-200"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button $variant="primary" type="submit" className="text-base">
          Update profile
        </Button>
      </div>
    </Form>
  );
}
