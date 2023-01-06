import { Box, Stack } from '@chakra-ui/react';

import MathTests from '../components/MathTests';
import MathWordProblems from '../components/MathWordProblems';
import ReadingTests from '../components/ReadingTests';

export default () => {
  return (
    <Stack direction={'row'}>
      <MathWordProblems />
      <MathTests />
      <ReadingTests />
    </Stack>
  );
};
