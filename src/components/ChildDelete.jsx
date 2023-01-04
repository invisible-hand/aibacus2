import { Button } from '@chakra-ui/react';

export default ({ children, id, onClick, ...args }) => (
  <Button
    bg={'red.400'}
    color={'white'}
    _hover={{
      bg: 'red.500',
    }}
    onClick={() => {
      onClick(id);
    }}
    {...args}
  >
    {children}
  </Button>
);
