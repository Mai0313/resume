import jsPDF from "jspdf";

import { ResumeData } from "./resumeLoader";

/**
 * Generate a simple resume PDF and trigger download in browser.
 */
export function downloadResumePdf(
  data: ResumeData & { sectionOrder: string[] },
) {
  const doc = new jsPDF();

  let y = 20;
  const margin = 10;

  const addLine = (
    text: string,
    size = 12,
    font: "normal" | "bold" = "normal",
  ) => {
    doc.setFont("helvetica", font);
    doc.setFontSize(size);
    if (y > 280) {
      doc.addPage();
      y = margin;
    }
    doc.text(text, margin, y);
    y += size * 0.5 + 4;
  };

  // Header
  addLine(data.basics.name, 22, "bold");
  if (data.basics.label) addLine(data.basics.label, 14);

  const contacts = [data.basics.email, data.basics.phone, data.basics.url]
    .filter(Boolean)
    .join(" | ");

  if (contacts) addLine(contacts, 10);

  // Summary
  if (data.basics.summary) {
    addLine("Summary", 16, "bold");
    addLine(data.basics.summary);
  }

  // Work Experience
  if (data.work && data.work.length) {
    addLine("Work Experience", 16, "bold");
    data.work.forEach((work) => {
      addLine(`${work.position} - ${work.name}`, 12, "bold");
      const dates = [work.startDate, work.endDate || "Present"]
        .filter(Boolean)
        .join(" - ");

      if (dates) addLine(dates, 10);
      if (work.summary) addLine(work.summary);
      work.highlights?.forEach((h) => addLine(`• ${h}`, 10));
      addLine(" ");
    });
  }

  // Education
  if (data.education && data.education.length) {
    addLine("Education", 16, "bold");
    data.education.forEach((edu) => {
      addLine(
        `${edu.studyType || ""}${edu.studyType && edu.area ? " in " : ""}${
          edu.area || ""
        } - ${edu.institution}`,
        12,
        "bold",
      );
      const dates = [edu.startDate, edu.endDate || "Present"]
        .filter(Boolean)
        .join(" - ");

      if (dates) addLine(dates, 10);
      edu.courses?.forEach((c) => addLine(`• ${c}`, 10));
      addLine(" ");
    });
  }

  // Skills
  if (data.skills && data.skills.length) {
    addLine("Skills", 16, "bold");
    data.skills.forEach((skill) => {
      const keywords = skill.keywords ? `: ${skill.keywords.join(", ")}` : "";

      addLine(`${skill.name}${keywords}`);
    });
  }

  const fileName = `${data.basics.name.replace(/\s+/g, "_")}_resume.pdf`;

  doc.save(fileName);
}
