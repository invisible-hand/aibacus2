import {
  deleteAssignment,
  getAssignments,
} from '../utils/database/assignments';
import { useContext, useState } from 'react';

import { AuthContext } from '../store/AuthContext';

const DeleteAssignment = ({ assignmentId, setAssignmentList, isDeleting }) => {
  const [loading, setLoading] = useState(false);

  const { session } = useContext(AuthContext);

  const userId = session?.user.id;
  const handleDelete = async (assignmentId) => {
    setLoading(true);
    isDeleting(assignmentId);
    try {
      await deleteAssignment(assignmentId);
      const data = await getAssignments(userId);
      setAssignmentList(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      isDeleting(false);
    }
  };
  return (
    <button
      className='px-6 py-1 ml-1 my-4 text-white bg-red-600 rounded-lg hover:bg-red-900 disabled:bg-red-200 hover:disabled:bg-red-200'
      onClick={(_) => {
        handleDelete(assignmentId);
      }}
      disabled={loading}
    >
      Delete
    </button>
  );
};

export default DeleteAssignment;
