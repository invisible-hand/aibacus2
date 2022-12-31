import { GRADE, NUMBER_OF_TASKS } from '../api/promptChunks.js';

import DownloadPDF from '../components/DownloadPDF';
import GradePicker from '../components/GradePicker.jsx';
import MathOperations from '../components/MathOperations.jsx';
import NavBar from '../components/NavBar.jsx';
import NumberOfTasks from '../components/NumberOfTasks.jsx';
import PDFDocument from '../components/PDFDocument.jsx';
import { SUBJECT } from '../constants/Subject.js';
import { aiRequest } from '../api/aiRequest.js';
import { useState } from 'react';

const name = 'Mike';
const grade = '3';
const numberOfTasks = '10';
const basePrompt = `create a math assignment for a %grade% grader, involving %operations%. create ${numberOfTasks} tasks in the format: \`{n}.{number} {operation} {number} = \`, each on new line.`;

const subject = SUBJECT.MATH;
const Demo = () => {
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
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks])
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

  return (
    <div className='bg-white'>
      <NavBar />
      <main className='relative px-6'>
        <div className='mx-auto max-w-3xl pt-16'>
          <h1 className='text-2xl font-semibold'>
            {subject} assignment generator
          </h1>
          <div className='flex gap-20'>
            <div className='mt-6'>
              <NumberOfTasks defaultValue={numberOfTasks} disabled={true} />
              <MathOperations
                operationState={operationState}
                handleChange={handleChange}
              />
              <GradePicker defaultValue={grade} disabled={true} />
              <button
                className='px-6 py-2 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
                disabled={isGenerating || ops.length === 0}
                onClick={responseHandler}
              >
                {!isGenerating ? 'Generate' : 'Generating...'}
              </button>
            </div>
            <div>
              {response.length > 0 && (
                <>
                  <PDFDocument data={response} />
                  <DownloadPDF
                    name={name}
                    grade={grade}
                    subject={subject}
                    data={response}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
