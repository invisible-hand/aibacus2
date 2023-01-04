import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';

import SideMobileNav from './SideMobileNav';
import SidebarContent from './SideBarContent';

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} h={'full'}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        h={'full'}
        // size='full'
      >
        <DrawerContent h={'full'}>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <SideMobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
    </Box>
  );
};

export default SideBar;
