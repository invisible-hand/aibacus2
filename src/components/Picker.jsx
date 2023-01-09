import { FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';

const Picker = ({
  options = [{ id: 0, value: 'no options provided' }],
  ...args
}) => {
  return (
    <FormControl>
      <Stack
        direction={args.direction || 'row'}
        align={args.align || 'center'}
        isInline={args.isInline || true}
      >
        <FormLabel m={0}>{args.label}</FormLabel>
        <Select
          placeholder={args.placeholder}
          value={args.value}
          onChange={args.onChange}
          isDisabled={args.isDisabled || false}
          size={args.size || { base: 'md', md: 'sm' }}
          w={args.sW}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value}
            </option>
          ))}
        </Select>
      </Stack>
    </FormControl>
  );
};

export default Picker;
