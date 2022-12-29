import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { generateDemo } from '../api/generateDemo.js';
import { ROUTE } from './Route.js';
import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import NavBar from '../components/NavBar.jsx';

const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

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
    <div className='bg-white'>
      <NavBar />
      <main className='relative px-6'>
        <div className='mx-auto max-w-3xl pt-16'>
          <h1 className='text-2xl font-semibold'>
            Arithmetics assignment generator
          </h1>

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
