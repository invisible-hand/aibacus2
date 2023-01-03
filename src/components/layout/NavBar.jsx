import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

import Auth from '../Auth';
import DesktopNav from '../DesktopNav';
import Logo from '../Logo';
import MobileNav from '../MobileNav';

const NavBar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={'space-between'} align={'center'}>
          <Logo />
          <Flex
            display={{ base: 'none', md: 'flex' }}
            justify={{ md: 'space-between' }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Auth />
          </Stack>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );

  // return (
  //   <div className='px-6 pt-6'>
  //     <nav className='flex h-9 items-center gap-12' aria-label='Global'>
  //       <Logo />
  //       <div className='flex min-w-0 flex-1 gap-12 '>
  //         {subjects.map((gen) => (
  //           <NavLink
  //             key={gen}
  //             to={`/${gen}`}
  //             className='font-semibold text-gray-900 hover:text-gray-400 mr-2'
  //           >
  //             {gen}
  //           </NavLink>
  //         ))}
  //       </div>
  //       <Auth />
  //     </nav>
  //   </div>
  // );
};

export default NavBar;
