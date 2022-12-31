import React from 'react';
import { supabase } from '../supabaseClient';

const DeleteAssignment = ({ assignmentId }) => {
  const deleteAssignment = async (id) => {
    //TODO! update list after delete
    try {
      const { error } = await supabase
        .from('assignments')
        .delete()
        .eq('id', id);
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <button
      className='px-6 py-1 ml-1 my-4 text-white bg-red-600 rounded-lg hover:bg-red-900 disabled:bg-red-200 hover:disabled:bg-red-200'
      onClick={(_) => {
        deleteAssignment(assignmentId);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteAssignment;
