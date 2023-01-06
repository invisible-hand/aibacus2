import { Button, Flex, Skeleton, useToast } from '@chakra-ui/react';
import { useContext, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import { Link } from 'react-router-dom';
import { ROUTE } from '../utils/constants/Route';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const toast = useToast();
  const [isFetching, setIsFetching] = useState(false);
  const { session, authLoading } = useContext(AuthContext);

  const logout = async (_) => {
    try {
      setIsFetching(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      toast({
        title: `Error`,
        description: `${error.description || error.message}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Skeleton isLoaded={!isFetching && !authLoading}>
      <Flex align={'center'}>
        {!session ? (
          <>
            <Button
              as={Link}
              to={ROUTE.LOGIN}
              bg={'green.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'green.500',
              }}
            >
              Log in
            </Button>
            <Button
              as={Link}
              to={ROUTE.REGISTER}
              ml='1'
              bg={'green.400'}
              color={'white'}
              w='full'
              _hover={{
                bg: 'green.500',
              }}
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            <Link to={ROUTE.PROFILE}>{session?.user.email}</Link>
            <Button
              ml='1'
              variant='outline'
              color={'green.400'}
              w='full'
              _hover={{
                color: 'green.500',
              }}
              onClick={logout}
              disabled={isFetching}
            >
              Log out
            </Button>
          </>
        )}
      </Flex>
    </Skeleton>
  );
};

export default Auth;
