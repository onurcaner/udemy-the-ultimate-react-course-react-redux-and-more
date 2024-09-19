'use client';

import Image from 'next/image';
import type { JSX } from 'react';

import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { Input } from '@/app/_components/Input';

interface UserFormProps {
  SelectCountry: JSX.Element;
}

export function UserForm({ SelectCountry }: UserFormProps): JSX.Element {
  return (
    <Form>
      <div>
        <label>Full name</label>
        <Input disabled />
      </div>

      <div>
        <label>Email address</label>
        <Input disabled />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <div className="relative h-5 w-8 overflow-hidden rounded-sm bg-primary-800 dark:bg-primary-200">
            <Image
              src={'https://flagcdn.com/pl.svg'}
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
        <Input name="nationalId" />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button $variant="primary" type="submit" className="text-base">
          Update profile
        </Button>
      </div>
    </Form>
  );
}
