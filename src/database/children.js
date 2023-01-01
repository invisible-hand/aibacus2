import { supabase } from '../supabaseClient';

export const addChildToDB = async (name, grade, user_id) => {
  const { error } = await supabase.from('children').insert({
    name,
    grade,
    user_id,
  });
  if (error) {
    throw new Error(error);
  }
};

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

export const updateChildInDB = async (childId, name, grade) => {
  const { error } = await supabase
    .from('children')
    .update({ name, grade })
    .eq('id', childId);
  if (error) {
    throw new Error(error);
  }
};

export const removeChildFromDB = async (childId) => {
  const { error } = await supabase.from('children').delete().eq('id', childId);
  if (error) {
    throw new Error(error);
  }
};
