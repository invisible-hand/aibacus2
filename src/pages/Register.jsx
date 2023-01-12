import * as Yup from 'yup';

import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import Email from '../components/Email';
import Password from '../components/Password';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';
import { useState } from 'react';

const Register = () => {
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(false);

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6).required('Required'),
  });

  const handleSubmit = async ({ email, password }) => {
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
        Register
      </Heading>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <Field name='email'>
                  {({ field, form }) => <Email field={field} form={form} />}
                </Field>
                <Field name='password'>
                  {({ field, form }) => <Password field={field} form={form} />}
                </Field>
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
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default Register;
