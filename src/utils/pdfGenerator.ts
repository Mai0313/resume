import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { ResumeData } from './resumeLoader';

// Extend jsPDF with autoTable plugin properties
declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable?: {
      finalY: number;
    };
  }
}

interface PDFColors {
  primary: [number, number, number];
  secondary: [number, number, number];
  text: [number, number, number];
  lightGray: [number, number, number];
  white: [number, number, number];
}

const colors: PDFColors = {
  primary: [59, 130, 246], // Blue-500
  secondary: [107, 114, 128], // Gray-500
  text: [31, 41, 55], // Gray-800
  lightGray: [229, 231, 235], // Gray-200
  white: [255, 255, 255]
};

export class ResumePDFGenerator {
  private doc: jsPDF;
  private currentY: number = 20;
  private margin: number = 20;
  private pageWidth: number;
  private pageHeight: number;

  constructor() {
    this.doc = new jsPDF('portrait', 'mm', 'a4');
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  private addNewPageIfNeeded(requiredHeight: number = 20): void {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin) {
      this.doc.addPage();
      this.currentY = this.margin;
    }
  }

  private setFont(size: number, style: 'normal' | 'bold' = 'normal'): void {
    this.doc.setFont('helvetica', style);
    this.doc.setFontSize(size);
  }

  private addHeader(name: string, title?: string, summary?: string): void {
    // Name
    this.setFont(24, 'bold');
    this.doc.setTextColor(...colors.primary);
    this.doc.text(name, this.margin, this.currentY);
    this.currentY += 10;

    // Title
    if (title) {
      this.setFont(16, 'normal');
      this.doc.setTextColor(...colors.secondary);
      this.doc.text(title, this.margin, this.currentY);
      this.currentY += 8;
    }

    // Add a line separator
    this.doc.setDrawColor(...colors.lightGray);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 8;

    // Summary
    if (summary) {
      this.setFont(12, 'normal');
      this.doc.setTextColor(...colors.text);
      const summaryLines = this.doc.splitTextToSize(summary, this.pageWidth - 2 * this.margin);
      this.doc.text(summaryLines, this.margin, this.currentY);
      this.currentY += summaryLines.length * 5 + 8;
    }
  }

  private addContactInfo(data: ResumeData): void {
    const contactInfo: string[] = [];

    if (data.basics.email) contactInfo.push(`✉ ${data.basics.email}`);
    if (data.basics.phone) contactInfo.push(`☎ ${data.basics.phone}`);
    if (data.basics.location?.city && data.basics.location?.region) {
      contactInfo.push(`📍 ${data.basics.location.city}, ${data.basics.location.region}`);
    }
    if (data.basics.url) contactInfo.push(`🌐 ${data.basics.url}`);

    if (contactInfo.length > 0) {
      this.addNewPageIfNeeded(30);
      
      this.setFont(12, 'normal');
      this.doc.setTextColor(...colors.secondary);
      
      // Split contact info into two columns
      const halfWidth = (this.pageWidth - 2 * this.margin) / 2;
      contactInfo.forEach((info, index) => {
        const x = index % 2 === 0 ? this.margin : this.margin + halfWidth;
        const y = this.currentY + Math.floor(index / 2) * 6;
        this.doc.text(info, x, y);
      });
      
      this.currentY += Math.ceil(contactInfo.length / 2) * 6 + 5;
    }

    // Social Profiles
    if (data.basics.profiles && data.basics.profiles.length > 0) {
      data.basics.profiles.forEach((profile) => {
        this.doc.text(`${profile.network}: ${profile.username}`, this.margin, this.currentY);
        this.currentY += 5;
      });
      this.currentY += 5;
    }
  }

  private addSection(title: string): void {
    this.addNewPageIfNeeded(20);
    
    // Section title
    this.setFont(16, 'bold');
    this.doc.setTextColor(...colors.primary);
    this.doc.text(title.toUpperCase(), this.margin, this.currentY);
    this.currentY += 8;

    // Section separator line
    this.doc.setDrawColor(...colors.primary);
    this.doc.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 8;
  }

  private addWorkExperience(work?: ResumeData['work']): void {
    if (!work || work.length === 0) return;

    this.addSection('Work Experience');

    work.forEach((job) => {
      this.addNewPageIfNeeded(30);
      
      // Job title and company
      this.setFont(14, 'bold');
      this.doc.setTextColor(...colors.text);
      this.doc.text(`${job.position} at ${job.name}`, this.margin, this.currentY);
      this.currentY += 6;

      // Date range
      if (job.startDate || job.endDate) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        const dateRange = `${job.startDate || ''} - ${job.endDate || 'Present'}`;
        this.doc.text(dateRange, this.margin, this.currentY);
        this.currentY += 6;
      }

      // Summary
      if (job.summary) {
        this.setFont(11, 'normal');
        this.doc.setTextColor(...colors.text);
        const summaryLines = this.doc.splitTextToSize(job.summary, this.pageWidth - 2 * this.margin);
        this.doc.text(summaryLines, this.margin, this.currentY);
        this.currentY += summaryLines.length * 4 + 3;
      }

      // Highlights
      if (job.highlights && job.highlights.length > 0) {
        job.highlights.forEach((highlight) => {
          this.addNewPageIfNeeded(10);
          this.setFont(10, 'normal');
          this.doc.setTextColor(...colors.text);
          const bulletText = `• ${highlight}`;
          const lines = this.doc.splitTextToSize(bulletText, this.pageWidth - 2 * this.margin - 5);
          this.doc.text(lines, this.margin + 5, this.currentY);
          this.currentY += lines.length * 4 + 1;
        });
      }

      this.currentY += 8;
    });
  }

  private addEducation(education?: ResumeData['education']): void {
    if (!education || education.length === 0) return;

    this.addSection('Education');

    education.forEach((edu) => {
      this.addNewPageIfNeeded(20);
      
      // Institution and degree
      this.setFont(13, 'bold');
      this.doc.setTextColor(...colors.text);
      const degreeText = edu.studyType && edu.area ? `${edu.studyType} in ${edu.area}` : (edu.area || '');
      this.doc.text(`${edu.institution}${degreeText ? ` - ${degreeText}` : ''}`, this.margin, this.currentY);
      this.currentY += 6;

      // Date range
      if (edu.startDate || edu.endDate) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        const dateRange = `${edu.startDate || ''} - ${edu.endDate || 'Present'}`;
        this.doc.text(dateRange, this.margin, this.currentY);
        this.currentY += 6;
      }

      // GPA
      if (edu.gpa) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        this.doc.text(`GPA: ${edu.gpa}`, this.margin, this.currentY);
        this.currentY += 5;
      }

      this.currentY += 5;
    });
  }

  private addSkills(skills?: ResumeData['skills']): void {
    if (!skills || skills.length === 0) return;

    this.addSection('Skills');

    skills.forEach((skill) => {
      this.addNewPageIfNeeded(15);
      
      this.setFont(12, 'bold');
      this.doc.setTextColor(...colors.text);
      this.doc.text(`${skill.name}${skill.level ? ` (${skill.level})` : ''}`, this.margin, this.currentY);
      this.currentY += 6;

      if (skill.keywords && skill.keywords.length > 0) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        const keywordText = skill.keywords.join(', ');
        const lines = this.doc.splitTextToSize(keywordText, this.pageWidth - 2 * this.margin);
        this.doc.text(lines, this.margin + 5, this.currentY);
        this.currentY += lines.length * 4 + 3;
      }
      
      this.currentY += 3;
    });
  }

  private addProjects(projects?: ResumeData['projects']): void {
    if (!projects || projects.length === 0) return;

    this.addSection('Projects');

    projects.forEach((project) => {
      this.addNewPageIfNeeded(25);
      
      // Project name and URL
      this.setFont(13, 'bold');
      this.doc.setTextColor(...colors.text);
      this.doc.text(project.name, this.margin, this.currentY);
      this.currentY += 6;

      // Date range
      if (project.startDate || project.endDate) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        const dateRange = `${project.startDate || ''} - ${project.endDate || 'Present'}`;
        this.doc.text(dateRange, this.margin, this.currentY);
        this.currentY += 5;
      }

      // Description
      if (project.description) {
        this.setFont(11, 'normal');
        this.doc.setTextColor(...colors.text);
        const descLines = this.doc.splitTextToSize(project.description, this.pageWidth - 2 * this.margin);
        this.doc.text(descLines, this.margin, this.currentY);
        this.currentY += descLines.length * 4 + 3;
      }

      // Highlights
      if (project.highlights && project.highlights.length > 0) {
        project.highlights.forEach((highlight) => {
          this.addNewPageIfNeeded(8);
          this.setFont(10, 'normal');
          this.doc.setTextColor(...colors.text);
          const bulletText = `• ${highlight}`;
          const lines = this.doc.splitTextToSize(bulletText, this.pageWidth - 2 * this.margin - 5);
          this.doc.text(lines, this.margin + 5, this.currentY);
          this.currentY += lines.length * 4 + 1;
        });
      }

      // Keywords/Technologies
      if (project.keywords && project.keywords.length > 0) {
        this.setFont(9, 'normal');
        this.doc.setTextColor(...colors.secondary);
        const techText = `Technologies: ${project.keywords.join(', ')}`;
        const lines = this.doc.splitTextToSize(techText, this.pageWidth - 2 * this.margin);
        this.doc.text(lines, this.margin, this.currentY);
        this.currentY += lines.length * 3.5 + 3;
      }

      this.currentY += 5;
    });
  }

  private addLanguages(languages?: ResumeData['languages']): void {
    if (!languages || languages.length === 0) return;

    this.addSection('Languages');

    const langData = languages.map(lang => [lang.language, lang.fluency]);
    
    autoTable(this.doc, {
      head: [['Language', 'Fluency']],
      body: langData,
      startY: this.currentY,
      margin: { left: this.margin },
      styles: {
        fontSize: 10,
        textColor: colors.text
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: colors.white,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: colors.lightGray
      }
    });

    this.currentY = (this.doc.lastAutoTable?.finalY || this.currentY) + 10;
  }

  private addAwards(awards?: ResumeData['awards']): void {
    if (!awards || awards.length === 0) return;

    this.addSection('Awards & Achievements');

    awards.forEach((award) => {
      this.addNewPageIfNeeded(15);
      
      this.setFont(12, 'bold');
      this.doc.setTextColor(...colors.text);
      this.doc.text(`${award.title} - ${award.awarder}`, this.margin, this.currentY);
      this.currentY += 6;

      if (award.date) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.secondary);
        this.doc.text(award.date, this.margin, this.currentY);
        this.currentY += 5;
      }

      if (award.summary) {
        this.setFont(10, 'normal');
        this.doc.setTextColor(...colors.text);
        const summaryLines = this.doc.splitTextToSize(award.summary, this.pageWidth - 2 * this.margin);
        this.doc.text(summaryLines, this.margin, this.currentY);
        this.currentY += summaryLines.length * 4 + 3;
      }

      this.currentY += 5;
    });
  }

  public generatePDF(data: ResumeData): jsPDF {
    // Header with name, title and summary
    this.addHeader(data.basics.name, data.basics.label, data.basics.summary);
    
    // Contact information
    this.addContactInfo(data);

    // Add sections based on available data
    this.addWorkExperience(data.work);
    this.addEducation(data.education);
    this.addSkills(data.skills);
    this.addProjects(data.projects);
    this.addLanguages(data.languages);
    this.addAwards(data.awards);

    return this.doc;
  }
}

export function downloadResumePDF(data: ResumeData, filename?: string): void {
  try {
    const generator = new ResumePDFGenerator();
    const doc = generator.generatePDF(data);
    
    const pdfFilename = filename || `${data.basics.name.replace(/\s+/g, '_')}_Resume.pdf`;
    doc.save(pdfFilename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}