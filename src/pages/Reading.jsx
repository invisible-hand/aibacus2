import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { GRADE, NUMBER_OF_TASKS, READING } from '../utils/ai/promptChunks';
import { useContext, useState } from 'react';

import AssignmentHeading from '../components/AssignmentHeading';
import { AuthContext } from '../store/AuthContext';
import { ChildrenContext } from '../store/ChildrenContext';
import DownloadPDF from '../components/DownloadPDF';
import Generate from '../components/Generate';
import { Link } from 'react-router-dom';
import PDFDocument from '../components/PDFDocument';
import Picker from '../components/Picker';
import { ROUTE } from '../utils/constants/Route';
import { aiRequest } from '../utils/ai/aiRequest';
import { saveAssignment } from '../utils/database/assignments';

const Reading = () => {
  const toast = useToast();
  const { session } = useContext(AuthContext);
  const { childrenDB, hasChildren } = useContext(ChildrenContext);

  const [name, setName] = useState(hasChildren ? childrenDB[0].name : '');
  const [grade, setGrade] = useState(hasChildren ? childrenDB[0].grade : '1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    const prompt = READING.basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfQuestions]);
    try {
      const aiResponse = await aiRequest(prompt, READING.temp);
      setResponse(aiResponse);

      await saveAssignment(
        READING.name,
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
        <AssignmentHeading subject={READING.name} />
        <Text color={'gray.600'} fontSize={'xl'}>
          Reading is an important skill to have because it allows us to learn
          new things. Reading is also a fun that can take us on adventures and
          introduce us to new characters and places.
        </Text>
      </Stack>

      <Container maxW={'7xl'} my={5} mx={{ base: 5, md: 0 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <VStack align={'start'}>
            {hasChildren ? (
              <>
                <Picker
                  label='Name'
                  options={childrenDB.map((child) => ({
                    id: child.name,
                    value: child.name,
                  }))}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Picker
                  label='Grade'
                  options={READING.grades.map((grade) => ({
                    id: grade,
                    value: grade,
                  }))}
                  value={grade}
                  onChange={(e) => setGrade(+e.target.value)}
                />
              </>
            ) : (
              <>
                <Text>You have no children in your profile</Text>
                <Link to={ROUTE.PROFILE}>Add a child</Link>
              </>
            )}
            <Picker
              label='Number of questions'
              options={[...new Array(11)]
                .map((_, index) => ({
                  id: index,
                  value: index,
                }))
                .filter((obj) => obj.id !== 0)}
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(+e.target.value)}
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
                  subject={READING.name}
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

export default Reading;
