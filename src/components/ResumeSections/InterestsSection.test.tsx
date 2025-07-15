import React from "react";
import { render, screen } from "@testing-library/react";
import { InterestsSection } from "./InterestsSection";

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
  CardHeader: ({ children, className }: any) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  ),
  CardBody: ({ children }: any) => (
    <div data-testid="card-body">{children}</div>
  ),
}));

jest.mock("@heroui/chip", () => ({
  Chip: ({ children, className, color, size, variant }: any) => (
    <span
      className={className}
      data-testid="chip"
      data-color={color}
      data-size={size}
      data-variant={variant}
    >
      {children}
    </span>
  ),
}));

describe("InterestsSection", () => {
  const mockItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  describe("Empty/Null States", () => {
    it("returns null when interests is undefined", () => {
      const { container } = render(
        <InterestsSection interests={undefined} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("returns null when interests is null", () => {
      const { container } = render(
        <InterestsSection interests={null as any} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });

    it("returns null when interests is an empty array", () => {
      const { container } = render(
        <InterestsSection interests={[]} itemVariants={mockItemVariants} />
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Basic Rendering", () => {
    it("renders the section with header when interests are provided", () => {
      const interests = [{ name: "Machine Learning" }];
      
      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByTestId("card")).toBeInTheDocument();
      expect(screen.getByTestId("card-header")).toBeInTheDocument();
      expect(screen.getByTestId("card-body")).toBeInTheDocument();
      expect(screen.getByText("Research Interests")).toBeInTheDocument();
    });

    it("renders the correct number of interest items", () => {
      const interests = [
        { name: "Machine Learning" },
        { name: "Data Science" },
        { name: "Computer Vision" },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getAllByText(/Machine Learning|Data Science|Computer Vision/)).toHaveLength(3);
    });

    it("applies motion variants to the wrapper div", () => {
      const interests = [{ name: "Machine Learning" }];
      
      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const motionDiv = container.querySelector('[key="interests"]');
      expect(motionDiv).toBeInTheDocument();
    });
  });

  describe("Interest Item Rendering", () => {
    it("renders interest name correctly", () => {
      const interests = [{ name: "Artificial Intelligence" }];
      
      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Artificial Intelligence")).toBeInTheDocument();
    });

    it("renders interest with keywords", () => {
      const interests = [
        {
          name: "Machine Learning",
          keywords: ["Neural Networks", "Deep Learning", "NLP"],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Machine Learning")).toBeInTheDocument();
      expect(screen.getByText("Research Areas:")).toBeInTheDocument();
      expect(screen.getByText("Neural Networks")).toBeInTheDocument();
      expect(screen.getByText("Deep Learning")).toBeInTheDocument();
      expect(screen.getByText("NLP")).toBeInTheDocument();
    });

    it("renders interest with summary", () => {
      const interests = [
        {
          name: "Data Science",
          summary: "Focusing on advanced statistical methods and predictive modeling.",
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Data Science")).toBeInTheDocument();
      expect(screen.getByText("Focusing on advanced statistical methods and predictive modeling.")).toBeInTheDocument();
    });

    it("renders interest with both keywords and summary", () => {
      const interests = [
        {
          name: "Computer Vision",
          keywords: ["Image Processing", "Object Detection"],
          summary: "Research in visual perception and image analysis.",
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Computer Vision")).toBeInTheDocument();
      expect(screen.getByText("Research Areas:")).toBeInTheDocument();
      expect(screen.getByText("Image Processing")).toBeInTheDocument();
      expect(screen.getByText("Object Detection")).toBeInTheDocument();
      expect(screen.getByText("Research in visual perception and image analysis.")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles interest with empty keywords array", () => {
      const interests = [
        {
          name: "Quantum Computing",
          keywords: [],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Quantum Computing")).toBeInTheDocument();
      expect(screen.queryByText("Research Areas:")).not.toBeInTheDocument();
    });

    it("handles interest with null keywords", () => {
      const interests = [
        {
          name: "Blockchain",
          keywords: null,
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Blockchain")).toBeInTheDocument();
      expect(screen.queryByText("Research Areas:")).not.toBeInTheDocument();
    });

    it("handles interest with undefined keywords", () => {
      const interests = [
        {
          name: "Robotics",
          keywords: undefined,
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Robotics")).toBeInTheDocument();
      expect(screen.queryByText("Research Areas:")).not.toBeInTheDocument();
    });

    it("handles interest with empty summary", () => {
      const interests = [
        {
          name: "Cybersecurity",
          summary: "",
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Cybersecurity")).toBeInTheDocument();
      expect(screen.queryByText("")).not.toBeInTheDocument();
    });

    it("handles interest with null summary", () => {
      const interests = [
        {
          name: "IoT",
          summary: null,
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("IoT")).toBeInTheDocument();
    });

    it("handles interest with missing name", () => {
      const interests = [
        {
          keywords: ["Test", "Example"],
          summary: "A test interest without a name",
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Research Areas:")).toBeInTheDocument();
      expect(screen.getByText("Test")).toBeInTheDocument();
      expect(screen.getByText("Example")).toBeInTheDocument();
    });

    it("handles interest with undefined name", () => {
      const interests = [
        {
          name: undefined,
          keywords: ["Anonymous", "Research"],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Anonymous")).toBeInTheDocument();
      expect(screen.getByText("Research")).toBeInTheDocument();
    });
  });

  describe("Key Generation", () => {
    it("generates unique keys for interests with names", () => {
      const interests = [
        { name: "AI" },
        { name: "ML" },
        { name: "AI" }, // Duplicate name
      ];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const interestElements = container.querySelectorAll('[class*="bg-gradient-to-br"][class*="from-gray-50"]');
      expect(interestElements).toHaveLength(3);
    });

    it("generates keys for interests without names", () => {
      const interests = [
        { keywords: ["Test1"] },
        { keywords: ["Test2"] },
        { summary: "No name interest" },
      ];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const interestElements = container.querySelectorAll('[class*="bg-gradient-to-br"][class*="from-gray-50"]');
      expect(interestElements).toHaveLength(3);
    });
  });

  describe("Chip Component Integration", () => {
    it("renders chips with correct props", () => {
      const interests = [
        {
          name: "Software Engineering",
          keywords: ["React", "TypeScript", "Node.js"],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const chips = screen.getAllByTestId("chip");
      expect(chips).toHaveLength(3);
      
      chips.forEach((chip) => {
        expect(chip).toHaveAttribute("data-color", "primary");
        expect(chip).toHaveAttribute("data-size", "sm");
        expect(chip).toHaveAttribute("data-variant", "flat");
      });
    });

    it("renders chips with correct CSS classes", () => {
      const interests = [
        {
          name: "Web Development",
          keywords: ["JavaScript"],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const chip = screen.getByTestId("chip");
      expect(chip).toHaveClass("bg-cyan-100");
      expect(chip).toHaveClass("dark:bg-cyan-900/30");
      expect(chip).toHaveClass("text-cyan-800");
      expect(chip).toHaveClass("dark:text-cyan-200");
    });
  });

  describe("Multiple Interests", () => {
    it("renders multiple complex interests correctly", () => {
      const interests = [
        {
          name: "Machine Learning",
          keywords: ["TensorFlow", "PyTorch", "Scikit-learn"],
          summary: "Advanced machine learning algorithms and frameworks.",
        },
        {
          name: "Data Visualization",
          keywords: ["D3.js", "Matplotlib", "Tableau"],
          summary: "Creating meaningful visual representations of data.",
        },
        {
          name: "Cloud Computing",
          keywords: ["AWS", "Azure", "GCP"],
        },
        {
          name: "Database Systems",
          summary: "Design and optimization of database architectures.",
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      // Check all interest names are present
      expect(screen.getByText("Machine Learning")).toBeInTheDocument();
      expect(screen.getByText("Data Visualization")).toBeInTheDocument();
      expect(screen.getByText("Cloud Computing")).toBeInTheDocument();
      expect(screen.getByText("Database Systems")).toBeInTheDocument();

      // Check keywords are present
      expect(screen.getByText("TensorFlow")).toBeInTheDocument();
      expect(screen.getByText("D3.js")).toBeInTheDocument();
      expect(screen.getByText("AWS")).toBeInTheDocument();

      // Check summaries are present
      expect(screen.getByText("Advanced machine learning algorithms and frameworks.")).toBeInTheDocument();
      expect(screen.getByText("Creating meaningful visual representations of data.")).toBeInTheDocument();
      expect(screen.getByText("Design and optimization of database architectures.")).toBeInTheDocument();

      // Check Research Areas labels
      expect(screen.getAllByText("Research Areas:")).toHaveLength(3);
    });
  });

  describe("Accessibility", () => {
    it("uses proper heading hierarchy", () => {
      const interests = [
        {
          name: "Accessibility Research",
          keywords: ["WCAG", "Screen Readers"],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const mainHeading = screen.getByRole("heading", { level: 2 });
      expect(mainHeading).toHaveTextContent("Research Interests");

      const interestHeading = screen.getByRole("heading", { level: 3 });
      expect(interestHeading).toHaveTextContent("Accessibility Research");

      const keywordsHeading = screen.getByRole("heading", { level: 4 });
      expect(keywordsHeading).toHaveTextContent("Research Areas:");
    });
  });

  describe("SVG Icon Rendering", () => {
    it("renders header SVG icon correctly", () => {
      const interests = [{ name: "Test Interest" }];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const headerSvg = container.querySelector('svg.w-5.h-5');
      expect(headerSvg).toBeInTheDocument();
      expect(headerSvg).toHaveAttribute("viewBox", "0 0 24 24");
      expect(headerSvg).toHaveClass("w-5", "h-5", "text-white");
    });

    it("renders interest item SVG icons correctly", () => {
      const interests = [
        { name: "Interest 1" },
        { name: "Interest 2" },
      ];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const interestSvgs = container.querySelectorAll('svg.w-6.h-6');
      expect(interestSvgs).toHaveLength(2);
      
      interestSvgs.forEach((svg) => {
        expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
        expect(svg).toHaveClass("w-6", "h-6", "text-white");
      });
    });
  });

  describe("CSS Classes and Styling", () => {
    it("applies correct CSS classes to main card", () => {
      const interests = [{ name: "Test" }];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const card = screen.getByTestId("card");
      expect(card).toHaveClass("overflow-hidden");
    });

    it("applies correct CSS classes to card header", () => {
      const interests = [{ name: "Test" }];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const cardHeader = screen.getByTestId("card-header");
      expect(cardHeader).toHaveClass("pb-4");
    });

    it("applies hover and transition classes to interest items", () => {
      const interests = [{ name: "Test Interest" }];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const interestItem = container.querySelector('[class*="hover:shadow-lg"]');
      expect(interestItem).toBeInTheDocument();
      expect(interestItem).toHaveClass("transition-all", "duration-300", "hover:scale-[1.02]");
    });
  });

  describe("Responsive Design", () => {
    it("applies responsive grid classes", () => {
      const interests = [{ name: "Test" }];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      const gridContainer = container.querySelector('[class*="grid-cols-1"]');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass("grid", "grid-cols-1", "lg:grid-cols-2", "gap-6");
    });
  });

  describe("Keywords Edge Cases", () => {
    it("handles empty string keywords", () => {
      const interests = [
        {
          name: "Test Interest",
          keywords: ["", "Valid Keyword", ""],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("Valid Keyword")).toBeInTheDocument();
      const chips = screen.getAllByTestId("chip");
      expect(chips).toHaveLength(3); // All keywords render, even empty ones
    });

    it("handles non-string keywords", () => {
      const interests = [
        {
          name: "Test Interest",
          keywords: [123, "String Keyword", null, undefined],
        },
      ];

      render(
        <InterestsSection interests={interests} itemVariants={mockItemVariants} />
      );

      expect(screen.getByText("String Keyword")).toBeInTheDocument();
      const chips = screen.getAllByTestId("chip");
      expect(chips).toHaveLength(4); // All keywords render
    });
  });

  describe("Component Props", () => {
    it("passes itemVariants to motion.div", () => {
      const customVariants = {
        hidden: { opacity: 0, x: -100 },
        show: { opacity: 1, x: 0 },
      };
      const interests = [{ name: "Test" }];

      const { container } = render(
        <InterestsSection interests={interests} itemVariants={customVariants} />
      );

      const motionDiv = container.querySelector('[key="interests"]');
      expect(motionDiv).toBeInTheDocument();
    });

    it("handles undefined itemVariants", () => {
      const interests = [{ name: "Test" }];

      render(
        <InterestsSection interests={interests} itemVariants={undefined as any} />
      );

      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });
});