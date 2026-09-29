import React, { useRef, useState } from 'react';
import { Github, Linkedin, Mail, FileText, Instagram } from 'lucide-react';
import Navigation from './Navigation';
import RobotFight from './RobotFight';

interface LeftPanelProps {
  activeSection: string;
}

// ponytail: 350ms text swap paired with the CSS glitch shake, skipped for reduced-motion
function useGlitchText(real: string, alt: string): [string, () => void] {
  const [text, setText] = useState(real);
  const timer = useRef<number | null>(null);

  const trigger = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (timer.current) window.clearTimeout(timer.current);
    setText(alt);
    timer.current = window.setTimeout(() => setText(real), 350);
  };

  return [text, trigger];
}

const LeftPanel: React.FC<LeftPanelProps> = ({ activeSection }) => {
  const [nameText, glitchName] = useGlitchText('Arnab Mandal', 'AI Overlord');
  const [roleText, glitchRole] = useGlitchText('ML Engineer', 'trains tiny brains');
  return (
    <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-20">
      <div>
        <h1
          onMouseEnter={glitchName}
          className="glitch-hover block w-fit font-pixel text-2xl font-bold leading-relaxed text-slate-100 sm:text-3xl"
        >
          {nameText}
        </h1>
        <h2
          onMouseEnter={glitchRole}
          className="glitch-hover mt-4 block w-fit font-pixel text-xs leading-relaxed text-emerald-300 sm:text-sm"
        >
          {roleText}
        </h2>
        <p className="mt-4 whitespace-nowrap text-[15px] leading-relaxed text-slate-300">
          I like finetuning small language models
        </p>

        <Navigation activeSection={activeSection} />
        <RobotFight />
      </div>

      <ul className="mt-8 flex items-center gap-3" aria-label="Social media">
        <li className="text-xs shrink-0">
          <a
            href="https://github.com/arnabwithab"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 -m-2 text-slate-300 hover:text-emerald-300 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={28} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="https://www.linkedin.com/in/arnabmandal2912"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 -m-2 text-slate-300 hover:text-emerald-300 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={28} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="mailto:arnabmandal2912@gmail.com"
            className="block p-2 -m-2 text-slate-300 hover:text-emerald-300 transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={28} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 -m-2 text-slate-300 hover:text-emerald-300 transition-colors duration-300"
            aria-label="Resume"
          >
            <FileText size={28} />
          </a>
        </li>
        <li className="text-xs shrink-0">
          <a
            href="https://www.instagram.com/arnabwithab/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 -m-2 text-slate-300 hover:text-emerald-300 transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LeftPanel;
