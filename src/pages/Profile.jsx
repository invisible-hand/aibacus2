import { AuthContext } from '../store/AuthContext';
import DownloadPDF from '../components/DownloadPDF';
import { GRADE } from '../api/promptChunks';
import { supabase } from '../supabaseClient';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const dummyList = [
  {
    name: 'Mike',
    grade: 3,
    date_add: new Date(2022, 11, 31, 0, 0, 0),
    subject: 'Math',
    id: '1',
    assignment:
      '1. 8 + 4 =\n2. 6 × 3 =\n3. 10 - 5 =\n4. 4 × 7 =\n5. 9 + 6 =\n6. 8 - 4 =\n7. 5 × 6 =\n8. 10 + 4 =\n9. 7 - 3 =\n10. 9 × 2 =',
  },
  {
    name: 'Mike',
    grade: 3,
    date_add: new Date(2022, 11, 31, 0, 0, 0),
    subject: 'Math',
    id: '2',
    assignment:
      '1. 8 + 3 =\n2. 6 × 4 =\n3. 10 - 3 =\n4. 4 × 5 =\n5. 11 + 6 =\n6. 16 - 4 =\n7. 2 × 6 =\n8. 10 + 11 =\n9. 15 - 7 =\n10. 10 × 3 =',
  },
];
const Profile = () => {
  const { session } = useContext(AuthContext);

  const [assignmentList, setAssignmentList] = useState(dummyList);

  //* for each:
  // const [result, setResult] = useState(null);
  // const [name, setName] = useState(null);
  // const [grate, setGrate] = useState(null);
  // const [subject, setSubject] = useState(null);

  //* need to create table first!
  // const userId = session.user.id;
  // useEffect(() => {
  //   const getAssignments = async () => {
  //     try {
  //       const response = await supabase
  //         .from('assignments')
  //         .select('id', 'subject', 'name', 'grade', 'assignment')
  //         .where({ user_id: userId });
  //       // console.log(response.data);
  //       setAssignmentList(response.data);
  //     } catch (error) {
  //       alert(error.message);
  //     }
  //   };
  //   getAssignments();
  // }, [userId, setAssignmentList]);

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
                {assignment.date_add.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </span>
              {' | '}
              <DownloadPDF
                className='px-6 py-1 ml-1 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
                name={assignment.name}
                grade={assignment.grade}
                data={assignment.assignment.split('\n')}
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
