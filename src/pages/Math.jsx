import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { GRADE, MATH, NUMBER_OF_TASKS } from '../utils/ai/promptChunks';
import { useContext, useState } from 'react';

import AssignmentHeading from '../components/AssignmentHeading';
import { AuthContext } from '../store/AuthContext';
import { ChildrenContext } from '../store/ChildrenContext';
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

const Math = () => {
  const toast = useToast();
  const { session } = useContext(AuthContext);
  const { childrenDB, hasChildren } = useContext(ChildrenContext);

  const [name, setName] = useState(hasChildren ? childrenDB[0].name : '');
  const [grade, setGrade] = useState(hasChildren ? childrenDB[0].grade : '1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);

  const [numberOfTasks, setNumberOfTasks] = useState('15');

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    const math = MATH.grade.get(+grade);
    const basePrompt = math.basePrompt;
    const temp = math.temp;
    const maxTokens = math.maxTokens;
    const prompt = basePrompt
      .replace(/%grade%/g, GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks]);
    try {
      const aiResponse = await aiRequest(prompt, temp, maxTokens);
      setResponse(aiResponse);

      await saveAssignment(
        MATH.name,
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
        <AssignmentHeading subject={MATH.name} />
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
                  options={MATH.grades}
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
              defaultValue={MATH.grade.get(+grade).defaultTasks}
              onChange={setNumberOfTasks}
            />
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
                  subject={MATH.name}
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

export default Math;
