import {
  Box,
  CloseButton,
  Flex,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import SideNavItem from './SideNavItem';

const LinkItems = [{ name: 'General' }, { name: 'Past assignments' }];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      left={0}
      // h='full'
      my={-10}
      {...rest}
    >
      <Flex
        h='20'
        alignItems='center'
        mx='8'
        justifyContent='flex-end'
        display={{ base: 'flex', md: 'none' }}
        // mt={10}
      >
        <CloseButton onClick={onClose} />
      </Flex>
      <Stack
        direction='column'
        divider={<StackDivider borderColor='gray.200' />}
        align={'start'}
        // spacing={5}
        justifyContent={'flex-start'}
        w={'full'}
      >
        {LinkItems.map((link) => (
          <SideNavItem key={link.name}>
            <Text w={'full'}>{link.name}</Text>
          </SideNavItem>
        ))}
      </Stack>
    </Box>
  );
};

export default SidebarContent;
