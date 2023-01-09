const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const compareFlatArrays = (a, b) => {
  if (a.length !== b.length) return false;

  const aa = [...a];
  const bb = [...b];
  aa.sort();
  bb.sort();

  for (let i = 0; i < aa.length; i += 1) {
    if (aa[i] !== bb[i]) return false;
  }

  return true;
};

const arrHas = (arr, subArr) => {
  arr.forEach((element) => {
    if (compareFlatArrays(element, subArr)) return true;
  });
  return false;
};

const generateKPairs = (k = 5, min = 1, max = 12) => {
  if (min > max) [min, max] = [max, min];
  if (k > (Math.abs(max - min) + 1) ** 2) {
    k = (Math.abs(max - min) + 1) ** 2;
  } else if (k < 1) {
    k = 1;
  }
  const result = [];
  while (result.length < k) {
    const pair = [randomInt(min, max), randomInt(min, max)];

    if (arrHas(result, pair)) {
      continue;
    }
    result.push(pair);
  }
  return result;
};

const add = (a, b) => ({ text: `${a} + ${b} = `, result: `${a + b}` });
const subtract = (a, b) => ({
  text: `${Math.max(a, b)} - ${Math.min(a, b)} =`,
  result: `${Math.max(a, b) - Math.min(a, b)}`,
});
const multiply = (a, b) => ({ text: `${a} × ${b} =`, result: `${a * b}` });
const divide = (a, b) => {
  let min = Math.min(a, b);
  let max = Math.max(a, b);
  if (min === 0) {
    [min, max] = [max, min];
  } else {
    max = min * max;
  }
  return {
    text: `${max} ÷ ${min} =`,
    result: `${max / min}`,
  };
};

const eq = (a, b) => ({
  text: `${a} ? ${b}`,
  result: `${a > b ? '>' : a === b ? '=' : '<'}`,
});

const OPERATIONS = new Map([
  [0, add],
  [1, subtract],
  [2, multiply],
  [3, divide],
  [4, eq],
]);

export const arithmeticsProblems = (
  k = 5,
  min = 1,
  max = 12,
  ...operations
) => {
  const pairs = generateKPairs(k, min, max);
  const result = [];
  pairs.forEach((pair) => {
    const randChoice = randomInt(0, operations.length - 1);
    result.push(OPERATIONS.get(operations[randChoice])(pair[0], pair[1]));
  });
  return result;
};
