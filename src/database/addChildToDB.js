import { supabase } from '../supabaseClient';

export const addChildToDB = async (name, grade, user_id) => {
  console.log(`trying to add child`);
  console.log(`name: ${name}`);
  console.log(`grade: ${grade}`);
  const { error } = await supabase.from('children').insert({
    name,
    grade,
    user_id,
  });
  if (error) {
    throw new Error(error);
  }
};
