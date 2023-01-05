import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import { aiRequestMathWordTasks } from '../utils/ai/aiRequest';
import { useState } from 'react';

const basePrompt =
  'Generate %task_amount% math assignments for %grade% grade in a form of a word task. With an answer and a solution. ' +
  'Please, make sure it is advanced enough for %grade% grade. ' +
  'Reply in form of JSON with shape like this: ' +
  '`{"grade": <grade>, "subject": "math", "assignments": [{ "assignment":{"task": <task>,"answers":[{"number":<number>, "units": <units>},{"numbers":<number>, "units": <units>},...],"solution": <solution>}},{ "assignment":...},...]}`. ' +
  'It should be parsable with JSON.parse() without errors.  ' +
  'Use minimal form of units for examples: "kg", "m³", "m/s²". ' +
  'Instead of "^0,^1,^2,^3,^4,^5,^6,^7,^8,^9,^0" etc. use ⁰,¹,²,³,⁴,⁵,⁶,⁷,⁸,⁹ symbols for exponents. Also use them in units. ' +
  'Use "÷" as division sign and "×" as multiplication sign, but use "/" for fractions. ' +
  'If answer is in people or animals it should be a whole number. ' +
  'Please be consistent with units. ';

export default () => {
  const toast = useToast();

  const [grade, setGrade] = useState('7');
  const [numberOfTasks, setNumberOfTasks] = useState('3');

  const [oks, setOks] = useState(null);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiAnswers, setAiAnswers] = useState(null);

  const [checked, setChecked] = useState(false);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    setAiResponse(null);
    setChecked(false);
    setOks(null);
    setAiAnswers(null);

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
      setAiResponse(parsedResponse);
      setAiAnswers(
        parsedResponse.assignments.map(
          (assignment) => +assignment.assignment.answers[0].number
        )
      );
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

    let oks = [];
    for (let element of event.currentTarget.elements) {
      if (element.type === 'number') {
        const aiAnswer = aiAnswers[+element.id];
        const givenAnswer = +element.value;
        oks.push(aiAnswer === givenAnswer);
      }
    }
    setOks(oks);
    setChecked(true);
    setIsCalculating(false);
  };

  return (
    <>
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
                {aiResponse?.assignments.map((asn, index) => (
                  <Box
                    key={index}
                    rounded={'lg'}
                    bg={'white'}
                    boxShadow={'lg'}
                    p={8}
                  >
                    <Text>Task: {asn.assignment.task}</Text>
                    <FormControl
                      id={`${index}`}
                      isRequired={!checked}
                      isReadOnly={checked}
                    >
                      <FormLabel>Answer</FormLabel>
                      <Stack direction={'row'} align={'center'}>
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
                        <Text>{asn.assignment.answers[0].units}</Text>\
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
                      {oks && !oks[index] && (
                        <Text>Correct Solution: {asn.assignment.solution}</Text>
                      )}
                    </FormControl>
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
    </>
  );
};
