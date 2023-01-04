import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Box as={'footer'} bg={'gray.100'} py={1} align={'center'}>
      <Text>Aibacus - {year} &copy;. All Rights Reserved.</Text>
    </Box>
  );
};

export default Footer;
