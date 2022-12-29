import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { generateDemo } from '../api/generateDemo.js';
import { ROUTE } from './Route.js';
import { NavLink } from 'react-router-dom';

const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];
const generates = ['Arithmetics', 'Math', 'Writing'];

const Demo = () => {
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const doc = new jsPDF();

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    try {
      const result = await generateDemo();
      setApiOutput(result);

      doc.text(
        `Student: Mike \nGrade: First to second\n` + `${result}`,
        15,
        15
      );
      doc.save('arithmetics.pdf');
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className='isolate bg-white'>
      <div className='px-6 pt-6 lg:px-8'>
        <nav
          className='flex h-9 items-center justify-between'
          aria-label='Global'
        >
          <div className='flex lg:min-w-0 lg:flex-1' aria-label='Global'>
            <Link to={ROUTE.INDEX} className='-m-1.5 p-1.5'>
              <span className='sr-only'>Aibacus</span>
              <img className='h-8' src='grid-outline.svg' alt='' />
            </Link>
          </div>
          <div className='hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12'>
            {generates.map((gen) => (
              <NavLink
                key={gen}
                to={`/${gen}`}
                className='font-semibold text-gray-900 hover:text-gray-400 mr-2'
              >
                {gen}
              </NavLink>
            ))}
          </div>
          <Link
            to={ROUTE.REGISTER}
            className='inline-block rounded-lg ml-2 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
          >
            Sign up
          </Link>
        </nav>
      </div>
      <main className='relative px-6'>
        <div className='mx-auto max-w-3xl pt-16'>
          <div className='text-2xl font-semibold'>
            <h1> Arithmetics assignment generator </h1>
          </div>

          <div className='text-l mt-6'>
            <p>Select operations to include in assignments</p>
            {operations.map((operation) => (
              <label key={operation} htmlFor='addition' className='block'>
                <input
                  className='mr-1'
                  type='checkbox'
                  id={operation}
                  name={operation}
                  value={operation}
                />
                {operation}
              </label>
            ))}

            <select
              id='s1'
              size='1'
              className='rounded-md p-2 mt-2 bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
              <option>First to second grade</option>
              <option>Third to fourth grade</option>
              <option>Fifth to sixth grade</option>
            </select>
          </div>

          <button
            className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
            disabled={isGenerating}
            onClick={callGenerateEndpoint}
          >
            {!isGenerating ? 'Generate' : 'Generating...'}
          </button>

          {apiOutput && (
            <div className='text-l m-4'>
              <div className='text-2xl font-medium m-2'>
                <h3>Output</h3>
              </div>
              <div className='text-m'>
                <pre>{apiOutput}</pre>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Demo;
