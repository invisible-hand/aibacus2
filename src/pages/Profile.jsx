import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import DeleteAssignment from '../components/DeleteAssignment';
import DownloadPDF from '../components/DownloadPDF';
import { GRADE } from '../api/promptChunks';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const { session } = useContext(AuthContext);

  const [assignmentList, setAssignmentList] = useState(null);

  //* for each:
  // const [result, setResult] = useState(null);
  // const [name, setName] = useState(null);
  // const [grate, setGrate] = useState(null);
  // const [subject, setSubject] = useState(null);

  //* need to create table first!

  const userId = session?.user.id;
  useEffect(() => {
    if (userId) {
      const getAssignments = async () => {
        try {
          const { data, error } = await supabase
            .from('assignments')
            .select('id, subject, name, grade, assignment, date_added')
            .eq('user_id', userId);
          if (error) {
            throw new Error(error);
          }
          setAssignmentList(data);
        } catch (error) {
          alert(error.message);
        }
      };
      getAssignments();
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
              <span>{assignment.date_added}</span>
              {' | '}
              <DeleteAssignment assignmentId={assignment.id} />
              {' | '}
              <DownloadPDF
                className='px-6 py-1 ml-1 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
                name={assignment.name}
                grade={assignment.grade}
                data={assignment.assignment.split('\\n')}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Profile;

// supabase.from('assignments').insert({user_id: session.user.id, subject: 'math', name: 'Mark', grade: '3', assignment: '1. 1 + 1 =\n2. 2 + 2 =\n3. 3 + 3\n'})
