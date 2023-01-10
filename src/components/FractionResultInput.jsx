import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Divider, FormControl, Input, Stack, Text } from '@chakra-ui/react';
import { MathJaxNode, MathJaxProvider } from '@yozora/react-mathjax';

import Fraction from 'fraction.js';
import { useState } from 'react';

const defaultFraction = { w: 0, n: 1, d: 1 };

const SimpleResultInput = ({ id, isReadOnly, correctAnswer }) => {
  const [answer, setAnswer] = useState(defaultFraction);
  const [isCorrect, setIsCorrect] = useState(false);

  const visibility = isReadOnly ? 'visible' : 'hidden';
  const color = isCorrect ? 'green.400' : 'red.400';

  console.log(answer);

  const handleChange = (value, key) => {
    const currentAnswer = { ...answer, [key]: value };
    const newFraction = new Fraction(
      currentAnswer.w * currentAnswer.d + currentAnswer.n,
      currentAnswer.d
    );
    if (newFraction.equals(correctAnswer)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setAnswer(currentAnswer);
  };

  return (
    <FormControl id={id} isRequired={!isReadOnly} isReadOnly={isReadOnly}>
      <Stack direction={'row'} align={'center'}>
        <Stack direction={'row'} align={'center'}>
          <Input
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
