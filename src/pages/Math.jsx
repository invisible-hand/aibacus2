import { GRADE, NUMBER_OF_TASKS } from '../api/promptChunks';
import { useContext, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import { AuthSessionMissingError } from '@supabase/supabase-js';
import DownloadPDF from '../components/DownloadPDF';
import GradePicker from '../components/GradePicker';
import MathOperations from '../components/MathOperations';
import NavBar from '../components/NavBar';
import NumberOfTasks from '../components/NumberOfTasks';
import PDFDocument from '../components/PDFDocument';
import { aiRequest } from '../api/aiRequest';
import { supabase } from '../supabaseClient';

const basePrompt =
  'create a math assignment for a %grade% grader, involving %operations%. create %task_amount% in the format: `{n}.{number} {operation} {number} = `, each on new line.';

const Math = () => {
  const { session } = useContext(AuthContext);

  const [grade, setGrade] = useState('3'); //* ideally should come from profile context
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
  const [numberOfTasks, setNumberOfTasks] = useState('15');

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

      await supabase.from('assignments').insert({
        subject: 'math',
        name,
        grade,
        assignment: aiResponse.join('\n'),
        user_id: session.user.id,
      });
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
          <h1 className='text-2xl font-semibold'>Math assignment generator</h1>
          <div className='flex gap-20'>
            <div className='mt-6'>
              <NumberOfTasks
                defaultValue={numberOfTasks}
                onChange={setNumberOfTasks}
              />
              <MathOperations
                operationState={operationState}
                handleChange={handleChange}
              />
              <GradePicker defaultValue={grade} onChange={setGrade} />
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
                  <PDFDocument data={response} name={name} grade={grade} />
                  <DownloadPDF name={name} grade={grade} data={response} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Math;
