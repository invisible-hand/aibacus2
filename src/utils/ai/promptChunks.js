// export const SUBJECTS = new Map();

// SUBJECTS.set('Arithmetics', ARITHMETICS);
// SUBJECTS.set('Math', MATH);
// SUBJECTS.set('Reading', READING);

export const ARITHMETICS = Object.freeze({
  name: 'Arithmetics',
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  skills: {
    addition: 'addition',
    subtraction: 'subtraction',
    multiplication: 'multiplication',
    division: 'division',
  },
  basePrompt:
    'create a math assignment for a %grade% grader of %difficulty% difficulty, involving %operations% with numbers %numbers%. create %task_amount% in the format: `{n}.{number} {operation} {number} = `, each on new line.',
});

const TEMP = Object.freeze({
  0.0: 0.0,
  0.1: 0.1,
  0.2: 0.2,
  0.3: 0.3,
  0.4: 0.4,
  0.5: 0.5,
  0.6: 0.6,
  0.7: 0.7,
  0.8: 0.8,
  0.9: 0.9,
  1.0: 1.0,
});

const defT = TEMP[0.1];

const notice = `Important! make sure tasks are advanced enough for a %grade% grade student`;

const MATH_ = {
  name: 'Math',
  basePrompt: `create a math assignment for a %grade% grader, word problems. without answers. create %task_amount% in the format: # of task, new line, task,. ${notice}`,
  grades: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

MATH_.grade = new Map([
  [
    1,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    2,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    3,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    4,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    5,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    6,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    7,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    8,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    9,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    10,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    11,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
  [
    12,
    {
      temp: defT,
      max_tokens: 2500,
      basePrompt: MATH_.basePrompt,
      defaultTasks: 10,
    },
  ],
]);

export const MATH = MATH_;

export const READING = Object.freeze({
  name: 'Reading',
  grades: [1, 2, 3, 4],
  temp: 0.5,
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
