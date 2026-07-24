import React from 'react';
import { Github, Linkedin, Mail, FileText, Instagram } from 'lucide-react';
import Navigation from './Navigation';

interface LeftPanelProps {
  activeSection: string;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ activeSection }) => {
  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Arnab Mandal
        </h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Enterprise AI Specialist
        </h2>
        <p className="mt-4 max-w-xs leading-normal text-slate-400">
          I like finetuning stuff
        </p>

        <Navigation activeSection={activeSection} />
      </div>

      <ul className="mt-8 flex items-center gap-5" aria-label="Social media">
        <li className="text-xs shrink-0">
          <a
            href="https://github.com/Eros483"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-400 hover:text-slate-200 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="https://www.linkedin.com/in/arnabmandal2912"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-400 hover:text-slate-200 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="mailto:arnabmandal2912@gmail.com"
            className="block text-slate-400 hover:text-slate-200 transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-400 hover:text-slate-200 transition-colors duration-300"
            aria-label="Resume"
          >
            <FileText size={24} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="https://www.instagram.com/arnabwithab/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-slate-400 hover:text-slate-200 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftPanel;
