import {
  Box,
  Button,
  Container,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, StarIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import { aiRequestMathWordTasks } from '../utils/ai/aiRequest';
import { useState } from 'react';

const basePrompt =
  'Generate %task_amount% math tests for %grade% grade in a form of a word task. With four variant of answers. ' +
  'Please, make sure it is advanced enough for %grade% grade. ' +
  'Reply in form of JSON with shape like this: ' +
  '`{"grade": <grade>, "subject": "math", "type": "test", "tests": [{ "test":{"problem": <problem_text>,"answerOptions":[{"value":<value>, "units": <units>}, {"value":<value>, "units": <units>}, {"value":<value>, "units": <units>}, {"value":<value>, "units": <units>}],"correctAnswerIndex": <index>}},{ "test":...},...]}`. ' +
  'It should be parsable with JSON.parse() without errors.  ' +
  'Use minimal form of units for examples: "kg", "m³", "m/s²". ' +
  'Instead of "^0,^1,^2,^3,^4,^5,^6,^7,^8,^9,^0" etc. use ⁰,¹,²,³,⁴,⁵,⁶,⁷,⁸,⁹ symbols for exponents. Also use them in units. ' +
  'Use "÷" as division sign and "×" as multiplication sign, but use "/" for fractions. ' +
  'If answer is in people or animals it should be a whole number. ' +
  'Please be consistent with units. ';

const MathTests = () => {
  const toast = useToast();

  const [grade, setGrade] = useState('3');
  const [numberOfTasks, setNumberOfTasks] = useState('2');

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

    // const math = MATH.grade.get(+grade);
    // const basePrompt = math.basePrompt;
    const temp = 0.8;
    const maxTokens = 3000;
    const prompt = basePrompt
      .replace(/%grade%/g, GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks]);
    try {
      const aiResponse = await aiRequestMathWordTasks(prompt, temp, maxTokens);
      const parsedResponse = JSON.parse(aiResponse);
      console.log(parsedResponse);
      setAiResponse(parsedResponse);

      setAiCorrectAnswerIndices(
        parsedResponse.tests.map((test) => +test.test.correctAnswerIndex)
      );
      setGivenAnswers(Array(parsedResponse.tests.length).fill(0));
      setAiResponse(parsedResponse);
    } catch (error) {
      console.log(error);
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
        defaultValue={'3'} //TODO!
        onChange={setNumberOfTasks}
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
                    <Text>Problem: {test.test.problem}</Text>
                    <RadioGroup
                      value={givenAnswers[testIndex]}
                      onChange={(value) => {
                        console.log(value);
                        console.log(givenAnswers);
                        setGivenAnswers((prev) => {
                          const newArr = [...prev];
                          newArr[testIndex] = +value;
                          return newArr;
                        });
                      }}
                    >
                      <Stack
                        spacing={5}
                        direction={{ base: 'column', md: 'row' }}
                      >
                        {test.test.answerOptions.map((option, index) => (
                          <>
                            <Radio
                              key={index}
                              colorScheme='green'
                              value={index}
                            >
                              {option.value} {option.units}
                            </Radio>
                          </>
                        ))}
                      </Stack>
                      {oks && (
                        <Stack direction={'row'}>
                          {oks[testIndex] ? (
                            <CheckCircleIcon boxSize={5} color={'green.400'} />
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