import AssignmentList from './AssignmentList';

const Profile = () => {
  return (
    <>
      <AssignmentList />
    </>
  );
};

export default Profile;

// supabase.from('assignments').insert({user_id: session.user.id, subject: 'math', name: 'Mark', grade: '3', assignment: '1. 1 + 1 =\n2. 2 + 2 =\n3. 3 + 3\n'})
