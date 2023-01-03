import { Link } from 'react-router-dom';
import { ROUTE } from '../constants/Route';

const Home = () => {
  return (
    <div className='flex mx-5 flex-col md:flex-row md:mx-auto gap-2 md:mt-16'>
      <img src='main.png' className='mx-auto rounded-xl mb-6 w-1/2' />
      <div>
        <h1 className='text-lg font-bold tracking-tight sm:text-3xl mb-6 mx-auto text-center'>
          Experience the AI-powered education
        </h1>

        <p className='m-6 text-lg leading-8 text-gray-600 sm:text-center'>
          We help K-12 studens to maximize their learning experience. Instantly generate
          assignments and print them for self-study. Analyze and track student
          progress. Share your ideas with other parents.
        </p>
        <div className='mt-8 flex gap-x-4 sm:justify-center'>
          <Link
            to={ROUTE.DEMO}
            className='px-6 py-2 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 mx-auto'
          >
            Demo
            <span className='ml-1 text-white' aria-hidden='true'>
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
