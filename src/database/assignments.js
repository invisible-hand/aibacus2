import { supabase } from '../supabaseClient';
const assignments = 'assignments';

const COL = Object.freeze({
  ID: 'id',
  SUBJECT: 'subject',
  NAME: 'name',
  GRADE: 'grade',
  ASSIGNMENT: 'assignment',
  DATE_ADDED: 'date_added',
  USER_ID: 'user_id',
});

const all = `${COL.ID}, ${COL.SUBJECT}, ${COL.NAME}, ${COL.GRADE}, ${COL.ASSIGNMENT}, ${COL.DATE_ADDED}`;

export const getAssignments = async (userId) => {
  const { data, error } = await supabase
    .from(assignments)
    .select(all)
    .eq(COL.USER_ID, userId);
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const getAssignment = async (assignmentId) => {
  const { data, error } = await supabase
    .from(assignments)
    .select(all)
    .eq(COL.ID, assignmentId);
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const saveAssignment = async (
  subject,
  name,
  grade,
  assignment,
  user_id
) => {
  const { error } = await supabase.from(assignments).insert({
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

export const deleteAssignment = async (assignmentId) => {
  const { error } = await supabase
    .from(assignments)
    .delete()
    .eq(COL.ID, assignmentId);
  if (error) {
    throw new Error(error);
  }
};
