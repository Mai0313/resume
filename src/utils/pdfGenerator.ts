import { jsPDF } from "jspdf";

import { ResumeData } from "./resumeLoader";

export function generateResumePdf(data: ResumeData): void {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(22);
  doc.text(data.basics.name, 10, y);
  y += 10;

  doc.setFontSize(12);
  if (data.basics.email) {
    doc.text(`Email: ${data.basics.email}`, 10, y);
    y += 7;
  }
  if (data.basics.phone) {
    doc.text(`Phone: ${data.basics.phone}`, 10, y);
    y += 7;
  }
  if (data.basics.url) {
    doc.text(`Website: ${data.basics.url}`, 10, y);
    y += 10;
  } else {
    y += 5;
  }

  if (data.basics.summary) {
    const lines = doc.splitTextToSize(data.basics.summary, 180);

    doc.text(lines, 10, y);
    y += lines.length * 7 + 5;
  }

  if (data.work && data.work.length) {
    doc.setFontSize(16);
    doc.text("Work Experience", 10, y);
    y += 8;
    doc.setFontSize(12);
    for (const work of data.work) {
      doc.text(`${work.position} - ${work.name}`, 10, y);
      y += 6;
      if (work.startDate || work.endDate) {
        doc.text(
          `${work.startDate ?? ""} - ${work.endDate ?? "Present"}`,
          10,
          y,
        );
        y += 6;
      }
      if (work.summary) {
        const workLines = doc.splitTextToSize(work.summary, 180);

        doc.text(workLines, 10, y);
        y += workLines.length * 6;
      }
      y += 4;
    }
  }

  if (data.education && data.education.length) {
    doc.setFontSize(16);
    doc.text("Education", 10, y);
    y += 8;
    doc.setFontSize(12);
    for (const edu of data.education) {
      doc.text(
        `${edu.studyType ?? ""} ${edu.area ?? ""} - ${edu.institution}`,
        10,
        y,
      );
      y += 6;
      if (edu.startDate || edu.endDate) {
        doc.text(`${edu.startDate ?? ""} - ${edu.endDate ?? ""}`, 10, y);
        y += 6;
      }
      if (edu.gpa) {
        doc.text(`GPA: ${edu.gpa}`, 10, y);
        y += 6;
      }
      y += 4;
    }
  }

  doc.save("resume.pdf");
}

export default generateResumePdf;
