import type { ResumeData } from "../utils/resumeLoader";

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// Use built-in Helvetica font family for reliability
// This approach avoids external font loading issues
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 50,
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 5,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 10,
  },
  contactInfo: {
    textAlign: "center",
    marginTop: 10,
  },
  contactItem: {
    fontSize: 10,
    color: "#4b5563",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e40af",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  workItem: {
    marginBottom: 15,
  },
  workHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  company: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1f2937",
  },
  position: {
    fontSize: 11,
    color: "#6b7280",
  },
  dateRange: {
    fontSize: 9,
    color: "#9ca3af",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#374151",
    marginBottom: 5,
  },
  highlights: {
    marginTop: 5,
  },
  highlight: {
    fontSize: 9,
    lineHeight: 1.3,
    color: "#4b5563",
    marginBottom: 2,
    paddingLeft: 10,
  },
  educationItem: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  educationLeft: {
    flex: 1,
  },
  educationRight: {
    width: 80,
    textAlign: "right",
  },
  degree: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  institution: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  gpa: {
    fontSize: 9,
    color: "#9ca3af",
  },
  twoColumn: {
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
  linkText: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: "#374151",
    textAlign: "justify",
    marginBottom: 5,
  },
  interestItem: {
    fontSize: 9,
    color: "#6b7280",
    marginBottom: 3,
    paddingLeft: 5,
  },
});

interface ResumePDFProps {
  data: ResumeData;
}

export const ResumePDF: React.FC<ResumePDFProps> = ({ data }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present";
    try {
      const date = new Date(dateString);

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.basics.name}</Text>
          {data.basics.label && (
            <Text style={styles.title}>{data.basics.label}</Text>
          )}
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>
              {data.basics.email}
              {data.basics.location &&
                ` | ${data.basics.location.city}, ${data.basics.location.region}`}
              {data.basics.profiles?.find((p) => p.network === "GitHub") &&
                ` | ${data.basics.profiles.find((p) => p.network === "GitHub")?.url}`}
            </Text>
          </View>
        </View>

        {/* Summary */}
        {data.basics.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{data.basics.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {data.work && data.work.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.work.map((job, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <View>
                    <Text style={styles.company}>{job.name}</Text>
                    <Text style={styles.position}>{job.position}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {formatDate(job.startDate)} - {formatDate(job.endDate)}
                  </Text>
                </View>
                {job.summary && (
                  <Text style={styles.description}>{job.summary}</Text>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <View style={styles.highlights}>
                    {job.highlights.map((highlight, hIndex) => (
                      <Text key={hIndex} style={styles.highlight}>
                        • {highlight}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <View style={styles.educationLeft}>
                  <Text style={styles.degree}>
                    {edu.studyType} in {edu.area}
                  </Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  {edu.gpa && <Text style={styles.gpa}>GPA: {edu.gpa}</Text>}
                </View>
                <View style={styles.educationRight}>
                  <Text style={styles.dateRange}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skillCategory, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text
                  style={[
                    styles.description,
                    { fontWeight: "bold", marginBottom: 5 },
                  ]}
                >
                  {skillCategory.name}
                </Text>
                <Text style={styles.description}>
                  {skillCategory.keywords?.join(" • ") || ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <View>
                    <Text style={styles.company}>{project.name}</Text>
                    {project.entity && (
                      <Text style={styles.position}>{project.entity}</Text>
                    )}
                  </View>
                  <Text style={styles.dateRange}>
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </Text>
                </View>
                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
                {project.highlights && project.highlights.length > 0 && (
                  <View style={styles.highlights}>
                    {project.highlights.map((highlight, hIndex) => (
                      <Text key={hIndex} style={styles.highlight}>
                        • {highlight}
                      </Text>
                    ))}
                  </View>
                )}
                {project.keywords && project.keywords.length > 0 && (
                  <Text
                    style={[
                      styles.description,
                      { fontSize: 9, color: "#6b7280" },
                    ]}
                  >
                    Technologies: {project.keywords.join(" • ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Research Interests */}
        {data.interests && data.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Interests</Text>
            {data.interests.map((interest, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text
                  style={[
                    styles.description,
                    { fontWeight: "bold", marginBottom: 3 },
                  ]}
                >
                  {interest.name}
                </Text>
                <Text style={styles.description}>
                  {interest.keywords?.join(" • ") || ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {data.awards.map((award, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.company}>{award.title}</Text>
                  <Text style={styles.dateRange}>{formatDate(award.date)}</Text>
                </View>
                <Text style={styles.position}>{award.awarder}</Text>
                {award.summary && (
                  <Text style={styles.description}>{award.summary}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Publications */}
        {data.publications && data.publications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Publications</Text>
            {data.publications.map((pub, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.company}>{pub.name}</Text>
                  <Text style={styles.dateRange}>
                    {formatDate(pub.releaseDate)}
                  </Text>
                </View>
                <Text style={styles.position}>{pub.publisher}</Text>
                {pub.summary && (
                  <Text style={styles.description}>{pub.summary}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {data.certificates.map((cert, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.company}>{cert.name}</Text>
                  <Text style={styles.dateRange}>{formatDate(cert.date)}</Text>
                </View>
                {cert.issuer && (
                  <Text style={styles.position}>{cert.issuer}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {data.languages.map((lang, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <Text style={styles.company}>{lang.language}</Text>
                  <Text style={styles.position}>{lang.fluency}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Volunteer Experience */}
        {data.volunteer && data.volunteer.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteer Experience</Text>
            {data.volunteer.map((vol, index) => (
              <View key={index} style={styles.workItem}>
                <View style={styles.workHeader}>
                  <View>
                    <Text style={styles.company}>{vol.organization}</Text>
                    <Text style={styles.position}>{vol.position}</Text>
                  </View>
                  <Text style={styles.dateRange}>
                    {formatDate(vol.startDate)} - {formatDate(vol.endDate)}
                  </Text>
                </View>
                {vol.summary && (
                  <Text style={styles.description}>{vol.summary}</Text>
                )}
                {vol.highlights && vol.highlights.length > 0 && (
                  <View style={styles.highlights}>
                    {vol.highlights.map((highlight, hIndex) => (
                      <Text key={hIndex} style={styles.highlight}>
                        • {highlight}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* References */}
        {data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref, index) => (
              <View key={index} style={styles.workItem}>
                <Text style={styles.company}>{ref.name}</Text>
                <Text style={styles.description}>{ref.reference}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
