import { Link, useNavigate } from 'react-router-dom';

import { ROUTE } from '../constants/Route';
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
        // * for some reason incoming link doesn't have path to set-new-password path.
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
    <div className='flex items-center justify-center'>
      <div className='px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/2 lg:w-1/2 sm:w-1/2'>
        <h3 className='text-2xl font-bold text-center'>Password Recovery</h3>
        <form onSubmit={handleSubmit}>
          <div className='mt-4'>
            <div className='mt-4'>
              <label className='block' htmlFor='email'>
                Email
              </label>
              <input
                id='email'
                type='text'
                placeholder='Email'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              />
            </div>
            <div className='flex'>
              <button
                className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
                disabled={isFetching}
              >
                Send recovery link
              </button>
            </div>
            <div className='mt-2 text-grey-dark'>
              Don't have an account?
              <Link
                to={ROUTE.REGISTER}
                className='text-blue-600 hover:underline ml-2'
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
