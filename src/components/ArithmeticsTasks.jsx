import {
  Box,
  Button,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';
import { MathJaxNode, MathJaxProvider } from '@yozora/react-mathjax';

import Fraction from 'fraction.js';
import FractionResultInput from '../components/FractionResultInput';
import Generate from '../components/Generate';
import Picker from './Picker';
import SimpleResultInput from './SimpleResultInput';
import { arithmeticsProblems } from '../models/generateProblem';
import { useState } from 'react';

const grades = {
  1: {
    topics: [
      {
        id: 0,
        name: 'addition (1-10)',
        minNumber: 1,
        maxNumber: 10,
        operations: [0],
      },
      {
        id: 1,
        name: 'subtraction (1-10)',
        minNumber: 1,
        maxNumber: 10,
        operations: [1],
      },
      {
        id: 2,
        name: 'comparison (1-10)',
        minNumber: 1,
        maxNumber: 10,
        operations: [4],
      },
    ],
  },
  2: {
    topics: [
      {
        id: 0,
        name: 'addition (10-100',
        minNumber: 10,
        maxNumber: 100,
        operations: [0],
      },
      {
        id: 1,
        name: 'subtraction (10-100)',
        minNumber: 10,
        maxNumber: 100,
        operations: [1],
      },
      {
        id: 2,
        name: 'multiplication (1-10)',
        minNumber: 1,
        maxNumber: 10,
        operations: [2],
      },
      {
        id: 3,
        name: 'comparison (10-100)',
        minNumber: 10,
        maxNumber: 100,
        operations: [4],
      },
    ],
  },
  3: {
    topics: [
      {
        id: 0,
        name: 'addition (100-1000)',
        minNumber: 100,
        maxNumber: 999,
        operations: [0],
      },
      {
        id: 1,
        name: 'addition (1000-10000)',
        minNumber: 1000,
        maxNumber: 9999,
        operations: [0],
      },

      {
        id: 2,
        name: 'subtraction (100-1000)',
        minNumber: 100,
        maxNumber: 999,
        operations: [1],
      },
      {
        id: 3,
        name: 'subtraction (1000-10000)',
        minNumber: 1000,
        maxNumber: 9999,
        operations: [1],
      },
      {
        id: 4,
        name: 'multiplication (10-50)',
        minNumber: 10,
        maxNumber: 50,
        operations: [2],
      },
      {
        id: 5,
        name: 'fraction comparison',
        minNumber: 0,
        maxNumber: 0,
        operations: [7],
      },
    ],
  },
  5: {
    topics: [
      {
        id: 0,
        name: 'fraction addition',
        operations: [5],
        minNumber: 0,
        maxNumber: 0,
      },
      {
        id: 1,
        name: 'fraction subtraction',
        minNumber: 0,
        maxNumber: 0,
        operations: [6],
      },
    ],
  },
};

const ArithmeticsTasks = () => {
  const [grade, setGrade] = useState(1);
  const [numberOfProblems, setNumberOfProblems] = useState(6);
  const [topic, setTopic] = useState(0);

  const [problems, setProblems] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    setProblems(null);
    setIsChecked(false);
    setAnswers(null);

    const top = grades[+grade].topics[topic];
    const generatedProblems = arithmeticsProblems(
      +numberOfProblems,
      top.minNumber,
      top.maxNumber,
      ...top.operations
    );
    console.log(generatedProblems);
    setProblems(generatedProblems.map((problem) => problem.text));
    setAnswers(generatedProblems.map((problem) => problem.result));

    setIsGenerating(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsCalculating(true);

    let oks = [];
    for (let element of event.currentTarget.elements) {
      if (element.type === 'text') {
        const answer = answers[+element.id];
        const givenAnswer = element.value;
        oks.push(answer === givenAnswer);
      }
    }
    setIsChecked(true);
    setIsCalculating(false);
  };

  return (
    <Box align={'center'} minW={'3xl'}>
      <Text>Arithmetics Problems</Text>
      <Picker
        label='Grade'
        options={Object.keys(grades).map((grade) => ({
          id: grade,
          value: grade,
        }))}
        value={grade}
        onChange={(e) => setGrade(+e.target.value)}
      />
      <Picker
        label='Topic:'
        options={grades[+grade].topics.map((topic) => ({
          id: topic.id,
          value: topic.name,
        }))}
        value={topic.id}
        onChange={(e) => {
          setTopic(+e.target.value);
        }}
      />
      <Picker
        label='Number of problems'
        options={[...new Array(11)]
          .map((_, index) => ({
            id: index,
            value: index,
          }))
          .filter((obj) => obj.id !== 0)}
        value={numberOfProblems}
        onChange={(e) => setNumberOfProblems(+e.target.value)}
      />
      <Generate
        my={3}
        isLoading={isGenerating}
        onClick={responseHandler}
        disabled={isGenerating}
      />

      <form onSubmit={!isChecked ? handleSubmit : undefined}>
        <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
          {problems && (
            <>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                {problems?.map((asn, index) => (
                  <Stack
                    direction='row'
                    key={index}
                    rounded='lg'
                    boxShadow='lg'
                    align='center'
                    p={4}
                  >
                    <MathJaxProvider>
                      <Text
                        as={MathJaxNode}
                        inline={false}
                        formula={asn}
                        alignSelf='center'
                        whiteSpace='nowrap'
                      />
                    </MathJaxProvider>
                    {answers[0] instanceof Fraction ? (
                      <FractionResultInput
                        id={index}
                        isReadOnly={isChecked}
                        correctAnswer={answers[index]}
                      />
                    ) : (
                      <SimpleResultInput
                        id={index}
                        isReadOnly={isChecked}
                        correctAnswer={answers[index]}
                      />
                    )}
                  </Stack>
                ))}
              </SimpleGrid>
              {!isChecked && (
                <Button
                  my={4}
                  bg='green.400'
                  color='white'
                  size='md'
                  _hover={{
                    bg: 'green.500',
                  }}
                  type='submit'
                  isLoading={isCalculating}
                  loadingText='Calculating...'
                >
                  Check
                </Button>
              )}
            </>
          )}
        </Container>
      </form>
    </Box>
  );
};

export default ArithmeticsTasks;
