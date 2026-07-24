import React from 'react';
import { ArrowRight } from 'lucide-react';
import ExperienceItem from './ExperienceItem';
import ProjectItem from './ProjectItem';
import { experiences } from '../data/experiences';
import { projects } from '../data/projects';
import { Project } from '../types';

const RightPanel: React.FC = () => {
  const showcaseIds = ["18", "21", "22"];
  const featuredProjects = showcaseIds
      .map((id) => projects.find((project) => project.id === id))
      .filter((project): project is Project => project !== undefined);

  return (
    <div className="pt-24 lg:w-1/2 lg:py-24">
      <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            About
          </h2>
        </div>
        <div className="space-y-4 text-slate-400 leading-relaxed">
          <p>
            Back in 2023, I stumbled into the world of AI and machine learning through a simple college project. Fast-forward to today, and I've had the privilege of building intelligent systems for{' '}
            <span className="text-slate-200 font-medium">defense organizations</span>,{' '}
            <span className="text-slate-200 font-medium">AI startups</span>, and various research initiatives.
          </p>
          <p>
            My main focus these days is building robust GenAI applications that solve real problems without requiring extensive user training. I'm particularly interested in the intersection of{' '}
            <span className="text-slate-200 font-medium">retrieval-augmented generation</span>,{' '}
            <span className="text-slate-200 font-medium">transformer architecture</span>, and{' '}
            <span className="text-slate-200 font-medium">and optimizing models at the kernel level</span>.
          </p>
          <p>
            When I'm not coding, you'll find me at the gym, debating politics and international relations, reading about global power dynamics, or exploring new medium articles on tech and philosophy. I also enjoy playing basketball and discovering new music.
          </p>
        </div>
      </section>

      <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Experience
          </h2>
        </div>
        <div>
          <ol className="group/list space-y-12">
            {experiences.map((experience) => (
              <li key={experience.id}>
                <ExperienceItem experience={experience} />
              </li>
            ))}
          </ol>

          <div className="mt-12">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-medium leading-tight text-slate-200 group"
            >
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                View Full Resume
              </span>
              <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Projects
          </h2>
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
              href="/archive"
              className="inline-flex items-center font-medium leading-tight text-slate-200 group"
            >
              <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                View Full Project Archive
              </span>
              <ArrowRight className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </section>

      <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
        <p>
          Built with my sweat and tears at having to use typescript, {' '}
          <a
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          >
            React
          </a>{' '}
          and{' '}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
          >
            Tailwind CSS
          </a>
          . Inspired by{' '}
          <a
            href="https://brittanychiang.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
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
