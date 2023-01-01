import { GRADE, NUMBER_OF_TASKS } from '../api/promptChunks';
import { useContext, useState } from 'react';

import { AuthContext } from '../store/AuthContext';
import DownloadPDF from '../components/DownloadPDF';
import GradePicker from '../components/GradePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import PDFDocument from '../components/PDFDocument';
import { SUBJECT } from '../constants/Subject';
import { aiRequest } from '../api/aiRequest';
import { saveAssignment } from '../database/saveAssignment';

const basePrompt =
  'write a reading assignment for a %grade% grader: first, write three paragraphs of text on a random topic, then, ask %task_amount% (questions) on reading comprehension about the text above';

const subject = SUBJECT.READING;

const Reading = () => {
  const { session } = useContext(AuthContext);

  const [grade, setGrade] = useState('3'); //* ideally should come from profile context
  const [name, setName] = useState('Mike'); //* ideally should come from profile context
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState('15');

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    const prompt = basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks]);
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);

      await saveAssignment(
        'assignments',
        subject,
        name,
        grade,
        aiResponse.join('\n'),
        session.user.id
      );
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <h1 className='text-2xl font-semibold mx-auto mt-4'>
        {subject} assignment generator
      </h1>
      <div className='flex gap-20'>
        <div className='mt-6'>
          <NumberOfTasks
            defaultValue={numberOfTasks}
            onChange={setNumberOfTasks}
          />
          <GradePicker defaultValue={grade} onChange={setGrade} />
          <button
            className='px-6 py-2 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
            disabled={isGenerating}
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
    </>
  );
};

export default Reading;
