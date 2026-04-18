'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon } from '@/components/ui/GithubIcon';
import { Terminal, Activity } from 'lucide-react';

const navLinks = [
  { href: '#hero', label: 'INIT' },
  { href: '#skills', label: 'MATRIX' },
  { href: '#projects', label: 'DEPLOY' },
  { href: '#chat', label: 'NEURAL' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'skills', 'projects', 'chat'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -200 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-1 p-1.5 bg-[var(--space-surface)] border border-[var(--space-border)] rounded-2xl shadow-[0_24px_48px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500"
        >
          {/* System Indicator */}
          <div className="flex items-center gap-2 pl-4 pr-3 border-r border-white/5 group">
             <Activity size={14} className="text-[var(--starlight)] animate-pulse" />
             <span className="text-[10px] font-mono font-black text-[var(--starlight)] tracking-[0.2em] hidden sm:block">ISE_PROXY</span>
          </div>

          {/* Main Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all ${
                    isActive ? 'text-[var(--starlight)]' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/5 border border-[var(--starlight)]/20 rounded-xl"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          <div className="w-[1px] h-4 bg-white/5 mx-2" />

          {/* Social / Action */}
          <div className="flex items-center gap-1 pr-1">
            <a
              href="https://github.com/Huzaifa-12Imran"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-500 hover:text-[var(--starlight)] transition-colors"
              title="TELEMETRY_SOURCE"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="#chat"
              className="ml-1 px-4 py-2 text-[9px] font-mono font-black uppercase tracking-widest bg-[var(--starlight)] text-black rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95"
            >
              UPLINK
            </a>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
