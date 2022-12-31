const PDFDocument = ({ data, name, grade }) => {
  return (
    <>
      <p>PDF file:</p>
      {data.map((line, index) => (
        <p key={`${line}_${index}`}>{line}</p>
      ))}
    </>
  );
};

export default PDFDocument;
