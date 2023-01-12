import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';

const Email = ({ field, form }) => {
  return (
    <FormControl
      id='email'
      isRequired
      isInvalid={form.errors.email && form.touched.email}
    >
      <FormLabel>Email address</FormLabel>
      <Input type='email' {...field} />
      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
    </FormControl>
  );
};

export default Email;
