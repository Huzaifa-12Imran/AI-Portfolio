'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Activity, Cpu, Zap, Radio, Terminal } from 'lucide-react';

const MODULES = [
  { id: '001', label: 'USER_INIT', icon: UserIcon },
  { id: '002', label: 'SYS_ANALYSIS', icon: Cpu },
  { id: '003', label: 'DEPLOYMENTS', icon: Zap },
  { id: '004', label: 'INTEL_FEED', icon: Radio },
  { id: '005', label: 'NEURAL_HUB', icon: Terminal },
];

function UserIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

export default function KineticHUD() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeModule, setActiveModule] = useState('001');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'blog', 'chat'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            const index = sections.indexOf(section);
            setActiveModule(MODULES[index].id);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 lg:w-24 z-40 hidden md:flex flex-col items-center py-10 border-r border-zinc-900 bg-black/40 backdrop-blur-md">
      {/* Scroll Indicator Line */}
      <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-zinc-900">
        <motion.div 
          className="w-[2px] bg-gradient-to-b from-[var(--core-red)] via-[var(--core-orange)] to-[var(--core-yellow)] origin-top shadow-[0_0_10px_rgba(255,140,62,0.5)]"
          style={{ scaleY, height: '100%', right: '-0.5px' }}
        />
      </div>

      <div className="flex flex-col gap-10 items-center justify-between h-full">
        <div className="flex flex-col items-center gap-8">
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[var(--core-red)]"
          >
            <Activity size={24} />
          </motion.div>
          
          <div className="flex flex-col gap-6">
            {MODULES.map((m) => (
              <div 
                key={m.id}
                className={`flex flex-col items-center transition-all duration-300 ${
                  activeModule === m.id ? 'text-[var(--core-orange)] scale-110' : 'text-zinc-700'
                }`}
              >
                <m.icon size={18} className={activeModule === m.id ? 'glow-orange' : ''} />
                <span className="text-[8px] font-mono mt-2 origin-left uppercase tracking-tighter hidden lg:block">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
           {/* Telemetry Readout */}
           <div className="rotate-90 origin-center translate-y-12 whitespace-nowrap">
              <span className="text-[10px] font-mono text-[var(--core-yellow)] tracking-widest opacity-40">
                TEMP: 42°C // CPU_LOAD: 14% // LINK: ESTABLISHED
              </span>
           </div>

           <div className="text-zinc-800 text-[10px] font-mono mt-12 mb-4">
              [ {Math.round(scrollYProgress.get() * 100)} % ]
           </div>
        </div>
      </div>
    </div>
  );
}
