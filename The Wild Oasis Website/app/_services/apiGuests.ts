import { delayDebug } from './delayDebug';
import { supabase } from './supabase';
import type { CreateGuestAttributes, UpdateGuestAttributes } from './types';

export async function getGuest(email: string) {
  console.log(`Inside: getGuest(${email})`);
  await delayDebug();

  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  return data;
}

export async function createGuest(newGuest: CreateGuestAttributes) {
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
}

export async function updateGuest(
  id: number,
  updateData: UpdateGuestAttributes,
) {
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
}
