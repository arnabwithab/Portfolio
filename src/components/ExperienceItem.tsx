import React from 'react';
import { WorkExperience } from '../types';

interface ExperienceItemProps {
  experience: WorkExperience;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const formatDate = (dateString: string) => {
    if (dateString === 'Present') return 'PRESENT';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase();
  };

  const startDate = formatDate(experience.startDate);
  const endDate = formatDate(experience.endDate);

  return (
    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
        {startDate} — {endDate}
      </header>

      <div className="z-10 sm:col-span-6">
        <h3 className="font-medium leading-snug text-slate-200">
          <div>
            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {experience.position} · {experience.company}
              </span>
            </span>
          </div>
        </h3>

        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-normal text-slate-400 marker:text-slate-500">
          {experience.achievements.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default ExperienceItem;
