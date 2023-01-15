import * as yup from 'yup';

import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Divider, FormControl, Input, Stack, Text } from '@chakra-ui/react';
import { MathJaxNode, MathJaxProvider } from '@yozora/react-mathjax';
import { useEffect, useRef, useState } from 'react';

import Fraction from 'fraction.js';

const validationSchema = yup.object().shape({
  inputValue: yup
    .string()
    .matches(/^(\d+|)$/, 'Input must be in the format of "number"'),
  // .required('Input is required'),
});

const defaultFraction = { w: 0, n: 1, d: 1 };

const SimpleResultInput = ({ id, isReadOnly, correctAnswer }) => {
  const inputRefW = useRef(null);
  const inputRefN = useRef(null);
  const inputRefD = useRef(null);

  const [answer, setAnswer] = useState(defaultFraction);
  const [isCorrect, setIsCorrect] = useState(false);

  const visibility = isReadOnly ? 'visible' : 'hidden';
  const color = isCorrect ? 'green.400' : 'red.400';

  useEffect(() => {
    setIsCorrect(false);
    setAnswer(defaultFraction);
  }, []);

  const handleChange = (value, key) => {
    const currentAnswer = { ...answer, [key]: value };
    try {
      validationSchema.validateSync({ inputValue: value });
      const newFraction = new Fraction(
        currentAnswer.w * currentAnswer.d + currentAnswer.n,
        currentAnswer.d
      );
      setIsCorrect(newFraction.equals(correctAnswer));

      setAnswer(currentAnswer);
    } catch (err) {
      // do not update fraction
    }
  };

  return (
    <FormControl id={id} isRequired={!isReadOnly} isReadOnly={isReadOnly}>
      <Stack direction={'row'} align={'center'}>
        <Stack direction={'row'} align={'center'}>
          <Input
            ref={inputRefW}
            onFocus={() => inputRefW.current.select()}
            autoComplete='off'
            maxW={50}
            type='text'
            maxLength={1}
            isInvalid={isReadOnly}
            errorBorderColor={color}
            value={answer.w}
            onChange={(e) => handleChange(+e.target.value, 'w')}
          />
          <Stack direction={'column'} align={'center'}>
            <Input
              ref={inputRefN}
              onFocus={() => inputRefN.current.select()}
              autoComplete='off'
              maxW={70}
              type='text'
              maxLength={3}
              isInvalid={isReadOnly}
              errorBorderColor={color}
              value={answer.n}
              onChange={(e) => handleChange(+e.target.value, 'n')}
            />
            <Divider orientation='horizontal' color='black' />
            <Input
              ref={inputRefD}
              onFocus={() => inputRefD.current.select()}
              autoComplete='off'
              maxW={70}
              type='text'
              maxLength={3}
              isInvalid={isReadOnly}
              errorBorderColor={color}
              value={answer.d}
              onChange={(e) => handleChange(+e.target.value || 1, 'd')}
            />
          </Stack>
        </Stack>
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
        {isReadOnly && !isCorrect && (
          <MathJaxProvider>
            <Text
              as={MathJaxNode}
              inline={false}
              formula={correctAnswer.toLatex()}
              alignSelf='center'
              whiteSpace='nowrap'
            />
          </MathJaxProvider>
        )}
      </Stack>
    </FormControl>
  );
};

export default SimpleResultInput;
