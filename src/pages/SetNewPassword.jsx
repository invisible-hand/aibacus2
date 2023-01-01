import { ROUTE } from '../constants/Route';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SetNewPassword = () => {
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
      alert('new password is set');
      navigate(ROUTE.INDEX);
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
              <label className='block' htmlFor='newPassword'>
                New Password
              </label>
              <input
                id='newPassword'
                type='password'
                placeholder='enter new password...'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              />
              <p className='text-sm text-blue-500 ml-2 mt-1'>
                *please check your email.
              </p>
            </div>
            <div className='flex'>
              <button
                className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
                disabled={isFetching}
              >
                Set new password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetNewPassword;
