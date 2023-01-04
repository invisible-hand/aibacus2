import { Button } from '@chakra-ui/react';
import { pdfSave } from '../utils/pdf/pdfSave';

const DownloadPDF = ({ children, name, grade, data, subject, ...args }) => {
  return (
    <Button
      bg={'orange.400'}
      color={'white'}
      _hover={{
        bg: 'orange.500',
      }}
      onClick={() => {
        pdfSave(name, grade, data, subject);
      }}
      {...args}
    >
      {children}
    </Button>
  );
};

export default DownloadPDF;
