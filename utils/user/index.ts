import supabaseServerClient from '../supabaseServer';

const getUser = async () => {
  try {
    const supabase = await supabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export { getUser };
