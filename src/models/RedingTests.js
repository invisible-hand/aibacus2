import { Assignment } from './Assignment';
import { GRADE } from '../utils/ai/promptChunks';

const difficultyMap = new Map([
  [0, { text: 'two', value: 2 }],
  [1, { text: 'three', value: 3 }],
  [2, { text: 'four', value: 4 }],
  [3, { text: 'five', value: 5 }],
]);

const words = new Map([
  [1, '50 - 90'],
  [2, '90 - 120'],
  [3, '120 - 170'],
  [4, '170 - 220'],
  [5, '220 - 280'],
  [6, '280 - 350'],
]);

export class ReadingTests extends Assignment {
  questionCount;
  #answersCount;
  difficultyLevel;
  prompt;
  form;

  constructor(grade, questionCount, difficultyLevel) {
    super(grade);
    this.subject = 'Math';
    this.questionCount = +questionCount;
    this.difficultyLevel = difficultyLevel;
    this.answersCount = difficultyLevel;

    const generateJSONTemplate = () => {
      const answers = [
        ...new Array(difficultyMap.get(difficultyLevel).value),
      ].map((_, index) => `<option${index}>`);
      const question = {
        question: '<question>',
        answers,
        correctAnswerIndex: '<correctAnswerIndex>',
      };
      const questions = new Array(this.questionCount).fill(question);
      const test = {
        text: '<text>',
        questions,
        correctAnswerIndex: '<index of correct answer>',
        solution: '<solution>',
      };
      const obj = test;
      return JSON.stringify(obj, null);
    };

    this.prompt =
      `Generate reading test for ${
        GRADE[grade]
      } grader in a form of a text (${words.get(
        grade
      )} words) and ${questionCount} questions to it. ` +
      `Questions in form of a test. Each test should have ${this.answersCount} answers. ` +
      `Make sure correct answer are asking about things that are present in the text. ` +
      `Make sure incorrect answers are really incorrect, but have strong relation to the text. ` +
      `Make sure it is advanced enough for ${GRADE[grade]} grader. ` +
      `It should be possible to derive answer from problem. ` +
      `Reply in form of minified JSON with shape like this: ` +
      `${generateJSONTemplate()}. ` +
      `correctAnswerIndex should point to correct answer from zero based answerOptions array. `;
  }

  get answersCount() {
    return this.#answersCount;
  }

  set answersCount(difficultyLevel) {
    this.#answersCount = difficultyMap.get(difficultyLevel).text;
  }
}
