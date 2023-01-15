import * as yup from 'yup';

import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { FormControl, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const validationSchema = yup.object().shape({
  inputValue: yup
    .string()
    .matches(
      /^(>|<|=|\d+|)$/,
      'Input must be in the format of "number", ">", "<", or "="'
    ),
  // .required('Input is required'),
});

const SimpleResultInput = ({ id, isReadOnly, correctAnswer }) => {
  const inputRef = useRef(null);

  const [value, setValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const visibility = isReadOnly ? 'visible' : 'hidden';
  const color = isCorrect ? 'green.400' : 'red.400';

  useEffect(() => {
    setIsCorrect(false);
    setValue('');
  }, [correctAnswer]);

  const handleChange = (e) => {
    const { value } = e.target;
    try {
      validationSchema.validateSync({ inputValue: value });
      setValue(value);

      setIsCorrect(value === correctAnswer);
    } catch (err) {
      // do not update value
    }
  };

  return (
    <FormControl id={id} isRequired={!isReadOnly} isReadOnly={isReadOnly}>
      <Stack direction={'row'} align={'center'}>
        <Input
          ref={inputRef}
          onFocus={() => inputRef.current.select()}
          autoComplete='off'
          maxW={70}
          type='text'
          maxLength={correctAnswer.length + 2}
          isInvalid={isReadOnly}
          errorBorderColor={color}
          value={value}
          onChange={handleChange}
        />
        {isCorrect ? (
          <CheckCircleIcon
            boxSize={5}
            color={'green.400'}
            visibility={visibility}
          />
        ) : (
          <WarningTwoIcon
            boxSize={5}
            color={'red.300'}
            visibility={visibility}
          />
        )}
        <Text color={color} visibility={visibility}>
          {isCorrect ? 'correct' : 'incorrect'}
        </Text>
        {isReadOnly && !isCorrect && <Text>Correct: {correctAnswer}</Text>}
      </Stack>
    </FormControl>
  );
};

export default SimpleResultInput;
