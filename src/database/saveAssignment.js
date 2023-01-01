import { supabase } from '../supabaseClient';

export const saveAssignment = async (
  table,
  subject,
  name,
  grade,
  assignment,
  user_id
) => {
  const { error } = await supabase.from(table).insert({
    subject,
    name,
    grade,
    assignment,
    user_id,
  });
  if (error) {
    throw new Error(error);
  }
};
