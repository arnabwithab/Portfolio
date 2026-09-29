import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

// ponytail: fixed spots, no JS loop — CSS animates transform/opacity only
const FIREFLIES = [
  { left: '8%', top: '18%', size: 6, d1: 0, d2: 0 },
  { left: '22%', top: '65%', size: 4, d1: 0.7, d2: 0.5 },
  { left: '45%', top: '12%', size: 5, d1: 1.4, d2: 1 },
  { left: '60%', top: '78%', size: 4, d1: 2.1, d2: 1.5 },
  { left: '75%', top: '28%', size: 6, d1: 2.8, d2: 0.3 },
  { left: '88%', top: '58%', size: 3, d1: 3.5, d2: 0.8 },
  { left: '15%', top: '85%', size: 5, d1: 4.2, d2: 1.2 },
  { left: '35%', top: '42%', size: 3, d1: 4.9, d2: 0.2 },
  { left: '52%', top: '68%', size: 4, d1: 5.6, d2: 0.9 },
  { left: '68%', top: '10%', size: 3, d1: 6.3, d2: 1.4 },
  { left: '82%', top: '85%', size: 5, d1: 7, d2: 0.6 },
  { left: '95%', top: '22%', size: 4, d1: 7.7, d2: 1.1 },
];

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['experience', 'projects'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const fine = window.matchMedia('(pointer:fine)').matches;
    setFinePointer(fine);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    if (fine) window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arnab Mandal',
    jobTitle: 'Machine Learning Engineer',
    url: 'https://arnab-mandal-portfolio.vercel.app',
    sameAs: [
      'https://github.com/arnabwithab',
      'https://www.linkedin.com/in/arnabmandal2912',
      'https://www.instagram.com/arnabwithab/',
    ],
  };

  return (
    <>
      <Helmet>
        <title>Arnab Mandal &mdash; Machine Learning Engineer</title>
        <meta name="description" content="Arnab Mandal is a Machine Learning Engineer. I like finetuning small language models." />
        <link rel="canonical" href="https://arnab-mandal-portfolio.vercel.app" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="relative">
        <div className="firefly-field" aria-hidden="true">
          {FIREFLIES.map((f, i) => (
            <span
              key={i}
              className="firefly"
              style={{
                left: f.left,
                top: f.top,
                width: f.size,
                height: f.size,
                animationDelay: `${f.d1}s, ${f.d2}s`,
              }}
            />
          ))}
        </div>
        <div className="grain-overlay" aria-hidden="true" />

        {finePointer && (
          <div
            className="pointer-events-none fixed inset-0 z-30 transition duration-300"
            aria-hidden="true"
            style={{
              background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(110, 231, 183, 0.10), transparent 80%)`,
            }}
          />
        )}

        <div
          id="main-content"
          className="mx-auto min-h-screen max-w-screen-xl px-5 py-8 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0"
          role="main"
        >
          <div className="lg:flex lg:justify-between lg:gap-4">
            <LeftPanel activeSection={activeSection} />
            <RightPanel activeSection={activeSection} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
