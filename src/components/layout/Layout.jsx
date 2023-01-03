import { Box, Flex } from '@chakra-ui/react';

import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <Flex bg={'white'} minH={'100vh'} direction={'column'}>
      <NavBar />
      <Flex as='main' flex={1} px={1} mt={10} h={'full'}>
        <Box mx={'auto'} maxW={'3xl'}>
          {children}
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
