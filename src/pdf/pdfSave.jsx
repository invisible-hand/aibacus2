import { jsPDF } from 'jspdf';

const doc = new jsPDF();

export const pdfSave = (name, grade, assignment) => {
  const lines = assignment.join('\n');
  doc.text(`Student: ${name} \nGrade: ${grade}\n\n${lines}`, 15, 15);
  doc.save('arithmetics.pdf');
};
