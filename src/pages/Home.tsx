import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import LeftPanel from '../components/LeftPanel';
import RightPanel from '../components/RightPanel';

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects'];
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arnab Mandal',
    jobTitle: 'Enterprise AI Specialist',
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
        <title>Arnab Mandal &mdash; AI Engineer &amp; GenAI Specialist</title>
        <meta name="description" content="Arnab Mandal is an AI Engineer specializing in GenAI applications and systems-level engineering. Building logic-powered products that work." />
        <link rel="canonical" href="https://arnab-mandal-portfolio.vercel.app" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <div className="relative">
        <div
          className="pointer-events-none fixed inset-0 z-30 transition duration-300"
          aria-hidden="true"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
          }}
        />

        <div
          id="main-content"
          className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0"
          role="main"
        >
          <div className="lg:flex lg:justify-between lg:gap-4">
            <LeftPanel activeSection={activeSection} />
            <RightPanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
