import { Assignment } from './Assignment';
import { GRADE } from '../utils/ai/promptChunks';

const difficultyMap = new Map([
  [0, { text: 'two', value: 2 }],
  [1, { text: 'three', value: 3 }],
  [2, { text: 'four', value: 4 }],
  [3, { text: 'five', value: 5 }],
]);

export class MathTests extends Assignment {
  testCount;
  #answersCount;
  difficultyLevel;
  prompt;
  form;

  constructor(grade, testCount, difficultyLevel) {
    super(grade);
    this.subject = 'Math';
    this.testCount = +testCount;
    this.type = testCount > 1 ? 'tests' : 'test';
    this.form = 'word problem';
    this.difficultyLevel = difficultyLevel;
    this.answersCount = difficultyLevel;

    const generateJSONTemplate = () => {
      const option = { value: '<value>', units: '<units>' };
      const options = new Array(difficultyMap.get(difficultyLevel).value).fill({
        ...option,
      });
      const test = {
        problem: '<problemText>',
        answerOptions: options,
        correctAnswerIndex: '<index of correct answer>',
        solution: '<solution>',
      };
      const tests = new Array(this.testCount).fill({ ...test });
      const obj = { tests };
      return JSON.stringify(obj, null);
    };

    this.prompt =
      `Generate ${this.testCount} ${this.subject.toLowerCase()} ${
        this.type
      } for ${GRADE[grade]} grader in a form of ${
        this.form
      }. Each test should have ${this.answersCount} answers. ` +
      `Make sure it is advanced enough for ${GRADE[grade]} grader. ` +
      `Provide a JSON response with the following structure: ` +
      `It should be possible to derive answer from problem. ` +
      `${generateJSONTemplate()}. ` +
      `correctAnswerIndex should point to correct answer from zero based answerOptions array. ` +
      `Use abbreviated forms of units for examples: "kg", "m", "m/s". ` +
      `Use units only in units placeholder. ` +
      `To represent exponents, use the following symbols: ⁰, ¹, ², ³, ⁴, ⁵, ⁶, ⁷, ⁸, ⁹. ` +
      `Use "÷" as a division sign, use "×" as a multiplication sign, use "/" for fractions, use "." for decimals as usual. ` +
      `For answers involving people or animals, the value should be a whole number. ` +
      `Make sure that the units used in the problem and the answer are consistent with each other. `;
  }

  get answersCount() {
    return this.#answersCount;
  }

  set answersCount(difficultyLevel) {
    this.#answersCount = difficultyMap.get(difficultyLevel).text;
  }
}
