const request =
  'create a math assignment for a 3rd grader, involving multiplication, division, addition and subtraction of numbers in the range of 1 to 20. create 15 tasks in the format: {number} {operation} {number} = ';

export const generateDemo = () => {
  console.log(`demoAskAI> request: ${request}`);

  const completion = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${request}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  console.log(`demoAskAI> response: ${completion}`);

  return completion.data.choices[0].text;
};
