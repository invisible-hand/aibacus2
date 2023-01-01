import AssignmentList from '../components/AssignmentList';
import ChildrenList from '../components/ChildrenList';

const Profile = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <ChildrenList />
      <AssignmentList />
    </div>
  );
};

export default Profile;
