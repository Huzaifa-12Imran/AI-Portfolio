'use client';

import { useEffect, useState } from 'react';
import HeroSection     from './_sections/HeroSection';
import AboutSection    from './_sections/AboutSection';
import GitHubActivity  from './_sections/GitHubActivity';
import ProjectsSkills  from './_sections/ProjectsSkills';
import ChatBlogContact from './_sections/ChatBlogContact';

const NAV_LINKS = [
  { label: '01. About',    href: '#about'    },
  { label: '02. Code',     href: '#github'   },
  { label: '03. Projects', href: '#projects' },
  { label: '04. Contact',  href: '#contact'  },
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const sections = document.querySelectorAll('[data-section]');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(s => obs.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);

    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [loaded]);

  return (
    <>
      {/* ── PAGE LOADER ── */}
      <div className={`page-loader ${loaded ? 'loaded' : ''}`}>
        <span>LOADING</span>
      </div>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-14 py-4"
        style={{
          background: scrolled ? 'rgba(236,234,225,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <a
          href="#hero"
          style={{ fontFamily: 'var(--display)', fontSize: '20px', letterSpacing: '0.08em', color: 'var(--ink)', textDecoration: 'none' }}
        >
          HUZAIFA.
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <a href="mailto:sungpog89@gmail.com" className="pill-btn">
          Hire Me
        </a>
      </nav>

      {/* ── SECTIONS ── */}
      <main>
        <section data-section="0" id="hero">
          <HeroSection loaded={loaded} />
        </section>
        <section data-section="1" id="about">
          <AboutSection />
        </section>
        <section data-section="2" id="github">
          <GitHubActivity />
        </section>
        <section data-section="3" id="projects">
          <ProjectsSkills />
        </section>
        <section data-section="4" id="contact">
          <ChatBlogContact />
        </section>
      </main>
    </>
  );
}
