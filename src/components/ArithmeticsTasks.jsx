import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import Picker from './Picker';
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
    ],
  },
};

const ArithmeticsTasks = () => {
  const [grade, setGrade] = useState('1');
  const [numberOfTasks, setNumberOfTasks] = useState('10');
  const [topic, setTopic] = useState(0);

  const [oks, setOks] = useState(null);
  const [problems, setProblems] = useState(null);
  const [answers, setAnswers] = useState(null);

  const [checked, setChecked] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    setProblems(null);
    setChecked(false);
    setOks(null);
    setAnswers(null);

    console.log(+grade, topic);
    const top = grades[+grade].topics[topic];
    console.log(top);
    const generatedProblems = arithmeticsProblems(
      +numberOfTasks,
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
    setOks(oks);
    setChecked(true);
    setIsCalculating(false);
  };

  return (
    <Box align={'center'}>
      <Text>Arithmetics Problems</Text>
      <GradePicker
        defaultOption={grade}
        options={Object.keys(grades)}
        onChange={setGrade}
        label='Grade'
      />
      <Picker
        value={topic.id}
        options={grades[+grade].topics.map((topic) => ({
          id: topic.id,
          value: topic.name,
        }))}
        onChange={(e) => {
          setTopic(+e.target.value);
        }}
        label='Topic:'
      />
      <NumberOfTasks
        defaultValue={numberOfTasks}
        onChange={setNumberOfTasks}
        label='Number of problems'
      />
      <Generate
        isLoading={isGenerating}
        onClick={responseHandler}
        disabled={isGenerating}
      />

      <form onSubmit={!checked ? handleSubmit : undefined}>
        <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
          {problems && (
            <>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                {problems?.map((asn, index) => (
                  <Stack
                    direction={'row'}
                    key={index}
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={4}
                  >
                    <Text alignSelf={'center'} whiteSpace={'nowrap'}>
                      {asn}
                    </Text>
                    <FormControl
                      id={`${index}`}
                      isRequired={!checked}
                      isReadOnly={checked}
                    >
                      {/* <FormLabel>Your answer</FormLabel> */}
                      <Stack
                        direction={'row'}
                        align={'center'}
                        justifyContent={'center'}
                      >
                        <Input
                          maxW={70}
                          type='text'
                          maxLength={answers[index].length + 2}
                          // step={0.001}
                          placeholder='enter an answer...'
                          isInvalid={checked}
                          errorBorderColor={
                            oks && oks[index] ? 'green.400' : 'red.300'
                          }
                        />
                        {oks && (
                          <>
                            {oks[index] ? (
                              <CheckCircleIcon
                                boxSize={5}
                                color={'green.400'}
                              />
                            ) : (
                              <WarningTwoIcon boxSize={5} color={'red.300'} />
                            )}
                            <Text
                              color={oks[index] ? 'green.400' : 'red.400'}
                              // ml={1}
                            >
                              {oks[index] ? 'correct' : 'incorrect'}
                            </Text>
                          </>
                        )}
                        {/* <Text >
                          {asn.assignment.answers[0].number}
                        </Text> */}
                        {oks && !oks[index] && (
                          <Text>Correct: {answers[index]}</Text>
                        )}
                      </Stack>
                    </FormControl>
                  </Stack>
                ))}
              </SimpleGrid>
              {!checked && (
                <Button
                  my={4}
                  bg={'green.400'}
                  color={'white'}
                  size={'md'}
                  _hover={{
                    bg: 'green.500',
                  }}
                  type='submit'
                  isLoading={isCalculating}
                  loadingText={'Calculating...'}
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
