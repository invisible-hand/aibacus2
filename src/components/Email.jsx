import { FormControl, FormLabel, Input } from '@chakra-ui/react';

const Email = () => {
  return (
    <FormControl id='email' isRequired>
      <FormLabel>Email address</FormLabel>
      <Input type='email' />
    </FormControl>
  );
};

export default Email;
