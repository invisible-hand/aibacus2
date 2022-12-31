import { useState } from 'react';
import { aiRequest } from '../api/aiRequest';
import { pdfSave } from '../pdf/pdfSave';
import NavBar from '../components/NavBar';
import NumberOfTasks from '../components/NumberOfTasks';
import { GRADE, NUMBER_OF_TASKS } from '../api/promptChunks';
import MathOperations from '../components/MathOperations';

const basePrompt =
  'create a math assignment for a %grade% grader, involving %operations%. create %task_amount% in the format: `{n}.{number} {operation} {number} = `, each on new line.';

const Math = () => {
  const [grade, setGrade] = useState(2); //* ideally should come from profile context
  const [name, setName] = useState('Mike'); //* ideally should come from profile context
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [operationState, setOperationState] = useState({
    Addition: true,
    Subtraction: false,
    Multiplication: false,
    Division: false,
  });
  const ops = Object.keys(operationState)
    .filter((key) => operationState[key])
    .map((key) => key.toLowerCase())
    .join(', ');
  const [numberOfTasks, setNumberOfTasks] = useState(15);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setOperationState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const responseHandler = async (_event) => {
    setIsGenerating(true);

    const prompt = basePrompt
      .replace('%name%', name)
      .replace('%grade%', GRADE[grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[numberOfTasks])
      .replace('%operations%', ops)
      .replace('division', 'division(÷)')
      .replace('multiplication', 'multiplication(×)');
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
          <div className='mt-6'>
            <NumberOfTasks change_tasks={setNumberOfTasks} />
            <MathOperations
              operationState={operationState}
              handleChange={handleChange}
            />
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
              <p>PDF file:</p>
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
            className='px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
            disabled={isGenerating || ops.length === 0}
            onClick={responseHandler}
          >
            {!isGenerating ? 'Generate' : 'Generating...'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Math;
