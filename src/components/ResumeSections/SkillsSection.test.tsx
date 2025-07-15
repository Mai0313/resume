import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillsSection } from "./SkillsSection";
import "@testing-library/jest-dom";

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock HeroUI components
jest.mock("@heroui/card", () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardHeader: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardBody: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

jest.mock("@heroui/chip", () => ({
  Chip: ({ children, className, color, size, variant }: any) => (
    <span className={className} data-color={color} data-size={size} data-variant={variant}>
      {children}
    </span>
  ),
}));

describe("SkillsSection", () => {
  const mockItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const mockSkillsData = [
    {
      name: "JavaScript",
      level: "Expert",
      keywords: ["ES6", "React", "Node.js", "TypeScript"],
    },
    {
      name: "Python",
      level: "Advanced",
      keywords: ["Django", "Flask", "FastAPI", "NumPy"],
    },
    {
      name: "Database Management",
      level: "Intermediate",
      keywords: ["PostgreSQL", "MongoDB", "Redis"],
    },
  ];

  const mockSkillWithoutLevel = {
    name: "Design",
    keywords: ["Figma", "Adobe XD", "Sketch"],
  };

  const mockSkillWithoutKeywords = {
    name: "Project Management",
    level: "Advanced",
  };

  const mockSkillMinimal = {
    name: "Communication",
  };

  describe("Rendering", () => {
    it("renders skills section with title and icon", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
      expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // SVG icon
    });

    it("renders all skills with correct structure", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
      expect(screen.getByText("Database Management")).toBeInTheDocument();
    });

    it("renders skill levels when present", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Expert")).toBeInTheDocument();
      expect(screen.getByText("Advanced")).toBeInTheDocument();
      expect(screen.getByText("Intermediate")).toBeInTheDocument();
    });

    it("renders keywords as chips when present", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("ES6")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Django")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    });

    it("applies correct grid layout classes", () => {
      const { container } = render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      const gridContainer = container.querySelector(".grid.grid-cols-1.lg\\:grid-cols-2");
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("returns null when skills array is undefined", () => {
      const { container } = render(<SkillsSection skills={undefined} itemVariants={mockItemVariants} />);
      
      expect(container.firstChild).toBeNull();
    });

    it("returns null when skills array is empty", () => {
      const { container } = render(<SkillsSection skills={[]} itemVariants={mockItemVariants} />);
      
      expect(container.firstChild).toBeNull();
    });

    it("handles skill without level gracefully", () => {
      render(<SkillsSection skills={[mockSkillWithoutLevel]} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Design")).toBeInTheDocument();
      expect(screen.queryByText("Expert")).not.toBeInTheDocument();
      expect(screen.getByText("Figma")).toBeInTheDocument();
    });

    it("handles skill without keywords gracefully", () => {
      render(<SkillsSection skills={[mockSkillWithoutKeywords]} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Project Management")).toBeInTheDocument();
      expect(screen.getByText("Advanced")).toBeInTheDocument();
    });

    it("handles skill with minimal data", () => {
      render(<SkillsSection skills={[mockSkillMinimal]} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Communication")).toBeInTheDocument();
    });

    it("handles skill with empty keywords array", () => {
      const skillWithEmptyKeywords = {
        name: "Testing",
        level: "Beginner",
        keywords: [],
      };
      
      render(<SkillsSection skills={[skillWithEmptyKeywords]} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Testing")).toBeInTheDocument();
      expect(screen.getByText("Beginner")).toBeInTheDocument();
    });

    it("handles skill with null keywords", () => {
      const skillWithNullKeywords = {
        name: "Testing",
        level: "Beginner",
        keywords: null,
      };
      
      render(<SkillsSection skills={[skillWithNullKeywords]} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Testing")).toBeInTheDocument();
      expect(screen.getByText("Beginner")).toBeInTheDocument();
    });
  });

  describe("Data Handling", () => {
    it("handles skills with duplicate names by using index in key", () => {
      const duplicateSkills = [
        { name: "JavaScript", level: "Expert" },
        { name: "JavaScript", level: "Beginner" },
      ];
      
      render(<SkillsSection skills={duplicateSkills} itemVariants={mockItemVariants} />);
      
      const jsSkills = screen.getAllByText("JavaScript");
      expect(jsSkills).toHaveLength(2);
    });

    it("handles skills with no name by using 'unknown' in key", () => {
      const skillWithoutName = [
        { level: "Expert", keywords: ["React"] },
        { name: "", level: "Beginner" },
      ];
      
      const { container } = render(<SkillsSection skills={skillWithoutName} itemVariants={mockItemVariants} />);
      
      // Should still render the skills even without names
      expect(container.querySelectorAll("[class*='bg-gradient-to-br']")).toHaveLength(2);
    });

    it("handles mixed data types in skills array", () => {
      const mixedSkills = [
        mockSkillsData[0],
        null,
        undefined,
        mockSkillsData[1],
      ];
      
      render(<SkillsSection skills={mixedSkills} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Python")).toBeInTheDocument();
    });

    it("handles special characters in skill names and keywords", () => {
      const specialCharSkills = [
        {
          name: "C++/C#",
          level: "Advanced",
          keywords: ["STL", ".NET", "LINQ"],
        },
        {
          name: "SQL & NoSQL",
          keywords: ["MySQL", "MongoDB", "PostgreSQL"],
        },
      ];
      
      render(<SkillsSection skills={specialCharSkills} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("C++/C#")).toBeInTheDocument();
      expect(screen.getByText("SQL & NoSQL")).toBeInTheDocument();
      expect(screen.getByText(".NET")).toBeInTheDocument();
    });
  });

  describe("Component Props", () => {
    it("passes itemVariants to motion.div", () => {
      const customVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      };
      
      render(<SkillsSection skills={mockSkillsData} itemVariants={customVariants} />);
      
      // Component should render without errors with custom variants
      expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
    });

    it("handles undefined itemVariants gracefully", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={undefined} />);
      
      expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
    });

    it("handles null itemVariants gracefully", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={null} />);
      
      expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
    });
  });

  describe("CSS Classes and Styling", () => {
    it("applies correct CSS classes to skill containers", () => {
      const { container } = render(<SkillsSection skills={[mockSkillsData[0]]} itemVariants={mockItemVariants} />);
      
      const skillContainer = container.querySelector("[class*='bg-gradient-to-br']");
      expect(skillContainer).toHaveClass("rounded-xl", "p-6", "hover:shadow-lg");
    });

    it("applies correct CSS classes to skill level badges", () => {
      const { container } = render(<SkillsSection skills={[mockSkillsData[0]]} itemVariants={mockItemVariants} />);
      
      const levelBadge = screen.getByText("Expert");
      expect(levelBadge).toHaveClass("px-3", "py-1", "text-sm", "font-medium", "rounded-full");
    });

    it("applies correct props to Chip components", () => {
      render(<SkillsSection skills={[mockSkillsData[0]]} itemVariants={mockItemVariants} />);
      
      const chip = screen.getByText("ES6");
      expect(chip).toHaveAttribute("data-color", "secondary");
      expect(chip).toHaveAttribute("data-size", "sm");
      expect(chip).toHaveAttribute("data-variant", "flat");
    });
  });

  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Skills & Expertise");
      
      const subheadings = screen.getAllByRole("heading", { level: 3 });
      expect(subheadings).toHaveLength(3);
    });

    it("provides accessible text content for screen readers", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
      expect(screen.getByText("Expert")).toBeInTheDocument();
      expect(screen.getByText("ES6")).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("handles large number of skills efficiently", () => {
      const largeSkillsArray = Array.from({ length: 50 }, (_, i) => ({
        name: `Skill ${i + 1}`,
        level: i % 3 === 0 ? "Expert" : i % 3 === 1 ? "Advanced" : "Intermediate",
        keywords: [`Keyword${i}A`, `Keyword${i}B`, `Keyword${i}C`],
      }));
      
      render(<SkillsSection skills={largeSkillsArray} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Skill 1")).toBeInTheDocument();
      expect(screen.getByText("Skill 50")).toBeInTheDocument();
    });

    it("handles skills with many keywords efficiently", () => {
      const skillWithManyKeywords = [
        {
          name: "Web Development",
          level: "Expert",
          keywords: Array.from({ length: 20 }, (_, i) => `Technology${i + 1}`),
        },
      ];
      
      render(<SkillsSection skills={skillWithManyKeywords} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Web Development")).toBeInTheDocument();
      expect(screen.getByText("Technology1")).toBeInTheDocument();
      expect(screen.getByText("Technology20")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("renders correctly with real-world skills data structure", () => {
      const realWorldSkills = [
        {
          name: "Frontend Development",
          level: "Expert",
          keywords: ["React", "Vue.js", "Angular", "HTML5", "CSS3", "JavaScript", "TypeScript"],
        },
        {
          name: "Backend Development",
          level: "Advanced",
          keywords: ["Node.js", "Python", "Java", "REST APIs", "GraphQL", "Microservices"],
        },
        {
          name: "DevOps & Cloud",
          level: "Intermediate",
          keywords: ["Docker", "Kubernetes", "AWS", "Azure", "CI/CD", "Jenkins"],
        },
        {
          name: "Database Technologies",
          level: "Advanced",
          keywords: ["PostgreSQL", "MongoDB", "Redis", "ElasticSearch"],
        },
      ];
      
      render(<SkillsSection skills={realWorldSkills} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
      expect(screen.getByText("Backend Development")).toBeInTheDocument();
      expect(screen.getByText("DevOps & Cloud")).toBeInTheDocument();
      expect(screen.getByText("Database Technologies")).toBeInTheDocument();
      
      // Check that keywords are rendered
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Docker")).toBeInTheDocument();
      expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    });
  });

  describe("Key Generation", () => {
    it("generates unique keys for skills with same name", () => {
      const skillsWithSameName = [
        { name: "JavaScript", level: "Expert", keywords: ["React"] },
        { name: "JavaScript", level: "Beginner", keywords: ["Vanilla"] },
      ];
      
      const { container } = render(<SkillsSection skills={skillsWithSameName} itemVariants={mockItemVariants} />);
      
      const skillContainers = container.querySelectorAll("[class*='bg-gradient-to-br']");
      expect(skillContainers).toHaveLength(2);
    });

    it("generates keys for skills without names", () => {
      const skillsWithoutNames = [
        { level: "Expert", keywords: ["React"] },
        { level: "Beginner" },
      ];
      
      const { container } = render(<SkillsSection skills={skillsWithoutNames} itemVariants={mockItemVariants} />);
      
      const skillContainers = container.querySelectorAll("[class*='bg-gradient-to-br']");
      expect(skillContainers).toHaveLength(2);
    });
  });

  describe("Conditional Rendering", () => {
    it("does not render level badge when level is missing", () => {
      const skillWithoutLevel = [{ name: "Design", keywords: ["Figma"] }];
      
      render(<SkillsSection skills={skillWithoutLevel} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Design")).toBeInTheDocument();
      expect(screen.queryByText("Expert")).not.toBeInTheDocument();
      expect(screen.queryByText("Advanced")).not.toBeInTheDocument();
    });

    it("does not render keywords section when keywords are missing", () => {
      const skillWithoutKeywords = [{ name: "Management", level: "Advanced" }];
      
      const { container } = render(<SkillsSection skills={skillWithoutKeywords} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Management")).toBeInTheDocument();
      expect(screen.getByText("Advanced")).toBeInTheDocument();
      expect(container.querySelector(".flex.flex-wrap.gap-2")).not.toBeInTheDocument();
    });

    it("does not render keywords section when keywords array is empty", () => {
      const skillWithEmptyKeywords = [{ name: "Testing", level: "Beginner", keywords: [] }];
      
      const { container } = render(<SkillsSection skills={skillWithEmptyKeywords} itemVariants={mockItemVariants} />);
      
      expect(screen.getByText("Testing")).toBeInTheDocument();
      expect(container.querySelector(".flex.flex-wrap.gap-2")).not.toBeInTheDocument();
    });
  });

  describe("Animation Integration", () => {
    it("applies motion.div with correct key and variants", () => {
      const { container } = render(<SkillsSection skills={mockSkillsData} itemVariants={mockItemVariants} />);
      
      const motionDiv = container.querySelector("[data-key='skills']");
      expect(motionDiv).toBeInTheDocument();
    });

    it("renders without errors when itemVariants is empty object", () => {
      render(<SkillsSection skills={mockSkillsData} itemVariants={{}} />);
      
      expect(screen.getByText("Skills & Expertise")).toBeInTheDocument();
    });
  });
});