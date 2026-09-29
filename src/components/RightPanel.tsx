import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import ExperienceItem from './ExperienceItem';
import ProjectItem from './ProjectItem';
import { experiences } from '../data/experiences';
import { projects } from '../data/projects';
import { Project } from '../types';

function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px', ...optionsRef.current });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? (
        children
      ) : (
        <div className="h-64 animate-pulse rounded bg-slate-800/20" aria-hidden="true" />
      )}
    </div>
  );
};

const RightPanel: React.FC<{ activeSection: string }> = ({ activeSection }) => {
  const showcaseIds = ['21', '22'];
  const featuredProjects = showcaseIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div className="pt-8 lg:w-1/2 lg:py-20">
      <div className="sticky top-0 z-20 -mx-5 mb-8 bg-[#022c22]/85 px-5 py-3 backdrop-blur lg:hidden" role="tablist" aria-label="Sections">
        <div className="flex gap-2">
          {(['experience', 'projects'] as const).map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={activeSection === id}
              onClick={() => scrollTo(id)}
              className={`rounded-full px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.15em] transition ${
                activeSection === id
                  ? 'bg-emerald-300 text-emerald-950'
                  : 'border border-emerald-900 text-emerald-200/70'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
      <LazySection>
        <section id="experience" className="mb-20 scroll-mt-24 md:mb-16 lg:mb-24 lg:scroll-mt-24">
          <div>
            <ol className="group/list space-y-16 lg:space-y-12">
              {experiences.map((experience) => (
                <li key={experience.id}>
                  <ExperienceItem experience={experience} />
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium leading-tight text-slate-200 group"
              >
                <span className="border-b border-transparent pb-px transition group-hover:border-emerald-300 motion-reduce:transition-none">
                  View Full Resume
                </span>
                <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection>
        <section id="projects" className="mb-20 scroll-mt-24 md:mb-16 lg:mb-24 lg:scroll-mt-24">
          <div>
            <ol className="group/list space-y-16 lg:space-y-12">
              {featuredProjects.map((project) => (
                <li key={project.id}>
                  <ProjectItem project={project} />
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <a
                href="https://github.com/arnabwithab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-medium leading-tight text-slate-200 group"
              >
                <span className="border-b border-transparent pb-px transition group-hover:border-emerald-300 motion-reduce:transition-none">
                  View GitHub
                </span>
                <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </LazySection>

      <footer className="max-w-md pb-16 text-[15px] leading-relaxed text-slate-400 sm:pb-0" role="contentinfo">
        <p>
          Built with my sweat and tears at having to use typescript,{' '}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 hover:text-emerald-300 focus-visible:text-emerald-300"
          >
            React
          </a>{' '}
          and{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 hover:text-emerald-300 focus-visible:text-emerald-300"
          >
            Tailwind CSS
          </a>
          . Inspired by{' '}
          <a
            href="https://brittanychiang.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-300 hover:text-emerald-300 focus-visible:text-emerald-300"
          >
            Brittany Chiang
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default RightPanel;
