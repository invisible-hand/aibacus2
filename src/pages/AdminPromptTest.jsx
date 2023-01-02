import { aiRequest } from '../api/aiRequest';
import { useState } from 'react';

const AdminPromptTest = () => {
  const [response, setResponse] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const responseHandler = async (event) => {
    event.preventDefault();

    setIsGenerating(true);
    const form = event.currentTarget;
    const formElements = form.elements;
    const prompt = formElements.prompt.value;
    if (prompt === '') return;

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
    <div className='flex flex-col'>
      <div>
        <form onSubmit={responseHandler}>
          <label className='block' htmlFor='prompt'>
            Prompt
          </label>
          <input
            id='prompt'
            type='text'
            placeholder='enter prompt'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            disabled={isGenerating}
          />
          <button
            className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
            type='submit'
            disabled={isGenerating}
          >
            Test
          </button>
        </form>
      </div>
      <div>
        {response.map((line) => (
          <p>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminPromptTest;
