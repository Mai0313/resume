import type { ResumeData } from "./resumeLoader";

import { jsPDF } from "jspdf";

const pageMargin = 10;

function addLine(
  doc: jsPDF,
  text: string,
  y: number,
  options: { x?: number; fontSize?: number } = {},
): number {
  const { x = pageMargin, fontSize } = options;

  if (fontSize) {
    doc.setFontSize(fontSize);
  }
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y > pageHeight - pageMargin) {
    doc.addPage();
    y = pageMargin;
  }
  doc.text(text, x, y);

  return y + 6;
}

export function generateResumePDF(
  data: ResumeData & { sectionOrder: string[] },
) {
  const doc = new jsPDF();
  let y = pageMargin + 10;

  // Header
  doc.setFontSize(22);
  doc.text(data.basics.name, doc.internal.pageSize.getWidth() / 2, y, {
    align: "center",
  });
  y += 10;

  const contacts: string[] = [];

  if (data.basics.email) contacts.push(data.basics.email);
  if (data.basics.phone) contacts.push(data.basics.phone);
  if (data.basics.url) contacts.push(data.basics.url);
  if (contacts.length) {
    doc.setFontSize(12);
    doc.text(contacts.join(" | "), doc.internal.pageSize.getWidth() / 2, y, {
      align: "center",
    });
    y += 10;
  }

  const renderWork = () => {
    if (!data.work) return;
    doc.setFontSize(16);
    y = addLine(doc, "Work", y, { fontSize: 16 });
    for (const job of data.work) {
      const line = `${job.position} - ${job.name}`;

      y = addLine(doc, line, y, { fontSize: 12 });
      if (job.startDate || job.endDate) {
        const period = `${job.startDate || ""} - ${job.endDate || "Present"}`;

        y = addLine(doc, period, y);
      }
      if (job.summary) y = addLine(doc, job.summary, y);
      if (job.highlights) {
        for (const h of job.highlights) {
          y = addLine(doc, `• ${h}`, y);
        }
      }
      y += 4;
    }
  };

  const renderEducation = () => {
    if (!data.education) return;
    y = addLine(doc, "Education", y, { fontSize: 16 });
    for (const edu of data.education) {
      const line = `${edu.studyType || ""} - ${edu.institution}`;

      y = addLine(doc, line, y, { fontSize: 12 });
      if (edu.startDate || edu.endDate) {
        const period = `${edu.startDate || ""} - ${edu.endDate || "Present"}`;

        y = addLine(doc, period, y);
      }
      if (edu.area) y = addLine(doc, edu.area, y);
      y += 4;
    }
  };

  const renderSkills = () => {
    if (!data.skills) return;
    y = addLine(doc, "Skills", y, { fontSize: 16 });
    for (const skill of data.skills) {
      const keywords = skill.keywords ? `: ${skill.keywords.join(", ")}` : "";

      y = addLine(doc, `${skill.name}${keywords}`, y, { fontSize: 12 });
    }
    y += 4;
  };

  const renderProjects = () => {
    if (!data.projects) return;
    y = addLine(doc, "Projects", y, { fontSize: 16 });
    for (const proj of data.projects) {
      y = addLine(doc, proj.name, y, { fontSize: 12 });
      if (proj.description) y = addLine(doc, proj.description, y);
      if (proj.url) y = addLine(doc, proj.url, y);
      y += 4;
    }
  };

  for (const section of data.sectionOrder) {
    switch (section) {
      case "work":
        renderWork();
        break;
      case "education":
        renderEducation();
        break;
      case "skills":
        renderSkills();
        break;
      case "projects":
        renderProjects();
        break;
      default:
        // Other sections can be added here as needed
        break;
    }
  }

  doc.save("resume.pdf");
}
