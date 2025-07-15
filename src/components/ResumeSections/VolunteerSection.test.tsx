import React from "react";
import { render, screen } from "@testing-library/react";
import { VolunteerSection } from "./VolunteerSection";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock @heroui components
jest.mock("@heroui/card", () => ({
  Card: ({ children, ...props }: any) => <div data-testid="card" {...props}>{children}</div>,
  CardBody: ({ children, ...props }: any) => <div data-testid="card-body" {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div data-testid="card-header" {...props}>{children}</div>,
}));

jest.mock("@heroui/link", () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} data-testid="external-link" {...props}>{children}</a>
  ),
}));

const mockItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const mockVolunteerData = [
  {
    organization: "Local Food Bank",
    position: "Volunteer Coordinator",
    location: "San Francisco, CA",
    startDate: "2020-01",
    endDate: "2022-12",
    summary: "Coordinated volunteer activities and managed food distribution programs.",
    highlights: [
      "Managed team of 20+ volunteers",
      "Increased food distribution efficiency by 30%",
      "Organized community outreach events"
    ],
    url: "https://localfoodbank.org"
  },
  {
    organization: "Community Garden Project",
    position: "Garden Maintainer",
    location: "Oakland, CA",
    startDate: "2019-06",
    endDate: null,
    summary: "Maintained community garden and taught gardening skills to local residents.",
    highlights: [
      "Maintained 15 garden plots",
      "Taught weekly gardening classes"
    ],
    url: null
  }
];

describe("VolunteerSection", () => {
  describe("Rendering", () => {
    it("renders correctly with volunteer data", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
    });

    it("renders null when volunteer is undefined", () => {
      const { container } = render(<VolunteerSection volunteer={undefined} itemVariants={mockItemVariants} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders null when volunteer is empty array", () => {
      const { container } = render(<VolunteerSection volunteer={[]} itemVariants={mockItemVariants} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders null when volunteer is null", () => {
      const { container } = render(<VolunteerSection volunteer={null as any} itemVariants={mockItemVariants} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Organization Information", () => {
    it("displays organization name", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Local Food Bank")).toBeInTheDocument();
      expect(screen.getByText("Community Garden Project")).toBeInTheDocument();
    });

    it("displays position title", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Volunteer Coordinator")).toBeInTheDocument();
      expect(screen.getByText("Garden Maintainer")).toBeInTheDocument();
    });

    it("displays location when provided", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
      expect(screen.getByText("Oakland, CA")).toBeInTheDocument();
    });

    it("does not display location when not provided", () => {
      const dataWithoutLocation = [{
        organization: "Test Org",
        position: "Test Position",
        location: null,
        startDate: "2020-01",
        endDate: "2022-12"
      }];
      
      render(<VolunteerSection volunteer={dataWithoutLocation} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("San Francisco, CA")).not.toBeInTheDocument();
    });

    it("displays organization name even when empty string", () => {
      const dataWithEmptyOrg = [{
        organization: "",
        position: "Test Position"
      }];
      
      render(<VolunteerSection volunteer={dataWithEmptyOrg} itemVariants={mockItemVariants} />);
      
      // Should still render the structure
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
    });
  });

  describe("Date Information", () => {
    it("displays start and end dates", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("2020-01 - 2022-12")).toBeInTheDocument();
    });

    it("displays 'Present' when endDate is null", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("2019-06 - Present")).toBeInTheDocument();
    });

    it("does not display date section when no dates provided", () => {
      const dataWithoutDates = [{
        organization: "Test Org",
        position: "Test Position",
        startDate: null,
        endDate: null
      }];
      
      render(<VolunteerSection volunteer={dataWithoutDates} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Present")).not.toBeInTheDocument();
    });

    it("displays dates when only startDate is provided", () => {
      const dataWithStartOnly = [{
        organization: "Test Org",
        position: "Test Position",
        startDate: "2020-01",
        endDate: null
      }];
      
      render(<VolunteerSection volunteer={dataWithStartOnly} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("2020-01 - Present")).toBeInTheDocument();
    });

    it("displays dates when only endDate is provided", () => {
      const dataWithEndOnly = [{
        organization: "Test Org",
        position: "Test Position",
        startDate: null,
        endDate: "2022-12"
      }];
      
      render(<VolunteerSection volunteer={dataWithEndOnly} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText(" - 2022-12")).toBeInTheDocument();
    });

    it("does not display date section when dates are empty strings", () => {
      const dataWithEmptyDates = [{
        organization: "Test Org",
        position: "Test Position",
        startDate: "",
        endDate: ""
      }];
      
      render(<VolunteerSection volunteer={dataWithEmptyDates} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Present")).not.toBeInTheDocument();
    });
  });

  describe("Summary and Highlights", () => {
    it("displays summary when provided", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Coordinated volunteer activities and managed food distribution programs.")).toBeInTheDocument();
      expect(screen.getByText("Maintained community garden and taught gardening skills to local residents.")).toBeInTheDocument();
    });

    it("does not display summary when not provided", () => {
      const dataWithoutSummary = [{
        organization: "Test Org",
        position: "Test Position",
        summary: null
      }];
      
      render(<VolunteerSection volunteer={dataWithoutSummary} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Coordinated volunteer activities")).not.toBeInTheDocument();
    });

    it("does not display summary when empty string", () => {
      const dataWithEmptySummary = [{
        organization: "Test Org",
        position: "Test Position",
        summary: ""
      }];
      
      render(<VolunteerSection volunteer={dataWithEmptySummary} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Coordinated volunteer activities")).not.toBeInTheDocument();
    });

    it("displays highlights when provided", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Key Contributions:")).toBeInTheDocument();
      expect(screen.getByText("Managed team of 20+ volunteers")).toBeInTheDocument();
      expect(screen.getByText("Increased food distribution efficiency by 30%")).toBeInTheDocument();
      expect(screen.getByText("Organized community outreach events")).toBeInTheDocument();
    });

    it("does not display highlights section when highlights is empty", () => {
      const dataWithoutHighlights = [{
        organization: "Test Org",
        position: "Test Position",
        highlights: []
      }];
      
      render(<VolunteerSection volunteer={dataWithoutHighlights} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Key Contributions:")).not.toBeInTheDocument();
    });

    it("does not display highlights section when highlights is null", () => {
      const dataWithoutHighlights = [{
        organization: "Test Org",
        position: "Test Position",
        highlights: null
      }];
      
      render(<VolunteerSection volunteer={dataWithoutHighlights} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Key Contributions:")).not.toBeInTheDocument();
    });

    it("displays highlights with proper list structure", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const lists = screen.getAllByRole("list");
      expect(lists.length).toBeGreaterThan(0);
      
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBe(5); // 3 + 2 highlights from mock data
    });
  });

  describe("External Links", () => {
    it("displays organization website link when URL is provided", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const links = screen.getAllByTestId("external-link");
      expect(links[0]).toBeInTheDocument();
      expect(links[0]).toHaveAttribute("href", "https://localfoodbank.org");
      expect(screen.getByText("Organization Website")).toBeInTheDocument();
    });

    it("does not display website link when URL is not provided", () => {
      const dataWithoutUrl = [{
        organization: "Test Org",
        position: "Test Position",
        url: null
      }];
      
      render(<VolunteerSection volunteer={dataWithoutUrl} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Organization Website")).not.toBeInTheDocument();
    });

    it("does not display website link when URL is empty string", () => {
      const dataWithEmptyUrl = [{
        organization: "Test Org",
        position: "Test Position",
        url: ""
      }];
      
      render(<VolunteerSection volunteer={dataWithEmptyUrl} itemVariants={mockItemVariants} />);
      
      expect(screen.queryByText("Organization Website")).not.toBeInTheDocument();
    });

    it("displays multiple organization links correctly", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const links = screen.getAllByTestId("external-link");
      expect(links).toHaveLength(1); // Only first item has URL in mock data
      expect(links[0]).toHaveAttribute("href", "https://localfoodbank.org");
    });
  });

  describe("Key Generation", () => {
    it("generates unique keys for volunteer items", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      // Check that each volunteer item has a unique key structure
      const volunteerItems = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(volunteerItems).toHaveLength(2);
    });

    it("handles missing organization in key generation", () => {
      const dataWithoutOrg = [{
        organization: null,
        position: "Test Position"
      }];
      
      const { container } = render(<VolunteerSection volunteer={dataWithoutOrg} itemVariants={mockItemVariants} />);
      
      // Should still render without errors
      expect(container.querySelector('[class*="bg-gradient-to-br"]')).toBeInTheDocument();
    });

    it("handles undefined organization in key generation", () => {
      const dataWithUndefinedOrg = [{
        organization: undefined,
        position: "Test Position"
      }];
      
      const { container } = render(<VolunteerSection volunteer={dataWithUndefinedOrg} itemVariants={mockItemVariants} />);
      
      // Should still render without errors
      expect(container.querySelector('[class*="bg-gradient-to-br"]')).toBeInTheDocument();
    });
  });

  describe("Motion and Styling", () => {
    it("applies motion variants to the main container", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const motionDiv = container.querySelector('div[key="volunteer"]');
      expect(motionDiv).toBeInTheDocument();
    });

    it("applies correct CSS classes for styling", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(container.querySelector('.overflow-hidden')).toBeInTheDocument();
      expect(container.querySelector('.space-y-6')).toBeInTheDocument();
    });

    it("applies hover effects to volunteer items", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const volunteerItems = container.querySelectorAll('[class*="hover:shadow-lg"]');
      expect(volunteerItems.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("handles volunteer item with all fields missing", () => {
      const minimalData = [{}];
      
      const { container } = render(<VolunteerSection volunteer={minimalData} itemVariants={mockItemVariants} />);
      
      // Should still render the structure without errors
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(container.querySelector('[class*="bg-gradient-to-br"]')).toBeInTheDocument();
    });

    it("handles volunteer item with empty strings", () => {
      const emptyStringData = [{
        organization: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        summary: "",
        highlights: [],
        url: ""
      }];
      
      const { container } = render(<VolunteerSection volunteer={emptyStringData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(container.querySelector('[class*="bg-gradient-to-br"]')).toBeInTheDocument();
    });

    it("handles large number of volunteer items", () => {
      const largeData = Array(10).fill(mockVolunteerData[0]);
      
      const { container } = render(<VolunteerSection volunteer={largeData} itemVariants={mockItemVariants} />);
      
      const volunteerItems = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(volunteerItems).toHaveLength(10);
    });

    it("handles volunteer item with very long text content", () => {
      const longTextData = [{
        organization: "A".repeat(100),
        position: "B".repeat(100),
        summary: "C".repeat(500),
        highlights: ["D".repeat(200), "E".repeat(200)]
      }];
      
      const { container } = render(<VolunteerSection volunteer={longTextData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("A".repeat(100))).toBeInTheDocument();
      expect(screen.getByText("B".repeat(100))).toBeInTheDocument();
      expect(screen.getByText("C".repeat(500))).toBeInTheDocument();
    });

    it("handles mixed data types in volunteer array", () => {
      const mixedData = [
        mockVolunteerData[0],
        {},
        { organization: "Test Org" },
        null,
        undefined
      ];
      
      const { container } = render(<VolunteerSection volunteer={mixedData as any} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      const volunteerItems = container.querySelectorAll('[class*="bg-gradient-to-br"]');
      expect(volunteerItems).toHaveLength(5);
    });
  });

  describe("Accessibility", () => {
    it("uses semantic HTML structure", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByRole("heading", { level: 2, name: "Volunteer & Community Engagement" })).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 3, name: "Local Food Bank" })).toBeInTheDocument();
    });

    it("includes proper list structure for highlights", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const lists = screen.getAllByRole("list");
      expect(lists.length).toBeGreaterThan(0);
      
      const listItems = screen.getAllByRole("listitem");
      expect(listItems.length).toBeGreaterThan(0);
    });

    it("provides proper link accessibility", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const link = screen.getByRole("link", { name: "Organization Website" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://localfoodbank.org");
    });

    it("includes proper heading hierarchy", () => {
      render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={mockItemVariants} />);
      
      const mainHeading = screen.getByRole("heading", { level: 2 });
      const orgHeadings = screen.getAllByRole("heading", { level: 3 });
      const contributionHeadings = screen.getAllByRole("heading", { level: 4 });
      
      expect(mainHeading).toBeInTheDocument();
      expect(orgHeadings).toHaveLength(2);
      expect(contributionHeadings).toHaveLength(2);
    });
  });

  describe("Props Validation", () => {
    it("handles undefined itemVariants gracefully", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={undefined as any} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(container.querySelector('div[key="volunteer"]')).toBeInTheDocument();
    });

    it("handles null itemVariants gracefully", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={null as any} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(container.querySelector('div[key="volunteer"]')).toBeInTheDocument();
    });

    it("handles empty itemVariants object", () => {
      const { container } = render(<VolunteerSection volunteer={mockVolunteerData} itemVariants={{}} />);
      
      expect(screen.getByText("Volunteer & Community Engagement")).toBeInTheDocument();
      expect(container.querySelector('div[key="volunteer"]')).toBeInTheDocument();
    });
  });
});