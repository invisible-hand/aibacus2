import { OpenAIApi } from 'openai';

export const openai = new OpenAIApi(import.meta.env.VITE_OPENAI_API_KEY);
