import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';

const Archive: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sortedProjects = [...projects].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    // Changed bg-slate-900 to bg-black and added relative positioning
    <div className="min-h-screen bg-black relative">
      {/* Added the spotlight effect div */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 relative z-40">
        <div className="lg:py-24">
          <a
            href="/"
            className="group mb-2 inline-flex items-center font-semibold leading-tight text-teal-300 transition-all"
          >
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-2" />
            Arnab Mandal
          </a>

          <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
            All Projects
          </h1>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              {/* Changed bg-slate-900/75 to bg-black/75 */}
              <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-black/75 px-6 py-5 backdrop-blur">
                <tr>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
                  <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
                  <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedProjects.map((project) => {
                  const year = new Date(project.date).getFullYear();
                  const projectUrl = project.liveUrl || project.githubUrl;

                  return (
                    <tr
                      key={project.id}
                      className="border-b border-slate-300/10 last:border-none"
                    >
                      <td className="py-4 pr-4 align-top text-sm">
                        <div className="translate-y-px text-slate-500">{year}</div>
                      </td>

                      <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
                        <div>
                          <div className="block sm:hidden">
                            {projectUrl ? (
                              <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 sm:hidden group/link text-base"
                              >
                                <span>
                                  {project.title}
                                  <ExternalLink className="ml-1 inline-block h-4 w-4" />
                                </span>
                              </a>
                            ) : (
                              <span>{project.title}</span>
                            )}
                          </div>
                          <div className="hidden sm:block">{project.title}</div>
                        </div>
                        <div className="mt-2 text-sm leading-normal text-slate-400">
                          {project.description}
                        </div>
                      </td>

                      <td className="hidden py-4 align-top sm:table-cell">
                        <ul className="translate-y-1">
                          {projectUrl && (
                            <li className="mb-1 flex items-center">
                              <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-baseline font-medium leading-tight text-slate-400 hover:text-teal-300 focus-visible:text-teal-300 text-sm group/link"
                              >
                                <span>
                                  {project.liveUrl ? new URL(project.liveUrl).hostname : 'github.com'}
                                </span>
                                <ExternalLink className="ml-0.5 inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none" />
                              </a>
                            </li>
                          )}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archive;