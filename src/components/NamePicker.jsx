import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

import { useState } from 'react';

const Name = ({ defaultOption, options, onChange, disabled }) => {
  const [selected, setSelected] = useState(defaultOption);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <FormControl>
      <Stack direction={'row'} align={'center'} isInline={true}>
        <FormLabel m={0}>Name</FormLabel>
        <Select
          value={selected}
          onChange={handleChange}
          id='grade'
          size={{ base: 'md', md: 'sm' }}
          disabled={disabled || false}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Stack>
    </FormControl>
  );
};

export default Name;
