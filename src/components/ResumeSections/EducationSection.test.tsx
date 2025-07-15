import React from "react";
import { render, screen } from "@testing-library/react";
import { EducationSection } from "./EducationSection";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock Hero UI components
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
  Link: ({ children, href, isExternal, className }: any) => (
    <a
      href={href}
      className={className}
      data-testid="hero-link"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
}));

const mockItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

describe("EducationSection", () => {
  describe("Rendering Behavior", () => {
    it("should render null when education is undefined", () => {
      const { container } = render(
        <EducationSection education={undefined} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render null when education is null", () => {
      const { container } = render(
        <EducationSection education={null as any} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render null when education is an empty array", () => {
      const { container } = render(
        <EducationSection education={[]} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("should render education section when education array has items", () => {
      const education = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          startDate: "2020-09",
          endDate: "2024-05",
        },
      ];

      render(<EducationSection education={education} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Education")).toBeInTheDocument();
      expect(screen.getByText("Test University")).toBeInTheDocument();
    });
  });

  describe("Basic Education Information", () => {
    const basicEducation = [
      {
        institution: "Test University",
        studyType: "Bachelor",
        area: "Computer Science",
        startDate: "2020-09",
        endDate: "2024-05",
      },
    ];

    it("should display institution name", () => {
      render(<EducationSection education={basicEducation} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Test University")).toBeInTheDocument();
    });

    it("should display study type and area", () => {
      render(<EducationSection education={basicEducation} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Bachelor in Computer Science")).toBeInTheDocument();
    });

    it("should display date range when start and end dates are provided", () => {
      render(<EducationSection education={basicEducation} itemVariants={mockItemVariants} />);
      expect(screen.getByText("2020-09 - 2024-05")).toBeInTheDocument();
    });

    it("should handle missing end date gracefully", () => {
      const educationWithoutEndDate = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          startDate: "2020-09",
        },
      ];

      render(<EducationSection education={educationWithoutEndDate} itemVariants={mockItemVariants} />);
      expect(screen.getByText("2020-09 - ")).toBeInTheDocument();
    });
  });

  describe("Institution Links", () => {
    it("should render institution as a link when URL is provided", () => {
      const educationWithUrl = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          url: "https://testuniversity.edu",
        },
      ];

      render(<EducationSection education={educationWithUrl} itemVariants={mockItemVariants} />);
      
      const link = screen.getByTestId("hero-link");
      expect(link).toHaveAttribute("href", "https://testuniversity.edu");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveTextContent("Test University");
    });

    it("should render institution as plain text when URL is not provided", () => {
      const educationWithoutUrl = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={educationWithoutUrl} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.queryByTestId("hero-link")).not.toBeInTheDocument();
    });

    it("should handle empty URL gracefully", () => {
      const educationWithEmptyUrl = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          url: "",
        },
      ];

      render(<EducationSection education={educationWithEmptyUrl} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.queryByTestId("hero-link")).not.toBeInTheDocument();
    });
  });

  describe("GPA Score Display", () => {
    it("should display GPA when score is provided", () => {
      const educationWithScore = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          score: "3.85",
        },
      ];

      render(<EducationSection education={educationWithScore} itemVariants={mockItemVariants} />);
      expect(screen.getByText("GPA: 3.85")).toBeInTheDocument();
    });

    it("should not display GPA when score is not provided", () => {
      const educationWithoutScore = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={educationWithoutScore} itemVariants={mockItemVariants} />);
      expect(screen.queryByText(/GPA:/)).not.toBeInTheDocument();
    });

    it("should handle numeric score", () => {
      const educationWithNumericScore = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          score: 3.85,
        },
      ];

      render(<EducationSection education={educationWithNumericScore} itemVariants={mockItemVariants} />);
      expect(screen.getByText("GPA: 3.85")).toBeInTheDocument();
    });
  });

  describe("Summary Display", () => {
    it("should display summary when provided", () => {
      const educationWithSummary = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          summary: "Focused on software engineering and data structures.",
        },
      ];

      render(<EducationSection education={educationWithSummary} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Focused on software engineering and data structures.")).toBeInTheDocument();
    });

    it("should not display summary when not provided", () => {
      const educationWithoutSummary = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={educationWithoutSummary} itemVariants={mockItemVariants} />);
      expect(screen.queryByText("Focused on")).not.toBeInTheDocument();
    });

    it("should handle empty summary", () => {
      const educationWithEmptySummary = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          summary: "",
        },
      ];

      render(<EducationSection education={educationWithEmptySummary} itemVariants={mockItemVariants} />);
      expect(screen.queryByText("Focused on")).not.toBeInTheDocument();
    });
  });

  describe("Courses Display", () => {
    it("should display courses when provided", () => {
      const educationWithCourses = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: ["Data Structures", "Algorithms", "Software Engineering"],
        },
      ];

      render(<EducationSection education={educationWithCourses} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Relevant Coursework:")).toBeInTheDocument();
      expect(screen.getByText("Data Structures")).toBeInTheDocument();
      expect(screen.getByText("Algorithms")).toBeInTheDocument();
      expect(screen.getByText("Software Engineering")).toBeInTheDocument();
    });

    it("should not display courses section when courses array is empty", () => {
      const educationWithEmptyCourses = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: [],
        },
      ];

      render(<EducationSection education={educationWithEmptyCourses} itemVariants={mockItemVariants} />);
      expect(screen.queryByText("Relevant Coursework:")).not.toBeInTheDocument();
    });

    it("should not display courses section when courses is undefined", () => {
      const educationWithoutCourses = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={educationWithoutCourses} itemVariants={mockItemVariants} />);
      expect(screen.queryByText("Relevant Coursework:")).not.toBeInTheDocument();
    });

    it("should handle single course", () => {
      const educationWithSingleCourse = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: ["Data Structures"],
        },
      ];

      render(<EducationSection education={educationWithSingleCourse} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Relevant Coursework:")).toBeInTheDocument();
      expect(screen.getByText("Data Structures")).toBeInTheDocument();
    });
  });

  describe("Multiple Education Entries", () => {
    it("should render multiple education entries", () => {
      const multipleEducation = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          startDate: "2020-09",
          endDate: "2024-05",
        },
        {
          institution: "Another University",
          studyType: "Master",
          area: "Software Engineering",
          startDate: "2024-09",
          endDate: "2026-05",
        },
      ];

      render(<EducationSection education={multipleEducation} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.getByText("Another University")).toBeInTheDocument();
      expect(screen.getByText("Bachelor in Computer Science")).toBeInTheDocument();
      expect(screen.getByText("Master in Software Engineering")).toBeInTheDocument();
    });

    it("should generate unique keys for education entries", () => {
      const educationWithSameName = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
        {
          institution: "Test University",
          studyType: "Master",
          area: "Software Engineering",
        },
      ];

      render(<EducationSection education={educationWithSameName} itemVariants={mockItemVariants} />);
      expect(screen.getAllByText("Test University")).toHaveLength(2);
    });

    it("should handle education entry without institution name", () => {
      const educationWithoutInstitution = [
        {
          studyType: "Bachelor",
          area: "Computer Science",
          startDate: "2020-09",
          endDate: "2024-05",
        },
      ];

      render(<EducationSection education={educationWithoutInstitution} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Bachelor in Computer Science")).toBeInTheDocument();
    });
  });

  describe("Edge Cases and Error Handling", () => {
    it("should handle missing studyType gracefully", () => {
      const educationWithoutStudyType = [
        {
          institution: "Test University",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={educationWithoutStudyType} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.getByText(" in Computer Science")).toBeInTheDocument();
    });

    it("should handle missing area gracefully", () => {
      const educationWithoutArea = [
        {
          institution: "Test University",
          studyType: "Bachelor",
        },
      ];

      render(<EducationSection education={educationWithoutArea} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.getByText("Bachelor in ")).toBeInTheDocument();
    });

    it("should handle missing startDate gracefully", () => {
      const educationWithoutStartDate = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          endDate: "2024-05",
        },
      ];

      render(<EducationSection education={educationWithoutStartDate} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Test University")).toBeInTheDocument();
      expect(screen.queryByText("2024-05")).not.toBeInTheDocument();
    });

    it("should handle malformed education data", () => {
      const malformedEducation = [
        {
          institution: null,
          studyType: undefined,
          area: "",
          startDate: null,
          endDate: undefined,
          score: null,
          summary: undefined,
          courses: null,
        },
      ];

      render(<EducationSection education={malformedEducation} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Education")).toBeInTheDocument();
    });

    it("should handle non-string courses", () => {
      const educationWithNonStringCourses = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: [123, null, undefined, "Valid Course"],
        },
      ];

      render(<EducationSection education={educationWithNonStringCourses} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Valid Course")).toBeInTheDocument();
    });
  });

  describe("Component Structure and Styling", () => {
    it("should render with correct component structure", () => {
      const education = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={education} itemVariants={mockItemVariants} />);
      
      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
    });

    it("should include education icon in header", () => {
      const education = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={education} itemVariants={mockItemVariants} />);
      
      const icons = screen.getAllByRole("img", { hidden: true });
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should apply motion variants", () => {
      const education = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
        },
      ];

      render(<EducationSection education={education} itemVariants={mockItemVariants} />);
      
      // The motion.div should be rendered (mocked as div)
      expect(screen.getByTestId("card")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      const education = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: ["Data Structures", "Algorithms"],
        },
      ];

      render(<EducationSection education={education} itemVariants={mockItemVariants} />);
      
      // Main section heading
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Education");
      
      // Institution heading
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Test University");
      
      // Courses heading
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Relevant Coursework:");
    });

    it("should have proper external link attributes", () => {
      const educationWithUrl = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          url: "https://testuniversity.edu",
        },
      ];

      render(<EducationSection education={educationWithUrl} itemVariants={mockItemVariants} />);
      
      const link = screen.getByTestId("hero-link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Performance and Optimization", () => {
    it("should handle large numbers of education entries", () => {
      const manyEducationEntries = Array.from({ length: 50 }, (_, i) => ({
        institution: `University ${i + 1}`,
        studyType: "Bachelor",
        area: `Field ${i + 1}`,
        startDate: "2020-09",
        endDate: "2024-05",
      }));

      render(<EducationSection education={manyEducationEntries} itemVariants={mockItemVariants} />);
      expect(screen.getByText("University 1")).toBeInTheDocument();
      expect(screen.getByText("University 50")).toBeInTheDocument();
    });

    it("should handle large numbers of courses", () => {
      const educationWithManyCourses = [
        {
          institution: "Test University",
          studyType: "Bachelor",
          area: "Computer Science",
          courses: Array.from({ length: 20 }, (_, i) => `Course ${i + 1}`),
        },
      ];

      render(<EducationSection education={educationWithManyCourses} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Course 1")).toBeInTheDocument();
      expect(screen.getByText("Course 20")).toBeInTheDocument();
    });
  });

  describe("Data Type Handling", () => {
    it("should handle boolean values gracefully", () => {
      const educationWithBooleans = [
        {
          institution: true,
          studyType: false,
          area: "Computer Science",
          startDate: true,
          endDate: false,
        },
      ];

      render(<EducationSection education={educationWithBooleans} itemVariants={mockItemVariants} />);
      expect(screen.getByText("Education")).toBeInTheDocument();
    });

    it("should handle numeric values in string fields", () => {
      const educationWithNumbers = [
        {
          institution: 12345,
          studyType: 67890,
          area: "Computer Science",
          startDate: 2020,
          endDate: 2024,
        },
      ];

      render(<EducationSection education={educationWithNumbers} itemVariants={mockItemVariants} />);
      expect(screen.getByText("12345")).toBeInTheDocument();
    });
  });
});