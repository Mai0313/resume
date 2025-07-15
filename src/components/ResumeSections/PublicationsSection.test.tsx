import React from "react";
import { render, screen } from "@testing-library/react";
import { PublicationsSection } from "./PublicationsSection";
import "@testing-library/jest-dom";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock HeroUI components
jest.mock("@heroui/card", () => ({
  Card: ({ children, className }: any) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardBody: ({ children, className }: any) => (
    <div className={className} data-testid="card-body">
      {children}
    </div>
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
      className={className}
      data-testid="external-link"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
}));

jest.mock("@heroui/divider", () => ({
  Divider: ({ className }: any) => (
    <hr className={className} data-testid="divider" />
  ),
}));

describe("PublicationsSection", () => {
  const mockItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const mockPublications = [
    {
      name: "Advanced React Patterns",
      url: "https://example.com/paper1",
      publisher: "Tech Journal",
      releaseDate: "2023-01-15",
      summary: "A comprehensive study of advanced React patterns and best practices.",
    },
    {
      name: "Machine Learning in Web Development",
      url: "https://example.com/paper2",
      publisher: "AI Quarterly",
      releaseDate: "2023-06-20",
      summary: "Exploring the integration of ML algorithms in modern web applications.",
    },
    {
      name: "Research Without URL",
      publisher: "Local Journal",
      releaseDate: "2023-03-10",
      summary: "A publication without an external URL.",
    },
  ];

  describe("Rendering", () => {
    it("should render the publications section with correct title", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Research Publications")).toBeInTheDocument();
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
    });

    it("should render all publications with correct information", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      // Check that all publication names are rendered
      expect(screen.getByText("Advanced React Patterns")).toBeInTheDocument();
      expect(screen.getByText("Machine Learning in Web Development")).toBeInTheDocument();
      expect(screen.getByText("Research Without URL")).toBeInTheDocument();

      // Check publishers
      expect(screen.getByText("Tech Journal")).toBeInTheDocument();
      expect(screen.getByText("AI Quarterly")).toBeInTheDocument();
      expect(screen.getByText("Local Journal")).toBeInTheDocument();

      // Check release dates
      expect(screen.getByText("2023-01-15")).toBeInTheDocument();
      expect(screen.getByText("2023-06-20")).toBeInTheDocument();
      expect(screen.getByText("2023-03-10")).toBeInTheDocument();
    });

    it("should render summaries when provided", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      expect(
        screen.getByText("A comprehensive study of advanced React patterns and best practices.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Exploring the integration of ML algorithms in modern web applications.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("A publication without an external URL.")
      ).toBeInTheDocument();
    });

    it("should render external links for publications with URLs", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const externalLinks = screen.getAllByTestId("external-link");
      expect(externalLinks).toHaveLength(2); // Only 2 publications have URLs

      expect(externalLinks[0]).toHaveAttribute("href", "https://example.com/paper1");
      expect(externalLinks[1]).toHaveAttribute("href", "https://example.com/paper2");
      expect(externalLinks[0]).toHaveAttribute("target", "_blank");
      expect(externalLinks[1]).toHaveAttribute("target", "_blank");
    });

    it("should render publication names as plain text when no URL is provided", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      // The publication without URL should be rendered as plain text
      const researchWithoutUrl = screen.getByText("Research Without URL");
      expect(researchWithoutUrl).toBeInTheDocument();
      expect(researchWithoutUrl.closest("a")).toBeNull();
    });

    it("should render dividers between publications except for the last one", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const dividers = screen.getAllByTestId("divider");
      expect(dividers).toHaveLength(2); // 3 publications should have 2 dividers
    });
  });

  describe("Edge Cases", () => {
    it("should return null when publications array is empty", () => {
      const { container } = render(
        <PublicationsSection
          publications={[]}
          itemVariants={mockItemVariants}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should return null when publications is undefined", () => {
      const { container } = render(
        <PublicationsSection
          publications={undefined}
          itemVariants={mockItemVariants}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should handle publications with missing fields gracefully", () => {
      const incompletePublications = [
        {
          name: "Publication with minimal data",
        },
        {
          name: "Publication with empty summary",
          summary: "",
        },
        {
          name: "Publication with null values",
          url: null,
          publisher: null,
          releaseDate: null,
          summary: null,
        },
      ];

      render(
        <PublicationsSection
          publications={incompletePublications}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Publication with minimal data")).toBeInTheDocument();
      expect(screen.getByText("Publication with empty summary")).toBeInTheDocument();
      expect(screen.getByText("Publication with null values")).toBeInTheDocument();
    });

    it("should handle publications with undefined/null name", () => {
      const publicationsWithUndefinedName = [
        {
          name: undefined,
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
        {
          name: null,
          publisher: "Another Publisher",
          releaseDate: "2023-02-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithUndefinedName}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Test Publisher")).toBeInTheDocument();
      expect(screen.getByText("Another Publisher")).toBeInTheDocument();
    });

    it("should handle single publication without divider", () => {
      const singlePublication = [
        {
          name: "Single Publication",
          publisher: "Solo Publisher",
          releaseDate: "2023-01-01",
        },
      ];

      render(
        <PublicationsSection
          publications={singlePublication}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Single Publication")).toBeInTheDocument();
      expect(screen.queryByTestId("divider")).not.toBeInTheDocument();
    });
  });

  describe("Styling and Classes", () => {
    it("should apply correct CSS classes to main container", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("overflow-hidden");
    });

    it("should apply correct CSS classes to card header", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const cardHeader = screen.getByTestId("card-header");
      expect(cardHeader).toHaveClass("pb-4");
    });

    it("should apply correct CSS classes to card body", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const cardBody = screen.getByTestId("card-body");
      expect(cardBody).toHaveClass("space-y-6");
    });

    it("should apply hover classes to publication items", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const publicationItems = screen.getAllByText("Advanced React Patterns");
      const publicationContainer = publicationItems[0].closest("div");
      expect(publicationContainer).toHaveClass("hover:shadow-lg", "transition-all", "duration-300", "hover:scale-[1.02]");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const mainHeading = screen.getByRole("heading", { level: 2 });
      expect(mainHeading).toHaveTextContent("Research Publications");

      const publicationHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(publicationHeadings).toHaveLength(3);
    });

    it("should have proper link accessibility attributes", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const externalLinks = screen.getAllByTestId("external-link");
      externalLinks.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });

    it("should have proper SVG accessibility with viewBox", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const svgElements = screen.getByTestId("card").querySelectorAll("svg");
      svgElements.forEach((svg) => {
        expect(svg).toHaveAttribute("viewBox");
      });
    });
  });

  describe("Key Generation", () => {
    it("should generate unique keys for each publication", () => {
      const publicationsWithSameName = [
        {
          name: "Duplicate Name",
          publisher: "Publisher 1",
          releaseDate: "2023-01-01",
        },
        {
          name: "Duplicate Name",
          publisher: "Publisher 2",
          releaseDate: "2023-02-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithSameName}
          itemVariants={mockItemVariants}
        />
      );

      const duplicateNames = screen.getAllByText("Duplicate Name");
      expect(duplicateNames).toHaveLength(2);
    });

    it("should handle publications with no name in key generation", () => {
      const publicationsWithNoName = [
        {
          publisher: "Publisher 1",
          releaseDate: "2023-01-01",
        },
        {
          publisher: "Publisher 2",
          releaseDate: "2023-02-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithNoName}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Publisher 1")).toBeInTheDocument();
      expect(screen.getByText("Publisher 2")).toBeInTheDocument();
    });
  });

  describe("Motion Integration", () => {
    it("should pass itemVariants to motion.div", () => {
      const customVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };

      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={customVariants}
        />
      );

      // Since we mocked framer-motion, we can't test the actual animation
      // but we can verify the component renders without errors
      expect(screen.getByText("Research Publications")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should handle large number of publications efficiently", () => {
      const largePublicationsList = Array.from({ length: 100 }, (_, index) => ({
        name: `Publication ${index + 1}`,
        publisher: `Publisher ${index + 1}`,
        releaseDate: `2023-${String(index % 12 + 1).padStart(2, "0")}-01`,
        summary: `Summary for publication ${index + 1}`,
      }));

      render(
        <PublicationsSection
          publications={largePublicationsList}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Publication 1")).toBeInTheDocument();
      expect(screen.getByText("Publication 100")).toBeInTheDocument();
    });
  });

  describe("Conditional Rendering", () => {
    it("should not render summary when summary is undefined", () => {
      const publicationsWithoutSummary = [
        {
          name: "Publication Without Summary",
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithoutSummary}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Publication Without Summary")).toBeInTheDocument();
      expect(screen.queryByText("Summary")).not.toBeInTheDocument();
    });

    it("should not render summary when summary is empty string", () => {
      const publicationsWithEmptySummary = [
        {
          name: "Publication With Empty Summary",
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
          summary: "",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithEmptySummary}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Publication With Empty Summary")).toBeInTheDocument();
      expect(screen.queryByText("Summary")).not.toBeInTheDocument();
    });
  });

  describe("URL Handling", () => {
    it("should handle various URL formats", () => {
      const publicationsWithDifferentUrls = [
        {
          name: "HTTP URL",
          url: "http://example.com/paper1",
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
        {
          name: "HTTPS URL",
          url: "https://example.com/paper2",
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
        {
          name: "Empty URL",
          url: "",
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithDifferentUrls}
          itemVariants={mockItemVariants}
        />
      );

      const links = screen.getAllByTestId("external-link");
      expect(links).toHaveLength(2); // Only non-empty URLs should create links
      expect(links[0]).toHaveAttribute("href", "http://example.com/paper1");
      expect(links[1]).toHaveAttribute("href", "https://example.com/paper2");
    });

    it("should handle falsy URL values", () => {
      const publicationsWithFalsyUrls = [
        {
          name: "Null URL",
          url: null,
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
        {
          name: "Undefined URL",
          url: undefined,
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
        {
          name: "False URL",
          url: false,
          publisher: "Test Publisher",
          releaseDate: "2023-01-01",
        },
      ];

      render(
        <PublicationsSection
          publications={publicationsWithFalsyUrls}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Null URL")).toBeInTheDocument();
      expect(screen.getByText("Undefined URL")).toBeInTheDocument();
      expect(screen.getByText("False URL")).toBeInTheDocument();
      expect(screen.queryByTestId("external-link")).not.toBeInTheDocument();
    });
  });

  describe("Icon Rendering", () => {
    it("should render SVG icons with correct attributes", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const svgElements = screen.getByTestId("card").querySelectorAll("svg");
      expect(svgElements.length).toBeGreaterThan(0);
      
      svgElements.forEach((svg) => {
        expect(svg).toHaveAttribute("viewBox");
        expect(svg).toHaveAttribute("fill");
        expect(svg).toHaveAttribute("stroke");
      });
    });

    it("should render book icon in header", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const headerIcon = screen.getByTestId("card-header").querySelector("svg");
      expect(headerIcon).toBeInTheDocument();
      expect(headerIcon).toHaveClass("w-5", "h-5", "text-white");
    });

    it("should render document icons for each publication", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const documentIcons = screen.getByTestId("card-body").querySelectorAll("svg");
      // Should have icons for: 3 document icons, 3 publisher icons, 3 date icons, 2 external link icons
      expect(documentIcons.length).toBeGreaterThan(8);
    });
  });

  describe("Dark Mode Support", () => {
    it("should have dark mode CSS classes", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const title = screen.getByText("Research Publications");
      expect(title).toHaveClass("text-blue-600", "dark:text-blue-400");
    });

    it("should apply dark mode classes to publication items", () => {
      render(
        <PublicationsSection
          publications={mockPublications}
          itemVariants={mockItemVariants}
        />
      );

      const publicationContainers = screen.getAllByText("Advanced React Patterns");
      const container = publicationContainers[0].closest("div");
      expect(container).toHaveClass("dark:from-gray-800/50", "dark:to-gray-900/50");
    });
  });
});