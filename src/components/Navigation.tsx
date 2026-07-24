import React from 'react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const sections = [
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'projects', label: 'PROJECTS' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="hidden lg:block mt-16" aria-label="Page sections">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => scrollToSection(section.id)}
              aria-label={`Scroll to ${section.id} section`}
              aria-current={activeSection === section.id ? 'true' : undefined}
              className="group flex items-center text-sm font-medium tracking-widest uppercase transition-all duration-300"
            >
              <span
                aria-hidden="true"
                className={`mr-4 h-px transition-all duration-300 ${
                  activeSection === section.id
                    ? 'w-16 bg-slate-200'
                    : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                }`}
              />
              <span
                className={`transition-colors duration-300 ${
                  activeSection === section.id
                    ? 'text-slate-200'
                    : 'text-slate-500 group-hover:text-slate-200'
                }`}
              >
                {section.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
