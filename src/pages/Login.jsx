import { Link, useNavigate } from 'react-router-dom';

import { ROUTE } from '../constants/Route';
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
    <div className='flex-1 flex items-center justify-center'>
      <div className='px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3'>
        <h3 className='text-2xl font-bold text-center'>Log in</h3>
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
            <div className='mt-4'>
              <label className='block'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Password'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              />
            </div>
            <div className='flex'>
              <button
                className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
                disabled={isFetching}
              >
                Log in
              </button>
            </div>
            <div className='mt-2 text-grey-dark'>
              <Link
                to={ROUTE.RESET_PASSWORD}
                className='text-blue-600 hover:underline ml-2'
              >
                Forgot Password?
              </Link>
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

export default Login;
