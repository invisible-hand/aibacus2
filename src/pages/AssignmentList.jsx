import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import DeleteAssignment from '../components/DeleteAssignment';
import DownloadPDF from '../components/DownloadPDF';
import { GRADE } from '../api/promptChunks';
import { getAssignments } from '../database/getAssignments';

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
    <>
      {assignmentList && (
        <>
          {assignmentList.map((assignment) => (
            <div key={assignment.id}>
              <span>
                {assignment.subject} - {GRADE[assignment.grade]} grade.
              </span>
              {' | '}
              <span>
                {new Date(assignment.date_added).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </span>
              {' | '}
              <DeleteAssignment
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
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default AssignmentList;

// supabase.from('assignments').insert({user_id: session.user.id, subject: 'math', name: 'Mark', grade: '3', assignment: '1. 1 + 1 =\n2. 2 + 2 =\n3. 3 + 3\n'})