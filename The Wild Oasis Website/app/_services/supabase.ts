import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';

import type { Database } from './supabase-generated-types';

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL as unknown as string,
  process.env.SUPABASE_SERVICE_KEY as unknown as string,
);

export const authorizeNextjs = cache(async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.SUPABASE_EMAIL as unknown as string,
    password: process.env.SUPABASE_PASSWORD as unknown as string,
  });

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  console.log(data.user.role);
});
