import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Picker from './Picker';
import { useState } from 'react';

const Child = ({ id, name, grade, onClick, disabled }) => {
  const [nameState, setNameState] = useState(name);
  const [gradeState, setGradeState] = useState(grade);

  return (
    <>
      <FormControl id='email' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type='text'
          value={nameState}
          onChange={(e) => {
            setNameState(e.target.value);
          }}
          placeholder='enter name...'
        />
      </FormControl>
      <Picker
        label='Grade'
        options={[...new Array(13)]
          .map((_, index) => ({
            id: index,
            value: index,
          }))
          .filter((obj) => obj.id !== 0)}
        value={gradeState}
        onChange={(e) => setGradeState(e.target.value)}
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
