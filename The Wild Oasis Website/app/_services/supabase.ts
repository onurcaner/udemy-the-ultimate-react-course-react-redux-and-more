import { createClient } from '@supabase/supabase-js';

import type { Database } from './supabase-generated-types';

export const supabase = createClient<Database>(
  'https://cjafnhdjrajxbuknayny.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqYWZuaGRqcmFqeGJ1a25heW55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3OTY5OTUsImV4cCI6MjAyNzM3Mjk5NX0.rlCsI2gGn4i67uIDCCbmMrxOH6jcctTvN2kUEl6yN8s',
);
