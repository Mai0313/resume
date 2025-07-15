import React from "react";
import { render, screen, within } from "@testing-library/react";
import { AwardsSection } from "./AwardsSection";

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
  CardHeader: ({ children, className }: any) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
  CardBody: ({ children, className }: any) => (
    <div className={className} data-testid="card-body">
      {children}
    </div>
  ),
}));

jest.mock("@heroui/link", () => ({
  Link: ({ children, href, isExternal, className, ...props }: any) => (
    <a href={href} className={className} data-testid="award-link" {...props}>
      {children}
    </a>
  ),
}));

describe("AwardsSection", () => {
  const mockItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const mockAwards = [
    {
      title: "Excellence Award",
      awarder: "Tech Company",
      date: "2023-01-01",
      summary: "Awarded for outstanding performance in software development",
      url: "https://example.com/award1",
    },
    {
      title: "Innovation Prize",
      awarder: "Innovation Foundation",
      date: "2022-12-01",
      summary: "Recognized for innovative solutions in technology",
    },
    {
      title: "Leadership Award",
      awarder: "Leadership Institute",
      summary: "Awarded for exceptional leadership skills",
    },
  ];

  describe("Rendering Conditions", () => {
    it("renders null when awards array is undefined", () => {
      const { container } = render(
        <AwardsSection awards={undefined} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders null when awards array is empty", () => {
      const { container } = render(
        <AwardsSection awards={[]} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders null when awards array is null", () => {
      const { container } = render(
        <AwardsSection awards={null as any} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("renders the component when awards array has items", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).not.toBeNull();
    });
  });

  describe("Structure and Layout", () => {
    beforeEach(() => {
      render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
    });

    it("renders the main card structure", () => {
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
    });

    it("renders the section title", () => {
      expect(screen.getByText("Awards & Recognition")).toBeInTheDocument();
    });

    it("renders the header with proper heading level", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Awards & Recognition");
    });

    it("renders the trophy icon in the header", () => {
      const header = screen.getByTestId("card-header");
      const trophyIcon = within(header).getByRole("img", { hidden: true });
      expect(trophyIcon).toBeInTheDocument();
    });

    it("applies proper CSS classes to the card", () => {
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("overflow-hidden");
    });

    it("applies grid layout to the card body", () => {
      const cardBody = screen.getByTestId("card-body");
      expect(cardBody).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-6");
    });
  });

  describe("Awards Rendering", () => {
    beforeEach(() => {
      render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
    });

    it("renders all awards from the array", () => {
      expect(screen.getByText("Excellence Award")).toBeInTheDocument();
      expect(screen.getByText("Innovation Prize")).toBeInTheDocument();
      expect(screen.getByText("Leadership Award")).toBeInTheDocument();
    });

    it("renders award titles as headings", () => {
      const awardHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(awardHeadings).toHaveLength(3);
      expect(awardHeadings[0]).toHaveTextContent("Excellence Award");
      expect(awardHeadings[1]).toHaveTextContent("Innovation Prize");
      expect(awardHeadings[2]).toHaveTextContent("Leadership Award");
    });

    it("renders award with URL as a clickable link", () => {
      const link = screen.getByRole("link", { name: /Excellence Award/i });
      expect(link).toHaveAttribute("href", "https://example.com/award1");
      expect(link).toHaveAttribute("data-testid", "award-link");
    });

    it("renders award without URL as plain text", () => {
      const innovationPrize = screen.getByText("Innovation Prize");
      expect(innovationPrize).not.toHaveAttribute("href");
      expect(innovationPrize.tagName).not.toBe("A");
    });

    it("renders external link icon for awards with URLs", () => {
      const linkContainer = screen.getByRole("link", { name: /Excellence Award/i });
      const externalIcon = within(linkContainer).getByRole("img", { hidden: true });
      expect(externalIcon).toBeInTheDocument();
    });

    it("renders award awarder information", () => {
      expect(screen.getByText("Tech Company")).toBeInTheDocument();
      expect(screen.getByText("Innovation Foundation")).toBeInTheDocument();
      expect(screen.getByText("Leadership Institute")).toBeInTheDocument();
    });

    it("renders award dates when provided", () => {
      expect(screen.getByText("2023-01-01")).toBeInTheDocument();
      expect(screen.getByText("2022-12-01")).toBeInTheDocument();
    });

    it("does not render date section when date is missing", () => {
      const leadershipSection = screen.getByText("Leadership Award").closest("div");
      expect(leadershipSection).not.toHaveTextContent("2023");
      expect(leadershipSection).not.toHaveTextContent("2022");
    });

    it("renders award summaries when provided", () => {
      expect(
        screen.getByText("Awarded for outstanding performance in software development")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Recognized for innovative solutions in technology")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Awarded for exceptional leadership skills")
      ).toBeInTheDocument();
    });

    it("renders star icons for each award", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
      const starIcons = container.querySelectorAll('svg path[d*="9.049 2.927"]');
      expect(starIcons).toHaveLength(3);
    });

    it("renders institution/building icons for awarders", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
      const institutionIcons = container.querySelectorAll('svg path[d*="M10.496 2.132"]');
      expect(institutionIcons).toHaveLength(3);
    });

    it("renders calendar icons for dates", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
      const calendarIcons = container.querySelectorAll('svg path[d*="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10"]');
      expect(calendarIcons).toHaveLength(2); // Only Excellence Award and Innovation Prize have dates
    });
  });

  describe("Edge Cases", () => {
    it("handles awards with missing title", () => {
      const awardsWithMissingTitle = [
        {
          title: "",
          awarder: "Some Company",
          date: "2023-01-01",
        },
        {
          awarder: "Another Company",
          date: "2023-02-01",
        },
      ];

      render(
        <AwardsSection
          awards={awardsWithMissingTitle}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Some Company")).toBeInTheDocument();
      expect(screen.getByText("Another Company")).toBeInTheDocument();
    });

    it("handles awards with missing awarder", () => {
      const awardsWithMissingAwarder = [
        {
          title: "Test Award",
          date: "2023-01-01",
        },
      ];

      render(
        <AwardsSection
          awards={awardsWithMissingAwarder}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Test Award")).toBeInTheDocument();
    });

    it("handles awards with special characters in title", () => {
      const specialAwards = [
        {
          title: "Award with Special Characters: !@#$%^&*()",
          awarder: "Test Company",
          date: "2023-01-01",
        },
      ];

      render(
        <AwardsSection awards={specialAwards} itemVariants={mockItemVariants} />
      );

      expect(
        screen.getByText("Award with Special Characters: !@#$%^&*()")
      ).toBeInTheDocument();
    });

    it("handles very long award titles", () => {
      const longTitleAwards = [
        {
          title: "A".repeat(200),
          awarder: "Test Company",
          date: "2023-01-01",
        },
      ];

      render(
        <AwardsSection awards={longTitleAwards} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("A".repeat(200))).toBeInTheDocument();
    });

    it("handles malformed URLs gracefully", () => {
      const malformedUrlAwards = [
        {
          title: "Test Award",
          awarder: "Test Company",
          url: "not-a-valid-url",
        },
      ];

      render(
        <AwardsSection
          awards={malformedUrlAwards}
          itemVariants={mockItemVariants}
        />
      );

      const link = screen.getByRole("link", { name: /Test Award/i });
      expect(link).toHaveAttribute("href", "not-a-valid-url");
    });

    it("handles awards with undefined properties gracefully", () => {
      const undefinedPropsAwards = [
        {
          title: "Test Award",
          awarder: undefined,
          date: undefined,
          summary: undefined,
          url: undefined,
        },
      ];

      render(
        <AwardsSection
          awards={undefinedPropsAwards}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Test Award")).toBeInTheDocument();
    });

    it("handles awards with null properties gracefully", () => {
      const nullPropsAwards = [
        {
          title: "Test Award",
          awarder: null,
          date: null,
          summary: null,
          url: null,
        },
      ];

      render(
        <AwardsSection
          awards={nullPropsAwards}
          itemVariants={mockItemVariants}
        />
      );

      expect(screen.getByText("Test Award")).toBeInTheDocument();
    });
  });

  describe("Key Generation", () => {
    it("generates unique keys for awards with same title", () => {
      const duplicateAwards = [
        {
          title: "Same Award",
          awarder: "Company A",
          date: "2023-01-01",
        },
        {
          title: "Same Award",
          awarder: "Company B",
          date: "2023-02-01",
        },
      ];

      const { container } = render(
        <AwardsSection awards={duplicateAwards} itemVariants={mockItemVariants} />
      );

      const awardDivs = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(awardDivs).toHaveLength(2);
    });

    it("generates key for award without title using 'unknown'", () => {
      const noTitleAwards = [
        {
          awarder: "Test Company",
          date: "2023-01-01",
        },
      ];

      const { container } = render(
        <AwardsSection awards={noTitleAwards} itemVariants={mockItemVariants} />
      );

      const awardDivs = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(awardDivs).toHaveLength(1);
    });

    it("uses index in key generation for uniqueness", () => {
      const identicalAwards = [
        {
          title: "Same Award",
          awarder: "Same Company",
          date: "2023-01-01",
        },
        {
          title: "Same Award",
          awarder: "Same Company",
          date: "2023-01-01",
        },
      ];

      const { container } = render(
        <AwardsSection awards={identicalAwards} itemVariants={mockItemVariants} />
      );

      const awardDivs = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(awardDivs).toHaveLength(2);
    });
  });

  describe("Motion and Animation", () => {
    it("applies motion variants to the container", () => {
      const customVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      };

      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={customVariants} />
      );

      const motionDiv = container.firstChild;
      expect(motionDiv).toBeInTheDocument();
      expect(motionDiv).toHaveAttribute("key", "awards");
    });

    it("applies hover effects classes to award cards", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const awardCards = container.querySelectorAll('[class*="hover:shadow-lg"]');
      expect(awardCards).toHaveLength(3);
    });

    it("applies scale transformation on hover", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const awardCards = container.querySelectorAll('[class*="hover:scale-[1.02]"]');
      expect(awardCards).toHaveLength(3);
    });
  });

  describe("Styling and CSS Classes", () => {
    beforeEach(() => {
      render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
    });

    it("applies proper background gradients to award cards", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const awardCards = container.querySelectorAll('[class*="bg-gradient-to-br from-gray-50 to-gray-100"]');
      expect(awardCards).toHaveLength(3);
    });

    it("applies proper icon styling for award stars", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const starContainers = container.querySelectorAll('[class*="bg-gradient-to-br from-yellow-500 to-orange-500"]');
      expect(starContainers).toHaveLength(3);
    });

    it("applies proper color classes to text elements", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const awarderSpans = container.querySelectorAll('.text-yellow-700');
      expect(awarderSpans).toHaveLength(3);
    });

    it("applies responsive flexbox layout", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );

      const flexContainers = container.querySelectorAll('[class*="flex flex-col sm:flex-row"]');
      expect(flexContainers).toHaveLength(2); // Only Excellence Award and Innovation Prize have dates
    });
  });

  describe("Performance and Scale", () => {
    it("handles large number of awards efficiently", () => {
      const manyAwards = Array.from({ length: 100 }, (_, i) => ({
        title: `Award ${i + 1}`,
        awarder: `Company ${i + 1}`,
        date: `2023-${String(i % 12 + 1).padStart(2, "0")}-01`,
        summary: `Summary for award ${i + 1}`,
      }));

      const { container } = render(
        <AwardsSection awards={manyAwards} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Award 1")).toBeInTheDocument();
      expect(screen.getByText("Award 100")).toBeInTheDocument();
      
      const awardCards = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(awardCards).toHaveLength(100);
    });

    it("renders efficiently with minimal DOM queries", () => {
      const startTime = performance.now();
      
      render(
        <AwardsSection awards={mockAwards} itemVariants={mockItemVariants} />
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Rendering should be reasonably fast (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });
  });

  describe("Data Validation", () => {
    it("handles mixed data types in awards array", () => {
      const mixedAwards = [
        {
          title: "Valid Award",
          awarder: "Valid Company",
          date: "2023-01-01",
        },
        {
          title: 123, // Invalid type
          awarder: "Company",
          date: "2023-01-01",
        },
        {
          title: "Another Award",
          awarder: true, // Invalid type
          date: "2023-01-01",
        },
      ];

      const { container } = render(
        <AwardsSection awards={mixedAwards} itemVariants={mockItemVariants} />
      );

      // Component should still render without crashing
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles empty strings in award properties", () => {
      const emptyStringAwards = [
        {
          title: "",
          awarder: "",
          date: "",
          summary: "",
          url: "",
        },
      ];

      render(
        <AwardsSection awards={emptyStringAwards} itemVariants={mockItemVariants} />
      );

      // Component should render without crashing
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });
  });

  describe("Component Props", () => {
    it("handles undefined itemVariants gracefully", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={undefined} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles null itemVariants gracefully", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={null} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles empty itemVariants object", () => {
      const { container } = render(
        <AwardsSection awards={mockAwards} itemVariants={{}} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});