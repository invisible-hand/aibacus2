import { aiRequest } from '../api/aiRequest';
import { useState } from 'react';

const AdminPromptTest = () => {
  const [response, setResponse] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [temp, setTemp] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(2500);

  const responseHandler = async (event) => {
    event.preventDefault();

    setIsGenerating(true);
    const form = event.currentTarget;
    const formElements = form.elements;
    const prompt = formElements.prompt.value;
    if (prompt === '') return;

    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse, temp, maxTokens);
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
          <div>
            <label htmlFor='temperature'>Temperature (0.1...1.0)</label>
            <input
              id='temperature'
              type='text'
              placeholder='enter temperature'
              className='px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              disabled={isGenerating}
              value={temp}
              onChange={(e) => {
                const tempTemp = new Number(e.target.value);
                setTemp(isNaN(tempTemp) ? 0.1 : tempTemp);
              }}
            />
          </div>
          <div>
            <label htmlFor='maxTokens'>Max tokens</label>
            <input
              id='maxTokens'
              type='text'
              placeholder='enter max tokens'
              className=' px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
              disabled={isGenerating}
              value={maxTokens}
              onChange={(e) => {
                const tempTokens = new Number(e.target.value);
                setMaxTokens(isNaN(tempTokens) ? 2500 : tempTokens);
              }}
            />
          </div>
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
        {response.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default AdminPromptTest;
