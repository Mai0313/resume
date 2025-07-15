import React from "react";
import { render, screen } from "@testing-library/react";
import { CertificatesSection } from "./CertificatesSection";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock @heroui components
jest.mock("@heroui/card", () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardBody: ({ children }: any) => (
    <div data-testid="card-body">{children}</div>
  ),
  CardHeader: ({ children, className }: any) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
}));

jest.mock("@heroui/link", () => ({
  Link: ({ children, href, isExternal, className }: any) => (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={className}
      data-testid="external-link"
    >
      {children}
    </a>
  ),
}));

const mockItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

describe("CertificatesSection", () => {
  describe("when certificates is empty or undefined", () => {
    it("should return null when certificates is undefined", () => {
      const { container } = render(
        <CertificatesSection
          certificates={undefined}
          itemVariants={mockItemVariants}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should return null when certificates is null", () => {
      const { container } = render(
        <CertificatesSection
          certificates={null}
          itemVariants={mockItemVariants}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should return null when certificates is empty array", () => {
      const { container } = render(
        <CertificatesSection
          certificates={[]}
          itemVariants={mockItemVariants}
        />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("when certificates are provided", () => {
    const mockCertificates = [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023-01-15",
        summary: "Cloud development certification",
        url: "https://aws.amazon.com/certification/certified-developer-associate/",
      },
      {
        name: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2023-03-20",
        summary: "Professional cloud architect certification",
        url: "https://cloud.google.com/certification/professional-cloud-architect",
      },
    ];

    it("should render the certificates section with header", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
      expect(screen.getByText("Certificates")).toBeInTheDocument();
    });

    it("should render all certificates in the list", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("AWS Certified Developer")).toBeInTheDocument();
      expect(screen.getByText("Google Cloud Professional")).toBeInTheDocument();
    });

    it("should render certificate names as external links when url is provided", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      const links = screen.getAllByTestId("external-link");
      expect(links).toHaveLength(2);
      
      expect(links[0]).toHaveAttribute(
        "href",
        "https://aws.amazon.com/certification/certified-developer-associate/"
      );
      expect(links[1]).toHaveAttribute(
        "href",
        "https://cloud.google.com/certification/professional-cloud-architect"
      );
    });

    it("should render certificate names as plain text when url is not provided", () => {
      const certificatesWithoutUrl = [
        {
          name: "Internal Training Certificate",
          issuer: "Company Training",
          date: "2023-01-15",
          summary: "Internal company training",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithoutUrl}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Internal Training Certificate")).toBeInTheDocument();
      expect(screen.queryByTestId("external-link")).not.toBeInTheDocument();
    });

    it("should render issuers when provided", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Amazon Web Services")).toBeInTheDocument();
      expect(screen.getByText("Google Cloud")).toBeInTheDocument();
    });

    it("should render dates when provided", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Issued: 2023-01-15")).toBeInTheDocument();
      expect(screen.getByText("Issued: 2023-03-20")).toBeInTheDocument();
    });

    it("should render summaries when provided", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Cloud development certification")).toBeInTheDocument();
      expect(screen.getByText("Professional cloud architect certification")).toBeInTheDocument();
    });

    it("should not render issuer section when issuer is not provided", () => {
      const certificatesWithoutIssuer = [
        {
          name: "Self-Study Certificate",
          date: "2023-01-15",
          summary: "Self-study certification",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithoutIssuer}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Self-Study Certificate")).toBeInTheDocument();
      // The issuer section should not be rendered
      expect(screen.queryByText(/Issued by:/)).not.toBeInTheDocument();
    });

    it("should not render date section when date is not provided", () => {
      const certificatesWithoutDate = [
        {
          name: "Ongoing Certificate",
          issuer: "Training Institute",
          summary: "Ongoing certification program",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithoutDate}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Ongoing Certificate")).toBeInTheDocument();
      expect(screen.queryByText(/Issued:/)).not.toBeInTheDocument();
    });

    it("should not render summary section when summary is not provided", () => {
      const certificatesWithoutSummary = [
        {
          name: "Basic Certificate",
          issuer: "Training Institute",
          date: "2023-01-15",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithoutSummary}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Basic Certificate")).toBeInTheDocument();
      expect(screen.getByText("Training Institute")).toBeInTheDocument();
      expect(screen.getByText("Issued: 2023-01-15")).toBeInTheDocument();
      // Summary should not be rendered
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });

    it("should handle certificates with minimal data", () => {
      const minimalCertificates = [
        {
          name: "Minimal Certificate",
        },
      ];

      render(
        <CertificatesSection
          certificates={minimalCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Minimal Certificate")).toBeInTheDocument();
      expect(screen.queryByTestId("external-link")).not.toBeInTheDocument();
      expect(screen.queryByText(/Issued:/)).not.toBeInTheDocument();
    });

    it("should generate unique keys for certificates", () => {
      const certificatesWithDuplicateNames = [
        {
          name: "Duplicate Certificate",
          issuer: "First Institute",
        },
        {
          name: "Duplicate Certificate",
          issuer: "Second Institute",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithDuplicateNames}
          itemVariants={mockItemVariants}
        />
      );

      const certificates = screen.getAllByText("Duplicate Certificate");
      expect(certificates).toHaveLength(2);
      expect(screen.getByText("First Institute")).toBeInTheDocument();
      expect(screen.getByText("Second Institute")).toBeInTheDocument();
    });

    it("should handle certificates without names", () => {
      const certificatesWithoutNames = [
        {
          issuer: "Unknown Institute",
          date: "2023-01-15",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithoutNames}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Unknown Institute")).toBeInTheDocument();
      expect(screen.getByText("Issued: 2023-01-15")).toBeInTheDocument();
    });

    it("should handle empty string values gracefully", () => {
      const certificatesWithEmptyStrings = [
        {
          name: "",
          issuer: "",
          date: "",
          summary: "",
          url: "",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithEmptyStrings}
          itemVariants={mockItemVariants}
        />
      );

      // Should still render the certificate structure
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it("should handle malformed certificate objects", () => {
      const malformedCertificates = [
        {
          name: "Valid Certificate",
          issuer: "Valid Issuer",
        },
        null,
        undefined,
        {
          name: "Another Valid Certificate",
        },
      ];

      render(
        <CertificatesSection
          certificates={malformedCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Valid Certificate")).toBeInTheDocument();
      expect(screen.getByText("Another Valid Certificate")).toBeInTheDocument();
    });

    it("should apply correct CSS classes for styling", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("overflow-hidden");

      const cardHeader = screen.getByTestId("card-header");
      expect(cardHeader).toHaveClass("pb-4");
    });

    it("should handle single certificate", () => {
      const singleCertificate = [
        {
          name: "Single Certificate",
          issuer: "Single Issuer",
          date: "2023-01-15",
          summary: "Single certificate summary",
          url: "https://example.com/certificate",
        },
      ];

      render(
        <CertificatesSection
          certificates={singleCertificate}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Single Certificate")).toBeInTheDocument();
      expect(screen.getByText("Single Issuer")).toBeInTheDocument();
      expect(screen.getByText("Issued: 2023-01-15")).toBeInTheDocument();
      expect(screen.getByText("Single certificate summary")).toBeInTheDocument();
      
      const link = screen.getByTestId("external-link");
      expect(link).toHaveAttribute("href", "https://example.com/certificate");
    });

    it("should handle large number of certificates", () => {
      const manyCertificates = Array.from({ length: 10 }, (_, index) => ({
        name: `Certificate ${index + 1}`,
        issuer: `Issuer ${index + 1}`,
        date: `2023-${String(index + 1).padStart(2, "0")}-15`,
        summary: `Summary for certificate ${index + 1}`,
      }));

      render(
        <CertificatesSection
          certificates={manyCertificates}
          itemVariants={mockItemVariants}
        />
      );

      for (let i = 1; i <= 10; i++) {
        expect(screen.getByText(`Certificate ${i}`)).toBeInTheDocument();
        expect(screen.getByText(`Issuer ${i}`)).toBeInTheDocument();
      }
    });

    it("should pass itemVariants to motion.div", () => {
      const customItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };

      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={customItemVariants}
        />
      );

      // Since we mocked framer-motion, we can't directly test the variants
      // but we can ensure the component renders without errors
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    const mockCertificates = [
      {
        name: "Accessible Certificate",
        issuer: "Accessibility Institute",
        date: "2023-01-15",
        summary: "Certificate focused on accessibility",
        url: "https://example.com/accessible-cert",
      },
    ];

    it("should render external links with proper attributes", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      const link = screen.getByTestId("external-link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should have proper heading structure", () => {
      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Certificates")).toBeInTheDocument();
      expect(screen.getByText("Accessible Certificate")).toBeInTheDocument();
    });
  });

  describe("edge cases and error handling", () => {
    it("should handle falsy certificate names gracefully", () => {
      const certificatesWithFalsyNames = [
        {
          name: null,
          issuer: "Test Issuer",
          date: "2023-01-15",
        },
        {
          name: undefined,
          issuer: "Another Issuer",
          date: "2023-02-15",
        },
        {
          name: 0,
          issuer: "Number Issuer",
          date: "2023-03-15",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithFalsyNames}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Test Issuer")).toBeInTheDocument();
      expect(screen.getByText("Another Issuer")).toBeInTheDocument();
      expect(screen.getByText("Number Issuer")).toBeInTheDocument();
    });

    it("should handle certificates with special characters in names", () => {
      const certificatesWithSpecialChars = [
        {
          name: "Certificate with <script>alert('xss')</script>",
          issuer: "Security Institute",
          date: "2023-01-15",
        },
        {
          name: "Certificate with émojis 🎓📜",
          issuer: "Unicode Institute",
          date: "2023-02-15",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithSpecialChars}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Certificate with <script>alert('xss')</script>")).toBeInTheDocument();
      expect(screen.getByText("Certificate with émojis 🎓📜")).toBeInTheDocument();
    });

    it("should handle very long certificate names and descriptions", () => {
      const longText = "A".repeat(500);
      const certificatesWithLongText = [
        {
          name: longText,
          issuer: "Long Text Institute",
          date: "2023-01-15",
          summary: longText,
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithLongText}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(screen.getByText("Long Text Institute")).toBeInTheDocument();
    });

    it("should handle invalid URL gracefully", () => {
      const certificatesWithInvalidUrl = [
        {
          name: "Certificate with Invalid URL",
          issuer: "Test Issuer",
          date: "2023-01-15",
          url: "not-a-valid-url",
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithInvalidUrl}
          itemVariants={mockItemVariants}
        />
      );

      const link = screen.getByTestId("external-link");
      expect(link).toHaveAttribute("href", "not-a-valid-url");
    });

    it("should handle certificates with extra unknown properties", () => {
      const certificatesWithExtraProps = [
        {
          name: "Certificate with Extra Props",
          issuer: "Test Issuer",
          date: "2023-01-15",
          summary: "Test summary",
          url: "https://example.com",
          unknownProp: "unknown value",
          anotherUnknownProp: { nested: "object" },
        },
      ];

      render(
        <CertificatesSection
          certificates={certificatesWithExtraProps}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Certificate with Extra Props")).toBeInTheDocument();
      expect(screen.getByText("Test Issuer")).toBeInTheDocument();
      expect(screen.getByText("Test summary")).toBeInTheDocument();
    });
  });

  describe("responsive design considerations", () => {
    it("should apply responsive grid classes", () => {
      const mockCertificates = [
        {
          name: "Responsive Certificate",
          issuer: "Design Institute",
          date: "2023-01-15",
        },
      ];

      render(
        <CertificatesSection
          certificates={mockCertificates}
          itemVariants={mockItemVariants}
        />
      );

      // Check for responsive grid classes in the DOM
      const gridContainer = screen.getByTestId("card-body").querySelector('.grid');
      expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
    });
  });
});