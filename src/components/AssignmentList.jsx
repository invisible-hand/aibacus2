import { Box, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import AssignmentDelete from './AssignmentDelete';
import { AuthContext } from '../store/AuthContext';
import DownloadPDF from './DownloadPDF';
import { GRADE } from '../utils/ai/promptChunks';
import { getAssignments } from '../utils/database/assignments';

const AssignmentList = () => {
  const { session } = useContext(AuthContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const [assignmentList, setAssignmentList] = useState(null);

  const userId = session?.user.id;
  useEffect(() => {
    if (userId) {
      const handleGetAssignments = async () => {
        try {
          const data = await getAssignments(userId);
          setAssignmentList(data);
        } catch (error) {
          alert(error.message);
        }
      };
      handleGetAssignments();
    }
  }, [userId, setAssignmentList]);

  return (
    <Box>
      {assignmentList && (
        <>
          {assignmentList.map((assignment) => (
            <Box key={assignment.id}>
              <Text as='span'>
                {assignment.subject} - {GRADE[assignment.grade]} grade.
              </Text>
              {' | '}
              <Text as='span'>
                {new Date(assignment.date_added).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>
              {' | '}
              <AssignmentDelete
                assignmentId={assignment.id}
                setAssignmentList={setAssignmentList}
                isDeleting={setIsDeleting}
              />
              {' | '}
              <DownloadPDF
                className='px-6 py-1 ml-1 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
                name={assignment.name}
                grade={assignment.grade}
                subject={assignment.subject}
                data={assignment.assignment.split('\\n')}
                disabled={isDeleting === assignment.id}
              >
                Download PDF
              </DownloadPDF>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default AssignmentList;
