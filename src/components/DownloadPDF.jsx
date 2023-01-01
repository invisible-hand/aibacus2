import { pdfSave } from '../pdf/pdfSave';

const DownloadPDF = ({ children, name, grade, data, subject, ...args }) => {
  return (
    <button
      className={
        args.className ||
        'px-6 py-2 my-4 text-white bg-orange-600 rounded-lg hover:bg-orange-900 block'
      }
      onClick={() => {
        pdfSave(name, grade, data, subject);
      }}
      disabled={args.disabled || false}
    >
      {children}
    </button>
  );
};

export default DownloadPDF;
