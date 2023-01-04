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
import Password from '../components/Password';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const Login = () => {
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements;
    const email = formElements.email.value;
    const password = formElements.password.value;

    try {
      setIsFetching(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw new Error(error);
      }
      navigate(ROUTE.INDEX);
    } catch (error) {
      alert('connection problem');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Stack minW={460} spacing={8} mx={'auto'} maxW={'lg'} px={6} my={5}>
      <Heading mx={'auto'} fontSize={'4xl'}>
        Log in to your account
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
            <Password />
            <Stack spacing={10}>
              <Button
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                type='submit'
                isDisabled={isFetching}
              >
                Log in
              </Button>
              <Stack
                direction={'column'}
                align={'start'}
                justify={'space-between'}
              >
                <Button
                  as={Link}
                  variant={'link'}
                  to={ROUTE.RESET_PASSWORD}
                  color={'green.400'}
                >
                  Forgot Password?
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
          </Stack>
        </Box>
      </form>
    </Stack>
  );
};

export default Login;
