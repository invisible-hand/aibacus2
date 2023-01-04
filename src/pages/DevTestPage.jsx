import { Text } from '@chakra-ui/react';
import { useState } from 'react';

const response = `[{ "assignment": {"grade": 7, "task": "A car travels at a speed of 80 km/h for 2 hours. How far did it travel?", "answers": [{"number":160, "units": "km"}], "solution": "Distance = Speed × Time = 80 km/h × 2 h = 160 km"}},
{ "assignment": {"grade": 7, "task": "A rectangular prism has a length of 10 m, a width of 5 m, and a height of 2 m. What is its volume?", "answers": [{"number":100, "units": "m^3"}], "solution": "Volume = Length × Width × Height = 10 m × 5 m × 2 m = 100 m^3"}},
{ "assignment": {"grade": 7, "task": "A box has a mass of 10 kg. What is its weight?", "answers": [{"number":98, "units": "N"}], "solution": "Weight = Mass × Acceleration due to gravity = 10 kg × 9.8 m/s^2 = 98 N"}},
{ "assignment": {"grade": 7, "task": "A rectangular field has a length of 200 m and a width of 100 m. What is its area?", "answers": [{"number":20000, "units": "m^2"}], "solution": "Area = Length × Width = 200 m × 100 m = 20000 m^2"}},
{ "assignment": {"grade": 7, "task": "A cylinder has a radius of 5 cm and a height of 10 cm. What is its volume?", "answers": [{"number":785, "units": "cm^3"}], "solution": "Volume = π × Radius^2 × Height = 3.14 × 5 cm × 5 cm × 10 cm = 785 cm^3"}}]`;

console.log(response[0]);

let arrValidated = response;
if (response[0] !== '[') {
  rrValidated = '[' + response + ']';
}

const data = JSON.parse(arrValidated);

export default () => {
  const [answers, setAnswers] = useState(data.map((_) => ''));
  const [oks, setOks] = useState(data.map((_) => ''));
  return (
    <>
      <Text>response</Text>
      {data.map((asn, index) => (
        <div key={index}>
          <p>
            <span>Grade:</span>
            <span>{asn.assignment.grade}</span>
          </p>
          <p>Task:</p>
          <p>{asn.assignment.task}</p>
          <p>Answer:</p>
          <p>
            <input
              type='text'
              value={answers[index]}
              onChange={(e) => {
                setOks((prev) => {
                  const newVar = [...prev];
                  newVar[index] =
                    e.target.value == asn.assignment.answers[0].number;
                  return newVar;
                });
                setAnswers((prev) => {
                  const newVar = [...prev];
                  newVar[index] = e.target.value;
                  return newVar;
                });
              }}
            />

            <Text as={'span'} color={oks[index] ? 'green.400' : 'red.400'}>
              {oks[index] ? 'ok' : 'wrong'}
            </Text>
            <span>{asn.assignment.answers[0].units}</span>
            <span>{asn.assignment.answers[0].number}</span>
          </p>
          <p>Solution:</p>
          <p>{asn.assignment.solution}</p>
        </div>
      ))}
    </>
  );
};
