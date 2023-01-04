import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

import { aiRequest } from '../utils/ai/aiRequest';
import { useState } from 'react';

const AdminPromptTest = () => {
  const [response, setResponse] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [temp, setTemp] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(2500);

  const responseHandler = async (event) => {
    event.preventDefault();

    setIsGenerating(true);
    const form = event.currentTarget;
    const formElements = form.elements;
    const prompt = formElements.prompt.value;
    if (prompt === '') return;

    try {
      const aiResponse = await aiRequest(prompt);
      setResponse(aiResponse, temp, maxTokens);
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Flex direction={'column'}>
      <Box>
        <form onSubmit={responseHandler}>
          <FormControl id='prompt' isRequired>
            <FormLabel>Prompt</FormLabel>
            <Input
              type='text'
              placeholder='enter prompt'
              isDisabled={isGenerating}
            />
          </FormControl>

          <Box>
            <FormControl id='temperature' isRequired>
              <FormLabel>Temperature</FormLabel>
              <Input
                type='text'
                placeholder='enter temperature'
                isDisabled={isGenerating}
                value={temp}
                onChange={(e) => {
                  const tempTemp = new Number(e.target.value);
                  setTemp(isNaN(tempTemp) ? 0.1 : tempTemp);
                }}
              />
            </FormControl>
          </Box>
          <Box>
            <FormControl id='maxTokens' isRequired>
              <FormLabel>Max tokens</FormLabel>
              <Input
                type='text'
                placeholder='enter temperature'
                isDisabled={isGenerating}
                value={maxTokens}
                onChange={(e) => {
                  const tempTokens = new Number(e.target.value);
                  setMaxTokens(isNaN(tempTokens) ? 2500 : tempTokens);
                }}
              />
            </FormControl>
          </Box>
          <Button
            bg={'green.400'}
            color={'white'}
            _hover={{
              bg: 'green.500',
            }}
            type='submit'
            isDisabled={isGenerating}
          >
            Test
          </Button>
        </form>
      </Box>
      <Box>
        {response.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </Box>
    </Flex>
  );
};

export default AdminPromptTest;
