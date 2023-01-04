import { Text } from '@chakra-ui/react';

const PDFDocument = ({ data }) => {
  return (
    <>
      <Text>PDF file:</Text>
      {data.map((line, index) => (
        <Text key={`${line}_${index}`}>{line}</Text>
      ))}
    </>
  );
};

export default PDFDocument;
