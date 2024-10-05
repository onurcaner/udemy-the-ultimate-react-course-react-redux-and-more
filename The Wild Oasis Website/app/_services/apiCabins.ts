import { notFound } from 'next/navigation';
import { cache } from 'react';

import { appRevalidates } from '../_appRevalidates';
import { delayDebug } from './delayDebug';
import { supabase } from './supabase';

export const revalidate = Math.min(appRevalidates.cabin, appRevalidates.cabins);

export const getCabin = cache(async (id: number) => {
  console.log(`Inside: getCabin(${String(id)})`);
  await delayDebug();

  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
});

export const getCabins = cache(async () => {
  console.log('Inside: getCabins()');
  await delayDebug();

  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
});
