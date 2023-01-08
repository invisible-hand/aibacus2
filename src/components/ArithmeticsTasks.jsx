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

import Generate from '../components/Generate';
// import GradePicker from '../components/GradePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import { arithmeticsProblems } from '../models/generateProblem';
import { useState } from 'react';

// import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

const ArithmeticsTasks = () => {
  // const [grade, setGrade] = useState('7');
  const [numberOfTasks, setNumberOfTasks] = useState('3');

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

    const generatedProblems = arithmeticsProblems(
      numberOfTasks,
      1,
      12,
      0,
      1,
      2,
      3
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
      if (element.type === 'number') {
        const answer = answers[+element.id];
        const givenAnswer = +element.value;
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
      {/* <GradePicker
        defaultOption={grade}
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} //TODO!
        onChange={setGrade}
        label={'Grade'}
      /> */}
      <NumberOfTasks
        defaultValue={'3'} //TODO!
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
                      Solve: {asn}
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
                          maxW={150}
                          type='number'
                          step={0.001}
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
                              ml={1}
                            >
                              {oks[index] ? ' correct' : ' incorrect'}
                            </Text>
                          </>
                        )}
                        {/* <Text >
                          {asn.assignment.answers[0].number}
                        </Text> */}
                      </Stack>
                      {/* {oks && !oks[index] && (
                        <Text>Correct Solution: {asn.assignment.solution}</Text>
                      )} */}
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
