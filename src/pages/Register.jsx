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
import { ROUTE } from '../constants/Route';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const Register = () => {
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const email = elements.email.value;
    const password = elements.password.value;

    try {
      setIsFetching(true);
      const { error } = await supabase.auth.signUp({
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
        Register
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
                isDisabled={isFetching}
              >
                Sign up
              </Button>
              <Stack
                direction={'column'}
                align={'start'}
                justify={'space-between'}
              >
                <Box>
                  <Text as='span'>Already have an account?</Text>
                  <Button
                    ml={1}
                    variant={'link'}
                    display={'inline'}
                    as={Link}
                    to={ROUTE.LOGIN}
                    color={'green.400'}
                  >
                    Log in
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

export default Register;
