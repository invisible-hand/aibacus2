import { supabase } from '../supabaseClient';

export const getAssignment = async (assignmentId) => {
  const { data, error } = await supabase
    .from('assignments')
    .select('id, subject, name, grade, assignment, date_added')
    .eq('id', assignmentId);
  if (error) {
    throw new Error(error);
  }
  return data;
};
