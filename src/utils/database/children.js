import { supabase } from '../../supabaseClient';

const children = 'children';

const COL = Object.freeze({
  ID: 'id',
  NAME: 'name',
  GRADE: 'grade',
  DATE_ADDED: 'date_added',
  USER_ID: 'user_id',
});

export const addChildToDB = async (name, grade, user_id) => {
  const { error } = await supabase.from(children).insert({
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
    .from(children)
    .select(`${COL.ID}, ${COL.NAME}, ${COL.GRADE}`)
    .eq(COL.USER_ID, userId);
  if (error) {
    throw new Error(error);
  }
  return data;
};

export const updateChildInDB = async (childId, name, grade) => {
  const { error } = await supabase
    .from(children)
    .update({ name, grade })
    .eq(COL.ID, childId);
  if (error) {
    throw new Error(error);
  }
};

export const removeChildFromDB = async (childId) => {
  const { error } = await supabase.from(children).delete().eq(COL.ID, childId);
  if (error) {
    throw new Error(error);
  }
};
