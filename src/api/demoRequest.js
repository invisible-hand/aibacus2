import axios from 'axios';

export const ORIGIN = 'https://api.openai.com';
export const API_VERSION = 'v1';
export const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}/completions`;

const requestData = {
  model: 'text-davinci-003',
  prompt:
    'create a math assignment for a 3rd grader, involving multiplication, division, addition and subtraction of numbers in the range of 1 to 20. create 15 tasks in the format: `{number} {operation} {number} = `, each on new line',
  temperature: 0.7,
  max_tokens: 250,
};

const requestConfig = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

export const makeDemoRequest = async () => {
  const response = await axios.post(OPEN_AI_URL, requestData, requestConfig);
  return response.data.choices[0].text
    .split('\n')
    .filter((str) => str.length > 6);
};
