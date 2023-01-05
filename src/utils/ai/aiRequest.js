import axios from 'axios';

export const ORIGIN = 'https://api.openai.com';
export const API_VERSION = 'v1';
export const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}/completions`;

const requestData = {
  model: 'text-davinci-003',
  temperature: 0.1,
  max_tokens: 2000,
};

const requestConfig = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
};

export const aiRequest = async (prompt, temp, maxTokens) => {
  const temperature = temp || requestData.temperature;
  const max_tokens = maxTokens || requestData.max_tokens;
  const data = {
    model: requestData.model,
    temperature,
    max_tokens,
    prompt,
  };
  const response = await axios.post(OPEN_AI_URL, data, requestConfig);
  return response.data.choices[0].text
    .split('\n')
    .filter((str) => str.length > 6);
};

export const aiRequestMathWordTasks = async (prompt, temp, maxTokens) => {
  const temperature = temp || requestData.temperature;
  const max_tokens = maxTokens || requestData.max_tokens;
  const data = {
    model: requestData.model,
    temperature,
    max_tokens,
    prompt,
  };
  const response = await axios.post(OPEN_AI_URL, data, requestConfig);
  return response.data.choices[0].text;
};
