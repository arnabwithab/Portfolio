import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const projectUrl = project.liveUrl || project.githubUrl || '#';
  const hasLink = project.liveUrl || project.githubUrl;

  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />

      {project.imageUrl && (
        <div className="z-10 mb-2 mt-1 sm:col-span-2">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30"
            loading="lazy"
            decoding="async"
            width="200"
            height="120"
          />
        </div>
      )}

      <div className={`z-10 ${project.imageUrl ? 'sm:col-span-6' : 'sm:col-span-8'}`}>
        <h3 className="font-medium leading-snug text-slate-200">
          {hasLink ? (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
              <span>
                {project.title}
                <span className="inline-block ml-1" aria-hidden="true">
                  <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                </span>
              </span>
            </a>
          ) : (
            <span>{project.title}</span>
          )}
        </h3>

        {project.achievements && project.achievements.length > 0 ? (
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-normal text-slate-400 marker:text-slate-500">
            {project.achievements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm leading-normal text-slate-400">{project.description}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
