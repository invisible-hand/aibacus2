export const ARITHMETICS = Object.freeze({
  name: 'Arithmetics',
  grades: [1, 2, 3, 4],
  skills: {
    addition: 'addition',
    subtraction: 'subtraction',
    multiplication: 'multiplication',
    division: 'division',
  },
  basePrompt:
    'create a math assignment for a %grade% grader, involving %operations%. create %task_amount% in the format: `{n}.{number} {operation} {number} = `, each on new line.',
});

export const MATH = Object.freeze({
  name: 'Math',
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  basePrompt:
    'create a math assignment for a %grade% grader, word problems. without answers. create %task_amount% in the format: `# of task, new line, task`. Important! make sure tasks are advanced enough for a %grade% grade student',
});

export const READING = Object.freeze({
  name: 'Reading',
  grades: [1, 2, 3, 4],
  basePrompt:
    'create a reading assignment for a %grade% grader: first, write three paragraphs of text on a random topic, then, ask %task_amount% (questions) on reading comprehension about the text above',
});

export const NUMBER_OF_TASKS = [
  'single task', //instead of 0
  'single task',
  'two tasks',
  'three tasks',
  'four tasks',
  'five tasks',
  'six tasks',
  'seven tasks',
  'eight tasks',
  'nine tasks',
  'ten tasks',
  'eleven tasks',
  'twelve tasks',
  'thirteen tasks',
  'fourteen tasks',
  'fifteen tasks',
  'sixteen tasks',
  'seventeen tasks',
  'eighteen tasks',
  'nineteen tasks',
  'twenty tasks',
  'twenty-one tasks',
  'twenty-two tasks',
  'twenty-three tasks',
  'twenty-four tasks',
  'twenty-five tasks',
  'twenty-six tasks',
  'twenty-seven tasks',
  'twenty-eight tasks',
  'twenty-nine tasks',
  'thirty tasks',
];

export const GRADE = [
  '1st', //instead of 0
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
];
