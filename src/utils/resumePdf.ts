import type { ResumeData } from "./resumeLoader";

import { jsPDF } from "jspdf";

const lineHeight = 6;
const margin = 10;

export function generateResumePdf(
  data: ResumeData & { sectionOrder?: string[] },
) {
  const doc = new jsPDF();
  const pageHeight = doc.internal.pageSize.height - margin;
  let y = margin;

  const checkPage = () => {
    if (y > pageHeight) {
      doc.addPage();
      y = margin;
    }
  };

  const addLine = (text: string, size = 12, x = margin) => {
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, 180);

    lines.forEach((line: string) => {
      checkPage();
      doc.text(line, x, y);
      y += lineHeight;
    });
  };

  // Header
  addLine(data.basics.name, 22);
  if (data.basics.label) addLine(data.basics.label, 16);

  const contacts: string[] = [];

  if (data.basics.email) contacts.push(data.basics.email);
  if (data.basics.phone) contacts.push(data.basics.phone);
  if (data.basics.url) contacts.push(data.basics.url);
  if (contacts.length) addLine(contacts.join(" | "));
  y += lineHeight;

  const sections = data.sectionOrder ?? [
    "work",
    "education",
    "skills",
    "projects",
    "awards",
  ];

  const addSectionTitle = (title: string) => {
    y += 2;
    addLine(title, 16);
  };

  for (const section of sections) {
    switch (section) {
      case "work":
        if (data.work?.length) {
          addSectionTitle("Work Experience");
          data.work.forEach((job) => {
            addLine(`${job.position} - ${job.name}`, 14);
            if (job.startDate || job.endDate) {
              addLine(`${job.startDate ?? ""} - ${job.endDate ?? "Present"}`);
            }
            if (job.summary) addLine(job.summary);
            job.highlights?.forEach((h) => addLine(`• ${h}`));
            y += 2;
          });
        }
        break;
      case "education":
        if (data.education?.length) {
          addSectionTitle("Education");
          data.education.forEach((ed) => {
            addLine(
              `${ed.studyType ?? ""} ${ed.area ?? ""} - ${ed.institution}`,
              14,
            );
            if (ed.startDate || ed.endDate) {
              addLine(`${ed.startDate ?? ""} - ${ed.endDate ?? "Present"}`);
            }
            if (ed.gpa) addLine(`GPA: ${ed.gpa}`);
            y += 2;
          });
        }
        break;
      case "skills":
        if (data.skills?.length) {
          addSectionTitle("Skills");
          data.skills.forEach((skill) => {
            const keywords = skill.keywords?.join(", ");

            addLine(`${skill.name}${keywords ? ": " + keywords : ""}`);
          });
        }
        break;
      case "projects":
        if (data.projects?.length) {
          addSectionTitle("Projects");
          data.projects.forEach((p) => {
            addLine(p.name, 14);
            if (p.description) addLine(p.description);
            p.highlights?.forEach((h) => addLine(`• ${h}`));
            y += 2;
          });
        }
        break;
      case "awards":
        if (data.awards?.length) {
          addSectionTitle("Awards");
          data.awards.forEach((a) => {
            addLine(`${a.title} - ${a.awarder}`, 14);
            if (a.date) addLine(a.date);
            if (a.summary) addLine(a.summary);
            y += 2;
          });
        }
        break;
      default:
        break;
    }
  }

  doc.save("resume.pdf");
}

export default generateResumePdf;
