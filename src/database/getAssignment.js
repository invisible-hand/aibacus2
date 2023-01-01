import { supabase } from '../supabaseClient';

export const getAssignment = async (assignmentId) => {
  try {
    const { data, error } = await supabase
      .from('assignments')
      .select('id, subject, name, grade, assignment, date_added')
      .eq('id', assignmentId);
    if (error) {
      throw new Error(error);
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
