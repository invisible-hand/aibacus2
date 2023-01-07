import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

import { useState } from 'react';

const options = [...new Array(10)]
  .map((_, index) => index)
  .filter((index) => index > 0);

const NumberOfTasks = ({ label, defaultValue, onChange, disabled }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange && onChange(value);
  };

  return (
    <FormControl>
      <Stack direction={'row'} align={'center'} isInline={true}>
        <FormLabel m={0}>{label || 'Number of tasks'}</FormLabel>
        <Select
          value={selected}
          onChange={handleChange}
          disabled={disabled || false}
          size={{ base: 'md', md: 'sm' }}
          w='70px'
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

  // return (
  //   <div>
  //     <label htmlFor='tasks'>Number of tasks:</label>
  //     <select
  //       value={selected}
  //       onChange={handleChange}
  //       id='tasks'
  //       disabled={disabled || false}
  //     >
  //       {options.map((option) => (
  //         <option key={option} value={option}>
  //           {option}
  //         </option>
  //       ))}
  //     </select>
  //   </div>
  // );
};

export default NumberOfTasks;
