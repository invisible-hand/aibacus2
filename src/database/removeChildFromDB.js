import { supabase } from '../supabaseClient';

export const removeChildFromDB = async (childId) => {
  const { error } = await supabase.from('children').delete().eq('id', childId);
  if (error) {
    throw new Error(error);
  }
};
