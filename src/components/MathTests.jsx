import {
  Box,
  Button,
  Container,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';

import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import { MathTests as MathTestsClass } from '../models/MathTests';
import NumberOfTasks from '../components/NumberOfTasks';
import { aiRequestMathWordTasks } from '../utils/ai/aiRequest';
import { useState } from 'react';

const MathTests = () => {
  const toast = useToast();

  const [grade, setGrade] = useState('3');
  const [numberOfTasks, setNumberOfTasks] = useState('3');

  const [oks, setOks] = useState(null);
  const [givenAnswers, setGivenAnswers] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiCorrectAnswerIndices, setAiCorrectAnswerIndices] = useState(null);

  const [checked, setChecked] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    setAiResponse(null);
    setChecked(false);
    setOks(null);
    setAiCorrectAnswerIndices(null);

    const tests = new MathTestsClass(+grade, numberOfTasks, 2);
    const temp = 0.8;
    const maxTokens = 3000;
    const prompt = tests.prompt;
    try {
      const aiResponse = await aiRequestMathWordTasks(prompt, temp, maxTokens);
      const parsedResponse = JSON.parse(aiResponse);
      setAiCorrectAnswerIndices(
        parsedResponse.tests.map((test) => +test.correctAnswerIndex)
      );
      setGivenAnswers(new Array(parsedResponse.tests.length).fill(0));
      setAiResponse(parsedResponse);
    } catch (error) {
      toast({
        position: 'top',
        title: 'Error',
        description: `${error.description || error.message}`,
        status: 'error',
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsCalculating(true);
    console.log(aiCorrectAnswerIndices);
    let oks = [];
    aiCorrectAnswerIndices.forEach((aiAnswerIndex, testIndex) => {
      const givenAnswerIndex = givenAnswers[testIndex];
      oks.push(aiAnswerIndex === givenAnswerIndex);
    });
    setOks(oks);
    setChecked(true);
    setIsCalculating(false);
  };

  return (
    <Box>
      <Text>Math Tests</Text>
      <GradePicker
        defaultOption={grade}
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} //TODO!
        onChange={setGrade}
        label={'Grade'}
      />
      <NumberOfTasks
        defaultValue={numberOfTasks}
        onChange={setNumberOfTasks}
        label='Number of tests'
      />
      <Generate
        isLoading={isGenerating}
        onClick={responseHandler}
        disabled={isGenerating}
      />
      <form onSubmit={!checked ? handleSubmit : undefined}>
        <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
          {aiResponse && (
            <>
              <Stack direction={'column'} spacing={3}>
                {aiResponse?.tests.map((test, testIndex) => (
                  <Box
                    key={testIndex}
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={8}
                  >
                    <Text>Problem: {test.problem}</Text>
                    <RadioGroup
                      value={givenAnswers[testIndex]}
                      onChange={(value) => {
                        setGivenAnswers((prev) => {
                          const newArr = [...prev];
                          newArr[testIndex] = +value;
                          return newArr;
                        });
                      }}
                    >
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                        {test.answerOptions.map((option, index) => (
                          <Radio key={index} colorScheme='green' value={index}>
                            {option.value} {option.units}
                          </Radio>
                        ))}
                      </SimpleGrid>
                      {oks && (
                        <Stack dicrection='column'>
                          <Stack direction={'row'}>
                            {oks[testIndex] ? (
                              <CheckCircleIcon
                                boxSize={5}
                                color={'green.400'}
                              />
                            ) : (
                              <WarningTwoIcon boxSize={5} color={'red.300'} />
                            )}
                            <Text
                              color={oks[testIndex] ? 'green.400' : 'red.400'}
                              ml={1}
                            >
                              {oks[testIndex] ? ' correct' : ' incorrect'}
                            </Text>
                          </Stack>
                          <Text>Solution: {test.solution}</Text>
                        </Stack>
                      )}
                    </RadioGroup>
                  </Box>
                ))}
              </Stack>
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

export default MathTests;
