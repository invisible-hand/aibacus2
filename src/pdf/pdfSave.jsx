import { jsPDF } from 'jspdf';

export const pdfSave = (name, grade, assignment) => {
  const lines = assignment.join('\n');
  const doc = new jsPDF();
  doc.text(`Student: ${name} \nGrade: ${grade}\n\n${lines}`, 15, 15);
  doc.save('arithmetics.pdf');
};
