import { Box, Stack } from '@chakra-ui/react';

import MathTests from '../components/MathTests';
import MathWordProblems from '../components/MathWordProblems';
export default () => {
  return (
    <Stack direction={'row'}>
      <MathWordProblems />
      <MathTests />
    </Stack>
  );
};
