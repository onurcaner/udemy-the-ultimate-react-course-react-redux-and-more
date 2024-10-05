import { cache } from 'react';

import { appRevalidates } from '../_appRevalidates';
import { delayDebug } from './delayDebug';
import { supabase } from './supabase';

export const revalidate = appRevalidates.settings;
export const getSettings = cache(async () => {
  console.log('Inside: getSettings()');
  await delayDebug();

  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
});
