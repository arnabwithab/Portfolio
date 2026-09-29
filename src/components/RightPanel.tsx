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

const RightPanel: React.FC = () => {
  const showcaseIds = ['21', '22'];
  const featuredProjects = showcaseIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => project !== undefined);

  return (
    <div className="pt-8 lg:w-1/2 lg:py-20">
      <LazySection>
        <section id="experience" className="mb-12 scroll-mt-16 md:mb-16 lg:mb-24 lg:scroll-mt-24">
          <div className="mb-6 flex items-center gap-3 lg:hidden" aria-hidden="true">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Experience
            </span>
            <span className="h-px flex-1 bg-emerald-900" />
          </div>
          <div>
            <ol className="group/list space-y-12">
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

      <div aria-hidden="true" className="mb-12 select-none text-center font-mono text-[13px] tracking-[0.4em] text-emerald-700 lg:mb-24">
        · · ─── ◆ ─── · ·
      </div>

      <LazySection>
        <section id="projects" className="mb-10 scroll-mt-16 md:mb-16 lg:mb-24 lg:scroll-mt-24">
          <div className="mb-6 flex items-center gap-3 lg:hidden" aria-hidden="true">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
              Projects
            </span>
            <span className="h-px flex-1 bg-emerald-900" />
          </div>
          <div>
            <ol className="group/list space-y-12">
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

      <div aria-hidden="true" className="mb-8 select-none text-center font-mono text-[13px] tracking-[0.4em] text-emerald-700 md:mb-10">
        · · ─── ◆ ─── · ·
      </div>

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
