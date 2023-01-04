import AssignmentList from '../components/AssignmentList';
import ChildrenList from '../components/ChildrenList';
import { Flex } from '@chakra-ui/react';
import SideBar from '../components/SideBar';

const Profile = () => {
  return (
    <>
      {/* <SideBar /> */}
      <Flex direction={{ base: 'column', md: 'row' }}>
        <ChildrenList />
        <AssignmentList />
      </Flex>
    </>
  );
};

export default Profile;
