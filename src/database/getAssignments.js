import { supabase } from '../supabaseClient';

export const getAssignments = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('id, subject, name, grade, assignment, date_added')
      .eq('user_id', userId);
    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
