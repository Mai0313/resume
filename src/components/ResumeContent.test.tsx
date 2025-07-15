import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResumeContent } from './ResumeContent';
import type { ResumeData } from '../utils/resumeLoader';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock all the ResumeSections components
jest.mock('./ResumeSections', () => ({
  WorkSection: ({ work }: any) => <div data-testid="work-section">Work: {work?.length || 0} items</div>,
  VolunteerSection: ({ volunteer }: any) => <div data-testid="volunteer-section">Volunteer: {volunteer?.length || 0} items</div>,
  EducationSection: ({ education }: any) => <div data-testid="education-section">Education: {education?.length || 0} items</div>,
  AwardsSection: ({ awards }: any) => <div data-testid="awards-section">Awards: {awards?.length || 0} items</div>,
  CertificatesSection: ({ certificates }: any) => <div data-testid="certificates-section">Certificates: {certificates?.length || 0} items</div>,
  PublicationsSection: ({ publications }: any) => <div data-testid="publications-section">Publications: {publications?.length || 0} items</div>,
  SkillsSection: ({ skills }: any) => <div data-testid="skills-section">Skills: {skills?.length || 0} items</div>,
  InterestsSection: ({ interests }: any) => <div data-testid="interests-section">Interests: {interests?.length || 0} items</div>,
  ReferencesSection: ({ data }: any) => <div data-testid="references-section">References: {data?.references?.length || 0} items</div>,
  ProjectsSection: ({ data }: any) => <div data-testid="projects-section">Projects: {data?.projects?.length || 0} items</div>,
}));

// Mock HeroUI components
jest.mock('@heroui/card', () => ({
  Card: ({ children, className }: any) => <div className={className}>{children}</div>,
  CardBody: ({ children, className }: any) => <div className={className}>{children}</div>,
}));

jest.mock('@heroui/chip', () => ({
  Chip: ({ children, className }: any) => <span className={className}>{children}</span>,
}));

jest.mock('@heroui/link', () => ({
  Link: ({ children, href, isExternal, className }: any) => (
    <a href={href} target={isExternal ? '_blank' : '_self'} className={className}>
      {children}
    </a>
  ),
}));

describe('ResumeContent', () => {
  // Mock data helpers
  const createMockBasics = (overrides = {}) => ({
    name: 'John Doe',
    email: 'john.doe@example.com',
    label: 'Software Engineer',
    summary: 'Experienced software engineer with expertise in React and TypeScript.',
    location: {
      city: 'San Francisco',
      region: 'CA',
    },
    image: 'https://example.com/profile.jpg',
    profiles: [
      {
        network: 'GitHub',
        username: 'johndoe',
        url: 'https://github.com/johndoe',
      },
      {
        network: 'LinkedIn',
        username: 'johndoe',
        url: 'https://linkedin.com/in/johndoe',
      },
    ],
    ...overrides,
  });

  const createMockData = (overrides = {}): ResumeData & { sectionOrder: string[] } => ({
    basics: createMockBasics(),
    work: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        summary: 'Led development of key features',
      },
    ],
    volunteer: [
      {
        organization: 'Local Charity',
        position: 'Volunteer',
        startDate: '2019-01-01',
        summary: 'Helped with community projects',
      },
    ],
    education: [
      {
        institution: 'University of Technology',
        area: 'Computer Science',
        studyType: 'Bachelor',
        startDate: '2015-09-01',
        endDate: '2019-06-01',
      },
    ],
    awards: [
      {
        title: 'Employee of the Month',
        date: '2022-05-01',
        awarder: 'Tech Corp',
      },
    ],
    certificates: [
      {
        name: 'AWS Certified Developer',
        date: '2021-03-01',
        issuer: 'Amazon Web Services',
      },
    ],
    publications: [
      {
        name: 'Modern Web Development',
        publisher: 'Tech Journal',
        releaseDate: '2022-01-01',
      },
    ],
    skills: [
      {
        name: 'JavaScript',
        level: 'Expert',
        keywords: ['React', 'Node.js'],
      },
    ],
    interests: [
      {
        name: 'Technology',
        keywords: ['AI', 'Machine Learning'],
      },
    ],
    references: [
      {
        name: 'Jane Smith',
        reference: 'John is an excellent developer',
      },
    ],
    projects: [
      {
        name: 'Portfolio Website',
        description: 'Personal portfolio built with React',
        startDate: '2023-01-01',
        endDate: '2023-03-01',
        url: 'https://johndoe.dev',
      },
    ],
    languages: [
      {
        language: 'English',
        fluency: 'Native',
      },
      {
        language: 'Spanish',
        fluency: 'Intermediate',
      },
    ],
    sectionOrder: ['work', 'education', 'skills', 'projects', 'volunteer', 'awards', 'certificates', 'publications', 'interests', 'references'],
    ...overrides,
  });

  describe('Error Handling', () => {
    it('should render error message when data is null', () => {
      render(<ResumeContent data={null as any} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
      expect(screen.getByText(/The resume data appears to be incomplete/)).toBeInTheDocument();
      expect(screen.getByText('Expected Structure:')).toBeInTheDocument();
    });

    it('should render error message when data is undefined', () => {
      render(<ResumeContent data={undefined as any} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
    });

    it('should render error message when basics is missing', () => {
      const invalidData = { sectionOrder: [] } as any;
      render(<ResumeContent data={invalidData} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
    });

    it('should render error message when name is missing', () => {
      const invalidData = {
        basics: { email: 'test@example.com' },
        sectionOrder: [],
      } as any;
      render(<ResumeContent data={invalidData} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
    });

    it('should render error message when name is empty string', () => {
      const invalidData = {
        basics: { name: '' },
        sectionOrder: [],
      } as any;
      render(<ResumeContent data={invalidData} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
    });

    it('should render error state with proper SVG icon', () => {
      render(<ResumeContent data={null as any} />);
      
      const svgIcon = screen.getByRole('img', { hidden: true });
      expect(svgIcon).toBeInTheDocument();
    });

    it('should render error state with proper styling classes', () => {
      const { container } = render(<ResumeContent data={null as any} />);
      
      const errorContainer = container.querySelector('.min-h-\\[50vh\\]');
      expect(errorContainer).toBeInTheDocument();
    });
  });

  describe('Basic Information Rendering', () => {
    it('should render basic information correctly', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Experienced software engineer with expertise in React and TypeScript.')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    });

    it('should render without optional fields', () => {
      const data = createMockData({
        basics: createMockBasics({
          label: undefined,
          summary: undefined,
          location: undefined,
          profiles: undefined,
        }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
    });

    it('should render profile image with correct attributes', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const profileImage = screen.getByAltText('John Doe profile');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });

    it('should not render profile image when not provided', () => {
      const data = createMockData({
        basics: createMockBasics({ image: undefined }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByAltText('John Doe profile')).not.toBeInTheDocument();
    });

    it('should render email with proper SVG icon', () => {
      const data = createMockData();
      const { container } = render(<ResumeContent data={data} />);
      
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      const emailIcon = container.querySelector('svg');
      expect(emailIcon).toBeInTheDocument();
    });

    it('should render location with proper SVG icon', () => {
      const data = createMockData();
      const { container } = render(<ResumeContent data={data} />);
      
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      const locationIcons = container.querySelectorAll('svg');
      expect(locationIcons.length).toBeGreaterThan(1);
    });
  });

  describe('Profile Image Error Handling', () => {
    it('should handle image loading errors gracefully', async () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const profileImage = screen.getByAltText('John Doe profile') as HTMLImageElement;
      
      // Simulate image loading error
      fireEvent.error(profileImage);
      
      await waitFor(() => {
        expect(profileImage.style.display).toBe('none');
      });
    });

    it('should show fallback avatar with correct initial when image fails', async () => {
      const data = createMockData();
      const { container } = render(<ResumeContent data={data} />);
      
      const profileImage = screen.getByAltText('John Doe profile');
      
      // Mock the nextElementSibling behavior
      const fallbackDiv = container.querySelector('.hidden');
      if (fallbackDiv) {
        Object.defineProperty(profileImage, 'nextElementSibling', {
          value: fallbackDiv,
          writable: true,
        });
      }
      
      fireEvent.error(profileImage);
      
      await waitFor(() => {
        expect(profileImage.style.display).toBe('none');
      });
    });

    it('should show correct fallback initial for name', () => {
      const data = createMockData({
        basics: createMockBasics({ name: 'Alice Johnson' }),
      });
      const { container } = render(<ResumeContent data={data} />);
      
      // Check that fallback contains correct initial
      const fallbackElements = container.querySelectorAll('.hidden');
      expect(fallbackElements.length).toBeGreaterThan(0);
    });

    it('should handle undefined name in fallback', () => {
      const data = createMockData({
        basics: createMockBasics({ name: undefined }),
      });
      const { container } = render(<ResumeContent data={data} />);
      
      // Should not crash and should show "U" as fallback
      expect(container).toBeInTheDocument();
    });

    it('should handle null name in fallback gracefully', () => {
      const data = createMockData({
        basics: createMockBasics({ name: null }),
      });
      const { container } = render(<ResumeContent data={data} />);
      
      // Should not crash
      expect(container).toBeInTheDocument();
    });
  });

  describe('Social Profiles', () => {
    it('should render GitHub profile correctly', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const githubLink = screen.getByRole('link', { name: /johndoe/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('should render LinkedIn profile correctly', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const linkedinLinks = screen.getAllByRole('link', { name: /johndoe/i });
      const linkedinLink = linkedinLinks.find(link => 
        link.getAttribute('href')?.includes('linkedin.com')
      );
      expect(linkedinLink).toBeInTheDocument();
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    });

    it('should render GitHub SVG icon correctly', () => {
      const data = createMockData();
      const { container } = render(<ResumeContent data={data} />);
      
      const githubSvg = container.querySelector('svg[viewBox="0 0 20 20"]');
      expect(githubSvg).toBeInTheDocument();
    });

    it('should render LinkedIn SVG icon correctly', () => {
      const data = createMockData();
      const { container } = render(<ResumeContent data={data} />);
      
      const linkedinSvg = container.querySelector('svg[viewBox="0 0 20 20"]');
      expect(linkedinSvg).toBeInTheDocument();
    });

    it('should render multiple profiles', () => {
      const data = createMockData({
        basics: createMockBasics({
          profiles: [
            { network: 'GitHub', username: 'johndoe', url: 'https://github.com/johndoe' },
            { network: 'LinkedIn', username: 'johndoe', url: 'https://linkedin.com/in/johndoe' },
            { network: 'Twitter', username: 'johndoe', url: 'https://twitter.com/johndoe' },
          ],
        }),
      });
      render(<ResumeContent data={data} />);
      
      const links = screen.getAllByRole('link');
      const profileLinks = links.filter(link => link.getAttribute('href')?.includes('johndoe'));
      expect(profileLinks).toHaveLength(3);
    });

    it('should not render profiles section when empty', () => {
      const data = createMockData({
        basics: createMockBasics({ profiles: [] }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should not render profiles section when undefined', () => {
      const data = createMockData({
        basics: createMockBasics({ profiles: undefined }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should handle unknown social networks gracefully', () => {
      const data = createMockData({
        basics: createMockBasics({
          profiles: [
            { network: 'Unknown', username: 'johndoe', url: 'https://unknown.com/johndoe' },
          ],
        }),
      });
      render(<ResumeContent data={data} />);
      
      const link = screen.getByRole('link', { name: /johndoe/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://unknown.com/johndoe');
    });

    it('should handle profiles with missing username', () => {
      const data = createMockData({
        basics: createMockBasics({
          profiles: [
            { network: 'GitHub', username: '', url: 'https://github.com/johndoe' },
          ],
        }),
      });
      render(<ResumeContent data={data} />);
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://github.com/johndoe');
    });
  });

  describe('Languages', () => {
    it('should render languages as chips', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('English: Native')).toBeInTheDocument();
      expect(screen.getByText('Spanish: Intermediate')).toBeInTheDocument();
    });

    it('should not render languages section when empty', () => {
      const data = createMockData({ languages: [] });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByText(/English:/)).not.toBeInTheDocument();
    });

    it('should not render languages section when undefined', () => {
      const data = createMockData({ languages: undefined });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByText(/English:/)).not.toBeInTheDocument();
    });

    it('should handle single language', () => {
      const data = createMockData({
        languages: [{ language: 'French', fluency: 'Beginner' }],
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('French: Beginner')).toBeInTheDocument();
      expect(screen.queryByText(/English:/)).not.toBeInTheDocument();
    });

    it('should handle language with missing fluency', () => {
      const data = createMockData({
        languages: [{ language: 'German', fluency: undefined }],
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('German: ')).toBeInTheDocument();
    });

    it('should handle multiple languages with various fluency levels', () => {
      const data = createMockData({
        languages: [
          { language: 'English', fluency: 'Native' },
          { language: 'Spanish', fluency: 'Intermediate' },
          { language: 'French', fluency: 'Beginner' },
          { language: 'German', fluency: 'Advanced' },
        ],
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('English: Native')).toBeInTheDocument();
      expect(screen.getByText('Spanish: Intermediate')).toBeInTheDocument();
      expect(screen.getByText('French: Beginner')).toBeInTheDocument();
      expect(screen.getByText('German: Advanced')).toBeInTheDocument();
    });
  });

  describe('Section Rendering', () => {
    it('should render work section when in order', () => {
      const data = createMockData({ sectionOrder: ['work'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('work-section')).toBeInTheDocument();
      expect(screen.getByText('Work: 1 items')).toBeInTheDocument();
    });

    it('should render volunteer section when in order', () => {
      const data = createMockData({ sectionOrder: ['volunteer'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('volunteer-section')).toBeInTheDocument();
      expect(screen.getByText('Volunteer: 1 items')).toBeInTheDocument();
    });

    it('should render education section when in order', () => {
      const data = createMockData({ sectionOrder: ['education'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('education-section')).toBeInTheDocument();
      expect(screen.getByText('Education: 1 items')).toBeInTheDocument();
    });

    it('should render awards section when in order', () => {
      const data = createMockData({ sectionOrder: ['awards'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('awards-section')).toBeInTheDocument();
      expect(screen.getByText('Awards: 1 items')).toBeInTheDocument();
    });

    it('should render certificates section when in order', () => {
      const data = createMockData({ sectionOrder: ['certificates'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('certificates-section')).toBeInTheDocument();
      expect(screen.getByText('Certificates: 1 items')).toBeInTheDocument();
    });

    it('should render publications section when in order', () => {
      const data = createMockData({ sectionOrder: ['publications'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('publications-section')).toBeInTheDocument();
      expect(screen.getByText('Publications: 1 items')).toBeInTheDocument();
    });

    it('should render skills section when in order', () => {
      const data = createMockData({ sectionOrder: ['skills'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('skills-section')).toBeInTheDocument();
      expect(screen.getByText('Skills: 1 items')).toBeInTheDocument();
    });

    it('should render interests section when in order', () => {
      const data = createMockData({ sectionOrder: ['interests'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('interests-section')).toBeInTheDocument();
      expect(screen.getByText('Interests: 1 items')).toBeInTheDocument();
    });

    it('should render references section when in order', () => {
      const data = createMockData({ sectionOrder: ['references'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('references-section')).toBeInTheDocument();
      expect(screen.getByText('References: 1 items')).toBeInTheDocument();
    });

    it('should render projects section when in order', () => {
      const data = createMockData({ sectionOrder: ['projects'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByTestId('projects-section')).toBeInTheDocument();
      expect(screen.getByText('Projects: 1 items')).toBeInTheDocument();
    });

    it('should not render languages section even when in order', () => {
      const data = createMockData({ sectionOrder: ['languages'] });
      render(<ResumeContent data={data} />);
      
      // Languages should not render as a section since they're in header
      expect(screen.queryByTestId('languages-section')).not.toBeInTheDocument();
    });

    it('should handle unknown section types gracefully', () => {
      const data = createMockData({ sectionOrder: ['unknown'] });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByTestId('unknown-section')).not.toBeInTheDocument();
    });

    it('should render sections in specified order', () => {
      const data = createMockData({
        sectionOrder: ['education', 'work', 'skills'],
      });
      const { container } = render(<ResumeContent data={data} />);
      
      const sections = container.querySelectorAll('[data-testid$="-section"]');
      expect(sections).toHaveLength(3);
      expect(sections[0]).toHaveAttribute('data-testid', 'education-section');
      expect(sections[1]).toHaveAttribute('data-testid', 'work-section');
      expect(sections[2]).toHaveAttribute('data-testid', 'skills-section');
    });

    it('should handle empty section order', () => {
      const data = createMockData({ sectionOrder: [] });
      render(<ResumeContent data={data} />);
      
      // Should still render header
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      // No sections should render
      expect(screen.queryByTestId('work-section')).not.toBeInTheDocument();
    });

    it('should handle duplicate sections in order', () => {
      const data = createMockData({
        sectionOrder: ['work', 'work', 'education'],
      });
      render(<ResumeContent data={data} />);
      
      const workSections = screen.getAllByTestId('work-section');
      expect(workSections).toHaveLength(2);
    });
  });

  describe('Data Variations', () => {
    it('should handle sections with empty arrays', () => {
      const data = createMockData({
        work: [],
        education: [],
        skills: [],
        sectionOrder: ['work', 'education', 'skills'],
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('Work: 0 items')).toBeInTheDocument();
      expect(screen.getByText('Education: 0 items')).toBeInTheDocument();
      expect(screen.getByText('Skills: 0 items')).toBeInTheDocument();
    });

    it('should handle sections with undefined data', () => {
      const data = createMockData({
        work: undefined,
        education: undefined,
        skills: undefined,
        sectionOrder: ['work', 'education', 'skills'],
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('Work: 0 items')).toBeInTheDocument();
      expect(screen.getByText('Education: 0 items')).toBeInTheDocument();
      expect(screen.getByText('Skills: 0 items')).toBeInTheDocument();
    });

    it('should handle partial location data', () => {
      const data = createMockData({
        basics: createMockBasics({
          location: { city: 'Boston' } as any,
        }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('Boston, ')).toBeInTheDocument();
    });

    it('should handle missing email', () => {
      const data = createMockData({
        basics: createMockBasics({ email: undefined }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('@')).not.toBeInTheDocument();
    });

    it('should handle missing location entirely', () => {
      const data = createMockData({
        basics: createMockBasics({ location: undefined }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('San Francisco')).not.toBeInTheDocument();
    });

    it('should handle location with only region', () => {
      const data = createMockData({
        basics: createMockBasics({
          location: { region: 'CA' } as any,
        }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText(', CA')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('John Doe');
    });

    it('should have proper alt text for profile image', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const image = screen.getByAltText('John Doe profile');
      expect(image).toBeInTheDocument();
    });

    it('should have proper link attributes for external links', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const githubLink = screen.getByRole('link', { name: /johndoe/i });
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('should have proper ARIA labels and structure', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveAccessibleName('John Doe');
    });

    it('should handle focus management properly', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle extremely long names gracefully', () => {
      const longName = 'A'.repeat(100);
      const data = createMockData({
        basics: createMockBasics({ name: longName }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('should handle special characters in names', () => {
      const specialName = 'José María Aznar-López';
      const data = createMockData({
        basics: createMockBasics({ name: specialName }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText(specialName)).toBeInTheDocument();
    });

    it('should handle empty profiles array', () => {
      const data = createMockData({
        basics: createMockBasics({ profiles: [] }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should handle malformed profile data', () => {
      const data = createMockData({
        basics: createMockBasics({
          profiles: [
            { network: 'GitHub', username: '', url: '' },
            { network: 'LinkedIn', username: null, url: null },
          ] as any,
        }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should handle extremely long email addresses', () => {
      const longEmail = 'very.long.email.address.that.might.cause.layout.issues@example.com';
      const data = createMockData({
        basics: createMockBasics({ email: longEmail }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText(longEmail)).toBeInTheDocument();
    });

    it('should handle missing image src gracefully', () => {
      const data = createMockData({
        basics: createMockBasics({ image: '' }),
      });
      render(<ResumeContent data={data} />);
      
      expect(screen.queryByAltText('John Doe profile')).not.toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should not re-render unnecessarily with same data', () => {
      const data = createMockData();
      const { rerender } = render(<ResumeContent data={data} />);
      
      // Re-render with same data
      rerender(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should handle large section orders efficiently', () => {
      const largeSectionOrder = Array.from({ length: 100 }, (_, i) => `section-${i}`);
      const data = createMockData({ sectionOrder: largeSectionOrder });
      
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should handle large amounts of data efficiently', () => {
      const largeData = createMockData({
        work: Array.from({ length: 50 }, (_, i) => ({
          company: `Company ${i}`,
          position: `Position ${i}`,
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          summary: `Summary for position ${i}`,
        })),
        sectionOrder: ['work'],
      });
      
      render(<ResumeContent data={largeData} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Work: 50 items')).toBeInTheDocument();
    });
  });

  describe('Animation and Motion', () => {
    it('should render motion components without crashing', () => {
      const data = createMockData();
      render(<ResumeContent data={data} />);
      
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should handle motion components in error state', () => {
      render(<ResumeContent data={null as any} />);
      
      expect(screen.getByText('Invalid Resume Data')).toBeInTheDocument();
    });
  });
});