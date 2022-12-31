import React from 'react';
import { pdfSave } from '../pdf/pdfSave';

const PDFDocument = ({ data, name, grade }) => {
  const handleDownload = () => {
    pdfSave(name, grade, data);
  };

  return (
    <>
      <p>PDF file:</p>
      {data.map((line, index) => (
        <p key={`${line}_${index}`}>{line}</p>
      ))}

      <button
        className='px-6 py-2 my-4 text-white bg-orange-600 rounded-lg hover:bg-orange-900 block'
        onClick={handleDownload}
      >
        Download PDF
      </button>
    </>
  );
};

export default PDFDocument;
