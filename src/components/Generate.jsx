import { Button } from '@chakra-ui/react';

const Generate = ({ isLoading, onClick, disabled }) => {
  return (
    <Button
      ml='1'
      bg={'green.400'}
      color={'white'}
      size={'md'}
      _hover={{
        bg: 'green.500',
      }}
      isLoading={isLoading}
      loadingText='Generating...'
      onClick={onClick}
      disabled={disabled}
    >
      Generate
    </Button>
  );
};

export default Generate;
