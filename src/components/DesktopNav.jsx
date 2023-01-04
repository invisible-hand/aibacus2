import { Box, Stack, useColorModeValue } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';
import { SUBJECT } from '../utils/constants/Subject';

const subjects = Object.values(SUBJECT);

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack as='nav' direction={'row'} spacing={4}>
      {subjects.map((navItem) => (
        <Box key={navItem}>
          <NavLink
            p={2}
            to={`/${navItem}`}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem}
          </NavLink>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
