import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { generateDemo } from '../api/generateDemo.js';
import { ROUTE } from './Route.js';

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
          <div className='flex lg:hidden'></div>
          <div className='hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12'>
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
          <div className='hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end'>
            <a
              href='#'
              className='inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20'
            >
              Sign up
            </a>
          </div>
        </nav>
      </div>
      <main>
        <div className='relative px-6'>
          <div className='mx-auto max-w-3xl pt-16'>
            <div>
              <div>
                <div className='header'>
                  <div className='text-2xl font-semibold'>
                    <h1> Arithmetics assignment generator </h1>
                  </div>

                  <div className='text-l mt-6'>
                    <p>Select operations to include in assignments</p>
                    <label htmlFor='addition' className='block'>
                      <input
                        className='mr-1'
                        type='checkbox'
                        id='addition'
                        name='addition'
                        value='Addition'
                      />
                      Addition
                    </label>
                    <label htmlFor='subtraction' className='block'>
                      <input
                        className='mr-1'
                        type='checkbox'
                        id='subtraction'
                        name='Subtraction'
                        value='Subtraction'
                      />
                      Subtraction
                    </label>
                    <label htmlFor='multiplication' className='block'>
                      <input
                        className='mr-1'
                        type='checkbox'
                        id='multiplication'
                        name='multiplication'
                        value='Multiplication'
                      />
                      Multiplication
                    </label>
                    <label htmlFor='division' className='block'>
                      <input
                        className='mr-1'
                        type='checkbox'
                        id='division'
                        name='division'
                        value='Division'
                      />
                      Division
                    </label>
                    <br />
                    <label htmlFor='s1'>Select student level</label>

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
                </div>

                <div className='prompt-buttons'>
                  <button
                    className='m-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl'
                    disabled={isGenerating}
                    onClick={callGenerateEndpoint}
                  >
                    {!isGenerating ? 'Generate' : 'Generating...'}
                  </button>
                </div>

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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
