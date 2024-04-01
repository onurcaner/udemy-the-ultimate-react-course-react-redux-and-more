import { supabase } from './supabase';
import { CreateCabinAttributes } from './types';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return null;
}

export async function createCabin(cabin: CreateCabinAttributes) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created');
  }

  return data;
}
