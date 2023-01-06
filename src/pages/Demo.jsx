import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';

import AssignmentHeading from '../components/AssignmentHeading';
import DownloadPDF from '../components/DownloadPDF';
import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import MathOperations from '../components/MathOperations';
import NumberOfTasks from '../components/NumberOfTasks';
import PDFDocument from '../components/PDFDocument';
import { SUBJECT } from '../utils/constants/Subject';
import { aiRequest } from '../utils/ai/aiRequest';
import { useState } from 'react';

const name = 'Mike';
const grade = '3';
const numberOfTasks = '10';
const basePrompt = `create a math assignment for a %grade% grader, involving %operations%. create ${numberOfTasks} tasks in the format: \`{n}.{number} {operation} {number} = \`, each on new line.`;

const subject = SUBJECT.MATH;
const Demo = () => {
  const toast = useToast();

  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [operationState, setOperationState] = useState({
    Addition: true,
    Subtraction: false,
    Multiplication: false,
    Division: false,
  });
  const ops = Object.keys(operationState)
    .filter((key) => operationState[key])
    .map((key) => key.toLowerCase())
    .join(', ');
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setOperationState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const responseHandler = async (_event) => {
    setIsGenerating(true);
    const prompt = basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks])
      .replace('%operations%', ops)
      .replace('division', 'division(÷)')
      .replace('multiplication', 'multiplication(×)');
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);
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

  return (
    <>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <AssignmentHeading subject={subject} />
        <Text color={'gray.600'} fontSize={'xl'}>
          Math is a subject that helps us understand the world around us by
          using numbers. Math is all around us and can be found in things like
          music, sports, and cooking. It's an important and fun subject to
          learn!
        </Text>
      </Stack>

      <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack align={'start'}>
            <GradePicker
              defaultOption={grade}
              disabled={true}
              label={'Grade'}
            />
            <NumberOfTasks
              defaultValue={numberOfTasks}
              disabled={true}
              label='Number of problems'
            />
            <MathOperations
              operationState={operationState}
              handleChange={handleChange}
            />
            <Generate
              isLoading={isGenerating}
              onClick={responseHandler}
              disabled={isGenerating || ops.length === 0}
            />
          </VStack>

          <VStack align={'start'}>
            {response.length > 0 && (
              <>
                <PDFDocument data={response} />
                <DownloadPDF
                  name={name}
                  grade={grade}
                  subject={subject}
                  data={response}
                >
                  Download PDF
                </DownloadPDF>
              </>
            )}
          </VStack>
        </SimpleGrid>
      </Container>
    </>
  );
};

export default Demo;
