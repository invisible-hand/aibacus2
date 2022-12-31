import { pdfSave } from '../pdf/pdfSave';

const DownloadPDF = ({ name, grade, data, subject, ...args }) => {
  const handleDownload = (name, grade, data, subject) => {
    pdfSave(name, grade, data, subject);
  };

  return (
    <button
      className={
        args.className ||
        'px-6 py-2 my-4 text-white bg-orange-600 rounded-lg hover:bg-orange-900 block'
      }
      onClick={() => {
        handleDownload(name, grade, data, subject);
      }}
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
