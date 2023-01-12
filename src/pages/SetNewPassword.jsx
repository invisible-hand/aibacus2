import * as Yup from 'yup';

import {
  Box,
  Button,
  Heading,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

import Password from '../components/Password';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SetNewPassword = () => {
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    password: Yup.string().min(6).required('Required'),
  });

  const handleSubmit = async ({ password }) => {
    try {
      setIsFetching(true);
      const { error } = await supabase.auth.updateUser({
        password,
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
      <Formik
        initialValues={{ password: '' }}
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
                <Field name='password'>
                  {({ field, form }) => (
                    <Password set={true} field={field} form={form} />
                  )}
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
                    Set new password
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default SetNewPassword;
