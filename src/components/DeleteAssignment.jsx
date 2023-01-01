import { deleteAssignment } from '../database/deleteAssignment';

const DeleteAssignment = ({ assignmentId }) => {
  const handleDelete = async (id) => {
    //TODO! update list after delete
    try {
      await deleteAssignment(assignmentId);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <button
      className='px-6 py-1 ml-1 my-4 text-white bg-red-600 rounded-lg hover:bg-red-900 disabled:bg-red-200 hover:disabled:bg-red-200'
      onClick={(_) => {
        handleDelete(assignmentId);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteAssignment;
