import { ARITHMETICS, GRADE, NUMBER_OF_TASKS } from '../api/promptChunks';
import { useContext, useState } from 'react';

import AssignmentHeading from '../components/AssignmentHeading';
import { AuthContext } from '../store/AuthContext';
import { ChildrenContext } from '../store/ChildrenContext';
import DifficultyRadioPicker from '../components/DifficultyRadioPicker';
import DownloadPDF from '../components/DownloadPDF';
import GradePicker from '../components/GradePicker';
import { Link } from 'react-router-dom';
import NamePicker from '../components/NamePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import PDFDocument from '../components/PDFDocument';
import { ROUTE } from '../constants/Route';
import { aiRequest } from '../api/aiRequest';
import { saveAssignment } from '../database/assignments';

const Arithmetics = () => {
  const { session } = useContext(AuthContext);
  const { childrenDB, hasChildren } = useContext(ChildrenContext);

  const [name, setName] = useState(hasChildren ? childrenDB[0].name : '');
  const [grade, setGrade] = useState(hasChildren ? childrenDB[0].grade : '1');

  const [difficulty, setDifficulty] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState('15');

  const responseHandler = async (_event) => {
    setIsGenerating(true);

    const numbers = () => {
      if (difficulty === 'easy') {
        return 'from 1 to 10';
      } else if (difficulty === 'medium') {
        return 'from 1 to 12';
      } else if (difficulty === 'hard') {
        return 'from 1 to 20 ';
      }
    };

    const operations = () => {
      if (difficulty === 'easy') {
        return 'addition, subtraction';
      } else if (difficulty === 'medium') {
        return 'addition, subtraction ,multiplication, division';
      } else if (difficulty === 'hard') {
        return 'addition, subtraction ,multiplication, division';
      }
    };

    const prompt = ARITHMETICS.basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks])
      .replace('%numbers%', numbers())
      .replace('%operations%', operations())
      .replace('%difficulty%', difficulty)
      .replace('division', 'division(÷)')
      .replace('multiplication', 'multiplication(×)');
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);

      await saveAssignment(
        ARITHMETICS.name,
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
      <AssignmentHeading subject={ARITHMETICS.name} />
      <div className='flex gap-20'>
        <div className='mt-6'>
          {hasChildren ? (
            <>
              <NamePicker
                defaultOption={name}
                options={
                  hasChildren ? childrenDB.map((child) => child.name) : []
                }
                onChange={setName}
              />
              <GradePicker
                defaultOption={grade}
                options={ARITHMETICS.grades}
                onChange={setGrade}
                after={' grade'}
              />
            </>
          ) : (
            <>
              <p className='font-bold'>You have no children in your profile</p>
              <Link
                className='px-6 py-1 ml-1 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
                to={ROUTE.PROFILE}
              >
                Add a child
              </Link>
            </>
          )}
          <NumberOfTasks
            defaultValue={numberOfTasks}
            onChange={setNumberOfTasks}
          />
          <DifficultyRadioPicker onChange={setDifficulty} />
          <button
            className='block px-6 py-2 my-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 disabled:bg-blue-200 hover:disabled:bg-blue-200'
            disabled={isGenerating || !hasChildren}
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
                subject={ARITHMETICS.name}
                data={response}
              >
                Download PDF
              </DownloadPDF>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Arithmetics;
