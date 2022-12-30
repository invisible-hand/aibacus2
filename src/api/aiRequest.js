import axios from 'axios';

export const ORIGIN = 'https://api.openai.com';
export const API_VERSION = 'v1';
export const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}/completions`;

const requestData = {
  model: 'text-davinci-003',
  temperature: 0.7,
  max_tokens: 250,
};

const requestConfig = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

export const aiRequest = async (prompt) => {
  const data = { ...requestData, prompt };
  const response = await axios.post(OPEN_AI_URL, data, requestConfig);
  return response.data.choices[0].text
    .split('\n')
    .filter((str) => str.length > 6);
};
