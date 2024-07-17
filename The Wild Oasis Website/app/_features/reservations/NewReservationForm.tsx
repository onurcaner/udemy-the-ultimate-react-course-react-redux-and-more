'use client';

import { Button } from '@/app/_components/Button';
import { Form } from '@/app/_components/Form';
import { Select } from '@/app/_components/Select';
import { Textarea } from '@/app/_components/Textarea';
import { CabinAttributes } from '@/app/_services/types';

export function NewReservationForm({
  cabin,
}: {
  cabin: CabinAttributes;
}): JSX.Element {
  return (
    <div>
      <div className="flex items-center justify-between bg-primary-200 px-12 py-3 text-primary-700 dark:bg-primary-800 dark:text-primary-300">
        <p>Logged in as</p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <Form>
        <div>
          <label htmlFor="guests">How many guests?</label>
          <Select name="guests" id="guests" required>
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity })
              .map((_, i) => i + 1)
              .map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? 'guest' : 'guests'}
                </option>
              ))}
          </Select>
        </div>

        <div>
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <Textarea
            name="observations"
            id="observations"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-700 dark:text-primary-300">
            Start by selecting dates
          </p>

          <Button>Reserve now</Button>
        </div>
      </Form>
    </div>
  );
}
