import {
  deleteAssignment,
  getAssignments,
} from '../utils/database/assignments';
import { useContext, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Button } from '@chakra-ui/react';

const AssignmentDelete = ({ assignmentId, setAssignmentList, isDeleting }) => {
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
    <Button
      bg={'red.400'}
      color={'white'}
      _hover={{
        bg: 'red.500',
      }}
      onClick={(_) => {
        handleDelete(assignmentId);
      }}
      disabled={loading}
    >
      Delete
    </Button>
  );
};

export default AssignmentDelete;
