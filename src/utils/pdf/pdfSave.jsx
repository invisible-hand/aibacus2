import { jsPDF } from 'jspdf';

export const pdfSave = (name, grade, assignment, subject) => {
  const text = assignment.join('\n');
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });
  const width = 210; //a4 width
  const height = 275;
  const margin = 20;
  const lineHeight = 10;
  const inWidth = width - margin - margin;
  const lines = doc.splitTextToSize(text, inWidth);
  doc.text(`Student: ${name} \nGrade: ${grade}`, margin, margin);
  let y = margin + lineHeight + lineHeight;
  lines.forEach((line) => {
    doc.text(line, margin, y);
    y += lineHeight;
    if (y > height) {
      doc.addPage();
      y = margin;
    }
  });
  doc.save(`${subject}.pdf`);
};
