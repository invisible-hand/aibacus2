import { Stack, useColorModeValue } from '@chakra-ui/react';

import MobileNavItem from './MobileNavItem';
import { SUBJECT } from '../constants/Subject';

const subjects = Object.values(SUBJECT);

const MobileNav = () => {
  return (
    <Stack
      as='nav'
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {subjects.map((navItem) => (
        <MobileNavItem key={navItem} label={navItem} />
      ))}
    </Stack>
  );
};

export default MobileNav;
