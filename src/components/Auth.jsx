import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../pages/Route';
import { AuthContext } from '../store/AuthContext';
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { session } = useContext(AuthContext);

  const logout = async (_) => {
    try {
      setIsFetching(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      alert('connection problem');
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      {!session ? (
        <>
          <Link
            to={ROUTE.LOGIN}
            className='inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
          >
            Log in
          </Link>
          <Link
            to={ROUTE.REGISTER}
            className='inline-block rounded-lg ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
          >
            Sign up
          </Link>
        </>
      ) : (
        <div className='flex items-center'>
          <Link to={ROUTE.PROFILE}>{session?.user.email}</Link>
          <button
            className='inline-block rounded-lg ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
            onClick={logout}
            disabled={isFetching}
          >
            Log out
          </button>
        </div>
      )}
    </>
  );
};

export default Auth;
