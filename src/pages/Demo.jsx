import { useState } from 'react';
// import { jsPDF } from 'jspdf';
import { makeDemoRequest } from '../api/demoRequest.js';
import NavBar from '../components/NavBar.jsx';

const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

const Demo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    try {
      const aiResponse = await makeDemoRequest();
      setResponse(aiResponse);
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

          {response?.length > 0 && (
            <>
              {response.map((line, index) => (
                <p key={`${line}_${index}`}>{line}</p>
              ))}
            </>
          )}

          <button
            className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
            disabled={isGenerating}
            onClick={responseHandler}
          >
            {!isGenerating ? 'Generate' : 'Generating...'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Demo;
