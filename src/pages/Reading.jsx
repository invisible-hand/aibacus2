import { Container, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { GRADE, NUMBER_OF_TASKS, READING } from '../api/promptChunks';
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
import { ROUTE } from '../constants/Route';
import { aiRequest } from '../api/aiRequest';
import { saveAssignment } from '../database/assignments';

const Reading = () => {
  const { session } = useContext(AuthContext);
  const { childrenDB, hasChildren } = useContext(ChildrenContext);

  const [name, setName] = useState(hasChildren ? childrenDB[0].name : '');
  const [grade, setGrade] = useState(hasChildren ? childrenDB[0].grade : '1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState([]);
  const [numberOfTasks, setNumberOfTasks] = useState('15');

  const responseHandler = async (_event) => {
    setIsGenerating(true);
    const prompt = READING.basePrompt
      .replace('%grade%', GRADE[+grade])
      .replace('%task_amount%', NUMBER_OF_TASKS[+numberOfTasks]);
    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse);

      await saveAssignment(
        READING.name,
        name,
        grade,
        aiResponse.join('\n'),
        session.user.id
      );
    } catch (error) {
      alert(error);
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
                <NamePicker
                  defaultOption={name}
                  options={
                    hasChildren ? childrenDB.map((child) => child.name) : []
                  }
                  onChange={setName}
                />
                <GradePicker
                  defaultOption={grade}
                  options={READING.grades}
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
