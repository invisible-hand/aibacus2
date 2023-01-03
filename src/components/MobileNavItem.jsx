import { NavLink } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';

const MobileNavItem = ({ label }) => {
  return (
    <Stack direction={'column'} spacing={1}>
      <NavLink
        p={2}
        to={`/${label}`}
        fontSize={'sm'}
        fontWeight={500}
        _hover={{
          textDecoration: 'none',
        }}
      >
        {label}
      </NavLink>
    </Stack>
  );
};

export default MobileNavItem;
