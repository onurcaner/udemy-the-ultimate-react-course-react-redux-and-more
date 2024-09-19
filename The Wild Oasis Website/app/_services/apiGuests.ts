import { delayDebug } from './delayDebug';
import { supabase } from './supabase';
import { CreateGuestAttributes } from './types';

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
