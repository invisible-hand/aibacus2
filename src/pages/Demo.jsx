import { useState } from 'react';
import { aiRequest } from '../api/aiRequest.js';
import { pdfSave } from '../pdf/pdfSave';
import NavBar from '../components/NavBar.jsx';

const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

const name = 'Mike';
const grade = '2nd';
const prompt =
  'create a math assignment for a 3rd grader, involving multiplication, division, addition and subtraction of numbers in the range of 1 to 20. create 15 tasks in the format: `{number} {operation} {number} = `, each on new line';

const Demo = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    pdfSave(name, grade, response);
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
              <label key={operation} htmlFor={operation} className='block'>
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

          {response.length > 0 && (
            <>
              <p> pdf file:</p>
              {response.map((line, index) => (
                <p key={`${line}_${index}`}>{line}</p>
              ))}

              <button
                className='px-6 py-2 mt-4 text-white bg-orange-600 rounded-lg hover:bg-orange-900 block'
                onClick={handleDownload}
              >
                Download PDF
              </button>
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
