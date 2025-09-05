import type { ResumeData } from "./resumeLoader";

// Lazy import to avoid increasing initial bundle size
async function getPdfLib() {
  const pdf = await import("@react-pdf/renderer");

  return pdf;
}

function formatDate(date?: string): string {
  if (!date) return "Present";
  try {
    const d = new Date(date);

    if (Number.isNaN(d.getTime())) return date;

    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
    });
  } catch {
    return date;
  }
}

export async function generateResumePdf(
  data: ResumeData & { sectionOrder: string[] },
): Promise<Blob> {
  const { Document, Page, Text, View, StyleSheet, pdf } =
    await getPdfLib();

  // Built-in fonts are fine; register custom fonts later if needed
  const styles = StyleSheet.create({
    page: {
      paddingTop: 32,
      paddingBottom: 32,
      paddingHorizontal: 36,
      fontSize: 10,
      fontFamily: "Helvetica",
      color: "#111827",
    },
    header: {
      marginBottom: 12,
      borderBottom: "1 solid #E5E7EB",
      paddingBottom: 8,
    },
    name: {
      fontSize: 20,
      fontWeight: 700,
    },
    label: {
      fontSize: 12,
      marginTop: 2,
      color: "#4B5563",
    },
    contactRow: {
      marginTop: 6,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      color: "#374151",
    },
    contactItem: {
      marginRight: 12,
    },
    section: {
      marginTop: 14,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 6,
      textTransform: "uppercase",
      color: "#111827",
    },
    item: {
      marginBottom: 8,
    },
    itemHeaderRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 700,
    },
    itemSub: {
      fontSize: 10,
      color: "#4B5563",
    },
    paragraph: {
      marginTop: 4,
      lineHeight: 1.4,
      color: "#374151",
    },
    bullet: {
      marginTop: 3,
      marginLeft: 8,
      color: "#374151",
    },
    chipsRow: {
      marginTop: 4,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
    chip: {
      fontSize: 9,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
      backgroundColor: "#F3F4F6",
      color: "#1F2937",
    },
  });

  const BasicsHeader = () => (
    <View style={styles.header}>
      <Text style={styles.name}>{data.basics.name}</Text>
      {data.basics.label ? <Text style={styles.label}>{data.basics.label}</Text> : null}
      <View style={styles.contactRow}>
        {data.basics.email ? (
          <Text style={styles.contactItem}>{data.basics.email}</Text>
        ) : null}
        {data.basics.phone ? (
          <Text style={styles.contactItem}>{data.basics.phone}</Text>
        ) : null}
        {data.basics.url ? (
          <Text style={styles.contactItem}>{data.basics.url}</Text>
        ) : null}
        {data.basics.location?.city || data.basics.location?.region ? (
          <Text style={styles.contactItem}>
            {(data.basics.location?.city || "") +
              (data.basics.location?.region ? `, ${data.basics.location.region}` : "")}
          </Text>
        ) : null}
      </View>
      {data.basics.summary ? (
        <Text style={styles.paragraph}>{data.basics.summary}</Text>
      ) : null}
    </View>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>{children}</View>
    </View>
  );

  const Work = () => {
    if (!data.work?.length) return null;
    return (
      <Section title="Work Experience">
        {data.work.map((w, idx) => (
          <View key={`w-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{w.position}</Text>
              <Text style={styles.itemSub}>
                {formatDate(w.startDate)} - {formatDate(w.endDate)}
              </Text>
            </View>
            <Text style={styles.itemSub}>{w.name + (w.url ? ` · ${w.url}` : "")}</Text>
            {w.summary ? <Text style={styles.paragraph}>{w.summary}</Text> : null}
            {w.highlights?.map((h, i) => (
              <Text key={`w-h-${i}`} style={styles.bullet}>
                • {h}
              </Text>
            ))}
          </View>
        ))}
      </Section>
    );
  };

  const Education = () => {
    if (!data.education?.length) return null;
    return (
      <Section title="Education">
        {data.education.map((e, idx) => (
          <View key={`e-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{e.institution}</Text>
              <Text style={styles.itemSub}>
                {formatDate(e.startDate)} - {formatDate(e.endDate)}
              </Text>
            </View>
            <Text style={styles.itemSub}>
              {(e.studyType || "") + (e.area ? ` · ${e.area}` : "")}
            </Text>
            {e.gpa ? <Text style={styles.paragraph}>GPA: {e.gpa}</Text> : null}
            {e.courses?.length ? (
              <View style={styles.chipsRow}>
                {e.courses.map((c, i) => (
                  <Text key={`c-${i}`} style={styles.chip}>
                    {c}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Section>
    );
  };

  const Skills = () => {
    if (!data.skills?.length) return null;
    return (
      <Section title="Skills">
        <View style={{ display: "flex", gap: 8 }}>
          {data.skills.map((s, idx) => (
            <View key={`s-${idx}`}>
              <Text style={styles.itemTitle}>{s.name}</Text>
              <View style={styles.chipsRow}>
                {s.keywords?.map((k, i) => (
                  <Text key={`k-${i}`} style={styles.chip}>
                    {k}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      </Section>
    );
  };

  const Projects = () => {
    if (!data.projects?.length) return null;
    return (
      <Section title="Projects">
        {data.projects.map((p, idx) => (
          <View key={`p-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{p.name}</Text>
              <Text style={styles.itemSub}>
                {formatDate(p.startDate)} - {formatDate(p.endDate)}
              </Text>
            </View>
            {p.description ? (
              <Text style={styles.paragraph}>{p.description}</Text>
            ) : null}
            {p.highlights?.map((h, i) => (
              <Text key={`p-h-${i}`} style={styles.bullet}>
                • {h}
              </Text>
            ))}
            {p.keywords?.length ? (
              <View style={styles.chipsRow}>
                {p.keywords.map((k, i) => (
                  <Text key={`pk-${i}`} style={styles.chip}>
                    {k}
                  </Text>
                ))}
              </View>
            ) : null}
          </View>
        ))}
      </Section>
    );
  };

  const Languages = () => {
    if (!data.languages?.length) return null;
    return (
      <Section title="Languages">
        <View style={styles.chipsRow}>
          {data.languages.map((l, idx) => (
            <Text key={`l-${idx}`} style={styles.chip}>
              {l.language}: {l.fluency}
            </Text>
          ))}
        </View>
      </Section>
    );
  };

  const Awards = () => {
    if (!data.awards?.length) return null;
    return (
      <Section title="Awards">
        {data.awards.map((a, idx) => (
          <View key={`a-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{a.title}</Text>
              <Text style={styles.itemSub}>{formatDate(a.date)}</Text>
            </View>
            <Text style={styles.itemSub}>{a.awarder + (a.url ? ` · ${a.url}` : "")}</Text>
            {a.summary ? <Text style={styles.paragraph}>{a.summary}</Text> : null}
          </View>
        ))}
      </Section>
    );
  };

  const Volunteer = () => {
    if (!data.volunteer?.length) return null;
    return (
      <Section title="Volunteer">
        {data.volunteer.map((v, idx) => (
          <View key={`v-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{v.position}</Text>
              <Text style={styles.itemSub}>
                {formatDate(v.startDate)} - {formatDate(v.endDate)}
              </Text>
            </View>
            <Text style={styles.itemSub}>{v.organization + (v.url ? ` · ${v.url}` : "")}</Text>
            {v.summary ? <Text style={styles.paragraph}>{v.summary}</Text> : null}
            {v.highlights?.map((h, i) => (
              <Text key={`v-h-${i}`} style={styles.bullet}>
                • {h}
              </Text>
            ))}
          </View>
        ))}
      </Section>
    );
  };

  const Certificates = () => {
    if (!data.certificates?.length) return null;
    return (
      <Section title="Certificates">
        {data.certificates.map((c, idx) => (
          <View key={`c-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{c.name}</Text>
              <Text style={styles.itemSub}>{formatDate(c.date)}</Text>
            </View>
            {c.issuer ? <Text style={styles.itemSub}>{c.issuer}</Text> : null}
            {c.url ? <Text style={styles.paragraph}>{c.url}</Text> : null}
          </View>
        ))}
      </Section>
    );
  };

  const Publications = () => {
    if (!data.publications?.length) return null;
    return (
      <Section title="Publications">
        {data.publications.map((p, idx) => (
          <View key={`pub-${idx}`} style={styles.item}>
            <View style={styles.itemHeaderRow}>
              <Text style={styles.itemTitle}>{p.name}</Text>
              <Text style={styles.itemSub}>{formatDate(p.releaseDate)}</Text>
            </View>
            <Text style={styles.itemSub}>{p.publisher + (p.url ? ` · ${p.url}` : "")}</Text>
            {p.summary ? <Text style={styles.paragraph}>{p.summary}</Text> : null}
          </View>
        ))}
      </Section>
    );
  };

  const Interests = () => {
    if (!data.interests?.length) return null;
    return (
      <Section title="Interests">
        <View style={styles.chipsRow}>
          {data.interests.map((i, idx) => (
            <Text key={`i-${idx}`} style={styles.chip}>
              {i.name}
            </Text>
          ))}
        </View>
      </Section>
    );
  };

  const References = () => {
    if (!data.references?.length) return null;
    return (
      <Section title="References">
        {data.references.map((r, idx) => (
          <View key={`r-${idx}`} style={styles.item}>
            <Text style={styles.itemTitle}>{r.name}</Text>
            {r.reference ? <Text style={styles.paragraph}>{r.reference}</Text> : null}
          </View>
        ))}
      </Section>
    );
  };

  const DynamicSections = () => (
    <View>
      {/* Ensure a consistent, readable order. Basics header is always first. */}
      <Work />
      <Education />
      <Skills />
      <Projects />
      <Languages />
      <Awards />
      <Volunteer />
      <Certificates />
      <Publications />
      <Interests />
      <References />
    </View>
  );

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <BasicsHeader />
        <DynamicSections />
      </Page>
    </Document>
  );

  const blob = await pdf(doc).toBlob();

  return blob;
}

export async function downloadResumePdf(
  data: ResumeData & { sectionOrder: string[] },
  filename?: string,
): Promise<void> {
  const blob = await generateResumePdf(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${filename || data.basics.name || "resume"}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

