import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import GradePicker from './GradePicker';
import { useState } from 'react';

const Child = ({ id, name, grade, onClick, disabled }) => {
  const [nameState, setNameState] = useState(name);
  const [gradeState, setGradeState] = useState(grade);

  return (
    <>
      <FormControl id='email' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type='email'
          value={nameState}
          onChange={(e) => {
            setNameState(e.target.value);
          }}
          placeholder='enter name...'
        />
      </FormControl>

      <GradePicker
        defaultOption={gradeState}
        onChange={setGradeState}
        label={'Grade'}
      />

      <Button
        bg={'green.400'}
        color={'white'}
        _hover={{
          bg: 'green.500',
        }}
        isDisabled={disabled || false}
        onClick={() => {
          id
            ? onClick(id, nameState, gradeState)
            : (onClick(nameState, gradeState),
              setNameState(''),
              setGradeState('1'));
        }}
      >
        {id ? 'Update' : 'Add'}
      </Button>
    </>
  );
};

export default Child;
