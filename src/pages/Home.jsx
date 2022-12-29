import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import { ROUTE } from './Route';

const Home = () => {
  const { session } = useContext(AuthContext);
  console.log(session);
  console.log(session?.user);
  return (
    <div className='isolate bg-white'>
      <div className='px-6 pt-6 lg:px-8'>
        <div>
          <nav
            className='flex h-9 items-center justify-between'
            aria-label='Global'
          >
            <div className='flex lg:min-w-0 lg:flex-1' aria-label='Global'>
              <a href='#' className='-m-1.5 p-1.5'>
                <span className='sr-only'>Aibacus</span>
                <img className='h-8' src='grid-outline.svg' alt='' />
              </a>
            </div>
            <div className='flex'></div>
            <div className='lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12'>
              <a
                href='generate'
                className='font-semibold text-gray-900 hover:text-gray-400 mr-2'
              >
                Arithmetics
              </a>

              <a
                href='generate_m'
                className='font-semibold text-gray-900 hover:text-gray-400 mr-2 ml-2'
              >
                Math
              </a>

              <a
                href='generate_w'
                className='font-semibold text-gray-900 hover:text-gray-400 ml-2'
              >
                Writing
              </a>
            </div>
            <div className='lg:flex lg:min-w-0 lg:flex-1 lg:justify-end'>
              {!session ? (
                <Link
                  to={ROUTE.REGISTER}
                  className='inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
                >
                  Sign up
                </Link>
              ) : (
                <p>{session?.user.email}</p>
              )}
            </div>
          </nav>
          <div role='dialog' aria-modal='true'></div>
        </div>
      </div>
      <main>
        <div className='relative px-6'>
          <div className='mx-auto max-w-3xl'>
            <div>
              <div>
                <h1 className='text-4xl font-bold tracking-tight sm:text-center sm:text-6xl mt-16 mb-6'>
                  Experience the power of screen-free education
                </h1>
                <img src='main.png' className='mx-auto rounded-xl mb-6 w-1/2' />

                <p className='mt-6 text-lg leading-8 text-gray-600 sm:text-center'>
                  We help K-12 studens to learn without screens. Instantly
                  generate assignments and print them for self-study. Analyze
                  and track student progress. Share your ideas with other
                  parents.
                </p>
                <div className='mt-8 flex gap-x-4 sm:justify-center'>
                  <Link
                    to={ROUTE.DEMO}
                    className='inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold text-white shadow-lg ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700'
                  >
                    Demo
                    <span className='text-indigo-200' aria-hidden='true'>
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
