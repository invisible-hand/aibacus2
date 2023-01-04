import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';

import { useState } from 'react';

const options = ['easy', 'medium', 'hard'];

const DifficultyRadioPicker = ({ onChange }) => {
  const [difficulty, setDifficulty] = useState('medium');

  const handleChange = (value) => {
    setDifficulty(value);
    onChange(value);
  };

  return (
    <FormControl>
      <Stack direction={'row'} align={'center'} isInline={true}>
        <FormLabel m={0}>Difficulty:</FormLabel>
        <RadioGroup
          onChange={handleChange}
          value={difficulty}
          colorScheme='green'
        >
          {options.map((option) => (
            <Radio key={option} value={option} ml={3}>
              {option}
            </Radio>
          ))}
        </RadioGroup>
      </Stack>
    </FormControl>
  );
};

export default DifficultyRadioPicker;
