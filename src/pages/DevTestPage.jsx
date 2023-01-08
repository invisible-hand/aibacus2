import ArithmeticsTasks from '../components/ArithmeticsTasks';
import MathTests from '../components/MathTests';
import MathWordProblems from '../components/MathWordProblems';
import ReadingTests from '../components/ReadingTests';
import { Stack } from '@chakra-ui/react';

export default () => {
  return (
    <Stack direction={'row'} minW={'6xl'}>
      <ArithmeticsTasks />
      {/* <MathWordProblems />
      <MathTests />
      <ReadingTests /> */}
    </Stack>
  );
};
