import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

import Email from '../components/Email';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const ResetPassword = () => {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements;
    const email = formElements.email.value;

    try {
      setIsFetching(true);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.protocol}://${window.location.host}${ROUTE.SET_NEW_PASSWORD}`,
      });
      if (error) {
        throw new Error(error);
      }
      navigate(ROUTE.SET_NEW_PASSWORD);
    } catch (error) {
      alert('connection problem');
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
            <Email />
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
              <Box>
                <Text as='span'>Don't have an account?</Text>
                <Button
                  ml={1}
                  variant={'link'}
                  display={'inline'}
                  as={Link}
                  to={ROUTE.REGISTER}
                  color={'green.400'}
                >
                  Register
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </form>
    </Stack>
  );
};

export default ResetPassword;
