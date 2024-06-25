import { supabase } from './supabase';

export async function getCabin(id: number) {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};
