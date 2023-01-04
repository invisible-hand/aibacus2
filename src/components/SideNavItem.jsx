import { Flex, Link } from '@chakra-ui/react';

const SideNavItem = ({ children, ...rest }) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      w={'full'}
    >
      <Flex
        align='center'
        w={'full'}
        p='4'
        // mx='4'
        borderRadius='md'
        // role='group'
        cursor='pointer'
        _hover={{
          bg: 'green.400',
          color: 'white',
        }}
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  );
};

export default SideNavItem;
