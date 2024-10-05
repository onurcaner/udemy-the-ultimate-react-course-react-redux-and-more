import { cache } from 'react';

import { appRevalidates } from '../_appRevalidates';
import { delayDebug } from './delayDebug';
import { supabase } from './supabase';
import type { CreateGuestAttributes, UpdateGuestAttributes } from './types';

export const revalidate = Math.min(appRevalidates.guest, appRevalidates.guests);

export const getGuest = async (email: string) => {
  console.log(`Inside: getGuest(${email})`);
  await delayDebug();

  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  return data;
};

export const createGuest = async (newGuest: CreateGuestAttributes) => {
  console.log(`Inside: createGuest(${Object.values(newGuest).join(' ')})`);
  await delayDebug();

  const { data, error } = await supabase.from('guests').insert([
    {
      countryFlag: '',
      email: newGuest.email,
      fullName: newGuest.fullName,
      nationalId: '',
      nationality: '',
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
};

export const updateGuest = async (
  id: number,
  updateData: UpdateGuestAttributes,
) => {
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }

  return data;
};
