import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

import { useState } from 'react';

const defaultOptions = [...new Array(13)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const GradePicker = ({ defaultOption, options, onChange, disabled, label }) => {
  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  const realOptions = options || defaultOptions;

  return (
    <FormControl>
      <Stack direction={'row'} align={'center'} isInline={true}>
        <FormLabel m={0}>{label}</FormLabel>
        <Select
          display={'block'}
          value={selected}
          onChange={handleChange}
          disabled={disabled || false}
          size={{ base: 'md', md: 'sm' }}
          w='70px'
        >
          {realOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Stack>
    </FormControl>
  );
};

export default GradePicker;
