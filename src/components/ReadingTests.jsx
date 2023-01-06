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
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

import Generate from './Generate';
import GradePicker from './GradePicker';
import NumberOfTasks from './NumberOfTasks';
import { aiRequestMathWordTasks } from '../utils/ai/aiRequest';
import { array } from 'prop-types';
import { useState } from 'react';

const words = new Map([
  [1, '50 - 90'],
  [2, '90 - 120'],
  [3, '120 - 170'],
  [4, '170 - 220'],
  [5, '220 - 280'],
  [6, '280 - 350'],
]);

const basePrompt =
  'Generate reading tests for %grade% grade in a form of a text (%words% words) and %task_amount% questions to it. Questions in form of a test with four variant of answers. 1 correct answer and 3 incorrect ones. ' +
  'Please, make sure correct answer are asking about things that are present in the text. ' +
  'Please, make sure incorrect answers are really incorrect, but have strong relation to the text. ' +
  'Please, make sure it is advanced enough for %grade% grade. ' +
  'Reply in form of minified JSON with shape like this: ' +
  '`{"grade": "%grade%", "subject": "reading", "type": "test", "text": "<text>", "questions": [{"question": <question>, "answers": ["<option1>", "<option2>", "<option3>", "<option4>"], "correctAnswerIndex": <correctAnswerIndex as integer from 0 to 3> ]}` ' +
  'It should be parsable with JSON.parse() without errors.  ';

const ReadingTests = () => {
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

    // const math = MATH.grade.get(+grade);
    // const basePrompt = math.basePrompt;
    const temp = 0.8;
    const maxTokens = 3500;
    const prompt = basePrompt
      .replace(/%grade%/g, GRADE[+grade])
      .replace('%words%', words.get(+grade))
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks]);
    try {
      const aiResponse = await aiRequestMathWordTasks(prompt, temp, maxTokens);
      console.log(aiResponse);
      const parsedResponse = JSON.parse(aiResponse);
      setAiCorrectAnswerIndices(
        parsedResponse.questions.map((question) => question.correctAnswerIndex)
      );
      setGivenAnswers(Array(parsedResponse.questions.length).fill(0));
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
    console.log(aiCorrectAnswerIndices);
    console.log(givenAnswers);
    let oks = [];
    aiCorrectAnswerIndices.forEach((aiAnswerIndex, questionIndex) => {
      const givenAnswerIndex = givenAnswers[questionIndex];
      oks.push(aiAnswerIndex === givenAnswerIndex);
    });
    setOks(oks);
    setChecked(true);
    setIsCalculating(false);
  };

  return (
    <Box>
      <Text>Reading Test</Text>
      <GradePicker
        defaultOption={grade}
        options={Array.from(words.keys())}
        onChange={setGrade}
        label={'Grade'}
      />
      <NumberOfTasks
        defaultValue={'3'} //TODO!
        onChange={setNumberOfTasks}
        label='Number of questions'
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
                <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                  <Text>{aiResponse.text}</Text>
                </Box>
                {aiResponse?.questions.map((question, questionIndex) => (
                  <Box
                    key={questionIndex}
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={8}
                  >
                    <Text>Question: {question.question}</Text>
                    <RadioGroup
                      value={givenAnswers[questionIndex]}
                      onChange={(value) => {
                        setGivenAnswers((prev) => {
                          const newArr = [...prev];
                          newArr[questionIndex] = +value;
                          return newArr;
                        });
                      }}
                    >
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                        {question.answers.map((answer, index) => (
                          <Radio key={index} colorScheme='green' value={index}>
                            {answer}
                          </Radio>
                        ))}
                      </SimpleGrid>
                      {oks && (
                        <Stack direction={'row'}>
                          {oks[questionIndex] ? (
                            <CheckCircleIcon boxSize={5} color={'green.400'} />
                          ) : (
                            <WarningTwoIcon boxSize={5} color={'red.300'} />
                          )}
                          <Text
                            color={oks[questionIndex] ? 'green.400' : 'red.400'}
                            ml={1}
                          >
                            {oks[questionIndex] ? ' correct' : ' incorrect'}
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

export default ReadingTests;
