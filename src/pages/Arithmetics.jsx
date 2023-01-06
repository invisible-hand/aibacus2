import { ARITHMETICS, GRADE, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';
import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';

import AssignmentHeading from '../components/AssignmentHeading';
import { AuthContext } from '../store/AuthContext';
import { ChildrenContext } from '../store/ChildrenContext';
import DifficultyRadioPicker from '../components/DifficultyRadioPicker';
import DownloadPDF from '../components/DownloadPDF';
import Generate from '../components/Generate';
import GradePicker from '../components/GradePicker';
import { Link } from 'react-router-dom';
import NamePicker from '../components/NamePicker';
import NumberOfTasks from '../components/NumberOfTasks';
import PDFDocument from '../components/PDFDocument';
import { ROUTE } from '../utils/constants/Route';
import { aiRequest } from '../utils/ai/aiRequest';
import { saveAssignment } from '../utils/database/assignments';

const Arithmetics = () => {
  const toast = useToast();
  const { session } = useContext(AuthContext);
  const { childrenDB, hasChildren } = useContext(ChildrenContext);

  const [name, setName] = useState(hasChildren ? childrenDB[0].name : '');
  const [grade, setGrade] = useState(hasChildren ? childrenDB[0].grade : '1');

  const [difficulty, setDifficulty] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState('15');

  const responseHandler = async (_event) => {
    setIsGenerating(true);

    const numbers = () => {
      if (difficulty === 'easy') {
        return 'from 1 to 10';
      } else if (difficulty === 'medium') {
        return 'from 1 to 12';
      } else if (difficulty === 'hard') {
        return 'from 1 to 20 ';
      }
    };

    const operations = () => {
      if (difficulty === 'easy') {
        return 'addition, subtraction';
      } else if (difficulty === 'medium') {
        return 'addition, subtraction ,multiplication, division';
      } else if (difficulty === 'hard') {
        return 'addition, subtraction ,multiplication, division';
      }
    };

    const prompt = ARITHMETICS.basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks])
      .replace('%numbers%', numbers())
      .replace('%operations%', operations())
      .replace('%difficulty%', difficulty)
      .replace('division', 'division(÷)')
      .replace('multiplication', 'multiplication(×)');
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);

      await saveAssignment(
        ARITHMETICS.name,
        name,
        grade,
        aiResponse.join('\n'),
        session.user.id
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

  return (
    <>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <AssignmentHeading subject={ARITHMETICS.name} />
        <Text color={'gray.600'} fontSize={'xl'}>
          Arithmetic is a branch of math that deals with numbers and
          calculations. Arithmetic is a very important subject because it helps
          us understand and solve problems in our everyday lives.
        </Text>
      </Stack>

      <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack align={'start'}>
            {hasChildren ? (
              <>
                <NamePicker
                  defaultOption={name}
                  options={
                    hasChildren ? childrenDB.map((child) => child.name) : []
                  }
                  onChange={setName}
                />
                <GradePicker
                  defaultOption={grade}
                  options={ARITHMETICS.grades}
                  onChange={setGrade}
                  label={'Grade'}
                />
              </>
            ) : (
              <>
                <Text>You have no children in your profile</Text>
                <Link to={ROUTE.PROFILE}>Add a child</Link>
              </>
            )}
            <NumberOfTasks
              defaultValue={numberOfTasks}
              onChange={setNumberOfTasks}
              label='Number of problems'
            />
            <DifficultyRadioPicker onChange={setDifficulty} />
            <Generate
              isLoading={isGenerating}
              onClick={responseHandler}
              disabled={isGenerating || !hasChildren}
            />
          </VStack>
          <VStack align={'start'}>
            {response.length > 0 && (
              <>
                <PDFDocument data={response} />
                <DownloadPDF
                  name={name}
                  grade={grade}
                  subject={ARITHMETICS.name}
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

export default Arithmetics;
