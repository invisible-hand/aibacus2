import { Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';

const MathOperations = ({ operationState, onChange }) => {
  return (
    <>
      <Text mt={2}>Select operations to include in assignments</Text>
      <CheckboxGroup
        colorScheme={'green'}
        defaultValue={'Addition'}
        size={{ base: 'lg', md: 'md' }}
      >
        <Stack spacing={1} direction='column'>
          {Object.keys(operationState).map((operation) => (
            <Checkbox
              key={operation}
              value={operation}
              isChecked={operationState[operation]}
              onChange={onChange}
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
