import { Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
const operations = ['Addition', 'Subtraction', 'Multiplication', 'Division'];

const MathOperations = ({ operationState, handleChange }) => {
  return (
    <>
      <Text mt={2}>Select operations to include in assignments</Text>
      <CheckboxGroup
        colorScheme={'green'}
        defaultValue={['Addition']}
        size={{ base: 'lg', md: 'md' }}
      >
        <Stack spacing={[1]} direction={['column']}>
          {operations.map((operation) => (
            <Checkbox
              key={operation}
              value={operation}
              isChecked={operationState[operation]}
              onChange={handleChange}
            >
              {operation}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </>
  );
};

export default MathOperations;
