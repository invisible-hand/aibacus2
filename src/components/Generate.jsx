import { Button } from '@chakra-ui/react';

const Generate = ({ ...args }) => {
  return (
    <Button
      ml='1'
      bg={'green.400'}
      color={'white'}
      size={'md'}
      _hover={{
        bg: 'green.500',
      }}
      loadingText='Generating...'
      {...args}
    >
      Generate
    </Button>
  );
};

export default Generate;
