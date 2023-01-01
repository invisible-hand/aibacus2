import { supabase } from '../supabaseClient';

export const getChildrenFromDB = async (userId) => {
  const { data, error } = await supabase
    .from('children')
    .select('id, name, grade')
    .eq('user_id', userId);
  if (error) {
    throw new Error(error);
  }
  return data;
};
