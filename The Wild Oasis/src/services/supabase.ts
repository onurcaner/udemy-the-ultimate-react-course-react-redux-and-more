import { createClient } from '@supabase/supabase-js';

import { Database } from './supabaseAutoTypes';

const supabaseUrl = 'https://cjafnhdjrajxbuknayny.supabase.co';
/* const supabaseKey = process.env.SUPABASE_KEY; */
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqYWZuaGRqcmFqeGJ1a25heW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTY5OTUsImV4cCI6MjAyNzM3Mjk5NX0.rlCsI2gGn4i67uIDCCbmMrxOH6jcctTvN2kUEl6yN8s';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
