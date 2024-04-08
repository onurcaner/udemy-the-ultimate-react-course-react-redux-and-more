import { supabase } from './supabase';

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getLoggedInUser() {
  const { data } = await supabase.auth.getUser();

  return data;
}
