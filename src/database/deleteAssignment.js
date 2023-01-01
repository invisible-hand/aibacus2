import { supabase } from '../supabaseClient';

export const deleteAssignment = async (assignmentId) => {
  const { error } = await supabase
    .from('assignments')
    .delete()
    .eq('id', assignmentId);
  if (error) {
    throw new Error(error);
  }
};
