import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useState } from 'react';

const Password = ({ set, field, form }) => {
  const [showPassword, setShowPassword] = useState(false);

  const text = set ? 'New password' : 'Password';
  return (
    <FormControl
      id='password'
      isRequired
      isInvalid={form.errors.password && form.touched.password}
    >
      <FormLabel>{text}</FormLabel>
      <InputGroup>
        <Input type={showPassword ? 'text' : 'password'} {...field} />
        <InputRightElement h={'full'}>
          <Button
            variant={'ghost'}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {set && <FormHelperText>Please, check your email.</FormHelperText>}
      <FormErrorMessage>{form.errors.password}</FormErrorMessage>
    </FormControl>
  );
};

export default Password;
