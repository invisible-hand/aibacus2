import {
  Box,
  Button,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import Password from '../components/Password';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SetNewPassword = () => {
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements;
    const newPassword = formElements.newPassword.value;

    try {
      setIsFetching(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error);
      }
      toast({
        position: 'top',
        description: 'Password changed',
        status: 'success',
        isClosable: true,
      });
      navigate(ROUTE.INDEX);
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error',
        description: `${error.description || error.message}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Stack minW={460} spacing={8} mx={'auto'} maxW={'lg'} px={6} my={5}>
      <Heading mx={'auto'} fontSize={'4xl'}>
        Password Recovery
      </Heading>
      <form onSubmit={handleSubmit}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <Password set={true} />
            <Stack spacing={10}>
              <Button
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                isDisabled={isFetching}
                type='submit'
              >
                Send recovery link
              </Button>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Stack>
  );
};

export default SetNewPassword;
