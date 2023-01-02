import { supabase } from '../supabaseClient';

const getAuth = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session.user.aud === 'authenticated';
  } catch (error) {
    return false;
  }
};
const auth = await getAuth();
export const isAuth = { auth };
