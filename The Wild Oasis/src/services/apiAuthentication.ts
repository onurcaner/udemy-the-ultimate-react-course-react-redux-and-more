import { supabase } from './supabase';
import { CustomUserMetadata } from './types';

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

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return;
}

export async function createUser({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatarUrl: '/logos/default-user.jpg',
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateUserData({
  avatar,
  fullName,
  password,
}: {
  fullName?: string;
  avatar?: File | null;
  password?: string;
}) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  if (avatar) {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatar-images')
      .upload(userData.user.id, avatar, { upsert: true });
    if (uploadError) {
      console.error(uploadError);
      throw new Error(uploadError.message);
    }

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatarUrl: uploadData.path },
    });
    if (updateError) {
      console.error(updateError);
      throw new Error(updateError.message);
    }
  }

  if (fullName) {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { fullName },
    });
    if (updateError) {
      console.error(updateError);
      throw new Error(updateError.message);
    }
  }

  if (password) {
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    if (updateError) {
      console.error(updateError);
      throw new Error(updateError.message);
    }
  }
}

export async function getLoggedInUserAvatar() {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  const { data, error: downloadError } = await supabase.storage
    .from('avatar-images')
    .download((userData.user.user_metadata as CustomUserMetadata).avatarUrl);
  if (downloadError) {
    console.error(downloadError);
    throw new Error(downloadError.message);
  }

  return data;
}
