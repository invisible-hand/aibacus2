import { supabase } from '../supabaseClient';

export const updateChildInDB = async (childId, name, grade) => {
  const { error } = await supabase
    .from('children')
    .update({ name, grade })
    .eq('id', childId);
  if (error) {
    throw new Error(error);
  }
};
