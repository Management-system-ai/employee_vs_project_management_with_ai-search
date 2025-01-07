'use server';

import { Provider } from '@supabase/auth-js/src/lib/types';
import supabaseServerClient from './supabaseServer';
import { redirect } from 'next/navigation';
import { SITE_URL } from '@/constants';

const signInWith = (provider: Provider) => async () => {
  const supabase = await supabaseServerClient();

  const auth_callback_url = `${SITE_URL}auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: auth_callback_url
    }
  });

  if (error) {
    console.log(error);
  }

  if (data?.url) {
    redirect(data.url);
  }
};

const signinWithGoogle = signInWith('google');

const signOut = async () => {
  const supabase = await supabaseServerClient();
  await supabase.auth.signOut();
};

export { signinWithGoogle, signOut };
